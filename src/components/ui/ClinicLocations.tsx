"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

const highlights = [
  {
    title: "Board-certified specialists",
    description: "All treatments are designed and overseen directly by experienced MD Dermatologists.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
        <path d="M4 20a8 8 0 0 1 16 0" />
      </svg>
    ),
  },
  {
    title: "Personalized treatment plans",
    description: "Every skin, hair, and body journey is tailored to your exact concerns and budget.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
        <path d="M12 21s-6.2-3.9-8.5-7.4a5.2 5.2 0 0 1 8.5-5.8 5.2 5.2 0 0 1 8.5 5.8C18.2 17.1 12 21 12 21Z" />
      </svg>
    ),
  },
  {
    title: "Consistent care standards",
    description: "Expect the same warm clinical excellence and safety across every single clinic branch.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
        <path d="M12 3 4.5 6.4v5.5A10 10 0 0 0 12 21a10 10 0 0 0 7.5-9.1V6.4Z" />
        <path d="m9.2 12.2 1.9 1.9 3.7-3.8" />
      </svg>
    ),
  },
  {
    title: "Multiple clinic locations",
    description: "Convenient branches and consultation access points across Delhi NCR and Jaipur.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
        <path d="M12 21c4.7-3.7 7-6.7 7-9.9a7 7 0 1 0-14 0c0 3.2 2.3 6.2 7 9.9Z" />
        <circle cx="12" cy="11" r="2.3" />
      </svg>
    ),
  },
];

export default function ClinicLocations() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hi, I would like to consult with a specialist at Awish Clinic."
  )}`;

  return (
    <section className="section-shell relative overflow-hidden bg-white/40 border-y border-[rgba(30,36,34,0.06)]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(33,77,72,0.04),transparent_35%)]" />
      </div>

      <div className="relative z-10 container-shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          
          {/* LEFT SIDE: Headline, supporting text and elegant highlight cards */}
          <div className="fade-up-reveal stagger-1 flex flex-col space-y-8">
            <div className="space-y-4">
              <span className="eyebrow w-fit border-[rgba(30,36,34,0.08)] bg-white text-[var(--brand)] font-bold">
                Our Directory
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold leading-tight font-serif text-[var(--foreground)] tracking-tight">
                Expert care across <br />
                multiple locations.
              </h2>
              <p className="text-base leading-8 text-[var(--muted)] max-w-lg">
                Consult with the same trusted specialists across our clinics. We provide high-end clinical setups, advanced FDA-approved technologies, and friendly doctor consultations closer to you.
              </p>
            </div>

            {/* Feature Highlights lists */}
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <div
                  key={h.title}
                  className="surface-card rounded-[22px] p-5 border border-[rgba(30,36,34,0.06)] shadow-sm hover-lift-premium"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)] mb-3">
                    {h.icon}
                  </div>
                  <h4 className="text-sm font-bold text-[var(--foreground)]">{h.title}</h4>
                  <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{h.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Location Directory Card (Premium floating container) */}
          <div className="fade-up-reveal stagger-2 relative">
            <div className="glass-card-premium rounded-[32px] p-6 border border-white/80 shadow-2xl space-y-4">
              
              <div className="border-b border-[rgba(30,36,34,0.06)] pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand)] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  Select A Branch Location
                </span>
              </div>

              {/* Dynamic Locations Loop */}
              <div className="space-y-3">
                {siteConfig.locations.map((loc) => {
                  // Determine badge text
                  const badgeText = loc.primary
                    ? "Primary Clinic"
                    : loc.label.includes("Jaipur")
                      ? "Jaipur Branch"
                      : loc.label.includes("Patel Nagar")
                        ? "Delhi Consultation"
                        : "Consultation Available";

                  return (
                    <div
                      key={loc.label}
                      className="group relative rounded-2xl border border-[rgba(30,36,34,0.06)] bg-white p-5 hover-lift-premium transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        
                        {/* Left portion: Name, Address and Badge */}
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--brand)] group-hover:scale-125 transition-transform duration-300 shrink-0" />
                            <h4 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--brand)] transition-luxury">
                              {loc.label}
                            </h4>
                            <span className={`rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest ${
                              loc.primary
                                ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                                : "bg-[rgba(33,77,72,0.06)] text-[var(--brand)]"
                            }`}>
                              {badgeText}
                            </span>
                          </div>

                          <p className="text-xs leading-6 text-[var(--muted)] font-sans pl-4">
                            {loc.fullAddress}
                          </p>
                        </div>

                        {/* Right portion: Quick Action CTA Buttons */}
                        <div className="flex items-center gap-2 shrink-0 sm:self-center pl-4 sm:pl-0">
                          {/* Google Maps direction */}
                          <a
                            href={loc.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface-strong)] text-[var(--muted)] border border-[rgba(30,36,34,0.06)] hover:bg-[var(--brand)] hover:text-white hover:border-[var(--brand)] transition-luxury"
                            title="Open Google Maps Directions"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
                              <path d="M3 22 21 4M21 4H10M21 4V15" />
                            </svg>
                          </a>

                          {/* Call branch */}
                          <a
                            href={`tel:${siteConfig.phone}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(33,77,72,0.05)] text-[var(--brand)] border border-[rgba(33,77,72,0.1)] hover:bg-[var(--brand)] hover:text-white hover:border-[var(--brand)] transition-luxury"
                            title="Call Clinic Branch"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                          </a>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom CTA Area */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-[rgba(30,36,34,0.06)]">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-luxury hover:bg-[#1a3f3a]"
                >
                  Reach the Clinic
                </a>
                <Link
                  href="/services"
                  className="btn-secondary flex-1 px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl text-center transition-luxury"
                >
                  Explore Services
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
