"use client";

import { useState, useMemo } from "react";
import { Search, Train, X, MapPin } from "lucide-react";
import { STATIONS, ALL_LINES, Station, Line } from "@/lib/data";
import StationCard from "@/components/StationCard";
import StationList from "@/components/StationList";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedLines, setSelectedLines] = useState<string[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const toggleLine = (lineId: string) => {
    setSelectedLines((prev) =>
      prev.includes(lineId)
        ? prev.filter((id) => id !== lineId)
        : [...prev, lineId]
    );
  };

  const filteredStations = useMemo(() => {
    const q = query.toLowerCase().trim();
    return STATIONS.filter((station) => {
      const matchesQuery =
        q === "" ||
        station.name.toLowerCase().includes(q) ||
        station.nameJa.toLowerCase().includes(q) ||
        station.nameEn.toLowerCase().includes(q) ||
        station.namePinyin.toLowerCase().includes(q);

      const matchesLine =
        selectedLines.length === 0 ||
        station.lines.some(({ line }) => selectedLines.includes(line.id));

      return matchesQuery && matchesLine;
    });
  }, [query, selectedLines]);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top header bar */}
      <div className="border-b border-neutral-900 bg-neutral-900">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Train size={18} className="text-white" />
            <div>
              <h1 className="text-white font-black text-base tracking-[0.05em] leading-none">
                東京駅案内
              </h1>
              <p className="text-neutral-400 text-[10px] tracking-[0.2em] uppercase mt-0.5">
                Tokyo Station Guide
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {ALL_LINES.slice(0, 5).map((line) => (
              <div
                key={line.id}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: line.color }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Search */}
        <div className="px-6 pt-6 pb-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索车站名 / 駅名検索 / Pinyin..."
              className="w-full pl-10 pr-10 py-3 bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Line Filters */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[10px] font-semibold text-neutral-400 tracking-[0.2em] uppercase">
              Filter by Line / 路線
            </span>
            {selectedLines.length > 0 && (
              <button
                onClick={() => setSelectedLines([])}
                className="text-[10px] text-neutral-400 hover:text-neutral-700 underline transition-colors"
              >
                全解除
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_LINES.map((line: Line) => {
              const isActive = selectedLines.includes(line.id);
              return (
                <button
                  key={line.id}
                  onClick={() => toggleLine(line.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold border transition-all duration-150"
                  style={
                    isActive
                      ? {
                          backgroundColor: line.color,
                          borderColor: line.color,
                          color: "#fff",
                        }
                      : {
                          backgroundColor: "transparent",
                          borderColor: line.color,
                          color: line.color,
                        }
                  }
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: isActive ? "#fff" : line.color }}
                  />
                  {line.nameJa}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider with count */}
        <div className="flex items-center gap-4 px-6 py-3 border-t border-b border-neutral-100 bg-neutral-50">
          <MapPin size={12} className="text-neutral-400" />
          <span className="text-xs text-neutral-500 font-medium">
            显示{" "}
            <span className="font-black text-neutral-900">
              {filteredStations.length}
            </span>{" "}
            个车站
          </span>
          {(query || selectedLines.length > 0) && (
            <button
              onClick={() => {
                setQuery("");
                setSelectedLines([]);
              }}
              className="ml-auto text-xs text-neutral-400 hover:text-neutral-700 underline transition-colors"
            >
              清除所有筛选
            </button>
          )}
        </div>

        {/* Station list */}
        <StationList stations={filteredStations} onSelect={setSelectedStation} />

        {/* Footer */}
        <div className="px-6 py-8 text-center border-t border-neutral-100 mt-4">
          <p className="text-[10px] text-neutral-300 tracking-[0.2em] uppercase">
            東京都交通局 · Tokyo Metropolitan Bureau of Transportation
          </p>
        </div>
      </div>

      {/* Station detail modal */}
      {selectedStation && (
        <StationCard
          station={selectedStation}
          onClose={() => setSelectedStation(null)}
        />
      )}
    </div>
  );
}
