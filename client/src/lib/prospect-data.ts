/**
 * ============================================================
 * PROSPECT DATA CONFIGURATION
 * ============================================================
 * This is the ONLY file you need to edit for each new report.
 * All components pull data dynamically from this object —
 * no hardcoded business names, industries, or keywords anywhere.
 *
 * INSTRUCTIONS:
 * 1. Replace every PLACEHOLDER value below with the prospect's actual data
 * 2. Upload heatmap images with: manus-upload-file --webdev path/to/image.png
 * 3. Use the returned CDN URLs in the imageUrl fields below
 * 4. All section copy, competitor names, and keywords auto-update
 * ============================================================
 */

export const PROSPECT = {
  // ── Core Identity ──────────────────────────────────────────
  name: "PROSPECT_BUSINESS_NAME",       // e.g. "Sean Ross Painting"
  city: "PROSPECT_CITY",               // e.g. "Omaha"
  state: "PROSPECT_STATE",             // e.g. "NE"
  cityState: "PROSPECT_CITY, PROSPECT_STATE", // e.g. "Omaha, NE"
  reportDate: "REPORT_DATE",           // e.g. "Mar 16, 2026"
  industry: "PROSPECT_INDUSTRY",       // e.g. "painting" (lowercase, used in copy)
  industryLabel: "PROSPECT_INDUSTRY_LABEL", // e.g. "painting & home services market"

  // ── Visibility Status ─────────────────────────────────────
  // Controls ALL dynamic copy, colors, and framing across the report.
  // "invisible"    → ranks 20+ across most of the map (all red/orange dots)
  // "semi-visible" → mixed rankings, some top-3 zones but large gaps
  // "visible"      → strong rankings, expanding to dominate metro
  visibilityStatus: "invisible" as "invisible" | "semi-visible" | "visible",

  // ── Heatmap Data ───────────────────────────────────────────
  // Upload images via: manus-upload-file --webdev path/to/image.png
  // Then paste the returned CDN URL in imageUrl below.
  // Add one entry per GBP category tracked. First entry = primary keyword.
  heatmaps: [
    {
      id: "primary-keyword-id",           // e.g. "painter" — used as tab ID
      keyword: "Primary Category Keyword", // e.g. "Painter"
      date: "REPORT_DATE",
      imageUrl: "CDN_URL_FOR_PROSPECT_PRIMARY_HEATMAP",
      gridPoints: 182,                     // total grid points tracked
      rankingOutsideTop20: 177,            // how many points rank outside top 20
      rankingTop3: 1,                      // how many points rank top 3
      rankingTop10: 4,                     // how many points rank top 10
      status: "CRITICAL",                  // "CRITICAL" | "POOR" | "FAIR" | "GOOD"
      insight: "Describe the heatmap pattern in plain language — where they rank, where they don't, and what it means.",
    },
    {
      id: "secondary-keyword-id",           // e.g. "pressure-washing"
      keyword: "Secondary Category Keyword", // e.g. "Pressure Washing Service"
      date: "REPORT_DATE",
      imageUrl: "CDN_URL_FOR_PROSPECT_SECONDARY_HEATMAP",
      gridPoints: 182,
      rankingOutsideTop20: 180,
      rankingTop3: 0,
      rankingTop10: 1,
      status: "CRITICAL",
      insight: "Describe the secondary keyword heatmap pattern.",
    },
  ],

  // ── Competitors ────────────────────────────────────────────
  // Add 3 competitors for the primary keyword. Each gets a heatmap image.
  competitors: [
    {
      rank: 1,
      name: "Competitor 1 Name",
      imageUrl: "CDN_URL_FOR_COMPETITOR_1_HEATMAP",
      keyword: "Primary Category Keyword",
      scores: {
        gbpOptimization: 75,       // 0–100
        topicalRelevance: 70,
        websiteAuthority: 65,
        internalLinking: 55,
        reviewVelocity: 80,
        localCitations: 70,
      },
      strengths: [
        "Strength 1 of competitor 1",
        "Strength 2 of competitor 1",
        "Strength 3 of competitor 1",
      ],
      weaknesses: [
        "Weakness 1 of competitor 1",
        "Weakness 2 of competitor 1",
        "Weakness 3 of competitor 1",
      ],
      opportunity: "Beatable with a comprehensive content strategy and strong GBP optimization. Their east-side weakness is your entry point.",
      dominanceZone: "West Omaha",       // Area where this competitor ranks strongest
      // Heatmap color summary for the comparison bar
      greenPct: 45,   // % of grid points ranked #1-3
      yellowPct: 20,  // % ranked #4-10
      orangePct: 15,  // % ranked #11-19
      redPct: 20,     // % ranked 20+
    },
    {
      rank: 2,
      name: "Competitor 2 Name",
      imageUrl: "CDN_URL_FOR_COMPETITOR_2_HEATMAP",
      keyword: "Primary Category Keyword",
      scores: {
        gbpOptimization: 60,
        topicalRelevance: 50,
        websiteAuthority: 55,
        internalLinking: 15,
        reviewVelocity: 60,
        localCitations: 65,
      },
      strengths: [
        "Strength 1 of competitor 2",
        "Strength 2 of competitor 2",
        "Strength 3 of competitor 2",
      ],
      weaknesses: [
        "Weakness 1 of competitor 2",
        "Weakness 2 of competitor 2",
        "Weakness 3 of competitor 2",
      ],
      opportunity: "Outranks in central Omaha but has no content moat. A topical authority strategy will leapfrog them within 60–90 days.",
      dominanceZone: "Central Omaha",
      greenPct: 20,
      yellowPct: 45,
      orangePct: 20,
      redPct: 15,
    },
    {
      rank: 3,
      name: "Competitor 3 Name",
      imageUrl: "CDN_URL_FOR_COMPETITOR_3_HEATMAP",
      keyword: "Primary Category Keyword",
      scores: {
        gbpOptimization: 55,
        topicalRelevance: 40,
        websiteAuthority: 35,
        internalLinking: 5,
        reviewVelocity: 60,
        localCitations: 45,
      },
      strengths: [
        "Strength 1 of competitor 3",
        "Strength 2 of competitor 3",
        "Strength 3 of competitor 3",
      ],
      weaknesses: [
        "Weakness 1 of competitor 3",
        "Weakness 2 of competitor 3",
        "Weakness 3 of competitor 3",
      ],
      opportunity: "The easiest competitor to beat. Without a website, she cannot build topical authority. A single well-built site will outrank her across the metro.",
      dominanceZone: "SW Omaha / Chalco",
      greenPct: 10,
      yellowPct: 40,
      orangePct: 30,
      redPct: 20,
    },
  ],

  // ── GBP Quick Wins ─────────────────────────────────────────
  gbpQuickWins: [
    {
      action: "Add secondary GBP category 1 (e.g. 'House Painter')",
      impact: "HIGH",
      timeframe: "1 day",
      description: "Describe why adding this category matters and what rankings it unlocks.",
    },
    {
      action: "Add secondary GBP category 2 (e.g. 'Deck Staining')",
      impact: "HIGH",
      timeframe: "1 day",
      description: "Describe why adding this category matters and what rankings it unlocks.",
    },
    {
      action: "Build comprehensive service list (15–20 services)",
      impact: "HIGH",
      timeframe: "3–5 days",
      description: "GBP services act as keyword signals. Each service with a detailed description increases topical relevance.",
    },
    {
      action: "Upload 25–35 high-quality project photos",
      impact: "MEDIUM",
      timeframe: "2–3 days",
      description: "Photo engagement is a GBP ranking signal. Before/after project photos build trust and demonstrate service quality.",
    },
    {
      action: "Complete GBP Q&A with 10–15 questions",
      impact: "MEDIUM",
      timeframe: "2–3 days",
      description: "Pre-populate Q&A with common questions. These appear in search results and add keyword-rich content.",
    },
    {
      action: "Set up automated review request system",
      impact: "MEDIUM",
      timeframe: "1 week",
      description: "Review velocity is a top-3 local ranking factor. Automate post-job review requests via email/SMS.",
    },
  ],

  // ── Website Strategy ───────────────────────────────────────
  websiteStrategy: {
    targetPageCount: "40 to 60",          // e.g. "40 to 60"
    primaryKeywords: ["keyword 1", "keyword 2", "keyword 3"],
    servicePages: [
      "Service Page 1",
      "Service Page 2",
      "Service Page 3",
      "Service Page 4",
      "Service Page 5",
      "Service Page 6",
      "Service Page 7",
      "Service Page 8",
      "Service Page 9",
      "Service Page 10",
    ],
    locationPages: [
      "City",
      "Suburb 1",
      "Suburb 2",
      "Suburb 3",
      "Suburb 4",
      "Suburb 5",
      "Suburb 6",
      "Suburb 7",
      "Suburb 8",
      "Suburb 9",
    ],
    surroundingCities: ["Surrounding City 1", "Surrounding City 2", "Surrounding City 3"],
  },

  // ── Opportunity Scores ─────────────────────────────────────
  // All scores are 0–100 where higher = more room to grow (gap = opportunity)
  opportunityScores: {
    overall: 97,
    gbpCategoryGap: 95,
    websiteContentGap: 98,
    internalLinkingGap: 100,
    geographicCoverageGap: 97,
    topicalAuthorityGap: 96,
    competitorVulnerability: 82,
  },

  // ── Roadmap Phase Targets ──────────────────────────────────
  roadmapTargets: {
    phase1: "Top 10 in immediate service area",
    phase2: "Top 10 for 50+ long-tail keywords",
    phase3: "Top 3 across 50%+ of grid points",
    phase4: "#1–3 across 80%+ of grid points",
  },

  // ── Contact / Branding ─────────────────────────────────────
  agency: {
    name: "The Maps Guy",
    email: "tommy@themapsguy.io",
    bookingUrl: "https://themapsguy.io/calendar",
    logoUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/7VL7DoJkUZwbU7F9ttq3qi/TheMapsGuy_Logo_Transparent_Dark_cc75bb3f.png", // horizontal wordmark — login gate only
    logoIconUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/7VL7DoJkUZwbU7F9ttq3qi/themapsguy-logo-transparent_f438e0b4.png", // icon-only — nav, CTA, etc.
  },
};

// ── Derived helpers (do not edit) ──────────────────────────────
export const totalGridPoints = PROSPECT.heatmaps.reduce((sum, h) => sum + h.gridPoints, 0);
export const primaryKeyword = PROSPECT.heatmaps[0]?.keyword ?? "primary keyword";
export const primaryHeatmap = PROSPECT.heatmaps[0];
