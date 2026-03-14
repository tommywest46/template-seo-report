/**
 * DESIGN: Dark Intelligence / Command Center — The Maps Guy Brand
 * Sticky bottom CTA bar that slides up after user scrolls 300px
 */

import { useEffect, useState } from "react";
import { Calendar, ArrowRight, X } from "lucide-react";
import { PROSPECT } from "@/lib/prospect-data";

export default function StickyBookingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!dismissed) {
        setVisible(window.scrollY > 300);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    setVisible(false);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out"
      style={{
        transform: visible ? "translateY(0)" : "translateY(110%)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Gradient fade above the bar */}
      <div
        className="h-12 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(4,7,18,0.85))",
        }}
      />

      {/* The bar itself */}
      <div
        className="relative flex items-center justify-between gap-4 px-6 py-4 border-t"
        style={{
          background: "rgba(4, 7, 18, 0.97)",
          borderColor: "rgba(74,222,128,0.25)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 -4px 32px rgba(74,222,128,0.08), 0 -1px 0 rgba(74,222,128,0.15)",
        }}
      >
        {/* Left: message */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)" }}
          >
            <Calendar size={16} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
              Ready to dominate {PROSPECT.city}'s Google Maps results?
            </p>
            <p className="text-xs text-muted-foreground hidden sm:block" style={{ fontFamily: "Nunito Sans, sans-serif" }}>
              Book a free 30-min strategy call — no obligation, just clarity.
            </p>
          </div>
        </div>

        {/* Right: CTA button + dismiss */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href={PROSPECT.agency.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm text-black transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #4ADE80, #22c55e)",
              boxShadow: "0 0 20px rgba(74,222,128,0.35)",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Book Strategy Call
            <ArrowRight size={14} />
          </a>
          <button
            onClick={handleDismiss}
            className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-150"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
