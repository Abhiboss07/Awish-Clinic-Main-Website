"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface HeroAction {
  href: string;
  label: string;
  variant?: "primary" | "ghost";
  external?: boolean;
  newTab?: boolean;
}

interface HeroStat {
  value: string;
  label: string;
}

interface HeroHighlight {
  eyebrow?: string;
  title: string;
  description?: string;
}

interface ImagePageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  showOverlay?: boolean;
  eyebrowHref?: string;
  actions?: HeroAction[];
  badges?: string[];
  stats?: HeroStat[];
  highlights?: HeroHighlight[];
}

export default function ImagePageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  showOverlay = true,
  eyebrowHref,
  actions = [],
  badges = [],
  stats = [],
  highlights = [],
}: ImagePageHeroProps) {
  // Form State for the floating glass appointment card
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitFeedback(null);

    // Prepare WhatsApp fallback message
    const waText = `Hi Awish Clinic,\nI would like to book a consultation for ${title}.\nName: ${name}\nPhone: ${phone}`;

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: `service-hero: ${title}`,
          name: name,
          phone: phone,
          service: title,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "The appointment could not be saved.");
      }

      setSubmitFeedback("Request saved! Connecting you to WhatsApp to confirm...");
      
      // Open WhatsApp to finalize
      const url = `https://wa.me/918287640479?text=${encodeURIComponent(waText)}`;
      window.open(url, "_blank", "noopener,noreferrer");

      setName("");
      setPhone("");
    } catch (error) {
      setSubmitFeedback(
        error instanceof Error
          ? error.message
          : "The appointment could not be saved right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamically map vector icons for highlights (Consultation, Time/Admission, Recovery)
  const getHighlightIcon = (eyebrowText?: string) => {
    const text = (eyebrowText || "").toLowerCase();
    const sizeClass = "h-5 w-5 text-emerald-600";

    if (text.includes("consult")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={sizeClass}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    }
    if (text.includes("time") || text.includes("admit")) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={sizeClass}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={sizeClass}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    );
  };

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#faf7f2_0%,#f5eee5_100%)] text-[var(--foreground)]">
      {/* Soft Premium Medical Background & Radial Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(138,79,57,0.06),transparent_40%),radial-gradient(circle_at_left_center,rgba(33,77,72,0.05),transparent_35%)]" />
        <div className="soft-grid absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10 container-shell py-14 md:py-20 lg:py-24">
        {/* Main 2-Column Responsive Grid with Perfect Symmetry */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* LEFT SIDE: Large editorial/service image with parallax and float styles */}
          <div className="fade-up-reveal relative group w-full flex items-center justify-center">
            <div className="relative w-[90%] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] overflow-hidden rounded-[2.5rem] border border-[rgba(30,36,34,0.08)] shadow-[0_24px_60px_rgba(30,36,34,0.08)] group transition-all duration-700 hover:shadow-[0_32px_80px_rgba(30,36,34,0.12)]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,36,34,0.15)_0%,transparent_40%)]" />
            </div>

            {/* Overlapping Dr. Vijay and Dr. Pooja Trust Badge with Gold-Emerald Thin Borders */}
            <div className="absolute bottom-2 left-1 md:-bottom-2 md:left-2 z-20 border border-[rgba(33,77,72,0.16)] bg-white/70 backdrop-blur-md rounded-2xl md:rounded-3xl px-5 py-4 shadow-xl transition-all duration-500 hover:scale-[1.02] max-w-[260px] md:max-w-[320px]">
              <div className="flex items-center gap-3.5">
                <div className="flex -space-x-3 shrink-0">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm transition hover:scale-105 duration-300">
                    <Image src="/images/doctor/Dr.%20Vijay%20Kumar.png" fill alt="Dr. Vijay Kumar" className="object-cover" />
                  </div>
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm transition hover:scale-105 duration-300">
                    <Image src="/images/doctor/DR.%20POOJA%20VARSHNEY.png" fill alt="Dr. Pooja Varshney" className="object-cover" />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] md:text-xs font-bold text-[var(--brand)] uppercase tracking-wider">Doctor-Led Care</p>
                  <p className="text-[9px] md:text-[10px] text-[var(--muted)] leading-tight mt-0.5 font-medium">Consult with Board-Certified MD Dermatologists</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Elegant content stack with floating glass booking form */}
          <div className="fade-up-reveal flex flex-col justify-center space-y-6 lg:pl-6">
            
            {/* Small location badge + eyebrow path */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(33,77,72,0.06)] border border-[rgba(33,77,72,0.1)] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Delhi Clinic
              </span>

              {eyebrowHref ? (
                <Link
                  href={eyebrowHref}
                  className="eyebrow hover:border-[var(--brand)] hover:text-[var(--brand)] transition-luxury"
                >
                  {eyebrow}
                </Link>
              ) : (
                <span className="eyebrow">{eyebrow}</span>
              )}
            </div>

            {/* Typography Stack */}
            <div className="space-y-3">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl text-[var(--foreground)] font-serif tracking-tight">
                {title}
              </h1>
              <p className="text-xs uppercase tracking-[0.24em] font-semibold text-[var(--accent)] font-sans">
                Skin, Hair & Aesthetic Care
              </p>
            </div>

            <p className="text-base leading-8 text-[var(--muted)] font-sans">
              {description}
            </p>

            {/* Dynamic Tags/Badges - White Glass Capsules */}
            {!!badges.length && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-white/70 border border-[rgba(30,36,34,0.06)] shadow-sm px-3.5 py-1.5 text-xs font-semibold text-[var(--muted)] hover:border-[var(--brand)] transition duration-300"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Buttons Stack */}
            {!!actions.length && (
              <div className="flex flex-col gap-3 sm:flex-row pt-1">
                {actions.map((action) => {
                  const isPrimary = action.variant !== "ghost";
                  const ctaClass = isPrimary 
                    ? "btn-primary px-8 py-3.5 text-sm shadow-[0_12px_36px_rgba(33,77,72,0.18)] text-center" 
                    : "btn-secondary px-8 py-3.5 text-sm text-center";

                  return action.external ? (
                    <a
                      key={action.href + action.label}
                      href={action.href}
                      target={action.newTab ? "_blank" : undefined}
                      rel={action.newTab ? "noopener noreferrer" : undefined}
                      className={ctaClass}
                    >
                      {action.label}
                    </a>
                  ) : (
                    <Link
                      key={action.href + action.label}
                      href={action.href}
                      className={ctaClass}
                    >
                      {action.label}
                    </Link>
                  );
                })}
              </div>
            )}

            {/* REDESIGNED PREMIUM FLOATING GLASS APPOINTMENT CARD */}
            <div className="border border-white/50 bg-white/20 backdrop-blur-md shadow-[0_24px_80px_rgba(18,24,28,0.08)] rounded-[2rem] p-6 relative overflow-hidden transition duration-500 hover:shadow-2xl">
              {/* Subtle background light blur */}
              <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-[var(--brand-soft)] filter blur-2xl opacity-40 pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <h3 className="text-xs font-bold text-[var(--brand)] uppercase tracking-widest flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  Quick Consultation Booking
                </h3>
                
                <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] items-end">
                  <div className="w-full">
                    <label htmlFor="hero-name" className="sr-only">Full Name</label>
                    <input
                      id="hero-name"
                      type="text"
                      required
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs font-semibold rounded-xl border border-[rgba(30,36,34,0.08)] bg-white/80 px-4 py-3.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[rgba(33,77,72,0.12)] focus:border-[var(--brand)] focus:outline-none"
                    />
                  </div>
                  
                  <div className="w-full">
                    <label htmlFor="hero-phone" className="sr-only">Phone Number</label>
                    <input
                      id="hero-phone"
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs font-semibold rounded-xl border border-[rgba(30,36,34,0.08)] bg-white/80 px-4 py-3.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[rgba(33,77,72,0.12)] focus:border-[var(--brand)] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary shrink-0 w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl disabled:opacity-60 transition duration-300 hover:bg-[#15322e]"
                  >
                    {isSubmitting ? "Booking..." : "Book Appointment"}
                  </button>
                </form>

                {submitFeedback && (
                  <p className="text-xs font-semibold text-[var(--brand)] bg-[rgba(33,77,72,0.06)] px-3 py-2 rounded-lg border border-[rgba(33,77,72,0.08)]">
                    {submitFeedback}
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic Stats Row at Bottom - Symmetrical Glass slabs */}
        {!!stats.length && (
          <div className="fade-up-reveal mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[rgba(30,36,34,0.06)] bg-white/60 backdrop-blur-md p-6 flex flex-col justify-between shadow-sm transition duration-300 hover:shadow-md hover:scale-[1.01]">
                <p className="text-3xl font-semibold text-[var(--brand)] font-serif">{stat.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* REDESIGNED SYMMETRICAL HIGHLIGHTS SLABS (Fact panels with custom SVGs) */}
        {!!highlights.length && (
          <div className={`fade-up-reveal mt-16 grid gap-6 ${highlights.length === 1 ? "max-w-xl mx-auto" : "lg:grid-cols-3"}`}>
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-[rgba(30,36,34,0.06)] bg-white/60 backdrop-blur-md p-6 flex flex-col justify-between shadow-sm transition duration-300 hover:shadow-md hover:scale-[1.01] hover-lift-premium"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {highlight.eyebrow ? (
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                        {highlight.eyebrow}
                      </p>
                    ) : null}
                    
                    {/* Custom Styled SVG Rings */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 shadow-inner">
                      {getHighlightIcon(highlight.eyebrow)}
                    </div>
                  </div>
                  
                  <p className="text-lg font-semibold text-[var(--foreground)] font-serif leading-snug">
                    {highlight.title}
                  </p>
                  
                  {highlight.description ? (
                    <p className="text-xs leading-6 text-[var(--muted)] border-t border-[rgba(30,36,34,0.06)] pt-3 mt-3">
                      {highlight.description}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
