"use client";

import { Station } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import LineBadge from "./LineBadge";

interface StationListProps {
  stations: Station[];
  onSelect: (station: Station) => void;
}

export default function StationList({ stations, onSelect }: StationListProps) {
  if (stations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4 font-black text-neutral-200 tracking-tighter select-none">
          検索結果なし
        </div>
        <p className="text-sm text-neutral-400">没有找到匹配的车站</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-neutral-100">
      {stations.map((station, index) => {
        const primaryLine = station.lines[0];
        return (
          <button
            key={station.id}
            onClick={() => onSelect(station)}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-neutral-50 transition-colors text-left group"
          >
            {/* Index number */}
            <span className="text-xs font-mono text-neutral-300 w-5 flex-shrink-0 text-right">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Color accent */}
            <div
              className="w-0.5 h-8 flex-shrink-0 rounded-full"
              style={{ backgroundColor: primaryLine.line.color }}
            />

            {/* Station names */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-neutral-900 tracking-tight">
                  {station.nameJa}
                </span>
                <span className="text-sm text-neutral-500 font-medium">
                  {station.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {station.lines.map(({ line, stationNumber }) => (
                  <LineBadge
                    key={line.id}
                    line={line}
                    stationNumber={stationNumber}
                    size="sm"
                  />
                ))}
              </div>
            </div>

            <ChevronRight
              size={16}
              className="text-neutral-300 group-hover:text-neutral-500 transition-colors flex-shrink-0"
            />
          </button>
        );
      })}
    </div>
  );
}
