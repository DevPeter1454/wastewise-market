import { useState } from "react";
import Icon from "../components/shared/Icon";
import { useAIDisposal } from "../hooks/useAIDisposal";
import type { DisposalSearchHistory } from "../types";

const QUICK_TAGS = ["Pure Water Sachet", "Plantain Peels", "Pet Bottles"];

const DROP_OFF_CENTERS = [
  {
    name: "Main Gate Hub",
    status: "Open",
    statusColor: "text-primary",
    distance: "2.4 miles away",
    area: "Dugbe, Ibadan",
    types: ["Plastic", "Organic"],
  },
  {
    name: "Eco-Cycle Bodija",
    status: "Closing soon",
    statusColor: "text-error",
    distance: "3.8 miles away",
    area: "Bodija, Ibadan",
    types: ["Metal", "E-Waste"],
  },
];

export default function DisposalGuidePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { result, loading, getDisposal } = useAIDisposal();
  const [history, setHistory] = useState<DisposalSearchHistory[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("disposal-history") || "[]");
    } catch {
      return [];
    }
  });

  const handleSearch = (query?: string) => {
    const q = query || searchQuery;
    if (!q.trim()) return;
    setSearchQuery(q);
    getDisposal(q);

    const newEntry: DisposalSearchHistory = {
      query: q,
      timestamp: Date.now(),
      icon: "search",
    };
    const updated = [newEntry, ...history.filter((h) => h.query !== q)].slice(
      0,
      5
    );
    setHistory(updated);
    localStorage.setItem("disposal-history", JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Hero Header & Search */}
      <header className="space-y-8 text-center lg:text-left">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface">
            AI Waste Disposal Guide
          </h1>
          <p className="text-slate-500 max-w-2xl">
            AI-powered identification for a cleaner planet. Make sustainable
            living effortless with precision sorting instructions.
          </p>
        </div>

        <div className="bg-surface-container-lowest p-6 lg:p-10 rounded-xl shadow-sm border border-outline-variant/10 max-w-4xl">
          <div className="flex flex-col gap-6">
            <label className="font-bold block text-on-surface text-lg">
              What waste do you want to dispose?
            </label>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Icon
                  name="eco"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-2xl"
                />
                <input
                  className="w-full bg-surface-container-highest border-none rounded-[1rem] py-5 pl-14 pr-6 text-lg focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="e.g., Rotten tomatoes, nylon bags"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <button
                onClick={() => handleSearch()}
                disabled={loading || !searchQuery.trim()}
                className="bg-primary text-white px-8 py-5 rounded-[1rem] font-bold text-lg hover:bg-primary-container active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Icon name="auto_awesome" />
                {loading ? "Analyzing..." : "Get Disposal Guide"}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Common in Oyo State:
              </span>
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    handleSearch(tag);
                  }}
                  className="bg-tertiary-fixed/20 text-on-tertiary-container text-xs px-3 py-1 rounded-full border border-tertiary-fixed/30 cursor-pointer hover:bg-tertiary-fixed transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Results Section */}
      {result && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* AI Analysis Card */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
              <div className="md:w-2/5 relative h-64 md:h-auto bg-primary/5 flex items-center justify-center">
                <Icon
                  name="eco"
                  filled
                  className="text-primary text-[80px] opacity-30"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Icon name="check_circle" className="text-sm" />
                    Identified: {searchQuery}
                  </span>
                </div>
              </div>
              <div className="p-8 md:w-3/5 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-primary font-bold text-sm tracking-widest uppercase mb-1 block">
                      Category
                    </span>
                    <div className="flex items-center gap-2 text-2xl font-bold text-on-surface">
                      <Icon name="eco" className="text-3xl text-primary" />
                      {result.category}
                    </div>
                  </div>
                  <div className="bg-tertiary-fixed text-on-tertiary-container px-3 py-2 rounded-[1rem] text-center">
                    <span className="text-[10px] font-bold uppercase block">
                      Market Value
                    </span>
                    <span className="text-lg font-bold">
                      {result.marketValue}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600">Compostability Score</span>
                    <span className="text-primary">
                      {result.compostabilityScore}%{" "}
                      {result.compostabilityScore >= 90
                        ? "Perfect"
                        : result.compostabilityScore >= 50
                          ? "Good"
                          : "Low"}
                    </span>
                  </div>
                  <div className="h-3 w-full bg-primary-fixed/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${result.compostabilityScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-5 rounded-[1rem] border-l-4 border-primary space-y-2">
                  <h4 className="font-bold flex items-center gap-2">
                    <Icon name="info" className="text-primary" />
                    Disposal Instructions
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {result.instructions}
                  </p>
                </div>
              </div>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-low p-8 rounded-xl flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Icon
                    name="compost"
                    filled
                    className="text-primary text-3xl"
                  />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-500 uppercase">
                    Best Method
                  </span>
                  <p className="text-2xl font-extrabold text-on-surface">
                    {result.disposalMethod}
                  </p>
                </div>
              </div>
              <div className="bg-primary-container p-8 rounded-xl flex items-center gap-6 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="cloud_done" className="text-white text-3xl" />
                </div>
                <div>
                  <span className="text-sm font-bold text-primary-fixed uppercase">
                    CO2 Offset
                  </span>
                  <p className="text-2xl font-extrabold">
                    {result.co2Offset} kg Saved
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Section: Activity & Nearby */}
          <div className="lg:col-span-4 space-y-8">
            {/* Nearby Centers */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Icon name="distance" className="text-primary" />
                Drop-off Near You
              </h3>
              <div className="space-y-4">
                {DROP_OFF_CENTERS.map((center) => (
                  <div
                    key={center.name}
                    className="group p-4 rounded-[1rem] bg-surface-container-low hover:bg-primary/5 cursor-pointer transition-all border border-transparent hover:border-primary/20"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold">{center.name}</span>
                      <span
                        className={`${center.statusColor} text-xs font-bold`}
                      >
                        {center.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">
                      {center.distance} &bull; {center.area}
                    </p>
                    <div className="flex gap-2">
                      {center.types.map((type) => (
                        <span
                          key={type}
                          className="bg-white px-2 py-1 rounded text-[10px] font-bold text-slate-400 border border-slate-100 uppercase"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full text-primary font-bold text-sm hover:underline py-2">
                View all 12 centers
              </button>
            </div>

            {/* Recent Searches */}
            {history.length > 0 && (
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Icon name="history" className="text-primary" />
                  Recent History
                </h3>
                <div className="space-y-4">
                  {history.slice(0, 3).map((item) => (
                    <button
                      key={item.query}
                      onClick={() => handleSearch(item.query)}
                      className="flex items-center gap-4 w-full text-left"
                    >
                      <div className="w-10 h-10 bg-slate-100 rounded-[1rem] flex items-center justify-center">
                        <Icon
                          name="search"
                          className="text-slate-400 text-xl"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{item.query}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <Icon name="chevron_right" className="text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Impact Badge Banner */}
            <div className="bg-tertiary-fixed p-6 rounded-xl space-y-3 relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[100px] text-on-tertiary-container/5 rotate-12">
                redeem
              </span>
              <h4 className="font-bold text-on-tertiary-container text-lg">
                Earn from Waste
              </h4>
              <p className="text-sm text-on-tertiary-fixed-variant leading-tight">
                Your organic waste could be worth ₦2,400 per month in credits.
              </p>
              <button className="bg-on-tertiary-container text-white px-4 py-2 rounded-[1rem] text-xs font-bold uppercase tracking-wider">
                Join Program
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
