"use client";

interface StationIconProps {
  color: string;
  alpha: string;
  num: string;
  nameJa: string;
  nameEn?: string;
  isActive?: boolean;
  size?: "sm" | "md";
}

export default function StationIcon({
  color,
  alpha,
  num,
  nameJa,
  nameEn,
  isActive = false,
  size = "md",
}: StationIconProps) {
  const diameter = size === "sm" ? 42 : 50;

  return (
    <span className="flex flex-col items-center gap-1.5 select-none">
      <span
        className="relative flex items-center justify-center rounded-full transition-all duration-150"
        style={{
          width: diameter,
          height: diameter,
          backgroundColor: color,
          boxShadow: isActive
            ? `inset 0 0 0 2px rgba(255,255,255,0.9), 0 0 0 2.5px white, 0 0 0 4.5px ${color}`
            : "inset 0 0 0 2px rgba(255,255,255,0.9)",
        }}
      >
        <span className="flex flex-col items-center justify-center leading-none gap-px">
          <span className="text-[10px] font-bold text-white tracking-wide">
            {alpha}
          </span>
          <span className="text-[13px] font-black text-white tabular-nums leading-none">
            {num}
          </span>
        </span>
      </span>

      <span
        className="text-[10px] font-semibold leading-tight text-center transition-colors"
        style={{ color: isActive ? color : "#737373" }}
      >
        {nameJa}
      </span>

      {nameEn && (
        <span className="text-[9px] text-neutral-400 leading-tight text-center -mt-0.5">
          {nameEn}
        </span>
      )}
    </span>
  );
}
