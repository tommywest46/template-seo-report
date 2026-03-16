/**
 * AccessGateModal — The Maps Guy Brand
 * Design: Dark semi-transparent overlay + white centered card
 * Blocks all report content with a blur effect until form is submitted.
 * Fires a webhook POST on submit; dismisses even if POST fails.
 * No third-party libraries — pure React state + native fetch.
 */

import { useEffect, useState } from "react";
import { PROSPECT } from "@/lib/prospect-data";

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/SQZKf0VITDuwQomTAKMx/webhook-trigger/56335878-b065-4eda-8ad4-05f88f14b2b3";

const LOGO_URL = PROSPECT.agency.logoUrl;

export default function AccessGateModal() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);

  function formatPhone(value: string) {
    // Strip all non-digits
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

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

  function validate() {
    const errs: typeof errors = {};
    if (!fullName.trim()) errs.fullName = "Please enter your full name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Please enter a valid email address.";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10)
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

    const payload = {
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      event: "report_opened",
      timestamp: new Date().toISOString(),
      report_url: window.location.href,
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
    setFading(true);
    setTimeout(() => setVisible(false), 600);
  }

  if (!visible) return null;

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
        background: "rgba(5, 8, 18, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
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
          style={{
            height: "56px",
            width: "auto",
            objectFit: "contain",
            marginBottom: "1.5rem",
          }}
          onError={(e) => {
            // Fallback text logo if image fails
            (e.target as HTMLImageElement).style.display = "none";
          }}
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
            <label
              htmlFor="gate-name"
              style={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#374151",
                letterSpacing: "0.02em",
              }}
            >
              Full Name
            </label>
            <input
              id="gate-name"
              type="text"
              placeholder="Jane Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              style={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.9375rem",
                padding: "0.75rem 1rem",
                borderRadius: "0.625rem",
                border: errors.fullName ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
                outline: "none",
                color: "#111827",
                background: "#f9fafb",
                transition: "border-color 0.2s",
                width: "100%",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4ade80")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.fullName ? "#ef4444" : "#e5e7eb")
              }
            />
            {errors.fullName && (
              <span style={{ fontSize: "0.75rem", color: "#ef4444", fontFamily: "Nunito Sans, sans-serif" }}>
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label
              htmlFor="gate-email"
              style={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#374151",
                letterSpacing: "0.02em",
              }}
            >
              Email Address
            </label>
            <input
              id="gate-email"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              style={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.9375rem",
                padding: "0.75rem 1rem",
                borderRadius: "0.625rem",
                border: errors.email ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
                outline: "none",
                color: "#111827",
                background: "#f9fafb",
                transition: "border-color 0.2s",
                width: "100%",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4ade80")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.email ? "#ef4444" : "#e5e7eb")
              }
            />
            {errors.email && (
              <span style={{ fontSize: "0.75rem", color: "#ef4444", fontFamily: "Nunito Sans, sans-serif" }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Phone */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            <label
              htmlFor="gate-phone"
              style={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#374151",
                letterSpacing: "0.02em",
              }}
            >
              Phone Number
            </label>
            <input
              id="gate-phone"
              type="tel"
              placeholder="(555) 867-5309"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              autoComplete="tel"
              style={{
                fontFamily: "Nunito Sans, sans-serif",
                fontSize: "0.9375rem",
                padding: "0.75rem 1rem",
                borderRadius: "0.625rem",
                border: errors.phone ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
                outline: "none",
                color: "#111827",
                background: "#f9fafb",
                transition: "border-color 0.2s",
                width: "100%",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4ade80")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.phone ? "#ef4444" : "#e5e7eb")
              }
            />
            {errors.phone && (
              <span style={{ fontSize: "0.75rem", color: "#ef4444", fontFamily: "Nunito Sans, sans-serif" }}>
                {errors.phone}
              </span>
            )}
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
              background: loading
                ? "#86efac"
                : "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
              color: "#0a0f1e",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.2s, transform 0.15s",
              letterSpacing: "0.01em",
              width: "100%",
              boxShadow: "0 4px 16px rgba(74, 222, 128, 0.35)",
            }}
            onMouseEnter={(e) => {
              if (!loading) (e.target as HTMLButtonElement).style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.opacity = "1";
            }}
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
