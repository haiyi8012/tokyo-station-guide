export const runtime = "nodejs";
export const revalidate = 60;

type ToeiServiceStatus = "normal" | "delayed" | "unknown";

type ToeiService = {
  id:
    | "asakusa"
    | "mita"
    | "shinjuku"
    | "oedo"
    | "toden"
    | "nippori_toneri_liner";
  name: string;
  status: ToeiServiceStatus;
  message: string;
};

function normalizeText(input: string) {
  return input.replace(/\s+/g, " ").trim();
}

function parseToeiOperationStatusFromEnglishPage(html: string): {
  updatedAt: string | null;
  services: ToeiService[];
} {
  const text = normalizeText(html);

  const updatedAt =
    text.match(/Latest Update at\s*([^#]+?)\s*(Asakusa Line|Mita Line)/i)?.[1]
      ?.trim() ?? null;

  const services: ToeiService[] = [
    { id: "asakusa", name: "Asakusa Line", status: "unknown", message: "" },
    { id: "mita", name: "Mita Line", status: "unknown", message: "" },
    { id: "shinjuku", name: "Shinjuku Line", status: "unknown", message: "" },
    { id: "oedo", name: "Oedo Line", status: "unknown", message: "" },
    { id: "toden", name: "Toden", status: "unknown", message: "" },
    {
      id: "nippori_toneri_liner",
      name: "Nippori-Toneri Liner",
      status: "unknown",
      message: "",
    },
  ];

  for (const svc of services) {
    // We rely on the page structure: "<Service Name> <Status Line> <Message Line>"
    const m = text.match(
      new RegExp(
        `${svc.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+(Normal Service|[^\\s].{0,80}?)\\s+(No delays of 15 minutes or longer currently|[^\\s].{0,160}?)\\s+`,
        "i"
      )
    );
    if (!m) continue;

    const statusLine = normalizeText(m[1]);
    const messageLine = normalizeText(m[2]);

    const isNormal = /normal service/i.test(statusLine);
    const isDelayed =
      !isNormal ||
      /delay|suspend|stopp|disrupt|significant/i.test(statusLine) ||
      /delay|suspend|stopp|disrupt|significant/i.test(messageLine);

    svc.status = isNormal ? "normal" : isDelayed ? "delayed" : "unknown";
    svc.message = `${statusLine}${messageLine ? ` — ${messageLine}` : ""}`;
  }

  return { updatedAt, services };
}

export async function GET() {
  const url = "https://www.kotsu.metro.tokyo.jp/eng/operation_status/";

  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "tokyo-station-guide/1.0 (+https://github.com/haiyi8012)",
      },
      // Let Next cache on the route via `revalidate`.
    });

    if (!res.ok) {
      return Response.json(
        {
          ok: false,
          source: url,
          error: `Upstream responded with ${res.status}`,
        },
        // Degrade gracefully (avoid spamming 5xx in dev/offline).
        { status: 200 }
      );
    }

    const html = await res.text();
    const { updatedAt, services } = parseToeiOperationStatusFromEnglishPage(html);
    const subwayServices = services.filter((s) =>
      ["asakusa", "mita", "shinjuku", "oedo"].includes(s.id)
    );
    const overall: ToeiServiceStatus = subwayServices.some((s) => s.status === "delayed")
      ? "delayed"
      : subwayServices.every((s) => s.status === "normal")
        ? "normal"
        : "unknown";

    return Response.json({
      ok: true,
      source: url,
      updatedAt,
      overall,
      services,
    });
  } catch (err) {
    return Response.json(
      {
        ok: false,
        source: url,
        error: err instanceof Error ? err.message : "Unknown error",
      },
      // Degrade gracefully (avoid spamming 5xx in dev/offline).
      { status: 200 }
    );
  }
}

