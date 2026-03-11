/**
 * DESIGN: Dark Intelligence / Command Center
 * SEO roadmap with phased timeline and deliverables
 */

import { CheckCircle2, Clock, Rocket, BarChart3, Crown } from "lucide-react";

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation & Quick Wins",
    timeline: "Week 1–2",
    icon: Rocket,
    color: "text-primary",
    borderColor: "border-primary/40",
    bgColor: "bg-primary/8",
    glowColor: "rgba(124,58,255,0.3)",
    tasks: [
      { task: "Add 'Mortgage Lender' as secondary GBP category", impact: "HIGH" },
      { task: "Add 'Loan Agency' as secondary GBP category", impact: "HIGH" },
      { task: "Build comprehensive service list in GBP (15–20 services)", impact: "HIGH" },
      { task: "Add detailed service descriptions to each GBP service", impact: "HIGH" },
      { task: "Optimize GBP business description with target keywords", impact: "MEDIUM" },
      { task: "Upload 20–30 high-quality photos to GBP", impact: "MEDIUM" },
      { task: "Set up review request system (email/text automation)", impact: "MEDIUM" },
      { task: "Complete GBP Q&A section with 10–15 common questions", impact: "MEDIUM" },
    ],
    expectedOutcome: "Initial ranking signals begin appearing. First visibility in proximity-based searches.",
    rankingTarget: "Top 10 in immediate service area",
  },
  {
    phase: "Phase 2",
    title: "Website Architecture",
    timeline: "Month 1–2",
    icon: BarChart3,
    color: "text-yellow-400",
    borderColor: "border-yellow-500/40",
    bgColor: "bg-yellow-500/8",
    glowColor: "rgba(234,179,8,0.3)",
    tasks: [
      { task: "Build core website with 40–70 pages total", impact: "CRITICAL" },
      { task: "Create service pages: Conventional, FHA, VA, Jumbo, USDA loans", impact: "HIGH" },
      { task: "Create location pages for each Omaha neighborhood/suburb", impact: "HIGH" },
      { task: "Build internal linking architecture connecting all pages", impact: "HIGH" },
      { task: "Create first-time homebuyer guide (pillar content)", impact: "HIGH" },
      { task: "Implement schema markup (LocalBusiness, Service, FAQ)", impact: "MEDIUM" },
      { task: "Set up Google Search Console and Analytics", impact: "MEDIUM" },
      { task: "Submit sitemap and request indexing", impact: "MEDIUM" },
    ],
    expectedOutcome: "Google begins establishing topical and geographic relevance. Rankings start appearing for long-tail keywords.",
    rankingTarget: "Top 10 for 50+ long-tail keywords",
  },
  {
    phase: "Phase 3",
    title: "Authority Building",
    timeline: "Month 2–4",
    icon: Crown,
    color: "text-accent",
    borderColor: "border-accent/40",
    bgColor: "bg-accent/8",
    glowColor: "rgba(0,229,160,0.3)",
    tasks: [
      { task: "Build 50+ local citations (NAP consistency across directories)", impact: "HIGH" },
      { task: "Create weekly GBP posts (market updates, tips, promotions)", impact: "MEDIUM" },
      { task: "Develop neighborhood-specific content for 10+ Omaha areas", impact: "HIGH" },
      { task: "Build topical cluster content (mortgage guides, loan types)", impact: "HIGH" },
      { task: "Implement review response strategy", impact: "MEDIUM" },
      { task: "Create FAQ pages targeting voice search queries", impact: "MEDIUM" },
      { task: "Launch local link building campaign", impact: "HIGH" },
      { task: "Monitor and optimize based on ranking data", impact: "HIGH" },
    ],
    expectedOutcome: "Consistent top-3 rankings across the Omaha metro. Map Pack dominance begins.",
    rankingTarget: "Top 3 across 50%+ of grid points",
  },
  {
    phase: "Phase 4",
    title: "Market Dominance",
    timeline: "Month 4–6",
    icon: CheckCircle2,
    color: "text-green-400",
    borderColor: "border-green-500/40",
    bgColor: "bg-green-500/8",
    glowColor: "rgba(34,197,94,0.3)",
    tasks: [
      { task: "Expand content to cover all 3 target keywords comprehensively", impact: "HIGH" },
      { task: "Build geographic content for surrounding cities (Council Bluffs, Fremont)", impact: "HIGH" },
      { task: "Implement advanced schema and entity optimization", impact: "MEDIUM" },
      { task: "Launch referral partner link building (realtors, builders)", impact: "HIGH" },
      { task: "Create video content for GBP and website", impact: "MEDIUM" },
      { task: "Run quarterly ranking audits and strategy adjustments", impact: "HIGH" },
      { task: "Expand to additional keywords (refinance, home equity, etc.)", impact: "HIGH" },
      { task: "Scale review generation to 10+ reviews/month", impact: "HIGH" },
    ],
    expectedOutcome: "Full market dominance. Top-3 rankings across all 3 keywords throughout the Omaha metro area.",
    rankingTarget: "#1–3 across 80%+ of grid points",
  },
];

const impactColors: Record<string, string> = {
  CRITICAL: "text-red-400 bg-red-500/10 border-red-500/20",
  HIGH: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  MEDIUM: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
};

export default function RoadmapSection() {
  return (
    <div className="py-20 px-8 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-20" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,255,0.08), transparent 70%)"
      }} />

      <div className="relative z-10">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,255,0.6))" }} />
            <span className="text-xs font-data text-primary uppercase tracking-widest">Section 05</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            The SEO Roadmap
          </h2>
          <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
            A phased, <strong className="text-primary">6-month roadmap</strong> to take <strong className="text-white font-semibold">Major Team Mortgage</strong> from <strong className="text-red-400">invisible</strong> to <strong className="text-accent">dominant</strong> across the Omaha metro area. 
            Each phase builds on the last, creating compounding momentum.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(180deg, rgba(124,58,255,0.6), rgba(0,229,160,0.4), transparent)" }} />

          <div className="space-y-8">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div key={i} className="relative md:pl-16">
                  {/* Phase dot */}
                  <div
                    className="absolute left-0 top-6 w-12 h-12 rounded-full border-2 flex items-center justify-center hidden md:flex"
                    style={{
                      borderColor: phase.glowColor,
                      background: `${phase.bgColor}`,
                      boxShadow: `0 0 16px ${phase.glowColor}`,
                    }}
                  >
                    <Icon size={18} className={phase.color} />
                  </div>

                  {/* Phase card */}
                  <div
                    className={`rounded-xl border ${phase.borderColor} p-6 transition-all duration-300 hover:scale-[1.005]`}
                    style={{ background: `linear-gradient(135deg, ${phase.bgColor.replace('8', '5')}, rgba(0,0,0,0))` }}
                  >
                    {/* Phase header */}
                    <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`text-xs font-data font-bold ${phase.color} uppercase tracking-widest`}>
                            {phase.phase}
                          </span>
                          <span className="text-xs font-data text-muted-foreground flex items-center gap-1">
                            <Clock size={10} />
                            {phase.timeline}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {phase.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">Target</div>
                        <div className={`text-sm font-semibold ${phase.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {phase.rankingTarget}
                        </div>
                      </div>
                    </div>

                    {/* Tasks grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
                      {phase.tasks.map((task, j) => (
                        <div key={j} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-black/20 border border-white/5">
                          <CheckCircle2 size={13} className={`${phase.color} mt-0.5 flex-shrink-0`} />
                          <span className="text-xs text-muted-foreground flex-1 leading-relaxed">{task.task}</span>
                          <span className={`text-xs font-data px-1.5 py-0.5 rounded border flex-shrink-0 ${impactColors[task.impact]}`}>
                            {task.impact}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Expected outcome */}
                    <div className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-black/20">
                      <BarChart3 size={14} className={`${phase.color} mt-0.5 flex-shrink-0`} />
                      <div>
                        <div className="text-xs font-data text-muted-foreground uppercase tracking-wider mb-1">Expected Outcome</div>
                        <p className="text-xs text-foreground/80 leading-relaxed">{phase.expectedOutcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary timeline bar */}
        <div className="mt-12 p-6 rounded-xl bg-card border border-border">
          <h4 className="font-semibold text-foreground mb-6 text-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            6-Month Ranking Trajectory
          </h4>
          <div className="flex items-end gap-2 h-24 mb-3">
            {[
              { month: "Now", rank: 20, color: "#ef4444" },
              { month: "Mo 1", rank: 15, color: "#f97316" },
              { month: "Mo 2", rank: 10, color: "#eab308" },
              { month: "Mo 3", rank: 7, color: "#84cc16" },
              { month: "Mo 4", rank: 4, color: "#22c55e" },
              { month: "Mo 5", rank: 2, color: "#00E5A0" },
              { month: "Mo 6", rank: 1, color: "#00E5A0" },
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs font-data font-bold" style={{ color: item.color }}>
                  #{item.rank}
                </div>
                <div
                  className="w-full rounded-t-sm transition-all duration-500"
                  style={{
                    height: `${((21 - item.rank) / 20) * 80}px`,
                    background: item.color,
                    boxShadow: `0 0 8px ${item.color}60`,
                    minHeight: "4px",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            {["Now", "Mo 1", "Mo 2", "Mo 3", "Mo 4", "Mo 5", "Mo 6"].map((m) => (
              <div key={m} className="flex-1 text-center text-xs font-data text-muted-foreground">{m}</div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Projected average ranking trajectory across all tracked keywords in the Omaha metro
          </p>
        </div>
      </div>
    </div>
  );
}
