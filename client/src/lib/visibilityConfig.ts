/**
 * ============================================================
 * VISIBILITY STATUS CONFIGURATION
 * ============================================================
 * This file drives ALL dynamic copy, colors, and framing across
 * the report based on the single `visibilityStatus` field in
 * prospect-data.ts.
 *
 * Set PROSPECT.visibilityStatus to one of:
 *   "invisible"    — ranks 20+ across most of the map (all red)
 *   "semi-visible" — mixed rankings, some top-3 zones but large gaps
 *   "visible"      — strong rankings, expanding to dominate metro
 * ============================================================
 */

export type VisibilityStatus = "invisible" | "semi-visible" | "visible";

export interface VisibilityConfig {
  // Hero section
  alertBadgeText: string;
  alertBadgeBorderColor: string;
  alertBadgeBgColor: string;
  alertBadgeTextColor: string;
  alertBadgeDotColor: string;
  headlineWord: string;
  headlineGradient: string;
  heroBodyCopy: (businessName: string, gridPoints: number, city: string, categoryCount: number) => string;
  heatmapCardBorderColor: string;
  heatmapCardBgColor: string;
  heatmapCardLabelColor: string;
  heatmapCardGlowColor: string;
  heatmapFooterDotColor: string;
  heatmapFooterTextColor: string;
  avgRankingValue: number;
  avgRankingColor: string;
  avgRankingGlow: string;
  // Executive Summary
  summarySubheadline: (businessName: string, cityState: string) => string;
  finding1Title: string;
  finding1Color: string;
  finding1Bg: string;
  finding1Border: string;
  finding1Icon: "TrendingDown" | "TrendingUp" | "BarChart2";
  finding1Body: (businessName: string, heatmapCount: number, gridPoints: number, city: string) => React.ReactNode;
  finding2Title: string;
  finding2Color: string;
  finding2Bg: string;
  finding2Border: string;
  finding2Icon: "Eye" | "MapPin" | "Zap";
  finding2Body: (businessName: string, city: string) => React.ReactNode;
  currentStateRankingValue: (keyword: string) => string;
  currentStateRankingColor: string;
  keyInsightCopy: (businessName: string, city: string) => string;
  // Roadmap section
  roadmapFromWord: string;
  roadmapFromColor: string;
  trajectoryStartRank: number;
  trajectoryStartColor: string;
  phase2Timeline: string;
  phase3Timeline: string;
  phase4Timeline: string;
}

// ── React import for JSX in config ──────────────────────────
import React from "react";

export const VISIBILITY_CONFIGS: Record<VisibilityStatus, VisibilityConfig> = {

  // ─────────────────────────────────────────────────────────────
  // INVISIBLE — ranks 20+ across most/all of the map
  // ─────────────────────────────────────────────────────────────
  invisible: {
    alertBadgeText: "Critical Visibility Gap Detected",
    alertBadgeBorderColor: "border-red-500/40",
    alertBadgeBgColor: "bg-red-500/10",
    alertBadgeTextColor: "text-red-400",
    alertBadgeDotColor: "bg-red-500",
    headlineWord: "Invisible",
    headlineGradient: "linear-gradient(135deg, #FF6B35, #FF3B3B, #FF6B35)",
    heroBodyCopy: (businessName, gridPoints, city, categoryCount) =>
      `Across ${gridPoints} geographic data points in the ${city} metro area, ${businessName} ranks outside the top 20 across ${categoryCount} categories. This report reveals exactly what's happening — and the precise roadmap to dominate your market.`,
    heatmapCardBorderColor: "rgba(239,68,68,0.25)",
    heatmapCardBgColor: "rgba(239,68,68,0.12)",
    heatmapCardLabelColor: "text-red-400",
    heatmapCardGlowColor: "#ef4444",
    heatmapFooterDotColor: "bg-red-500",
    heatmapFooterTextColor: "text-red-400",
    avgRankingValue: 20,
    avgRankingColor: "#ef4444",
    avgRankingGlow: "rgba(239,68,68,0.4)",
    summarySubheadline: (businessName, cityState) =>
      `The data reveals a significant visibility gap for ${businessName} in ${cityState} — and an equally significant opportunity for rapid growth.`,
    finding1Title: "Zero Top-20 Rankings",
    finding1Color: "text-red-400",
    finding1Bg: "bg-red-500/10",
    finding1Border: "border-red-500/20",
    finding1Icon: "TrendingDown",
    finding1Body: (businessName, heatmapCount, gridPoints, city) =>
      React.createElement(React.Fragment, null,
        React.createElement("strong", { className: "text-white font-semibold" }, businessName),
        " does not appear in the ",
        React.createElement("strong", { className: "text-red-400" }, "top 20"),
        " Google Maps results for any of the ",
        React.createElement("strong", { className: "text-yellow-400" }, `${heatmapCount} tracked categories`),
        " across all ",
        React.createElement("strong", { className: "text-foreground" }, `${gridPoints} grid points`),
        ` in the ${city} metro area.`
      ),
    finding2Title: "Invisible to Local Buyers",
    finding2Color: "text-orange-400",
    finding2Bg: "bg-orange-500/10",
    finding2Border: "border-orange-500/20",
    finding2Icon: "Eye",
    finding2Body: (businessName, city) =>
      React.createElement(React.Fragment, null,
        `Potential customers searching for services in ${city} cannot find `,
        React.createElement("strong", { className: "text-white font-semibold" }, businessName),
        " in Google Maps — the primary discovery channel for local services."
      ),
    currentStateRankingValue: () => "20+ (Not Ranking)",
    currentStateRankingColor: "bg-red-500",
    keyInsightCopy: (businessName, city) =>
      `The competitor data reveals a clear pattern: businesses with strong topical authority websites and optimized GBP profiles dominate the ${city} market. ${businessName} has the same — or greater — potential to own this territory. The gap is a strategy gap, not a brand gap.`,
    roadmapFromWord: "invisible",
    roadmapFromColor: "text-red-400",
    trajectoryStartRank: 20,
    trajectoryStartColor: "#ef4444",
    phase2Timeline: "Weeks 3–4",
    phase3Timeline: "Ongoing",
    phase4Timeline: "Ongoing",
  },

  // ─────────────────────────────────────────────────────────────
  // SEMI-VISIBLE — mixed rankings, some top-3 but large gaps
  // ─────────────────────────────────────────────────────────────
  "semi-visible": {
    alertBadgeText: "Visibility Gap & Expansion Opportunity",
    alertBadgeBorderColor: "border-yellow-500/40",
    alertBadgeBgColor: "bg-yellow-500/10",
    alertBadgeTextColor: "text-yellow-400",
    alertBadgeDotColor: "bg-yellow-500",
    headlineWord: "Semi-Visible",
    headlineGradient: "linear-gradient(135deg, #FBBF24, #F59E0B, #FBBF24)",
    heroBodyCopy: (businessName, gridPoints, city, categoryCount) =>
      `Across ${gridPoints} geographic data points in the ${city} metro area, ${businessName} shows strong rankings in its core zone — but ranks outside the top 3 across most of the metro for ${categoryCount} tracked categories. This report reveals exactly where the gaps are and the roadmap to expand dominance across the full market.`,
    heatmapCardBorderColor: "rgba(251,191,36,0.25)",
    heatmapCardBgColor: "rgba(251,191,36,0.10)",
    heatmapCardLabelColor: "text-yellow-400",
    heatmapCardGlowColor: "#FBBF24",
    heatmapFooterDotColor: "bg-yellow-500",
    heatmapFooterTextColor: "text-yellow-400",
    avgRankingValue: 7,
    avgRankingColor: "#FBBF24",
    avgRankingGlow: "rgba(251,191,36,0.4)",
    summarySubheadline: (businessName, cityState) =>
      `The data shows ${businessName} has a real foundation in ${cityState} — with top-3 rankings in its core area. The opportunity is to expand that dominance across the full metro.`,
    finding1Title: "Strong Core — Limited Geographic Reach",
    finding1Color: "text-yellow-400",
    finding1Bg: "bg-yellow-500/10",
    finding1Border: "border-yellow-500/20",
    finding1Icon: "BarChart2",
    finding1Body: (businessName, heatmapCount, gridPoints, city) =>
      React.createElement(React.Fragment, null,
        React.createElement("strong", { className: "text-white font-semibold" }, businessName),
        " ranks in the top 3 in its immediate service area but falls outside the top 10 across most of the ",
        React.createElement("strong", { className: "text-yellow-400" }, `${city} metro`),
        " — leaving the majority of ",
        React.createElement("strong", { className: "text-foreground" }, `${gridPoints} grid points`),
        " and ",
        React.createElement("strong", { className: "text-yellow-400" }, `${heatmapCount} keyword categories`),
        " underserved."
      ),
    finding2Title: "Partially Visible — Missed Searches Daily",
    finding2Color: "text-orange-400",
    finding2Bg: "bg-orange-500/10",
    finding2Border: "border-orange-500/20",
    finding2Icon: "MapPin",
    finding2Body: (businessName, city) =>
      React.createElement(React.Fragment, null,
        `Customers searching beyond the immediate `,
        React.createElement("strong", { className: "text-white font-semibold" }, `${city} core`),
        ` cannot find `,
        React.createElement("strong", { className: "text-white font-semibold" }, businessName),
        ` in Google Maps — meaning dozens of high-intent searches go to competitors every day.`
      ),
    currentStateRankingValue: (keyword) => keyword.toLowerCase().includes("copier") ? "Strong (#1–3)" : "Mixed (#4–17)",
    currentStateRankingColor: "bg-yellow-500",
    keyInsightCopy: (businessName, city) =>
      `${businessName} already has a proven foundation — top-3 rankings in the core zone show Google trusts this business. The strategy gap is topical authority and geographic relevance: a comprehensive website with service + location pages will unlock the full ${city} metro.`,
    roadmapFromWord: "semi-visible",
    roadmapFromColor: "text-yellow-400",
    trajectoryStartRank: 7,
    trajectoryStartColor: "#eab308",
    phase2Timeline: "Weeks 3–4",
    phase3Timeline: "Ongoing",
    phase4Timeline: "Ongoing",
  },

  // ─────────────────────────────────────────────────────────────
  // VISIBLE — strong rankings, expanding to dominate metro
  // ─────────────────────────────────────────────────────────────
  visible: {
    alertBadgeText: "Strong Rankings — Expansion Opportunity",
    alertBadgeBorderColor: "border-green-500/40",
    alertBadgeBgColor: "bg-green-500/10",
    alertBadgeTextColor: "text-green-400",
    alertBadgeDotColor: "bg-green-500",
    headlineWord: "Visible",
    headlineGradient: "linear-gradient(135deg, #4ADE80, #22c55e, #4ADE80)",
    heroBodyCopy: (businessName, gridPoints, city, categoryCount) =>
      `Across ${gridPoints} geographic data points in the ${city} metro area, ${businessName} already ranks in the top 3 across most of the map for ${categoryCount} tracked categories. This report reveals the precise strategy to lock in and expand that dominance across the full metro.`,
    heatmapCardBorderColor: "rgba(74,222,128,0.25)",
    heatmapCardBgColor: "rgba(74,222,128,0.10)",
    heatmapCardLabelColor: "text-green-400",
    heatmapCardGlowColor: "#4ADE80",
    heatmapFooterDotColor: "bg-green-500",
    heatmapFooterTextColor: "text-green-400",
    avgRankingValue: 3,
    avgRankingColor: "#4ADE80",
    avgRankingGlow: "rgba(74,222,128,0.4)",
    summarySubheadline: (businessName, cityState) =>
      `The data shows ${businessName} is already a strong performer in ${cityState}. The opportunity is to lock in and expand that dominance across the full metro area.`,
    finding1Title: "Dominant Core — Metro Expansion Ready",
    finding1Color: "text-green-400",
    finding1Bg: "bg-green-500/10",
    finding1Border: "border-green-500/20",
    finding1Icon: "TrendingUp",
    finding1Body: (businessName, heatmapCount, gridPoints, city) =>
      React.createElement(React.Fragment, null,
        React.createElement("strong", { className: "text-white font-semibold" }, businessName),
        " ranks in the ",
        React.createElement("strong", { className: "text-green-400" }, "top 3"),
        " across the majority of the ",
        React.createElement("strong", { className: "text-foreground" }, `${city} metro`),
        " for ",
        React.createElement("strong", { className: "text-yellow-400" }, `${heatmapCount} tracked categories`),
        `. With ${gridPoints} grid points analyzed, the remaining gaps represent a clear expansion path.`
      ),
    finding2Title: "High Visibility — Gaps to Seal",
    finding2Color: "text-primary",
    finding2Bg: "bg-primary/10",
    finding2Border: "border-primary/20",
    finding2Icon: "Zap",
    finding2Body: (businessName, city) =>
      React.createElement(React.Fragment, null,
        React.createElement("strong", { className: "text-white font-semibold" }, businessName),
        ` ranks well across most of ${city} — but fringe areas and secondary keywords still have room to grow. Sealing those gaps means `,
        React.createElement("strong", { className: "text-primary" }, "total metro dominance"),
        "."
      ),
    currentStateRankingValue: () => "Top 3 (Strong)",
    currentStateRankingColor: "bg-green-500",
    keyInsightCopy: (businessName, city) =>
      `${businessName} is already ahead of most competitors in ${city}. The next step is locking in that lead with topical authority content and geographic location pages — making it nearly impossible for competitors to catch up.`,
    roadmapFromWord: "visible",
    roadmapFromColor: "text-green-400",
    trajectoryStartRank: 3,
    trajectoryStartColor: "#22c55e",
    phase2Timeline: "Weeks 3–4",
    phase3Timeline: "Ongoing",
    phase4Timeline: "Ongoing",
  },
};

/**
 * Get the visibility config for the current prospect.
 * Usage: import { getVisibilityConfig } from "@/lib/visibilityConfig";
 *        const vc = getVisibilityConfig(PROSPECT.visibilityStatus);
 */
export function getVisibilityConfig(status: VisibilityStatus): VisibilityConfig {
  return VISIBILITY_CONFIGS[status] ?? VISIBILITY_CONFIGS["invisible"];
}
