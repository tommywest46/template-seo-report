/**
 * DESIGN: The Maps Guy — Dark Intelligence Report
 * Final CTA section with The Maps Guy branding and next steps
 * Background: #0B0F1A, Primary: #4ADE80 (Brand Green), Accent: #FBBF24 (Signal Gold)
 * Fonts: Outfit (headings), Nunito Sans (body), JetBrains Mono (data)
 */

import { Mail, Calendar, ArrowRight, Shield, Clock, TrendingUp, CheckCircle2 } from "lucide-react";
import { PROSPECT } from "@/lib/prospect-data";

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-8"
          style={{ background: "radial-gradient(circle, #4ADE80, transparent)" }} />
        <div className="grid-overlay absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.6))" }} />
            <span className="text-xs font-data text-primary uppercase tracking-widest">Section 06</span>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, rgba(74,222,128,0.6), transparent)" }} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900 }}>
            Ready to Own <span className="gradient-text-purple">{PROSPECT.city}?</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
            The data is clear. The opportunity is <strong className="text-accent">massive</strong>. The competitors are <strong className="text-primary">beatable</strong>. 
            The only question is: how soon do you want <strong className="text-white font-bold">{PROSPECT.name}</strong> to start winning?
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
                <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Main CTA card */}
        <div
          className="rounded-2xl border border-primary/30 p-8 md:p-10 relative overflow-hidden mb-10"
          style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.07), rgba(251,191,36,0.04))" }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-12"
            style={{ background: "radial-gradient(circle, #4ADE80, transparent)" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-8"
            style={{ background: "radial-gradient(circle, #FBBF24, transparent)" }} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={PROSPECT.agency.logoUrl}
                  alt={PROSPECT.agency.name}
                  className="h-12 w-auto object-contain max-w-[220px]"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(74,222,128,0.2))' }}
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    const parent = el.parentElement;
                    if (parent) {
                      const text = document.createElement('span');
                      text.textContent = PROSPECT.agency.name;
                      text.style.cssText = 'font-family: Outfit, sans-serif; font-weight: 900; font-size: 22px; color: #4ADE80;';
                      parent.appendChild(text);
                    }
                  }}
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
                Let's Build Your Dominance Strategy
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                The Maps Guy specializes in local SEO for service-based businesses. We've built the systems, 
                the content frameworks, and the GBP optimization playbooks that move the needle — fast.
              </p>

              {/* Guarantees */}
              <div className="space-y-2 mb-6">
                {guarantees.map((g, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                    <CheckCircle2 size={13} className="text-primary flex-shrink-0" />
                    {g}
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={PROSPECT.agency.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-200 hover:scale-105"
                  style={{
                    background: "#4ADE80",
                    color: "#0B0F1A",
                    boxShadow: "0 0 20px rgba(74,222,128,0.35)",
                    fontFamily: 'Outfit, sans-serif',
                  }}
                >
                  Book Strategy Call
                  <ArrowRight size={14} />
                </a>
                <a
                  href={`mailto:${PROSPECT.agency.email}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-200"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
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
                <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                  Every month without visibility is <strong className="text-red-400">estimated revenue lost</strong> to competitors. 
                  The {PROSPECT.city} {PROSPECT.industry} market processes <strong className="text-foreground">thousands of local searches</strong> monthly — 
                  none of which are finding <strong className="text-white font-bold">{PROSPECT.name}</strong>.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-black/30 border border-border text-center">
                  <div className="text-2xl font-bold font-data text-primary">{PROSPECT.opportunityScores.overall}%</div>
                  <div className="text-xs text-muted-foreground mt-1">Opportunity Score</div>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-border text-center">
                  <div className="text-2xl font-bold font-data text-accent">3 mo</div>
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
              src={PROSPECT.agency.logoUrl}
              alt={PROSPECT.agency.name}
              className="h-7 w-auto object-contain opacity-80 max-w-[140px]"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="font-data text-xs">© 2026 {PROSPECT.agency.name} — Local SEO Intelligence</span>
          </div>
          <div className="text-xs font-data text-muted-foreground">
            Confidential Report — Prepared for <strong className="text-white/80">{PROSPECT.name}</strong>, {PROSPECT.cityState} — {PROSPECT.reportDate}
          </div>
        </div>
      </div>
    </div>
  );
}
