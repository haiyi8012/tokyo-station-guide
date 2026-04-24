"use client";

type OperationStatus = "normal" | "delayed" | "unknown";

export default function OperationStatusBadge({ status }: { status: OperationStatus }) {
  const label =
    status === "normal" ? "正常" : status === "delayed" ? "延迟" : "未知";

  const color =
    status === "normal"
      ? "bg-emerald-600"
      : status === "delayed"
        ? "bg-amber-600"
        : "bg-neutral-400";

  const ring =
    status === "normal"
      ? "ring-emerald-600/25"
      : status === "delayed"
        ? "ring-amber-600/25"
        : "ring-neutral-400/25";

  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase text-neutral-500">
      <span className={`relative inline-flex h-2 w-2`}>
        <span className={`absolute inset-0 rounded-full ${color} status-breathe`} />
        <span className={`absolute -inset-1 rounded-full ring-2 ${ring} status-breathe-ring`} />
      </span>
      {label}
    </span>
  );
}

