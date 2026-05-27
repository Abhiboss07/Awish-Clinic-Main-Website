import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { getServicesByCategory } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import { clinicMedia } from "@/data/media";

export const metadata: Metadata = {
  title: "Clinic Environment",
  description:
    "Explore the state-of-the-art sterile spaces, US-FDA approved treatment suites, and private consulting rooms at Awish Clinic Delhi NCR.",
};

const serviceGroups = [
  { title: "Surgical / Aesthetic", items: getServicesByCategory("surgical").slice(0, 4) },
  { title: "Skin & Hair", items: getServicesByCategory("skin-hair").slice(0, 4) },
  { title: "Weight Management", items: getServicesByCategory("weight") },
];

const clinicValues = [
  "One-on-one consultations with board-certified dermatologists who listen before prescribing.",
  "Modern clinic with advanced equipment, comfortable environment and transparent pricing.",
  "Conveniently located in Sarita Vihar with easy access for patients across South Delhi, Gurugram and Jaipur.",
];

export default function ClinicPage() {
  return (
    <>
      <Header />
      <main className="page-shell flex-1">
        {/* Custom Premium Symmetrical About Hero */}
        <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#faf7f2_0%,#f5eee5_100%)] text-[var(--foreground)]">
          {/* Soft Premium Medical Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(138,79,57,0.06),transparent_40%),radial-gradient(circle_at_left_center,rgba(33,77,72,0.05),transparent_35%)]" />
            <div className="soft-grid absolute inset-0 opacity-20" />
          </div>

          <div className="relative z-10 container-shell py-14 md:py-20 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              
              {/* LEFT SIDE: Copy & Symmetrical Stats */}
              <div className="space-y-8 fade-up-reveal stagger-1">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
                      About Awish Clinic
                    </span>
                  </div>
                  <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                    Trusted dermatology and aesthetic care — <span className="text-[var(--brand)]">backed by experience.</span>
                  </h1>
                  <p className="text-lg leading-8 text-[var(--muted)]">
                    Awish Clinic is located in Sarita Vihar, New Delhi, with consultation availability across Gurugram, East Patel Nagar, and Jaipur. Our board-certified dermatologists provide honest assessments, personalised treatment plans, and advanced procedures at fair, transparent prices.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/book-appointment" className="btn-primary px-7 py-4 text-base">
                    Book consultation
                  </Link>
                  <Link href="/team" className="btn-secondary px-7 py-4 text-base">
                    Meet the doctors
                  </Link>
                </div>

                {/* Symmetrical Slabs for Stats */}
                <div className="grid gap-4 grid-cols-3 pt-4">
                  {[
                    { value: siteConfig.stats.patients, label: "Satisfied Patients" },
                    { value: siteConfig.stats.healthSections, label: "Health Sections" },
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

              {/* RIGHT SIDE: Multi-layered Creative Portrait Collage */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] flex items-center justify-center">
                {/* Main Large rounded Canvas Image */}
                <div className="relative w-[85%] h-[90%] overflow-hidden rounded-[2.5rem] border border-[rgba(30,36,34,0.08)] shadow-2xl group transition duration-700 hover:shadow-[0_32px_80px_rgba(30,36,34,0.12)]">
                  <Image
                    src="/images/about/about-awish-clinic.png"
                    alt="About Awish Clinic"
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,36,34,0.15)_0%,transparent_45%)]" />
                </div>

                {/* Overlapping Floating Founders Badge */}
                <div className="absolute bottom-1 left-1 z-20 glass-card-premium rounded-3xl border border-[var(--line)] px-5 py-4 shadow-2xl transition hover:scale-[1.02] max-w-[280px] sm:max-w-[320px]">
                  <div className="flex items-center gap-3.5">
                    <div className="flex -space-x-3.5 shrink-0">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
                        <Image src="/images/doctor/Dr.%20Vijay%20Kumar.png" fill alt="Dr. Vijay Kumar" className="object-cover" />
                      </div>
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
                        <Image src="/images/doctor/DR.%20POOJA%20VARSHNEY.png" fill alt="Dr. Pooja Varshney" className="object-cover" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[var(--brand)] uppercase tracking-wider">Co-Founder Led</p>
                      <p className="text-[10px] text-[var(--muted)] leading-tight mt-0.5 font-medium">Dr. Vijay Kumar & Dr. Pooja Varshney (MBBS, MD)</p>
                    </div>
                  </div>
                </div>

                {/* Floating Aesthetic Stats circle */}
                <div className="absolute -top-1 right-2 z-20 flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand)_0%,#102826_100%)] text-white shadow-xl border-4 border-white/20 transition-transform duration-500 hover:scale-105">
                  <div className="text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Est.</p>
                    <p className="text-sm font-black leading-none">2015</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container-shell grid gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow">What makes us different</span>
              <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">
                Why 30,000+ patients trust Awish Clinic for their skin, hair and body care.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
                Patients choose Awish Clinic for the combination of experienced dermatologists, transparent pricing, private consultation and a clinic environment that feels professional yet approachable.
              </p>
              <div className="mt-8 space-y-3">
                {clinicValues.map((value) => (
                  <div
                    key={value}
                    className="surface-card rounded-[1.5rem] px-5 py-4 text-sm leading-7 text-[var(--muted)]"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {siteConfig.carePillars.map((pillar) => (
                <div key={pillar.title} className="surface-card rounded-[1.7rem] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    {pillar.title}
                  </p>
                  <p className="mt-4 text-base leading-8 text-[var(--muted)]">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell bg-[rgba(255,255,255,0.45)]">
          <div className="container-shell space-y-16">
            {/* Block 1: Who We Serve */}
            <div>
              <div className="mb-10 max-w-4xl">
                <span className="eyebrow">Who we serve</span>
                <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">
                  Different concerns, one consistent standard of care.
                </h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {siteConfig.audiences.map((audience) => (
                  <div key={audience.label} className="surface-card rounded-[1.6rem] p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                      {audience.label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{audience.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 2: Meet the Doctors */}
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="surface-card rounded-[1.9rem] p-7 flex flex-col justify-between">
                <div>
                  <span className="eyebrow">Meet the doctors</span>
                  <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">
                    Two dermatologists, one calm and coordinated clinic story.
                  </h2>
                  <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                    {siteConfig.doctorQuote} Meet Dr. Vijay Kumar and Dr. Pooja Varshney — each with their own focus areas and consultation strengths.
                  </p>
                </div>
                <Link href="/team" className="btn-secondary mt-7 px-6 py-3 text-sm w-fit">
                  View full team page
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {siteConfig.doctorTeam.map((member) => (
                  <article key={member.name} className="surface-card overflow-hidden rounded-[1.7rem] flex flex-col">
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(min-width: 640px) 22vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-lg font-semibold">{member.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                          {member.title}
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{member.focus}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container-shell">
            <div className="mb-10 max-w-4xl">
              <span className="eyebrow">Treatment areas</span>
              <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">
                Services across surgery, skin and hair, and weight management.
              </h2>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {serviceGroups.map((group) => (
                <div key={group.title} className="surface-card rounded-[1.8rem] p-6">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">{group.title}</p>
                  <h3 className="mt-3 text-3xl font-semibold">{group.title}</h3>
                  <div className="mt-6 space-y-3">
                    {group.items.map((service) => (
                      <div
                        key={service.slug}
                        className="rounded-[1.2rem] border border-[rgba(30,36,34,0.08)] bg-white p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-[var(--foreground)]">{service.name}</p>
                            <p className="mt-1 text-sm text-[var(--muted)]">{service.tagline}</p>
                          </div>
                          <Link href={`/services/${service.slug}`} className="text-sm font-semibold text-[var(--brand)]">
                            View
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dedicated Symmetrical Clinic Spaces & Sterile Environments Section */}
        <section className="section-shell bg-[rgba(255,255,255,0.45)]">
          <div className="container-shell">
            <div className="mb-10 max-w-4xl">
              <span className="eyebrow">Our Clinic Environment</span>
              <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">
                State-of-the-art sterile spaces designed for comfort and privacy.
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                Awish Clinic maintains ultra-sterile clinical environments with advanced treatment technologies, private consultation suites, and professional customer lounges across all locations.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Modern & Comfortable Lounges",
                  copy: "A calm, private, and organized entry environment designed to make your visit stress-free from the moment you step in.",
                  src: clinicMedia.clinicInterior.src,
                  alt: "Clinic interior reception area"
                },
                {
                  title: "Sterile & Equipped Treatment Suites",
                  copy: "Equipped with advanced US-FDA approved technologies, state-of-the-art sterile procedures, and highly comfortable treatment seating.",
                  src: clinicMedia.treatmentSuite.src,
                  alt: "Clean treatment room suite"
                },
                {
                  title: "Discreet Consultation Offices",
                  copy: "Soundproof consultation rooms where our board-certified dermatologists listen to your skin and hair concerns with 100% discretion.",
                  src: clinicMedia.privateConsultation.src,
                  alt: "Private consulting office"
                }
              ].map((item) => (
                <article key={item.title} className="surface-card overflow-hidden rounded-[1.9rem] flex flex-col shadow-sm transition hover:shadow-md">
                  <div className="relative aspect-[16/10] overflow-hidden group">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand)]">
                          Clinical Space
                        </h4>
                      </div>
                      <h3 className="text-xl font-semibold text-[var(--foreground)]">{item.title}</h3>
                      <p className="mt-2.5 text-sm leading-6 text-[var(--muted)]">{item.copy}</p>
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
