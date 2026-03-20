/**
 * DESIGN: Dark Intelligence / Command Center
 * Executive summary with key findings and data cards
 *
 * DYNAMIC: All copy, colors, and framing are driven by PROSPECT.visibilityStatus
 * Set to "invisible", "semi-visible", or "visible" in prospect-data.ts
 */

import { useEffect, useRef, useState } from "react";
import { TrendingDown, TrendingUp, BarChart2, Eye, MapPin, Zap, Search, Globe, AlertCircle, CheckCircle2 } from "lucide-react";
import { PROSPECT } from "@/lib/prospect-data";
import { getVisibilityConfig } from "@/lib/visibilityConfig";

const vc = getVisibilityConfig(PROSPECT.visibilityStatus);

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Map icon string names to actual components
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  TrendingDown,
  TrendingUp,
  BarChart2,
  Eye,
  MapPin,
  Zap,
};

const findings = [
  {
    iconName: vc.finding1Icon,
    color: vc.finding1Color,
    bg: vc.finding1Bg,
    border: vc.finding1Border,
    title: vc.finding1Title,
    descriptionJsx: vc.finding1Body(
      PROSPECT.name,
      PROSPECT.heatmaps.length,
      PROSPECT.heatmaps[0]?.gridPoints ?? 156,
      PROSPECT.city
    ),
  },
  {
    iconName: vc.finding2Icon,
    color: vc.finding2Color,
    bg: vc.finding2Bg,
    border: vc.finding2Border,
    title: vc.finding2Title,
    descriptionJsx: vc.finding2Body(PROSPECT.name, PROSPECT.city),
  },
  {
    iconName: "Search",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    title: "Weak GBP Category Structure",
    descriptionJsx: (<>The Google Business Profile is missing secondary categories for <strong className="text-yellow-400">{PROSPECT.heatmaps.slice(1).map(h => `'${h.keyword}'`).join(' and ')}</strong> — limiting visibility to <strong className="text-red-400">only one keyword cluster</strong> when competitors rank for all tracked categories.</>),
  },
  {
    iconName: "Globe",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    title: "No Topical Authority Website",
    descriptionJsx: (<>Without a comprehensive website (<strong className="text-primary">{PROSPECT.websiteStrategy.targetPageCount} pages</strong>) covering services, locations, and {PROSPECT.city} neighborhoods, Google cannot establish topical and geographic relevance for ranking.</>),
  },
];

const opportunities = [
  `Add ${PROSPECT.heatmaps.slice(1).map(h => `'${h.keyword}'`).join(' and ')} as secondary GBP categories`,
  "Build comprehensive service list with detailed descriptions in GBP",
  `Create a ${PROSPECT.websiteStrategy.targetPageCount} page website with strong topical + geographic relevance`,
  "Implement internal linking structure across all service and location pages",
  "Optimize GBP with complete Q&A, posts, and photo strategy",
  "Build citation consistency across 50+ local directories",
];

export default function ExecutiveSummary() {
  const { ref, inView } = useInView();

  return (
    <div className="py-20 px-8 relative" ref={ref}>
      {/* Section header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.6))" }} />
          <span className="text-xs font-data text-primary uppercase tracking-widest">Section 01</span>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
          Executive Summary
        </h2>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          This visibility report analyzes <strong className="text-white font-semibold">{PROSPECT.name}</strong>'s current local SEO position across the <strong className="text-foreground">{PROSPECT.cityState}</strong> market.{" "}
          {vc.summarySubheadline(PROSPECT.name, PROSPECT.cityState)}
        </p>
      </div>

      {/* Key findings grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {findings.map((f, i) => {
          const Icon = ICON_MAP[f.iconName] ?? TrendingDown;
          return (
            <div
              key={i}
              className={`p-6 rounded-xl border ${f.border} ${f.bg} transition-all duration-300 hover:scale-[1.01]`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${f.bg} border ${f.border} flex-shrink-0`}>
                  <Icon size={18} className={f.color} />
                </div>
                <div>
                  <h3 className={`font-semibold text-base mb-2 ${f.color}`} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.descriptionJsx}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="section-divider mb-12" />

      {/* Two-column layout: current state vs opportunity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current State */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
            <AlertCircle size={18} className="text-red-400" />
            Current State
          </h3>
          <div className="space-y-3">
            {[
              ...PROSPECT.heatmaps.map(h => ({
                label: `${h.keyword} Rankings`,
                value: vc.currentStateRankingValue(h.keyword),
                color: vc.currentStateRankingColor,
              })),
              { label: "GBP Secondary Categories", value: "Missing", color: "bg-orange-500" },
              { label: "Website Topical Depth", value: "Insufficient", color: "bg-orange-500" },
              { label: "Internal Linking", value: "None", color: "bg-red-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className={`text-xs font-data px-2 py-1 rounded-full text-white ${item.color}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunity */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
            <CheckCircle2 size={18} className="text-green-400" />
            Growth Opportunities
          </h3>
          <div className="space-y-3">
            {opportunities.map((opp, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors">
                <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-data text-primary">{i + 1}</span>
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed">{opp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom insight callout */}
      <div
        className="mt-12 p-6 rounded-xl border border-primary/20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.06), rgba(251,191,36,0.04))" }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, #4ADE80, transparent)" }} />
        <div className="relative z-10">
          <div className="text-xs font-data text-primary uppercase tracking-widest mb-2">Key Insight</div>
          <p className="text-foreground text-base font-medium leading-relaxed" style={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 600 }}>
            {vc.keyInsightCopy(PROSPECT.name, PROSPECT.city)}
          </p>
        </div>
      </div>
    </div>
  );
}
