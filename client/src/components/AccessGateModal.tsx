/**
 * AccessGateModal — The Maps Guy Brand
 * Design: Dark semi-transparent overlay + white centered card
 * Blocks all report content with a blur effect until form is submitted.
 * Fires a webhook POST on submit; dismisses even if POST fails.
 * No third-party libraries — pure React state + native fetch.
 *
 * Phone field: country code picker (defaults to US +1) + local number input.
 * Webhook payload sends phone in E.164 format: +{dialCode}{localDigits}
 *
 * sessionStorage key: "tmg_gate_passed"
 * Set to "1" after successful form submission. While this key exists in
 * the current browser session the modal is skipped entirely, so refreshing
 * the page does not re-show the gate. Cleared automatically when the tab
 * (or browser) is closed (sessionStorage lifetime).
 */

import { useEffect, useRef, useState } from "react";
import { PROSPECT } from "@/lib/prospect-data";

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/SQZKf0VITDuwQomTAKMx/webhook-trigger/56335878-b065-4eda-8ad4-05f88f14b2b3";

const LOGO_URL = PROSPECT.agency.logoUrl;
const SESSION_KEY = "tmg_gate_passed";
const BYPASS_PARAM = "preview";
const BYPASS_VALUE = "1";

// Country list — most common at top, full list below
const COUNTRIES = [
  { code: "US", name: "United States", dial: "1", flag: "🇺🇸" },
  { code: "CA", name: "Canada", dial: "1", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", dial: "44", flag: "🇬🇧" },
  { code: "AU", name: "Australia", dial: "61", flag: "🇦🇺" },
  { code: "NZ", name: "New Zealand", dial: "64", flag: "🇳🇿" },
  { code: "IE", name: "Ireland", dial: "353", flag: "🇮🇪" },
  { code: "MX", name: "Mexico", dial: "52", flag: "🇲🇽" },
  { code: "DE", name: "Germany", dial: "49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial: "33", flag: "🇫🇷" },
  { code: "ES", name: "Spain", dial: "34", flag: "🇪🇸" },
  { code: "IT", name: "Italy", dial: "39", flag: "🇮🇹" },
  { code: "BR", name: "Brazil", dial: "55", flag: "🇧🇷" },
  { code: "IN", name: "India", dial: "91", flag: "🇮🇳" },
  { code: "JP", name: "Japan", dial: "81", flag: "🇯🇵" },
  { code: "SG", name: "Singapore", dial: "65", flag: "🇸🇬" },
  { code: "ZA", name: "South Africa", dial: "27", flag: "🇿🇦" },
];

/** Strip all non-digits from a string */
function digitsOnly(val: string) {
  return val.replace(/\D/g, "");
}

/** Format a US/CA local number as (XXX) XXX-XXXX while typing */
function formatLocal(digits: string) {
  const d = digits.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** Build E.164 string: +{dialCode}{localDigitsOnly} */
function toE164(dialCode: string, localValue: string) {
  const local = digitsOnly(localValue);
  return `+${dialCode}${local}`;
}

export default function AccessGateModal() {
  const [visible, setVisible] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const isBypass = params.get(BYPASS_PARAM) === BYPASS_VALUE;
    const isReturning = sessionStorage.getItem(SESSION_KEY) === "1";
    return !isBypass && !isReturning;
  });
  const [fading, setFading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]); // default: US
  const [countryOpen, setCountryOpen] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close country dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    }
    if (countryOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [countryOpen]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = digitsOnly(e.target.value);
    // Only apply pretty-formatting for US/CA (10-digit local numbers)
    if (country.dial === "1") {
      setPhone(formatLocal(raw));
    } else {
      setPhone(raw.slice(0, 15));
    }
  }

  function validate() {
    const errs: typeof errors = {};
    if (!fullName.trim()) errs.fullName = "Please enter your full name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Please enter a valid email address.";
    const localDigits = digitsOnly(phone);
    if (!phone.trim() || localDigits.length < 7)
      errs.phone = "Please enter a valid phone number.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    const bypassUrl =
      window.location.origin +
      window.location.pathname +
      "?" +
      BYPASS_PARAM +
      "=" +
      BYPASS_VALUE;

    // E.164 format for GHL: +{dialCode}{localDigitsOnly}
    const phoneE164 = toE164(country.dial, phone);

    const payload = {
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phoneE164,
      event: "report_opened",
      timestamp: new Date().toISOString(),
      report_url: window.location.origin + window.location.pathname,
      bypass_url: bypassUrl,
      prospect_name: PROSPECT.name,
      prospect_city: PROSPECT.cityState,
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Fail silently — never block the prospect from seeing the report
    } finally {
      setLoading(false);
      dismiss();
    }
  }

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setFading(true);
    setTimeout(() => setVisible(false), 600);
  }

  if (!visible) return null;

  const inputBase: React.CSSProperties = {
    fontFamily: "Nunito Sans, sans-serif",
    fontSize: "0.9375rem",
    borderRadius: "0.625rem",
    outline: "none",
    color: "#111827",
    background: "#f9fafb",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background: "rgba(5, 8, 18, 0.55)",
        backdropFilter: "blur(18px) brightness(0.6)",
        WebkitBackdropFilter: "blur(18px) brightness(0.6)",
        transition: "opacity 0.6s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      {/* Card */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "1.25rem",
          padding: "2.5rem 2rem",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0",
          transform: fading ? "scale(0.96)" : "scale(1)",
          transition: "transform 0.6s ease",
        }}
      >
        {/* Logo */}
        <img
          src={LOGO_URL}
          alt="The Maps Guy"
          style={{ height: "56px", width: "auto", objectFit: "contain", marginBottom: "1.5rem" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />

        {/* Heading */}
        <h1
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 800,
            fontSize: "1.625rem",
            color: "#0a0f1e",
            textAlign: "center",
            marginBottom: "0.375rem",
            lineHeight: 1.2,
          }}
        >
          Access Your Report
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontFamily: "Nunito Sans, sans-serif",
            fontSize: "0.875rem",
            color: "#6b7280",
            textAlign: "center",
            marginBottom: "1.75rem",
            lineHeight: 1.5,
          }}
        >
          Enter your details below to view your confidential local SEO visibility report.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Full Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label htmlFor="gate-name" style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#374151", letterSpacing: "0.02em" }}>
              Full Name
            </label>
            <input
              id="gate-name"
              type="text"
              placeholder="Jane Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              style={{ ...inputBase, padding: "0.75rem 1rem", border: errors.fullName ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb", width: "100%" }}
              onFocus={(e) => (e.target.style.borderColor = "#4ade80")}
              onBlur={(e) => (e.target.style.borderColor = errors.fullName ? "#ef4444" : "#e5e7eb")}
            />
            {errors.fullName && <span style={{ fontSize: "0.75rem", color: "#ef4444", fontFamily: "Nunito Sans, sans-serif" }}>{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label htmlFor="gate-email" style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#374151", letterSpacing: "0.02em" }}>
              Email Address
            </label>
            <input
              id="gate-email"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              style={{ ...inputBase, padding: "0.75rem 1rem", border: errors.email ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb", width: "100%" }}
              onFocus={(e) => (e.target.style.borderColor = "#4ade80")}
              onBlur={(e) => (e.target.style.borderColor = errors.email ? "#ef4444" : "#e5e7eb")}
            />
            {errors.email && <span style={{ fontSize: "0.75rem", color: "#ef4444", fontFamily: "Nunito Sans, sans-serif" }}>{errors.email}</span>}
          </div>

          {/* Phone — country picker + local number */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label htmlFor="gate-phone" style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#374151", letterSpacing: "0.02em" }}>
              Phone Number
            </label>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "stretch" }}>
              {/* Country picker */}
              <div ref={dropdownRef} style={{ position: "relative", flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => setCountryOpen(o => !o)}
                  style={{
                    ...inputBase,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.75rem 0.625rem",
                    border: errors.phone ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    height: "100%",
                    minWidth: "80px",
                    background: "#f9fafb",
                    borderRadius: "0.625rem",
                  }}
                >
                  <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>{country.flag}</span>
                  <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.875rem", color: "#374151", fontWeight: 600 }}>+{country.dial}</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ opacity: 0.5, marginLeft: "2px" }}>
                    <path d="M1 1l4 4 4-4" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Dropdown */}
                {countryOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 4px)",
                      left: 0,
                      zIndex: 100,
                      background: "#fff",
                      border: "1.5px solid #e5e7eb",
                      borderRadius: "0.625rem",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      maxHeight: "220px",
                      overflowY: "auto",
                      minWidth: "220px",
                    }}
                  >
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setCountry(c);
                          setPhone(""); // reset local number when country changes
                          setCountryOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          width: "100%",
                          padding: "0.6rem 0.875rem",
                          background: c.code === country.code ? "#f0fdf4" : "transparent",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => { if (c.code !== country.code) (e.currentTarget as HTMLButtonElement).style.background = "#f9fafb"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = c.code === country.code ? "#f0fdf4" : "transparent"; }}
                      >
                        <span style={{ fontSize: "1rem" }}>{c.flag}</span>
                        <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.8125rem", color: "#374151", flex: 1 }}>{c.name}</span>
                        <span style={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.8125rem", color: "#6b7280", fontWeight: 600 }}>+{c.dial}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Local number input */}
              <input
                id="gate-phone"
                type="tel"
                placeholder={country.dial === "1" ? "(555) 867-5309" : "Phone number"}
                value={phone}
                onChange={handlePhoneChange}
                autoComplete="tel-national"
                style={{
                  ...inputBase,
                  padding: "0.75rem 1rem",
                  border: errors.phone ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
                  flex: 1,
                  minWidth: 0,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4ade80")}
                onBlur={(e) => (e.target.style.borderColor = errors.phone ? "#ef4444" : "#e5e7eb")}
              />
            </div>
            {errors.phone && <span style={{ fontSize: "0.75rem", color: "#ef4444", fontFamily: "Nunito Sans, sans-serif" }}>{errors.phone}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "0.875rem 1rem",
              borderRadius: "0.625rem",
              border: "none",
              background: loading ? "#86efac" : "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
              color: "#0a0f1e",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.2s, transform 0.15s",
              letterSpacing: "0.01em",
              width: "100%",
              boxShadow: "0 4px 16px rgba(74, 222, 128, 0.35)",
            }}
            onMouseEnter={(e) => { if (!loading) (e.target as HTMLButtonElement).style.opacity = "0.9"; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.opacity = "1"; }}
          >
            {loading ? "Opening Report…" : "View My Report →"}
          </button>
        </form>

        {/* Footer note */}
        <p
          style={{
            marginTop: "1.25rem",
            fontFamily: "Nunito Sans, sans-serif",
            fontSize: "0.72rem",
            color: "#9ca3af",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          This report was prepared exclusively for you by{" "}
          <span style={{ color: "#4ade80", fontWeight: 600 }}>The Maps Guy</span>.
          Your information is kept confidential.
        </p>
      </div>
    </div>
  );
}
