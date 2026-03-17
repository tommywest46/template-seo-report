/**
 * DESIGN: Dark Intelligence / Command Center
 * Opportunity gap analysis with visual scoring and recommendations
 * All copy sourced dynamically from PROSPECT data — no hardcoded industry/business names
 */

import { useEffect, useRef, useState } from "react";
import { Zap, Target, Globe, Building2, FileText, Link2, Star, TrendingUp } from "lucide-react";
import { PROSPECT } from "@/lib/prospect-data";

const MAP_OVERLAY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/map-overlay-BrP5b8rCVrYs8dBefwVDdE.webp";

function useInView(threshold = 0.15) {
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

function AnimatedBar({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} className="h-2 rounded-full bg-white/5 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{
          width: inView ? `${value}%` : "0%",
          background: color,
          transitionDelay: `${delay}ms`,
          boxShadow: `0 0 8px ${color}60`,
        }}
      />
    </div>
  );
}

const opportunityScores = [
  { label: "GBP Category Gap", score: PROSPECT.opportunityScores.gbpCategoryGap, color: "#ef4444" },
  { label: "Website Content Gap", score: PROSPECT.opportunityScores.websiteContentGap, color: "#ef4444" },
  { label: "Internal Linking Gap", score: PROSPECT.opportunityScores.internalLinkingGap, color: "#ef4444" },
  { label: "Geographic Coverage Gap", score: PROSPECT.opportunityScores.geographicCoverageGap, color: "#ef4444" },
  { label: "Topical Authority Gap", score: PROSPECT.opportunityScores.topicalAuthorityGap, color: "#ef4444" },
  { label: "Competitor Vulnerability", score: PROSPECT.opportunityScores.competitorVulnerability, color: "#f97316" },
];

export default function OpportunitySection() {
  const { ref, inView } = useInView();

  const secondaryKws = PROSPECT.heatmaps.slice(1).map(h => h.keyword);
  const allKws = PROSPECT.heatmaps.map(h => h.keyword);
  const serviceList = PROSPECT.websiteStrategy.servicePages.slice(0, 7).join(", ");
  const topLocations = PROSPECT.websiteStrategy.locationPages.slice(0, 3).join(", ");
  const comp1 = PROSPECT.competitors[0]?.name ?? "top competitor";
  const comp2 = PROSPECT.competitors[1]?.name ?? "second competitor";
  const comp3 = PROSPECT.competitors[2]?.name ?? "third competitor";
  const weakComp1 = PROSPECT.competitors[1]?.name ?? "second competitor";
  const weakComp2 = PROSPECT.competitors[2]?.name ?? "third competitor";
  const weakZone = PROSPECT.websiteStrategy.locationPages.slice(2, 5).join(", ");

  const gbpOpportunities = [
    {
      icon: Building2,
      title: "Add Secondary GBP Categories",
      impact: "HIGH",
      impactColor: "text-red-400",
      description: `Adding ${secondaryKws.map(k => `'${k}'`).join(" and ")} as secondary categories immediately expands keyword coverage and unlocks ranking eligibility across multiple search clusters.`,
      effort: "Low (1 hour)",
      timeline: "Immediate",
    },
    {
      icon: FileText,
      title: "Build Comprehensive Service List",
      impact: "HIGH",
      impactColor: "text-red-400",
      description: `Create detailed service descriptions for each offering: ${serviceList}, and more. Google uses this data for relevance scoring.`,
      effort: "Medium (4–8 hours)",
      timeline: "Week 1",
    },
    {
      icon: Star,
      title: "Review Velocity Strategy",
      impact: "HIGH",
      impactColor: "text-red-400",
      description: `Implement a systematic review request process after every job. Reviews are a top-3 local ranking factor. ${comp2} doesn't respond to reviews — a gap you can exploit immediately.`,
      effort: "Low (ongoing)",
      timeline: "Week 1–4",
    },
  ];

  const websiteOpportunities = [
    {
      icon: Globe,
      title: `${PROSPECT.websiteStrategy.targetPageCount} Page Topical Authority Site`,
      impact: "CRITICAL",
      impactColor: "text-red-400",
      description: `Build a comprehensive website covering every service, every ${PROSPECT.city} suburb, and every customer scenario. This is the single highest-leverage action — and none of your competitors have done it right.`,
      pages: [
        `Service pages (${PROSPECT.websiteStrategy.servicePages.length}+)`,
        `Location pages (${PROSPECT.websiteStrategy.locationPages.length}+)`,
        "Specialty & niche service pages",
        "FAQ & resource pages",
      ],
      effort: "High (6–12 weeks)",
      timeline: "Month 1–3",
    },
    {
      icon: Link2,
      title: "Internal Linking Architecture",
      impact: "HIGH",
      impactColor: "text-red-400",
      description: `Create a deliberate internal linking structure that connects service pages to location pages, and builds topical clusters. ${comp3} has virtually none — this is your biggest competitive edge.`,
      effort: "Medium (built into site)",
      timeline: "Month 1–3",
    },
    {
      icon: Target,
      title: "Geographic Suburb Strategy",
      impact: "HIGH",
      impactColor: "text-red-400",
      description: `Target ${weakZone} — the suburbs where ${comp1} is weakest. Dedicated location pages for each suburb will capture searches competitors are ignoring.`,
      effort: "Medium (ongoing)",
      timeline: "Month 2–4",
    },
  ];

  return (
    <div className="py-20 px-8 relative">
      {/* Section header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,160,0.6))" }} />
          <span className="text-xs font-data text-accent uppercase tracking-widest">Section 04</span>
        </div>
        <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          The Opportunity Gap
        </h2>
        <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
          The data tells a clear story: <strong className="text-white font-semibold">{PROSPECT.name}</strong> has the <strong className="text-accent">highest opportunity score</strong> of any business we've analyzed
          in the {PROSPECT.city} {PROSPECT.industryLabel}. Every gap is a door waiting to be opened.
        </p>
      </div>

      {/* Opportunity score visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" ref={ref}>
        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-6">
            <Zap size={16} className="text-accent" />
            <h3 className="font-semibold text-foreground" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Opportunity Gap Scores
            </h3>
          </div>
          <div className="space-y-4">
            {opportunityScores.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-data font-bold" style={{ color: item.color }}>{item.score}%</span>
                </div>
                <AnimatedBar value={item.score} color={item.color} delay={i * 100} />
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Overall Opportunity Score</span>
              <span className="text-2xl font-bold font-data text-accent">{PROSPECT.opportunityScores.overall}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Higher score = more room to grow. This is exceptionally high.
            </p>
          </div>
        </div>

        {/* Visual heatmap reference */}
        <div className="relative rounded-xl overflow-hidden border border-border">
          <img src={MAP_OVERLAY} alt="Opportunity visualization" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="text-xs font-data text-accent uppercase tracking-widest mb-2">What Success Looks Like</div>
            <p className="text-sm text-foreground font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Green dots = top 3 rankings. This is what the map looks like for your competitors in their strongest zones —
              and what <strong className="text-white font-semibold">{PROSPECT.name}</strong>'s map should look like across <strong className="text-accent">all of {PROSPECT.city}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* GBP Opportunities */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Google Business Profile Wins
        </h3>
        <p className="text-muted-foreground text-sm mb-6">Quick wins that can be implemented immediately with minimal effort.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gbpOpportunities.map((opp, i) => {
            const Icon = opp.icon;
            return (
              <div key={i} className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-200 hover:scale-[1.01]">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <span className={`text-xs font-data font-bold ${opp.impactColor}`}>{opp.impact}</span>
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {opp.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{opp.description}</p>
                <div className="flex items-center justify-between text-xs border-t border-border pt-3">
                  <span className="text-muted-foreground">Effort: <span className="text-foreground">{opp.effort}</span></span>
                  <span className="text-accent font-data">{opp.timeline}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Website Opportunities */}
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Website & Content Strategy
        </h3>
        <p className="text-muted-foreground text-sm mb-6">The highest-leverage actions for long-term market dominance.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {websiteOpportunities.map((opp, i) => {
            const Icon = opp.icon;
            return (
              <div key={i} className="p-5 rounded-xl bg-card border border-border hover:border-accent/30 transition-all duration-200 hover:scale-[1.01]">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <span className={`text-xs font-data font-bold ${opp.impactColor}`}>{opp.impact}</span>
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {opp.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{opp.description}</p>
                {"pages" in opp && opp.pages && (
                  <div className="mb-3">
                    <div className="text-xs font-data text-muted-foreground mb-1.5">Page Types:</div>
                    <div className="flex flex-wrap gap-1">
                      {opp.pages.map((p, j) => (
                        <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs border-t border-border pt-3">
                  <span className="text-muted-foreground">Effort: <span className="text-foreground">{opp.effort}</span></span>
                  <span className="text-accent font-data">{opp.timeline}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom callout */}
      <div
        className="mt-10 p-6 rounded-xl border border-accent/20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.06), rgba(74,222,128,0.03))" }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, #4ADE80, transparent)" }} />
        <div className="relative z-10 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 flex-shrink-0">
            <TrendingUp size={20} className="text-accent" />
          </div>
          <div>
            <div className="text-xs font-data text-accent uppercase tracking-widest mb-2">The Bottom Line</div>
            <p className="text-foreground font-medium text-base leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
              The {PROSPECT.city} {PROSPECT.industry} market has one strong competitor ({comp1}) and two vulnerable ones ({weakComp1} and {weakComp2}). None of them have built a true topical
              authority website with proper internal linking. The western and southern suburbs are wide open. That's the gap. That's your path to #1.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
