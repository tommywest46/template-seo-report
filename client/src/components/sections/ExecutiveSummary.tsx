/**
 * DESIGN: Dark Intelligence / Command Center
 * Executive summary with key findings and data cards
 */

import { useEffect, useRef, useState } from "react";
import { TrendingDown, Eye, Search, Globe, AlertCircle, CheckCircle2 } from "lucide-react";

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

const findings = [
  {
    icon: TrendingDown,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    title: "Zero Top-20 Rankings",
    descriptionJsx: (<>​<strong className="text-white font-semibold">Major Team Mortgage</strong> does not appear in the <strong className="text-red-400">top 20</strong> Google Maps results for any of the <strong className="text-yellow-400">3 tracked keywords</strong> across all <strong className="text-foreground">156 grid points</strong> in the Omaha metro area.</>),
    description: "Major Team Mortgage does not appear in the top 20 Google Maps results for any of the 3 tracked keywords across all 156 grid points in the Omaha metro area.",
  },
  {
    icon: Eye,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    title: "Invisible to Local Buyers",
    descriptionJsx: (<>Potential homebuyers searching <strong className="text-yellow-400">'mortgage broker'</strong>, <strong className="text-yellow-400">'mortgage lender'</strong>, or <strong className="text-yellow-400">'loan agency'</strong> in Omaha cannot find <strong className="text-white font-semibold">Major Team Mortgage</strong> in Google Maps — the primary discovery channel for local services.</>),
    description: "Potential homebuyers searching 'mortgage broker', 'mortgage lender', or 'loan agency' in Omaha cannot find Major Team Mortgage in Google Maps — the primary discovery channel for local services.",
  },
  {
    icon: Search,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    title: "Weak GBP Category Structure",
    descriptionJsx: (<>The Google Business Profile is missing secondary categories <strong className="text-yellow-400">'Mortgage Lender'</strong> and <strong className="text-yellow-400">'Loan Agency'</strong> — limiting visibility to <strong className="text-red-400">only one keyword cluster</strong> when competitors rank for all three.</>),
    description: "The Google Business Profile is missing secondary categories 'Mortgage Lender' and 'Loan Agency' — limiting visibility to only one keyword cluster when competitors rank for all three.",
  },
  {
    icon: Globe,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    title: "No Topical Authority Website",
    descriptionJsx: (<>Without a comprehensive website (<strong className="text-primary">40–70 pages</strong>) covering mortgage services, loan types, and Omaha neighborhoods, Google cannot establish topical and geographic relevance for ranking.</>),
    description: "Without a comprehensive website (40–70 pages) covering mortgage services, loan types, and Omaha neighborhoods, Google cannot establish topical and geographic relevance for ranking.",
  },
];

const opportunities = [
  "Add 'Mortgage Lender' and 'Loan Agency' as secondary GBP categories",
  "Build comprehensive service list with detailed descriptions in GBP",
  "Create a 40–70 page website with strong topical + geographic relevance",
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
          <div className="h-px flex-1 max-w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,255,0.6))" }} />
          <span className="text-xs font-data text-primary uppercase tracking-widest">Section 01</span>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Executive Summary
        </h2>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          This intelligence report analyzes <strong className="text-white font-semibold">Major Team Mortgage</strong>'s current local SEO position across the <strong className="text-foreground">Omaha, Nebraska</strong> market. 
          The data reveals a <strong className="text-red-400">significant visibility gap</strong> — and an equally significant <strong className="text-accent">opportunity for rapid growth</strong>.
        </p>
      </div>

      {/* Key findings grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {findings.map((f, i) => {
          const Icon = f.icon;
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
                  <h3 className={`font-semibold text-base mb-2 ${f.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{(f as any).descriptionJsx ?? f.description}</p>
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
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <AlertCircle size={18} className="text-red-400" />
            Current State
          </h3>
          <div className="space-y-3">
            {[
              { label: "Mortgage Broker Rankings", value: "20+ (Not Ranking)", color: "bg-red-500" },
              { label: "Mortgage Lender Rankings", value: "20+ (Not Ranking)", color: "bg-red-500" },
              { label: "Loan Agency Rankings", value: "20+ (Not Ranking)", color: "bg-red-500" },
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
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
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
        style={{ background: "linear-gradient(135deg, rgba(124,58,255,0.08), rgba(0,229,160,0.04))" }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #7C3AFF, transparent)" }} />
        <div className="relative z-10">
          <div className="text-xs font-data text-primary uppercase tracking-widest mb-2">Key Insight</div>
          <p className="text-foreground text-base font-medium leading-relaxed" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            The competitor data reveals a clear pattern: businesses with strong topical authority websites and optimized GBP profiles 
            dominate the western Omaha market. <strong className="text-white font-semibold">Major Team Mortgage</strong> has the same — or greater — potential to own this territory. 
            The gap is a <strong className="text-primary">strategy gap</strong>, not a brand gap.
          </p>
        </div>
      </div>
    </div>
  );
}
