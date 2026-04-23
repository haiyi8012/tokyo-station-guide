"use client";

import { Station } from "@/lib/data";
import { MapPin, Train, X } from "lucide-react";
import LineBadge from "./LineBadge";

interface StationCardProps {
  station: Station;
  onClose: () => void;
}

export default function StationCard({ station, onClose }: StationCardProps) {
  const primaryLine = station.lines[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md bg-white border border-neutral-200 shadow-2xl"
        style={{ borderTopColor: primaryLine.line.color, borderTopWidth: 4 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div
              className="w-1 h-12 rounded-full"
              style={{ backgroundColor: primaryLine.line.color }}
            />
            <div>
              <p className="text-xs font-medium text-neutral-400 tracking-[0.2em] uppercase mb-0.5">
                Station
              </p>
              <h2 className="text-3xl font-black text-neutral-900 leading-none tracking-tight">
                {station.nameJa}
              </h2>
              <p className="text-sm text-neutral-500 mt-0.5 font-medium">
                {station.name} · {station.nameEn}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-1 p-1.5 hover:bg-neutral-100 rounded-sm transition-colors"
          >
            <X size={18} className="text-neutral-500" />
          </button>
        </div>

        {/* Lines Section */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Train size={14} className="text-neutral-400" />
            <span className="text-xs font-semibold text-neutral-400 tracking-[0.15em] uppercase">
              Lines / 路線
            </span>
          </div>

          <div className="space-y-2.5">
            {station.lines.map(({ line, stationNumber }) => (
              <div
                key={line.id}
                className="flex items-center justify-between py-2.5 px-3 bg-neutral-50 border border-neutral-100"
              >
                <LineBadge line={line} size="md" />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">站号</span>
                  <span
                    className="font-mono text-sm font-bold tracking-widest"
                    style={{ color: line.color }}
                  >
                    {stationNumber}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="pt-3 border-t border-neutral-100">
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-neutral-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {station.description}
                </p>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {station.descriptionJa}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Color bar footer */}
        <div className="flex h-1">
          {station.lines.map(({ line }) => (
            <div
              key={line.id}
              className="flex-1"
              style={{ backgroundColor: line.color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
