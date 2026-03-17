/**
 * DESIGN: The Maps Guy — Dark Intelligence Report
 * Sticky left sidebar with section navigation and progress
 * Background: #0B0F1A (Deep Navy), Primary: #4ADE80 (Brand Green), Accent: #FBBF24 (Signal Gold)
 * Fonts: Outfit (headings), Nunito Sans (body), JetBrains Mono (data)
 */

import { Menu, X, MapPin, BarChart3, Users, Lightbulb, Map, Target, Phone } from "lucide-react";
import { PROSPECT } from "@/lib/prospect-data";

const LOGO_URL = (PROSPECT.agency as any).logoIconUrl ?? PROSPECT.agency.logoUrl;

const navItems = [
  { id: "hero", label: "Overview", icon: MapPin, num: "00" },
  { id: "summary", label: "Executive Summary", icon: BarChart3, num: "01" },
  { id: "heatmaps", label: "Ranking Heatmaps", icon: Map, num: "02" },
  { id: "competitors", label: "Competitor Analysis", icon: Users, num: "03" },
  { id: "opportunity", label: "Opportunity Gap", icon: Lightbulb, num: "04" },
  { id: "roadmap", label: "SEO Roadmap", icon: Target, num: "05" },
  { id: "cta", label: "Next Steps", icon: Phone, num: "06" },
];

interface NavSidebarProps {
  activeSection: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function NavSidebar({ activeSection, isOpen, onToggle }: NavSidebarProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (isOpen) onToggle();
  };

  const activeIndex = navItems.findIndex(n => n.id === activeSection);
  const progress = activeIndex >= 0 ? ((activeIndex) / (navItems.length - 1)) * 100 : 0;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden p-2.5 rounded-xl text-foreground transition-all duration-200 hover:scale-105"
        style={{
          background: "rgba(11,15,26,0.95)",
          border: "1px solid rgba(74,222,128,0.3)",
          boxShadow: "0 0 12px rgba(74,222,128,0.15)",
        }}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 w-64 xl:w-72 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{
          background: "linear-gradient(180deg, #0B0F1A 0%, #0D1220 100%)",
          borderRight: "1px solid rgba(74,222,128,0.1)",
          boxShadow: "4px 0 24px rgba(0,0,0,0.5)",
        }}
      >
        {/* Logo area */}
        <div className="p-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={LOGO_URL}
              alt="The Maps Guy"
              className="h-9 w-auto object-contain max-w-[180px]"
              style={{ filter: 'drop-shadow(0 0 6px rgba(74,222,128,0.25))' }}
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = 'none';
                const parent = el.parentElement;
                if (parent) {
                  const text = document.createElement('span');
                  text.textContent = 'The Maps Guy';
                  text.style.cssText = 'font-family: Outfit, sans-serif; font-weight: 900; font-size: 16px; color: #4ADE80;';
                  parent.appendChild(text);
                }
              }}
            />
          </div>
          
          {/* Client info */}
          <div className="p-3 rounded-xl" style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.12)" }}>
            <div className="text-xs font-data text-muted-foreground uppercase tracking-widest mb-1.5">Intelligence Report</div>
            <div className="text-sm font-semibold text-foreground" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {PROSPECT.name}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={10} className="text-primary" />
              <span className="text-xs text-muted-foreground">{PROSPECT.cityState}</span>
            </div>
          </div>
        </div>

        {/* Report metadata */}
        <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground font-data">DATE</span>
            <span className="text-foreground font-data">{PROSPECT.reportDate}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-data">STATUS</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-data text-xs">LIVE DATA</span>
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground font-data">REPORT PROGRESS</span>
            <span className="text-primary font-data">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #4ADE80, #FBBF24)",
                boxShadow: "0 0 8px rgba(74,222,128,0.4)",
              }}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-0.5">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const isPast = index < activeIndex;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 text-left group"
                    style={{
                      background: isActive ? "rgba(74,222,128,0.1)" : "transparent",
                      border: isActive ? "1px solid rgba(74,222,128,0.25)" : "1px solid transparent",
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{
                        background: isActive ? "rgba(74,222,128,0.15)" : isPast ? "rgba(251,191,36,0.08)" : "rgba(255,255,255,0.04)",
                        border: isActive ? "1px solid rgba(74,222,128,0.35)" : isPast ? "1px solid rgba(251,191,36,0.2)" : "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <Icon
                        size={12}
                        style={{ color: isActive ? "#4ADE80" : isPast ? "#FBBF24" : "#666" }}
                      />
                    </div>
                    <span
                      className="flex-1 text-xs transition-colors duration-200"
                      style={{
                        fontFamily: 'Outfit, sans-serif',
                        color: isActive ? "#fff" : isPast ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.4)",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-xs font-data flex-shrink-0"
                      style={{ color: isActive ? "#4ADE80" : "rgba(255,255,255,0.15)" }}
                    >
                      {item.num}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-center">
            <div className="text-xs text-muted-foreground font-data mb-1">Prepared by</div>
            <div
              className="text-sm font-bold"
              style={{
                fontFamily: 'Outfit, sans-serif',
                color: "#4ADE80",
              }}
            >
              The Maps Guy
            </div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>Local SEO Intelligence</div>
          </div>
        </div>
      </aside>
    </>
  );
}
