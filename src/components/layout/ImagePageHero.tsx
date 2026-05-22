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

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#faf7f2_0%,#f5eee5_100%)] text-[var(--foreground)]">
      {/* Soft Premium Medical Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(138,79,57,0.06),transparent_40%),radial-gradient(circle_at_left_center,rgba(33,77,72,0.05),transparent_35%)]" />
        <div className="soft-grid absolute inset-0 opacity-20" />
      </div>

      <div className="relative z-10 container-shell py-12 md:py-16 lg:py-20">
        {/* Main 2-Column Responsive Grid with Overlap Styling */}
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          
          {/* LEFT SIDE: Large editorial/service image with parallax and float styles */}
          <div className="fade-up-reveal stagger-1 relative group w-full">
            <div className="luxury-image-zoom relative aspect-[4/3] w-full overflow-hidden rounded-[28px] md:rounded-[32px] border border-[rgba(30,36,34,0.08)] shadow-[0_24px_50px_rgba(30,36,34,0.06)] transition-all duration-700">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center group-hover:scale-[1.03]"
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,36,34,0.15)_0%,transparent_40%)]" />
            </div>

            {/* Overlapping Dr. Vijay and Dr. Pooja Trust Badge */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 z-20 glass-card-premium rounded-2xl md:rounded-3xl border border-[var(--line)] px-4 py-3 md:px-5 md:py-4 shadow-xl transition-all duration-500 hover:scale-[1.02] max-w-[260px] md:max-w-[320px]">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3 shrink-0">
                  <div className="relative h-8 w-8 md:h-10 md:w-10 overflow-hidden rounded-full border-2 border-white">
                    <Image src="/images/doctor/Dr.%20Vijay%20Kumar.png" fill alt="Dr. Vijay Kumar" className="object-cover" />
                  </div>
                  <div className="relative h-8 w-8 md:h-10 md:w-10 overflow-hidden rounded-full border-2 border-white">
                    <Image src="/images/doctor/DR.%20POOJA%20VARSHNEY.png" fill alt="Dr. Pooja Varshney" className="object-cover" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-[var(--brand)] uppercase tracking-wide">Doctor-Led Care</p>
                  <p className="text-[9px] md:text-[10px] text-[var(--muted)] leading-tight mt-0.5">Consult with Board-Certified MD Dermatologists</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Elegant content stack with floating glass booking form */}
          <div className="fade-up-reveal stagger-2 flex flex-col justify-center space-y-6 lg:pl-4">
            
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
              <h1 className="text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl text-[var(--foreground)] font-serif tracking-tight">
                {title}
              </h1>
              <p className="text-xs uppercase tracking-[0.24em] font-semibold text-[var(--accent)] font-sans">
                Skin, Hair & Aesthetic Care
              </p>
            </div>

            <p className="text-base leading-8 text-[var(--muted)] font-sans">
              {description}
            </p>

            {/* Dynamic Tags/Badges */}
            {!!badges.length && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-white/70 border border-[rgba(30,36,34,0.06)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)]"
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
                    ? "btn-primary px-8 py-3.5 text-sm shadow-[0_12px_36px_rgba(33,77,72,0.18)]" 
                    : "btn-secondary px-8 py-3.5 text-sm";

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

            {/* PREMIUM FLOATING GLASS APPOINTMENT CARD */}
            <div className="glass-card-premium rounded-2.5xl p-5 border border-white/60 shadow-2xl relative overflow-hidden transition-all duration-500 hover:shadow-3xl">
              {/* Subtle background light blur */}
              <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-[var(--brand-soft)] filter blur-2xl opacity-40 pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-sm font-bold text-[var(--brand)] uppercase tracking-widest flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  Quick Consultation Booking
                </h3>
                
                <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto] items-end">
                  <div className="w-full">
                    <label htmlFor="hero-name" className="sr-only">Full Name</label>
                    <input
                      id="hero-name"
                      type="text"
                      required
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs font-semibold rounded-[1rem] border border-[rgba(30,36,34,0.1)] bg-white/90 px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[rgba(33,77,72,0.08)]"
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
                      className="w-full text-xs font-semibold rounded-[1rem] border border-[rgba(30,36,34,0.1)] bg-white/90 px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[rgba(33,77,72,0.08)]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary shrink-0 w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-[1rem] disabled:opacity-60 transition-luxury hover:bg-[#1a3f3a]"
                  >
                    {isSubmitting ? "Booking..." : "Book Appointment"}
                  </button>
                </form>

                {submitFeedback && (
                  <p className="mt-3 text-xs font-semibold text-[var(--brand)] bg-[rgba(33,77,72,0.06)] px-3 py-2 rounded-lg border border-[rgba(33,77,72,0.08)]">
                    {submitFeedback}
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic Stats Row at Bottom */}
        {!!stats.length && (
          <div className="fade-up-reveal stagger-3 mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card-premium rounded-2xl p-5 border border-white/40 shadow-sm transition-luxury hover:scale-[1.02]">
                <p className="text-3xl font-semibold text-[var(--brand)] font-serif">{stat.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Highlights Row at Bottom */}
        {!!highlights.length && (
          <div className={`fade-up-reveal stagger-4 mt-12 grid gap-4 ${highlights.length === 1 ? "max-w-xl mx-auto" : "lg:grid-cols-3"}`}>
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="glass-card-premium rounded-2xl p-6 border border-white/50 shadow-sm hover-lift-premium"
              >
                {highlight.eyebrow ? (
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                    {highlight.eyebrow}
                  </p>
                ) : null}
                <p className="mt-3 text-lg font-semibold text-[var(--foreground)] font-serif leading-snug">
                  {highlight.title}
                </p>
                {highlight.description ? (
                  <p className="mt-3 text-xs leading-6 text-[var(--muted)]">
                    {highlight.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
