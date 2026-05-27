import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { siteConfig } from "@/data/siteConfig";
import { clinicMedia } from "@/data/media";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the history, vision, and clinical core values of Awish Clinic. Led by co-founders Dr. Vijay Kumar and Dr. Pooja Varshney since 2015.",
};

const coreValues = [
  {
    title: "Medical Integrity",
    description: "We believe in honest clinical assessments, transparent pricing, and prescribing only what is medically necessary.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  },
  {
    title: "Patient Comfort & Safety",
    description: "Our clinics feature US-FDA approved technologies, ultra-sterile suites, and private spaces designed to feel relaxing and stress-free.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M12 21s-6.2-3.9-8.5-7.4a5.2 5.2 0 0 1 8.5-5.8 5.2 5.2 0 0 1 8.5 5.8C18.2 17.1 12 21 12 21Z" />
      </svg>
    )
  },
  {
    title: "Accessible Premium Care",
    description: "High-quality dermatological care delivered across convenient locations in Delhi NCR and Jaipur at fair and value-driven rates.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M12 21c4.7-3.7 7-6.7 7-9.9a7 7 0 1 0-14 0c0 3.2 2.3 6.2 7 9.9Z" />
        <circle cx="12" cy="11" r="2.3" />
      </svg>
    )
  }
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="page-shell flex-1">
        {/* Symmetrical Split Hero */}
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
                      About Us
                    </span>
                  </div>
                  <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                    Crafting a trusted clinical standard <span className="text-[var(--brand)]">since 2015.</span>
                  </h1>
                  <p className="text-lg leading-8 text-[var(--muted)]">
                    Awish Clinic was founded on a simple promise: to offer professional, consultation-led dermatological and aesthetic care without the aggressive commercial push. We prioritize patient health, clear medical guidelines, and excellent treatment outcomes above all else.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/book-appointment" className="btn-primary px-7 py-4 text-base">
                    Book Consultation
                  </Link>
                  <Link href="/clinic" className="btn-secondary px-7 py-4 text-base">
                    Explore Our Clinics
                  </Link>
                </div>

                {/* Symmetrical Slabs for Stats */}
                <div className="grid gap-4 grid-cols-3 pt-4">
                  {[
                    { value: siteConfig.stats.patients, label: "Satisfied Patients" },
                    { value: "2015", label: "Established Year" },
                    { value: siteConfig.stats.awardsWon, label: "Awards Won" },
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

              {/* RIGHT SIDE: Large Clinical Portrait Canvas */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] flex items-center justify-center">
                <div className="relative w-[90%] h-[95%] overflow-hidden rounded-[2.5rem] border border-[rgba(30,36,34,0.08)] shadow-2xl group transition duration-700 hover:shadow-[0_32px_80px_rgba(30,36,34,0.12)]">
                  <Image
                    src={clinicMedia.heroConsultation.src}
                    alt={clinicMedia.heroConsultation.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,36,34,0.15)_0%,transparent_45%)]" />
                </div>

                {/* Floating Aesthetic Est Badge */}
                <div className="absolute -top-2 right-2 z-20 flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand)_0%,#102826_100%)] text-white shadow-xl border-4 border-white/20 transition-transform duration-500 hover:scale-105">
                  <div className="text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Est.</p>
                    <p className="text-sm font-black leading-none">2015</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Symmetrical Story Section */}
        <section className="section-shell">
          <div className="container-shell">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              
              {/* Left Column: Image Canvas */}
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2.5rem] border border-[rgba(30,36,34,0.08)] shadow-lg group">
                <Image
                  src={clinicMedia.planningSession.src}
                  alt={clinicMedia.planningSession.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* Right Column: Symmetrical Typography block */}
              <div className="space-y-6">
                <span className="eyebrow">Our Clinical Philosophy</span>
                <h2 className="text-4xl font-semibold sm:text-5xl">
                  Guided by science, built around patient goals.
                </h2>
                <p className="text-lg leading-8 text-[var(--muted)]">
                  Over the past decade, we have watched the skincare and aesthetic industry transform into a high-pressure commercial market. At Awish Clinic, we actively choose a different path.
                </p>
                <p className="text-base leading-7 text-[var(--muted)]">
                  Our co-founders established this clinic with a core vision: every single patient receives a dedicated consultation with an MBBS, MD dermatologist who takes the time to listen, explain, and personalize the care plan. We invest in high-end medical technologies and maintain exceptionally sterile procedure spaces to offer a comfortable and safe environment for you.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Symmetrical Core Values Grid */}
        <section className="section-shell bg-[rgba(255,255,255,0.45)]">
          <div className="container-shell">
            <div className="mb-14 text-center max-w-3xl mx-auto space-y-4">
              <span className="eyebrow justify-center">Our Core Values</span>
              <h2 className="text-4xl font-semibold sm:text-5xl">
                The standards that define us.
              </h2>
              <p className="text-base leading-7 text-[var(--muted)]">
                Whether you visit our main Delhi clinic or consult our specialists at our partner locations, these principles guide every medical decision we make.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {coreValues.map((value) => (
                <div
                  key={value.title}
                  className="surface-card rounded-[2rem] p-8 shadow-sm transition hover:shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand)] text-white shadow-md">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-[var(--foreground)]">{value.title}</h3>
                    <p className="text-sm leading-7 text-[var(--muted)]">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Perfectly Balanced Co-founders Section */}
        <section className="section-shell">
          <div className="container-shell space-y-12">
            <div className="mb-10 text-center max-w-3xl mx-auto space-y-4">
              <span className="eyebrow justify-center">Dermatology Leadership</span>
              <h2 className="text-4xl font-semibold sm:text-5xl">
                Meet our Co-Founders
              </h2>
              <p className="text-base leading-7 text-[var(--muted)]">
                Our board-certified dermatologists lead our medical operations, bringing over a decade of clinical experience in advanced aesthetic care.
              </p>
            </div>

            {/* Symmetrical 2-Column Grid matching exactly 2 Co-founders */}
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
                          Co-Founder & Specialist
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
      </main>
      <Footer simple={true} />
      <WhatsAppButton />
    </>
  );
}
