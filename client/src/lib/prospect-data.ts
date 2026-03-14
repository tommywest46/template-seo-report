/**
 * ============================================================
 * PROSPECT DATA CONFIGURATION
 * ============================================================
 * This is the ONLY file you need to edit when creating a new
 * SEO intelligence report for a new prospect.
 *
 * Steps to create a new report:
 * 1. Duplicate the entire project
 * 2. Upload heatmap screenshots via: manus-upload-file --webdev
 * 3. Fill in all fields below
 * 4. Save and publish
 * ============================================================
 */

export const PROSPECT = {
  // ── Core Identity ──────────────────────────────────────────
  name: "Major Team Mortgage",          // Business name (used throughout report)
  city: "Omaha",                        // City name
  state: "NE",                          // State abbreviation
  cityState: "Omaha, NE",              // Combined city + state
  reportDate: "Mar 10, 2026",          // Date heatmaps were pulled
  industry: "mortgage",                 // Industry slug (used for generic copy)
  industryLabel: "mortgage market",    // Human-readable industry label

  // ── Heatmap Data ───────────────────────────────────────────
  // Upload images via: manus-upload-file --webdev path/to/image.png
  // Then paste the returned CDN URL below
  heatmaps: [
    {
      id: "broker",
      keyword: "Mortgage Broker",
      date: "Mar 10, 2026",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/MTM-Mortgage-Broker_c859ffa7.png",
      // Summary stats derived from reading the heatmap
      gridPoints: 156,
      rankingOutsideTop20: 155,  // number of red (20) dots
      rankingTop3: 0,
      rankingTop10: 1,
      status: "CRITICAL",        // CRITICAL | WEAK | MODERATE | STRONG
      insight: "Ranks outside the top 20 across 99% of the Omaha metro area for this primary keyword.",
    },
    {
      id: "lender",
      keyword: "Mortgage Lender",
      date: "Mar 10, 2026",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/MTM-Mortgage-Lender_f42d1396.png",
      gridPoints: 156,
      rankingOutsideTop20: 156,
      rankingTop3: 0,
      rankingTop10: 0,
      status: "CRITICAL",
      insight: "Zero visibility across all 156 tracked grid points. Not listed as a Mortgage Lender in GBP categories.",
    },
    {
      id: "loan-agency",
      keyword: "Loan Agency",
      date: "Mar 10, 2026",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/MTM-Loan-Agency_f9a84dad.png",
      gridPoints: 156,
      rankingOutsideTop20: 156,
      rankingTop3: 0,
      rankingTop10: 0,
      status: "CRITICAL",
      insight: "Zero visibility. 'Loan Agency' is not listed as a GBP category — a quick fix with major impact.",
    },
  ],

  // ── Competitors ────────────────────────────────────────────
  competitors: [
    {
      rank: 1,
      name: "Shotbolt Mortgage Corporation",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/Shotbolt-Mortgage_e0d5dc43.png",
      keyword: "Mortgage Broker",
      // SEO factor scores (0-100)
      scores: {
        gbpOptimization: 62,
        topicalRelevance: 55,
        websiteAuthority: 48,
        internalLinking: 10,
        reviewVelocity: 70,
        localCitations: 65,
      },
      strengths: [
        "Strong proximity advantage in west Omaha",
        "Good review volume and velocity",
        "Established local citations",
      ],
      weaknesses: [
        "OK topical relevance — limited service/category depth",
        "No internal linking structure on website",
        "Weak in east Omaha and surrounding suburbs",
      ],
      opportunity: "Beatable with a comprehensive content strategy and strong GBP optimization. Their east-side weakness is your entry point.",
      // Heatmap color summary for the comparison bar
      greenPct: 45,   // % of grid points ranked #1-3
      yellowPct: 20,  // % ranked #4-10
      orangePct: 15,  // % ranked #11-19
      redPct: 20,     // % ranked 20+
    },
    {
      rank: 2,
      name: "Mortgage Specialists, LLC",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/Mortage-Specialists_ff745e69.png",
      keyword: "Mortgage Broker",
      scores: {
        gbpOptimization: 55,
        topicalRelevance: 50,
        websiteAuthority: 42,
        internalLinking: 10,
        reviewVelocity: 58,
        localCitations: 55,
      },
      strengths: [
        "Central Omaha presence with decent rankings",
        "Moderate review count",
        "Some geographic spread",
      ],
      weaknesses: [
        "Average topical relevance — no content depth",
        "No internal linking strategy",
        "Thin website with few service pages",
      ],
      opportunity: "Outranks in central Omaha but has no content moat. A topical authority strategy will leapfrog them within 60–90 days.",
      greenPct: 20,
      yellowPct: 35,
      orangePct: 25,
      redPct: 20,
    },
    {
      rank: 3,
      name: "Niki Cox — Guild Mortgage Company",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/Niki-Cox-Guild_79c8323e.png",
      keyword: "Mortgage Broker",
      scores: {
        gbpOptimization: 60,
        topicalRelevance: 30,
        websiteAuthority: 5,
        internalLinking: 0,
        reviewVelocity: 65,
        localCitations: 40,
      },
      strengths: [
        "Good personal brand and review presence",
        "Guild Mortgage brand recognition",
        "Decent proximity rankings in her service area",
      ],
      weaknesses: [
        "No personal website — GBP only",
        "Zero topical authority (no content)",
        "No internal linking possible without a site",
        "Highly vulnerable to any competitor with a content strategy",
      ],
      opportunity: "The easiest competitor to beat. Without a website, she cannot build topical authority. A single well-built site will outrank her across the metro.",
      greenPct: 10,
      yellowPct: 40,
      orangePct: 30,
      redPct: 20,
    },
  ],

  // ── GBP Quick Wins ─────────────────────────────────────────
  gbpQuickWins: [
    {
      action: "Add 'Mortgage Lender' as secondary GBP category",
      impact: "HIGH",
      timeframe: "1 day",
      description: "Currently missing this category entirely. Adding it unlocks ranking eligibility for 'mortgage lender' searches across the metro.",
    },
    {
      action: "Add 'Loan Agency' as secondary GBP category",
      impact: "HIGH",
      timeframe: "1 day",
      description: "Zero visibility for 'loan agency' searches. This single change can generate immediate ranking improvements.",
    },
    {
      action: "Build comprehensive service list (15–20 services)",
      impact: "HIGH",
      timeframe: "3–5 days",
      description: "GBP services act as keyword signals. Each service with a detailed description increases topical relevance.",
    },
    {
      action: "Upload 20–30 high-quality photos",
      impact: "MEDIUM",
      timeframe: "1–2 days",
      description: "Photo engagement is a GBP ranking signal. Team photos, office, and loan closing photos build trust and relevance.",
    },
    {
      action: "Complete GBP Q&A with 10–15 questions",
      impact: "MEDIUM",
      timeframe: "2–3 days",
      description: "Pre-populate Q&A with common mortgage questions. These appear in search results and add keyword-rich content.",
    },
    {
      action: "Set up automated review request system",
      impact: "MEDIUM",
      timeframe: "1 week",
      description: "Review velocity is a top-3 local ranking factor. Automate post-close review requests via email/SMS.",
    },
  ],

  // ── Website Strategy ───────────────────────────────────────
  websiteStrategy: {
    targetPageCount: "40–70",
    primaryKeywords: ["mortgage broker", "mortgage lender", "loan agency"],
    servicePages: [
      "Conventional Loans",
      "FHA Loans",
      "VA Loans",
      "Jumbo Loans",
      "USDA Loans",
      "First-Time Homebuyer Loans",
      "Refinancing",
      "Home Equity Loans",
      "Construction Loans",
      "Investment Property Loans",
    ],
    locationPages: [
      "Omaha",
      "Papillion",
      "Bellevue",
      "La Vista",
      "Ralston",
      "Gretna",
      "Millard",
      "Elkhorn",
      "Council Bluffs",
      "Fremont",
    ],
    surroundingCities: ["Council Bluffs, IA", "Fremont, NE", "Blair, NE"],
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
    bookingUrl: "https://link.leadhatch.io/widget/booking/SYOyNfeGUKUmzSsIDbLF",
    logoUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663369686965/C44GwV7RUpEjQymMGKrdVL/themapsguy-logo_bbd25d09.png",
  },
};

// ── Derived helpers (do not edit) ──────────────────────────────
export const totalGridPoints = PROSPECT.heatmaps.reduce((sum, h) => sum + h.gridPoints, 0);
export const primaryKeyword = PROSPECT.heatmaps[0]?.keyword ?? "primary keyword";
export const primaryHeatmap = PROSPECT.heatmaps[0];
