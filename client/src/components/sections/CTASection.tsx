/**
 * DESIGN: Dark Intelligence / Command Center
 * Final CTA section with LeadHatch branding and next steps
 */

import { Phone, Mail, Calendar, ArrowRight, Shield, Clock, TrendingUp, CheckCircle2 } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/leadhatch-logo-transparent_71af9624.png";

const nextSteps = [
  {
    step: "01",
    title: "Schedule Strategy Call",
    description: "30-minute deep-dive to review this report and align on goals, timeline, and investment.",
    icon: Calendar,
  },
  {
    step: "02",
    title: "Receive Custom Proposal",
    description: "We'll build a tailored SEO strategy and pricing based on your specific market and goals.",
    icon: Shield,
  },
  {
    step: "03",
    title: "Launch Phase 1",
    description: "We begin with GBP optimization immediately — you'll see movement within the first 30 days.",
    icon: TrendingUp,
  },
];

const guarantees = [
  "Transparent monthly reporting with ranking data",
  "No long-term contracts — results speak for themselves",
  "Dedicated account manager and strategy team",
  "Proven process with measurable milestones",
];

export default function CTASection() {
  return (
    <div className="py-20 px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #7C3AFF, transparent)" }} />
        <div className="grid-overlay absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,255,0.6))" }} />
            <span className="text-xs font-data text-primary uppercase tracking-widest">Section 06</span>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, rgba(124,58,255,0.6), transparent)" }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Ready to Own <span className="gradient-text-purple">Omaha?</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            The data is clear. The opportunity is massive. The competitors are beatable. 
            The only question is: how soon do you want to start winning?
          </p>
        </div>

        {/* Next steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {nextSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] text-center"
              >
                <div className="text-4xl font-bold font-data text-primary/20 mb-4">{step.step}</div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Main CTA card */}
        <div
          className="rounded-2xl border border-primary/30 p-8 md:p-10 relative overflow-hidden mb-10"
          style={{ background: "linear-gradient(135deg, rgba(124,58,255,0.12), rgba(0,229,160,0.04))" }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, #7C3AFF, transparent)" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-10"
            style={{ background: "radial-gradient(circle, #00E5A0, transparent)" }} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={LOGO_URL}
                  alt="LeadHatch.io"
                  className="h-12 w-auto object-contain max-w-[200px]"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(124,58,255,0.25))' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Let's Build Your Dominance Strategy
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                LeadHatch.io specializes in local SEO for service-based businesses. We've built the systems, 
                the content frameworks, and the GBP optimization playbooks that move the needle — fast.
              </p>

              {/* Guarantees */}
              <div className="space-y-2 mb-6">
                {guarantees.map((g, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={13} className="text-accent flex-shrink-0" />
                    {g}
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://link.leadhatch.io/widget/booking/38JOacWxj8UgCxcCYIy2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #7C3AFF, #A855F7)",
                    boxShadow: "0 0 20px rgba(124,58,255,0.4)",
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  Book Strategy Call
                  <ArrowRight size={14} />
                </a>
                <a
                  href="mailto:tommy@leadhatch.io"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-200"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  <Mail size={14} />
                  Send Email
                </a>
              </div>
            </div>

            {/* Stats / urgency panel */}
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-black/30 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-red-400" />
                  <span className="text-xs font-data text-red-400 uppercase tracking-wider">Urgency Factor</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every month without visibility is estimated revenue lost to competitors. 
                  The Omaha mortgage market processes thousands of local searches monthly — 
                  none of which are finding Major Team Mortgage.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-black/30 border border-border text-center">
                  <div className="text-2xl font-bold font-data text-primary">97%</div>
                  <div className="text-xs text-muted-foreground mt-1">Opportunity Score</div>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-border text-center">
                  <div className="text-2xl font-bold font-data text-accent">6 mo</div>
                  <div className="text-xs text-muted-foreground mt-1">To Market Dominance</div>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-border text-center">
                  <div className="text-2xl font-bold font-data text-yellow-400">3</div>
                  <div className="text-xs text-muted-foreground mt-1">Beatable Competitors</div>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-border text-center">
                  <div className="text-2xl font-bold font-data text-green-400">#1</div>
                  <div className="text-xs text-muted-foreground mt-1">Target Position</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="section-divider mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="LeadHatch.io"
              className="h-7 w-auto object-contain opacity-70 max-w-[120px]"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="font-data text-xs">© 2026 LeadHatch.io — Local SEO Intelligence</span>
          </div>
          <div className="text-xs font-data text-muted-foreground">
            Confidential Report — Prepared for Major Team Mortgage, Omaha NE — Mar 10, 2026
          </div>
        </div>
      </div>
    </div>
  );
}
