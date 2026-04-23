"use client";

import { Line } from "@/lib/data";

interface LineBadgeProps {
  line: Line;
  stationNumber?: string;
  size?: "sm" | "md";
}

export default function LineBadge({
  line,
  stationNumber,
  size = "md",
}: LineBadgeProps) {
  const isSmall = size === "sm";

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`inline-flex items-center justify-center font-bold rounded-sm tracking-tight ${
          isSmall ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1"
        }`}
        style={{ backgroundColor: line.color, color: line.textColor }}
      >
        {line.nameJa}
      </span>
      {stationNumber && (
        <span
          className={`font-mono border rounded-sm tracking-widest ${
            isSmall ? "text-[10px] px-1 py-0.5" : "text-xs px-1.5 py-0.5"
          }`}
          style={{ borderColor: line.color, color: line.color }}
        >
          {stationNumber}
        </span>
      )}
    </div>
  );
}
