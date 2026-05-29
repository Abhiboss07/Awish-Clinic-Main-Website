import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { clinicMedia } from "@/data/media";
import { getServicesByCategory } from "@/data/services";

export const metadata: Metadata = {
  title: "All Services",
  description:
    "Explore all dermatology, hair transplant, cosmetic surgery and skin care services at Awish Clinic Delhi. Board-certified specialists, affordable pricing, personalised treatment plans.",
};

const groupedServices = [
  {
    title: "Surgical / Aesthetic Procedures",
    intro:
      "Private, consultation-led procedures planned with comfort, confidence and realistic recovery guidance in mind.",
    services: getServicesByCategory("surgical"),
  },
  {
    title: "Skin & Hair Treatments",
    intro:
      "Glow, scar, laser, anti-ageing and hair-focused treatments designed for visible concerns and practical upkeep.",
    services: getServicesByCategory("skin-hair"),
  },
  {
    title: "Weight Management",
    intro:
      "Support-led assessment, non-surgical guidance and more serious surgical pathways for patients who need structured care.",
    services: getServicesByCategory("weight"),
  },
];

const highlights = [
  {
    title: "Private Consultations",
    copy: "Every service starts with a one-to-one discussion about goals, comfort and candidacy.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-emerald-600">
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
        <path d="M4 20a8 8 0 0 1 16 0" />
      </svg>
    )
  },
  {
    title: "Fair-Value Guidance",
    copy: "Treatment planning stays practical and transparent, without the luxury-clinic pressure.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-emerald-600">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    title: "Local Delhi NCR Reach",
    copy: "Our clinics are positioned for nearby patients who want easy follow-up and clinical support.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 text-emerald-600">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="page-shell flex-1">
        {/* Custom Symmetrical Services Hero */}
        <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#faf7f2_0%,#f5eee5_100%)] text-[var(--foreground)]">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(138,79,57,0.06),transparent_40%),radial-gradient(circle_at_left_center,rgba(33,77,72,0.05),transparent_35%)]" />
            <div className="soft-grid absolute inset-0 opacity-20" />
          </div>

          <div className="relative z-10 container-shell py-14 md:py-20 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              
              {/* LEFT SIDE: Copy & Highlights */}
              <div className="space-y-8 fade-up-reveal">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
                      Our Treatments
                    </span>
                  </div>
                  <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                    Find the right treatment for <span className="text-[var(--brand)]">your concern.</span>
                  </h1>
                  <p className="text-lg leading-8 text-[var(--muted)]">
                    Explore our comprehensive selection of cosmetic, skin, hair, and weight services. Each treatment is tailored to your unique goals, backed by medically certified standards, and delivered with absolute transparent clarity.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/book-appointment" className="btn-primary px-7 py-4 text-base">
                    Book Consultation
                  </Link>
                  <Link href="/contact" className="btn-secondary px-7 py-4 text-base">
                    Contact Clinic
                  </Link>
                </div>
              </div>

              {/* RIGHT SIDE: Visual Editorial representation */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] flex items-center justify-center">
                <div className="relative w-[90%] h-[95%] overflow-hidden rounded-[2.5rem] border border-[rgba(30,36,34,0.08)] shadow-2xl group transition duration-700 hover:shadow-[0_32px_80px_rgba(30,36,34,0.12)]">
                  <Image
                    src={clinicMedia.planningSession.src}
                    alt={clinicMedia.planningSession.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,36,34,0.15)_0%,transparent_45%)]" />
                </div>
              </div>

            </div>

            {/* Symmetrical Highlights slabs under Hero */}
            <div className="grid gap-6 md:grid-cols-3 mt-14 pt-8 border-t border-[rgba(30,36,34,0.08)]">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.6rem] border border-[rgba(30,36,34,0.08)] bg-white/60 backdrop-blur-md p-6 shadow-sm flex items-start gap-4 transition hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 shadow-inner">
                    {item.icon}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-semibold text-[var(--foreground)]">{item.title}</h3>
                    <p className="text-xs leading-5 text-[var(--muted)]">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grouped Services Directory */}
        {groupedServices.map((group) => (
          <section key={group.title} className="section-shell bg-[rgba(255,255,255,0.2)]">
            <div className="container-shell space-y-12">
              <div className="max-w-4xl space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                    Care Segment
                  </span>
                </div>
                <h2 className="text-4xl font-semibold sm:text-5xl">{group.title}</h2>
                <p className="text-base leading-7 text-[var(--muted)] max-w-2xl">{group.intro}</p>
              </div>

              {/* Symmetrical Grid & Perfectly Aligned Flexbox Cards */}
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {group.services.map((service) => (
                  <article
                    key={service.slug}
                    className="surface-card overflow-hidden rounded-[2.5rem] flex flex-col shadow-sm hover:shadow-md transition duration-300 h-full group"
                  >
                    {/* Visual aspect ratios for cards */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={service.cardImage}
                        alt={service.name}
                        fill
                        sizes="(min-width: 1280px) 26vw, (min-width: 768px) 42vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    {/* Symmetrical interior padding and flex alignment */}
                    <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                            {service.tagline}
                          </p>
                        </div>
                        <h3 className="text-2xl font-semibold text-[var(--foreground)] leading-snug group-hover:text-[var(--brand)] transition">
                          {service.name}
                        </h3>
                        <p className="text-sm leading-6 text-[var(--muted)]">{service.description}</p>
                      </div>

                      {/* Content aligned perfectly to bottom regardless of copy lengths */}
                      <div className="space-y-5">
                        <div className="flex flex-wrap gap-1.5">
                          {service.concernTags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[rgba(30,36,34,0.08)] bg-white px-2.5 py-1 text-xs font-semibold text-[var(--foreground)] shadow-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[rgba(30,36,34,0.06)]">
                          <span className="text-sm font-bold text-[var(--brand)]">{service.priceIndicator}</span>
                          <Link
                            href={`/services/${service.slug}`}
                            className="text-sm font-semibold text-[var(--foreground)] hover:text-[var(--brand)] transition duration-200"
                          >
                            View details &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer simple={true} />
      <WhatsAppButton />
    </>
  );
}
