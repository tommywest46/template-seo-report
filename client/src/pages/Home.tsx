/**
 * DESIGN: Dark Intelligence / Command Center
 * - Background: #080810 (near-void black)
 * - Primary: #4ADE80 (Brand Green)
 * - Accent: #FBBF24 (Signal Gold)
 * - Fonts: Outfit (display), Nunito Sans (body), JetBrains Mono (data)
 */

import { useState, useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
import NavSidebar from "@/components/NavSidebar";
import ExecutiveSummary from "@/components/sections/ExecutiveSummary";
import HeatmapSection from "@/components/sections/HeatmapSection";
import CompetitorSection from "@/components/sections/CompetitorSection";
import OpportunitySection from "@/components/sections/OpportunitySection";
import RoadmapSection from "@/components/sections/RoadmapSection";
import CTASection from "@/components/sections/CTASection";
import StickyBookingCTA from "@/components/StickyBookingCTA";
import AccessGateModal from "@/components/AccessGateModal";

const SECTIONS = ["hero", "summary", "heatmaps", "competitors", "opportunity", "roadmap", "cta"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AccessGateModal />
      <NavSidebar activeSection={activeSection} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className="lg:ml-64 xl:ml-72">
        {/* Sections with dividers */}
        <div id="hero">
          <HeroSection />
        </div>

        <div className="section-divider" />

        <div id="summary">
          <ExecutiveSummary />
        </div>

        <div className="section-divider" />

        <div id="heatmaps">
          <HeatmapSection />
        </div>

        <div className="section-divider" />

        <div id="competitors">
          <CompetitorSection />
        </div>

        <div className="section-divider" />

        <div id="opportunity">
          <OpportunitySection />
        </div>

        <div className="section-divider" />

        <div id="roadmap">
          <RoadmapSection />
        </div>

        <div className="section-divider" />

        <div id="cta">
          <CTASection />
        </div>
      </main>
      <StickyBookingCTA />
    </div>
  );
}
