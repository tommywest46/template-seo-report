/**
 * DESIGN: Dark Intelligence / Command Center
 * Interactive heatmap section with keyword tabs and enlarged map images
 */

import { useState } from "react";
import { Map, Info, ChevronRight } from "lucide-react";

const MTM_BROKER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/MTM-Mortgage-Broker_603c3cf9.png";
const MTM_LENDER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/MTM-Mortgage-Lender_3b1c360a.png";
const MTM_LOAN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/MTM-Loan-Agency_fd690f6d.png";

const heatmaps = [
  {
    id: "broker",
    keyword: "Mortgage Broker",
    image: MTM_BROKER,
    date: "Mar 10, 2026",
    gridPoints: 156,
    topRankings: 0,
    avgRank: "20+",
    insight: "Zero visibility across the entire Omaha metro. The business does not appear in the top 20 results for this primary keyword at any of the 156 tracked grid points.",
    severity: "critical",
  },
  {
    id: "lender",
    keyword: "Mortgage Lender",
    image: MTM_LENDER,
    date: "Mar 10, 2026",
    gridPoints: 156,
    topRankings: 0,
    avgRank: "20+",
    insight: "Complete absence from 'Mortgage Lender' searches — a high-intent keyword that directly matches buyer intent. Adding this as a primary GBP category would immediately expand potential visibility.",
    severity: "critical",
  },
  {
    id: "loan",
    keyword: "Loan Agency",
    image: MTM_LOAN,
    date: "Mar 10, 2026",
    gridPoints: 156,
    topRankings: 0,
    avgRank: "20+",
    insight: "The 'Loan Agency' keyword shows the same pattern. This secondary category represents an untapped opportunity — competitors who rank here capture buyers at the top of the funnel.",
    severity: "critical",
  },
];

const colorLegend = [
  { color: "#22c55e", label: "#1–3", desc: "Top 3 (Prime visibility)" },
  { color: "#84cc16", label: "#4–7", desc: "Strong (Map Pack adjacent)" },
  { color: "#eab308", label: "#8–13", desc: "Moderate (Page 1 fringe)" },
  { color: "#f97316", label: "#14–19", desc: "Weak (Rarely seen)" },
  { color: "#ef4444", label: "#20+", desc: "Not ranking" },
];

export default function HeatmapSection() {
  const [activeTab, setActiveTab] = useState("broker");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const active = heatmaps.find(h => h.id === activeTab)!;

  return (
    <div className="py-20 px-8 relative" style={{ background: "linear-gradient(180deg, transparent, rgba(74,222,128,0.02), transparent)" }}>
      {/* Section header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.6))" }} />
          <span className="text-xs font-data text-primary uppercase tracking-widest">Section 02</span>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Local Ranking Heatmaps
        </h2>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          These heatmaps show where <strong className="text-white font-semibold">Major Team Mortgage</strong> ranks across <strong className="text-foreground">156 geographic grid points</strong> in the Omaha metro area. 
          Each dot represents a search performed from that location — the number inside indicates the <strong className="text-primary">ranking position</strong>.
        </p>
      </div>

      {/* Color legend */}
      <div className="flex flex-wrap gap-3 mb-8">
        {colorLegend.map((item) => (
          <div key={item.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}60` }} />
            <span className="font-data text-foreground font-medium">{item.label}</span>
            <span className="text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>

      {/* Keyword tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {heatmaps.map((h) => (
          <button
            key={h.id}
            onClick={() => setActiveTab(h.id)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border
              ${activeTab === h.id
                ? "bg-primary text-white border-primary shadow-lg"
                : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            style={{ fontFamily: 'Outfit, sans-serif', boxShadow: activeTab === h.id ? "0 0 20px rgba(74,222,128,0.3)" : undefined }}
          >
            {h.keyword}
          </button>
        ))}
      </div>

      {/* Main heatmap display */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map image - takes 2/3 */}
        <div className="xl:col-span-2">
          <div
            className="relative rounded-xl overflow-hidden border border-border cursor-zoom-in group"
            onClick={() => setLightboxOpen(true)}
          >
            {/* Header bar */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-2">
                <Map size={14} className="text-primary" />
                <span className="text-xs font-data text-white font-medium">{active.keyword}</span>
                <span className="text-xs font-data text-white/70 font-semibold">— Major Team Mortgage</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-data text-white/50">{active.date}</span>
                <span className="text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded">Click to enlarge</span>
              </div>
            </div>

            <img
              src={active.image}
              alt={`${active.keyword} heatmap for Major Team Mortgage`}
              className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.01]"
            />

            {/* Overlay badge */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-red-500/90 text-white text-xs font-data font-bold">
              ALL POINTS: 20+ (NOT RANKING)
            </div>
          </div>
        </div>

        {/* Stats sidebar - takes 1/3 */}
        <div className="flex flex-col gap-4">
          {/* Severity badge */}
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10">
            <div className="text-xs font-data text-red-400 uppercase tracking-widest mb-1">Severity Level</div>
            <div className="text-2xl font-bold text-red-400" style={{ fontFamily: 'Outfit, sans-serif' }}>CRITICAL</div>
            <div className="text-xs text-muted-foreground mt-1">Immediate action required</div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <div className="text-2xl font-bold font-data text-foreground">{active.gridPoints}</div>
              <div className="text-xs text-muted-foreground mt-1">Grid Points</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <div className="text-2xl font-bold font-data text-red-400">{active.avgRank}</div>
              <div className="text-xs text-muted-foreground mt-1">Avg. Rank</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center col-span-2">
              <div className="text-2xl font-bold font-data text-red-400">0%</div>
              <div className="text-xs text-muted-foreground mt-1">Top-3 Visibility</div>
            </div>
          </div>

          {/* Insight */}
          <div className="p-4 rounded-xl bg-card border border-border flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Info size={14} className="text-primary" />
              <span className="text-xs font-data text-primary uppercase tracking-wider">Analysis</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{active.insight}</p>
          </div>

          {/* What this means */}
          <div className="p-4 rounded-xl border border-primary/20" style={{ background: "rgba(74,222,128,0.06)" }}>
            <div className="text-xs font-data text-primary uppercase tracking-wider mb-2">What This Means</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every day without visibility is <strong className="text-red-400">lost revenue</strong>. Homebuyers searching for mortgage services in Omaha 
              are being captured by competitors — not <strong className="text-white font-semibold">Major Team Mortgage</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm font-data"
              onClick={() => setLightboxOpen(false)}
            >
              ✕ Close
            </button>
            <img
              src={active.image}
              alt={`${active.keyword} heatmap`}
              className="w-full h-auto rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
