/**
 * DESIGN: Dark Intelligence / Command Center
 * Competitor analysis with heatmaps and detailed breakdowns
 */

import { useState } from "react";
import { Users, Star, AlertTriangle, CheckCircle, XCircle, Globe, MapPin, TrendingUp } from "lucide-react";

const SHOTBOLT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/Shotbolt-Mortgage_710566b1.png";
const SPECIALISTS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/Mortage-Specialists_41958130.png";
const NIKI_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/Niki-Cox-Guild_ad238745.png";
const COMP_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/competitor-bg-BdAHBBktBxHHXKwXT2pMu9.webp";

type Strength = "strong" | "moderate" | "weak" | "none";

interface Competitor {
  id: string;
  rank: number;
  name: string;
  image: string;
  keyword: string;
  topRankZones: string;
  weakZones: string;
  topicalRelevance: Strength;
  internalLinking: Strength;
  personalWebsite: Strength;
  gbpOptimization: Strength;
  strengths: string[];
  weaknesses: string[];
  threatLevel: "high" | "medium" | "low";
  summary: string;
  avgRankBest: string;
  dominanceZone: string;
}

const competitors: Competitor[] = [
  {
    id: "shotbolt",
    rank: 1,
    name: "Shotbolt Mortgage Corporation",
    image: SHOTBOLT_IMG,
    keyword: "Mortgage Broker",
    topRankZones: "West & Southwest Omaha (ranks #1–3 across wide area)",
    weakZones: "East Omaha, Ralston, Papillion (ranks 15–20+)",
    topicalRelevance: "moderate",
    internalLinking: "none",
    personalWebsite: "moderate",
    gbpOptimization: "moderate",
    strengths: [
      "Dominates western Omaha with #1–3 rankings",
      "Strong GBP proximity advantage in service area",
      "OK topical relevance with categories and services",
    ],
    weaknesses: [
      "No internal linking strategy on website",
      "Weak in eastern Omaha — opportunity for MTM",
      "Limited topical authority content",
      "Rankings drop sharply east of I-275",
    ],
    threatLevel: "high",
    summary: "The primary competitor. Shotbolt dominates western Omaha through proximity and GBP optimization, but has significant weaknesses in site architecture and topical authority that can be exploited.",
    avgRankBest: "#1–3",
    dominanceZone: "West Omaha",
  },
  {
    id: "specialists",
    rank: 2,
    name: "Mortgage Specialists, LLC",
    image: SPECIALISTS_IMG,
    keyword: "Mortgage Broker",
    topRankZones: "Central & Southeast Omaha (ranks #1–5 in core area)",
    weakZones: "West Omaha, Gretna, Springfield (ranks 10–20+)",
    topicalRelevance: "moderate",
    internalLinking: "none",
    personalWebsite: "moderate",
    gbpOptimization: "moderate",
    strengths: [
      "Strong central Omaha presence",
      "Ranks #1 in several southeast grid points",
      "Good GBP review volume",
    ],
    weaknesses: [
      "No internal linking — major content gap",
      "Average topical relevance only",
      "Weak in western suburbs",
      "No geographic content strategy",
    ],
    threatLevel: "medium",
    summary: "Moderate threat. Mortgage Specialists holds central Omaha but lacks the content depth to defend against a well-executed topical authority strategy. Their absence of internal linking is a critical vulnerability.",
    avgRankBest: "#1–5",
    dominanceZone: "Central Omaha",
  },
  {
    id: "niki",
    rank: 3,
    name: "Niki Cox — Guild Mortgage",
    image: NIKI_IMG,
    keyword: "Mortgage Broker",
    topRankZones: "Southwest Omaha, Chalco area (ranks #1–4)",
    weakZones: "East Omaha, Ralston, Papillion (ranks 15–20+)",
    topicalRelevance: "none",
    internalLinking: "none",
    personalWebsite: "none",
    gbpOptimization: "moderate",
    strengths: [
      "Strong personal brand and review profile",
      "Good GBP proximity in southwest Omaha",
      "Guild Mortgage brand authority",
    ],
    weaknesses: [
      "No personal website — relies entirely on GBP",
      "Zero topical authority content",
      "No internal linking possible",
      "Extremely vulnerable to algorithm changes",
      "Cannot build geographic relevance without a site",
    ],
    threatLevel: "low",
    summary: "The most beatable competitor. Niki Cox ranks purely on GBP proximity and personal brand with zero website presence. A comprehensive content strategy would quickly surpass her rankings across most of the map.",
    avgRankBest: "#1–4",
    dominanceZone: "SW Omaha / Chalco",
  },
];

const strengthLabels: Record<Strength, { label: string; color: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  strong: { label: "Strong", color: "text-green-400", icon: CheckCircle },
  moderate: { label: "Moderate", color: "text-yellow-400", icon: AlertTriangle },
  weak: { label: "Weak", color: "text-orange-400", icon: AlertTriangle },
  none: { label: "None", color: "text-red-400", icon: XCircle },
};

const threatColors = {
  high: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", label: "HIGH THREAT" },
  medium: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400", label: "MEDIUM THREAT" },
  low: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", label: "LOW THREAT" },
};

function StrengthBadge({ value }: { value: Strength }) {
  const s = strengthLabels[value];
  const Icon = s.icon;
  return (
    <span className={`flex items-center gap-1 text-xs font-data ${s.color}`}>
      <Icon size={11} />
      {s.label}
    </span>
  );
}

export default function CompetitorSection() {
  const [activeComp, setActiveComp] = useState("shotbolt");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const comp = competitors.find(c => c.id === activeComp)!;
  const threat = threatColors[comp.threatLevel];

  return (
    <div className="py-20 px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <img src={COMP_BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,255,0.6))" }} />
            <span className="text-xs font-data text-primary uppercase tracking-widest">Section 03</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Competitor Intelligence
          </h2>
          <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
            Your top 3 competitors for the <strong className="text-yellow-400">"Mortgage Broker"</strong> keyword in Omaha, NE. Understanding their strengths and 
            weaknesses reveals exactly where <strong className="text-white font-semibold">Major Team Mortgage</strong> can break through.
          </p>
        </div>

        {/* Competitor tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {competitors.map((c) => {
            const t = threatColors[c.threatLevel];
            return (
              <button
                key={c.id}
                onClick={() => setActiveComp(c.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200
                  ${activeComp === c.id
                    ? `${t.bg} ${t.border} ${t.text}`
                    : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-data
                  ${activeComp === c.id ? t.text : "text-muted-foreground"}`}
                  style={{ background: activeComp === c.id ? undefined : "rgba(255,255,255,0.05)" }}
                >
                  #{c.rank}
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{c.name}</div>
                  <div className={`text-xs font-data ${activeComp === c.id ? t.text : "text-muted-foreground"} opacity-70`}>
                    {t.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Competitor detail */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Heatmap */}
          <div className="xl:col-span-2">
            <div
              className="relative rounded-xl overflow-hidden border border-border cursor-zoom-in group"
              onClick={() => setLightboxOpen(true)}
            >
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-primary" />
                  <span className="text-xs font-data text-white font-medium">{comp.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-data text-white/50">{comp.keyword}</span>
                  <span className="text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded">Click to enlarge</span>
                </div>
              </div>
              <img
                src={comp.image}
                alt={`${comp.name} heatmap`}
                className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-lg text-white text-xs font-data font-bold ${threat.bg} border ${threat.border}`}>
                BEST RANK: {comp.avgRankBest}
              </div>
            </div>
          </div>

          {/* Analysis panel */}
          <div className="flex flex-col gap-4">
            {/* Threat level */}
            <div className={`p-4 rounded-xl border ${threat.border} ${threat.bg}`}>
              <div className="text-xs font-data text-muted-foreground uppercase tracking-widest mb-1">Threat Assessment</div>
              <div className={`text-xl font-bold ${threat.text}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {threat.label}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Keyword: {comp.keyword}</div>
            </div>

            {/* SEO factors */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="text-xs font-data text-muted-foreground uppercase tracking-wider mb-3">SEO Factor Analysis</div>
              <div className="space-y-2.5">
                {[
                  { label: "Topical Relevance", value: comp.topicalRelevance },
                  { label: "Internal Linking", value: comp.internalLinking },
                  { label: "Personal Website", value: comp.personalWebsite },
                  { label: "GBP Optimization", value: comp.gbpOptimization },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <StrengthBadge value={item.value} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dominance zone */}
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={12} className="text-primary" />
                <span className="text-xs font-data text-primary uppercase tracking-wider">Dominance Zone</span>
              </div>
              <div className="text-sm text-foreground font-medium mb-1">{comp.dominanceZone}</div>
              <div className="text-xs text-muted-foreground">{comp.topRankZones}</div>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-xl bg-card border border-border flex-1">
              <div className="text-xs font-data text-muted-foreground uppercase tracking-wider mb-2">Strategic Summary</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{comp.summary}</p>
            </div>
          </div>
        </div>

        {/* Weaknesses to exploit */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-card border border-border">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <TrendingUp size={16} className="text-green-400" />
              Their Weaknesses = Your Opportunity
            </h4>
            <ul className="space-y-2">
              {comp.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <XCircle size={13} className="text-red-400 mt-0.5 flex-shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <Star size={16} className="text-yellow-400" />
              What They're Doing Right
            </h4>
            <ul className="space-y-2">
              {comp.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle size={13} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Competitor comparison table */}
        <div className="mt-8 rounded-xl overflow-hidden border border-border">
          <div className="px-6 py-4 border-b border-border" style={{ background: "rgba(124,58,255,0.06)" }}>
            <h4 className="font-semibold text-foreground" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Competitive Landscape Overview
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 text-xs font-data text-muted-foreground uppercase tracking-wider">Business</th>
                  <th className="text-center px-4 py-3 text-xs font-data text-muted-foreground uppercase tracking-wider">Best Rank</th>
                  <th className="text-center px-4 py-3 text-xs font-data text-muted-foreground uppercase tracking-wider">Topical</th>
                  <th className="text-center px-4 py-3 text-xs font-data text-muted-foreground uppercase tracking-wider">Int. Linking</th>
                  <th className="text-center px-4 py-3 text-xs font-data text-muted-foreground uppercase tracking-wider">Website</th>
                  <th className="text-center px-4 py-3 text-xs font-data text-muted-foreground uppercase tracking-wider">Threat</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c) => {
                  const t = threatColors[c.threatLevel];
                  return (
                    <tr key={c.id} className="border-b border-border hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-foreground">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.dominanceZone}</div>
                      </td>
                      <td className="px-4 py-4 text-center font-data text-green-400 font-bold">{c.avgRankBest}</td>
                      <td className="px-4 py-4 text-center"><StrengthBadge value={c.topicalRelevance} /></td>
                      <td className="px-4 py-4 text-center"><StrengthBadge value={c.internalLinking} /></td>
                      <td className="px-4 py-4 text-center"><StrengthBadge value={c.personalWebsite} /></td>
                      <td className="px-4 py-4 text-center">
                        <span className={`text-xs font-data font-bold ${t.text}`}>{t.label}</span>
                      </td>
                    </tr>
                  );
                })}
                {/* MTM row */}
                <tr className="border-b border-primary/20 bg-primary/5">
                  <td className="px-6 py-4">
                    <div className="font-bold text-primary">Major Team Mortgage</div>
                    <div className="text-xs text-muted-foreground">Your Business (Current)</div>
                  </td>
                  <td className="px-4 py-4 text-center font-data text-red-400 font-bold">20+</td>
                  <td className="px-4 py-4 text-center"><StrengthBadge value="weak" /></td>
                  <td className="px-4 py-4 text-center"><StrengthBadge value="none" /></td>
                  <td className="px-4 py-4 text-center"><StrengthBadge value="weak" /></td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-xs font-data font-bold text-primary">YOUR POSITION</span>
                  </td>
                </tr>
              </tbody>
            </table>
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
            <button className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm font-data" onClick={() => setLightboxOpen(false)}>
              ✕ Close
            </button>
            <img src={comp.image} alt={comp.name} className="w-full h-auto rounded-xl" onClick={(e) => e.stopPropagation()} />
          </div>
        </div>
      )}
    </div>
  );
}
