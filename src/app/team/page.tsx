import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { siteConfig } from "@/data/siteConfig";
import { clinicMedia } from "@/data/media";

export const metadata: Metadata = {
  title: "Our Medical Team",
  description:
    "Meet our board-certified dermatologists Dr. Vijay Kumar and Dr. Pooja Varshney. MBBS, MD specialists providing hair transplant, skin care, and weight treatments.",
};

const teamValues = [
  "Each treatment plan is created by a board-certified dermatologist, not a sales team.",
  "Calm, private consultations for skin, hair, cosmetic and weight management concerns.",
  "Available across Delhi NCR, Gurugram and Jaipur — same doctors, same standard of care.",
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="page-shell flex-1">
        {/* Symmetric Split Hero */}
        <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#faf7f2_0%,#f5eee5_100%)] text-[var(--foreground)]">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(138,79,57,0.06),transparent_40%),radial-gradient(circle_at_left_center,rgba(33,77,72,0.05),transparent_35%)]" />
            <div className="soft-grid absolute inset-0 opacity-20" />
          </div>

          <div className="relative z-10 container-shell py-14 md:py-20 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              
              {/* LEFT SIDE: Copy & Symmetrical Stats */}
              <div className="space-y-8 fade-up-reveal">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
                      Medical Leadership
                    </span>
                  </div>
                  <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                    Board-certified specialists committed to <span className="text-[var(--brand)]">honest care.</span>
                  </h1>
                  <p className="text-lg leading-8 text-[var(--muted)]">
                    Our team of MBBS, MD dermatologists — Dr. Vijay Kumar and Dr. Pooja Varshney — bring years of advanced clinical experience. We believe in unhurried discussions, accurate diagnostics, and clinical excellence for hair transplant, skin, and body care.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/book-appointment" className="btn-primary px-7 py-4 text-base">
                    Book consultation
                  </Link>
                  <Link href="/contact" className="btn-secondary px-7 py-4 text-base">
                    Contact the clinic
                  </Link>
                </div>

                {/* Symmetrical Slabs for Stats */}
                <div className="grid gap-4 grid-cols-3 pt-4">
                  {[
                    { value: "2", label: "Specialists Listed" },
                    { value: "4", label: "Clinic Locations" },
                    { value: siteConfig.stats.patients, label: "Satisfied Patients" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[1.4rem] border border-[rgba(30,36,34,0.08)] bg-white/60 backdrop-blur-md px-4 py-4 shadow-sm transition hover:shadow-md"
                    >
                      <p className="text-2xl font-bold text-[var(--brand)] md:text-3xl">{stat.value}</p>
                      <p className="mt-1 text-[10px] uppercase font-bold tracking-wider text-[var(--muted)]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE: Clinician Portrait Image Canvas */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] flex items-center justify-center">
                <div className="relative w-[90%] h-[95%] overflow-hidden rounded-[2.5rem] border border-[rgba(30,36,34,0.08)] shadow-2xl group transition duration-700 hover:shadow-[0_32px_80px_rgba(30,36,34,0.12)]">
                  <Image
                    src={clinicMedia.clinicianPortrait.src}
                    alt={clinicMedia.clinicianPortrait.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,36,34,0.15)_0%,transparent_45%)]" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Dedicated Symmetric Doctor Profiles Section */}
        <section className="section-shell">
          <div className="container-shell space-y-12">
            <div className="mb-10 max-w-4xl">
              <span className="eyebrow">Dermatologist Profiles</span>
              <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">
                Your specialists at Awish Clinic.
              </h2>
            </div>

            {/* Symmetrical 2-Column Doctor Grid */}
            <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
              {siteConfig.doctorTeam.map((member) => (
                <article
                  key={member.name}
                  className="surface-card overflow-hidden rounded-[2.5rem] flex flex-col shadow-md group transition hover:shadow-xl"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(min-width: 640px) 40vw, 90vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                          MBBS, MD Specialist
                        </span>
                      </div>
                      <h3 className="text-3xl font-semibold text-[var(--foreground)]">{member.name}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        {member.title}
                      </p>
                      <p className="mt-4 text-sm leading-7 text-[var(--foreground)] font-medium">
                        {member.focus}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                        {member.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {member.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="rounded-full border border-[rgba(30,36,34,0.08)] bg-white px-3.5 py-2 text-xs font-semibold text-[var(--foreground)] shadow-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Symmetrical Core Pillars / Why Patients Trust & Locations Section */}
        <section className="section-shell bg-[rgba(255,255,255,0.45)]">
          <div className="container-shell grid gap-12 lg:grid-cols-2 items-start">
            
            {/* Left Column: Trust Pillars */}
            <div className="space-y-6">
              <span className="eyebrow">Why Patients Trust Us</span>
              <h2 className="text-4xl font-semibold sm:text-5xl">
                Expertise you can trust, consultations that feel comfortable.
              </h2>
              <p className="text-lg leading-8 text-[var(--muted)]">
                Every consultation is private, unhurried and focused on your specific concern. Whether you need help with hair loss, acne scars, cosmetic surgery or weight management, our doctors take the time to explain your options clearly.
              </p>

              <div className="space-y-3 pt-4">
                {teamValues.map((value) => (
                  <div
                    key={value}
                    className="surface-card rounded-[1.5rem] px-5 py-4 text-sm leading-7 text-[var(--muted)] shadow-sm"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Location Highlights */}
            <div className="surface-card rounded-[2.5rem] p-8 shadow-md space-y-6">
              <div>
                <span className="eyebrow">Available in</span>
                <h2 className="text-4xl font-semibold sm:text-5xl mt-3">
                  Visit us across four locations.
                </h2>
              </div>
              
              <div className="grid gap-3 pt-2">
                {siteConfig.locations.map((location) => (
                  <a
                    key={location.label}
                    href={location.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[1.35rem] border border-[rgba(30,36,34,0.08)] bg-white px-4 py-4 transition hover:border-[rgba(33,77,72,0.18)] hover:bg-[var(--surface)] shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-[var(--foreground)]">{location.label}</p>
                        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                          {location.fullAddress}
                        </p>
                      </div>
                      <span className="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)] shrink-0">
                        {location.note}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row pt-4">
                <Link href="/contact" className="btn-primary px-6 py-3.5 text-sm text-center">
                  Reach the clinic
                </Link>
                <Link href="/services" className="btn-secondary px-6 py-3.5 text-sm text-center">
                  Explore services
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer simple={true} />
      <WhatsAppButton />
    </>
  );
}
