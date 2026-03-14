/**
 * DESIGN: The Maps Guy — Dark Intelligence Report
 * Hero section with full-bleed background, animated headline, key metrics
 * Background: #0B0F1A (Deep Navy), Primary: #4ADE80 (Brand Green), Accent: #FBBF24 (Signal Gold)
 * Fonts: Outfit (headings), Nunito Sans (body), JetBrains Mono (data)
 */

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Calendar, ChevronDown } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/hero-bg-7aHuMzzvfawGLf2ZspRw8n.webp";

const metrics = [
  { label: "Keywords Tracked", value: 3, suffix: "", color: "#4ADE80", glow: "rgba(74,222,128,0.4)" },
  { label: "Avg. Map Ranking", value: 20, suffix: "+", color: "#ef4444", glow: "rgba(239,68,68,0.4)" },
  { label: "Grid Points Analyzed", value: 156, suffix: "", color: "#FBBF24", glow: "rgba(251,191,36,0.4)" },
  { label: "Opportunity Score", value: 97, suffix: "%", color: "#4ADE80", glow: "rgba(74,222,128,0.4)" },
];

function CountUp({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.55 }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, rgba(11,15,26,0.3) 0%, rgba(11,15,26,0.1) 40%, rgba(11,15,26,0.95) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(90deg, rgba(11,15,26,0.6) 0%, transparent 60%)"
        }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-30" />
        {/* Brand Green glow orb */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #4ADE80, transparent)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top status bar */}
        <div className="flex items-center justify-between px-8 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-data text-red-400 uppercase tracking-widest">
                Confidential
              </span>
            </div>
            <span className="text-xs font-data text-muted-foreground hidden sm:block">
              Prepared for <strong className="text-white font-semibold">Major Team Mortgage</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-data text-muted-foreground">
            <Calendar size={11} />
            <span>Mar 10, 2026</span>
          </div>
        </div>

        {/* Main hero content */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 max-w-5xl">
          {/* Alert badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 text-sm font-medium mb-8 w-fit transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <AlertTriangle size={13} />
            <span>Critical Visibility Gap Detected — Omaha, NE</span>
          </div>

          {/* Headline */}
          <div className={`transition-all duration-700 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1
              className="font-bold leading-[1.05] mb-6"
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900 }}
            >
              <span className="text-foreground block">Your Business Is</span>
              <span className="block" style={{
                background: "linear-gradient(135deg, #FF6B35, #FF3B3B, #FF6B35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Invisible
              </span>
              <span className="text-foreground block">on Google Maps.</span>
            </h1>
          </div>

          <p
            className={`text-base md:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          >
            Across <strong className="text-foreground">156 geographic data points</strong> in the Omaha metro area, <strong className="text-white font-bold">Major Team Mortgage</strong> ranks <strong className="text-red-400">outside the top 20</strong> for every tracked keyword across <strong className="text-yellow-400">3 keyword categories</strong>. 
            This report reveals exactly what's happening — and the precise roadmap to dominate your market.
          </p>

          {/* CTA buttons */}
          <div className={`flex items-center gap-3 flex-wrap transition-all duration-700 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <button
              onClick={() => document.getElementById("summary")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 hover:brightness-110"
              style={{
                background: "#4ADE80",
                color: "#0B0F1A",
                boxShadow: "0 0 24px rgba(74,222,128,0.4), 0 4px 12px rgba(0,0,0,0.3)",
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              View Full Report
            </button>
            <button
              onClick={() => document.getElementById("heatmaps")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3.5 rounded-xl font-semibold text-sm border border-white/20 text-white/80 hover:border-primary/40 hover:text-white transition-all duration-200 backdrop-blur-sm"
              style={{
                background: "rgba(255,255,255,0.05)",
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              See Heatmaps
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-6 animate-bounce">
          <ChevronDown size={20} className="text-muted-foreground opacity-50" />
        </div>

        {/* Metrics bar */}
        <div className="border-t border-white/8" style={{ background: "rgba(11,15,26,0.9)", backdropFilter: "blur(12px)" }}>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="px-6 py-5 text-center relative"
                style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : undefined }}
              >
                <div
                  className="text-3xl md:text-4xl font-bold font-data mb-1"
                  style={{ color: m.color, textShadow: `0 0 20px ${m.glow}` }}
                >
                  <CountUp target={m.value} />
                  {m.suffix}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
