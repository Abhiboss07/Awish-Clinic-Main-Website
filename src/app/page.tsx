import Image from "next/image";
import Link from "next/link";
import HeroVideoSection from "@/components/home/HeroVideoSection";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import {
  getServiceBySlug,
  getServicesByCategory,
} from "@/data/services";
import { siteConfig } from "@/data/siteConfig";

const serviceGroups = [
  {
    title: "Surgical / Aesthetic",
    intro: "Discreet planning for facial, body and confidence-led procedures.",
    services: getServicesByCategory("surgical"),
  },
  {
    title: "Skin & Hair",
    intro: "Treatment-led skin, glow, laser and restoration journeys.",
    services: getServicesByCategory("skin-hair"),
  },
  {
    title: "Weight Management",
    intro: "Supportive non-surgical and surgical pathways with clearer guidance.",
    services: getServicesByCategory("weight"),
  },
];

const treatmentCollections = [
  {
    title: "Skin Treatments",
    subtitle: "Glow, acne, pigmentation and rejuvenation plans.",
    href: "/services/white-glow",
    image: getServiceBySlug("white-glow")!.cardImage,
  },
  {
    title: "Hair Solutions",
    subtitle: "Hair restoration and confidence-led care paths.",
    href: "/services/hair-transplant",
    image: getServiceBySlug("hair-transplant")!.cardImage,
  },
  {
    title: "Aesthetic Procedures",
    subtitle: "Structured, private planning for visible transformation goals.",
    href: "/services/rhinoplasty",
    image: getServiceBySlug("rhinoplasty")!.cardImage,
  },
  {
    title: "Laser & Anti-Ageing",
    subtitle: "Technology-led sessions for long-term skin confidence.",
    href: "/services/laser-hair-removal",
    image: getServiceBySlug("laser-hair-removal")!.cardImage,
  },
  {
    title: "Weight Management",
    subtitle: "Supportive entry points for non-surgical and surgical journeys.",
    href: "/services/overweight-treatment",
    image: getServiceBySlug("overweight-treatment")!.cardImage,
  },
  {
    title: "Bridal & Event Skin",
    subtitle: "Polished skin preparation with medical-grade treatment planning.",
    href: "/services/medi-facials",
    image: getServiceBySlug("medi-facials")!.cardImage,
  },
];

const trustMetrics = [
  {
    value: siteConfig.stats.patients,
    label: "Satisfied patients",
    note: "A larger patient base reinforces the trust story already associated with the clinic brand.",
  },
  {
    value: siteConfig.stats.healthSections,
    label: "Health sections",
    note: "The clinic profile positions itself as a broader care setup rather than a one-service practice.",
  },
  {
    value: siteConfig.stats.awardsWon,
    label: "Awards won",
    note: "High-visibility proof points help the homepage feel more established and credible.",
  },
  {
    value: siteConfig.stats.openDays,
    label: "Open all week",
    note: "The clinic story now clearly communicates Monday-to-Sunday accessibility.",
  },
];

const philosophySteps = [
  {
    number: "01",
    title: "Assess",
    image: "/images/home/assess.png",
    copy: "Every journey starts with a close review of your concern, suitability and confidence goals before any recommendation is made.",
  },
  {
    number: "02",
    title: "Personalise",
    image: "/images/home/personalise.png",
    copy: "Treatments are adapted to your skin, hair, body and recovery expectations instead of using one generic clinic script.",
  },
  {
    number: "03",
    title: "Support",
    image: "/images/home/support.png",
    copy: "The experience stays clear after the session too, with follow-up guidance, realistic timelines and nearby access in Delhi.",
  },
];

const editorialPanels = [
  {
    title: "Private and polished",
    copy: "The site feels premium, but the language stays calm and approachable rather than celebrity-clinic distant.",
  },
  {
    title: "Treatment-first discovery",
    copy: "Patients can browse by service type, concern or care path without getting lost in generic filler content.",
  },
  {
    title: "Built for Delhi trust",
    copy: "Everything from WhatsApp CTAs to service grouping is tuned for people searching for quality care close to home.",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="page-shell flex-1">
        <HeroVideoSection />

        <section className="relative z-30 mt-8 pb-6 lg:mt-12 lg:pb-10">
          <div className="container-shell">
            <div className="rounded-[2rem] border border-[rgba(30,36,34,0.08)] bg-[rgba(255,255,255,0.96)] p-4 shadow-[0_24px_60px_rgba(13,20,24,0.08)] backdrop-blur lg:p-6">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {trustMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.25rem] border border-[rgba(30,36,34,0.06)] bg-white px-5 py-5"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-[var(--foreground)] lg:text-4xl">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      {metric.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell pt-6 lg:pt-8">
          <div className="container-shell">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="eyebrow">Explore Our Treatments</span>
                <h2 className="mt-5 text-3xl font-semibold sm:text-4xl lg:text-5xl">
                  Treatment pathways designed around your goals.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] lg:text-lg lg:leading-8">
                  Browse key treatment areas to find the right care path for your skin, hair, body or confidence goals.
                </p>
              </div>
              <Link href="/services" className="btn-secondary w-fit px-6 py-3 text-sm">
                View all services
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {treatmentCollections.map((item, index) => (
                <article
                  key={item.title}
                  className={`group overflow-hidden rounded-[1.9rem] border border-[rgba(30,36,34,0.08)] bg-white shadow-[0_20px_70px_rgba(18,24,28,0.06)] ${
                    index === 0 ? "xl:col-span-2" : ""
                  }`}
                >
                  <div className={`relative ${index === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes={
                        index === 0
                          ? "(min-width: 1280px) 54vw, 100vw"
                          : "(min-width: 1280px) 26vw, (min-width: 768px) 42vw, 100vw"
                      }
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,16,0.04)_0%,rgba(6,12,16,0.74)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/64">
                        Treatment collection
                      </p>
                      <h3 className="mt-3 text-3xl font-semibold text-white lg:text-[2.2rem]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-7 text-white/76">
                        {item.subtitle}
                      </p>
                      <Link
                        href={item.href}
                        className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[var(--brand)]"
                      >
                        Explore
                        <span aria-hidden="true">↗</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell bg-[rgba(255,255,255,0.45)]">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-5">
              <span className="eyebrow">Why Awish feels different</span>
              <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
                Premium in presentation, calm in tone, practical in guidance.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-[var(--muted)] lg:text-lg lg:leading-8">
                A clinic experience that balances polished visual confidence with the warmth and trust of a neighbourhood dermatology practice.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="image-panel relative min-h-[17rem]">
                  <Image
                    src={siteConfig.homepageGallery[3].src}
                    alt={siteConfig.homepageGallery[3].alt}
                    fill
                    sizes="(min-width: 640px) 24vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="image-panel relative min-h-[17rem]">
                  <Image
                    src={siteConfig.homepageGallery[4].src}
                    alt={siteConfig.homepageGallery[4].alt}
                    fill
                    sizes="(min-width: 640px) 24vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              {editorialPanels.map((panel, index) => {
                const isFeatured = index === 1;

                return (
                  <div
                    key={panel.title}
                    className={`relative overflow-hidden rounded-[1.8rem] border p-6 lg:p-7 ${
                      isFeatured
                        ? "border-[rgba(20,52,49,0.22)] text-white shadow-[0_34px_90px_rgba(16,40,38,0.22)]"
                        : "surface-card border-[rgba(30,36,34,0.08)] bg-[rgba(255,255,255,0.92)] text-[var(--foreground)]"
                    }`}
                    style={
                      isFeatured
                        ? {
                            background:
                              "radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 28%), linear-gradient(135deg, #16312f 0%, #214d48 54%, #102826 100%)",
                          }
                        : undefined
                    }
                  >
                    {isFeatured ? (
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />
                    ) : null}

                    <p
                      className={`relative z-10 text-[11px] font-semibold uppercase tracking-[0.24em] ${
                        isFeatured ? "text-white/68" : "text-[var(--accent)]"
                      }`}
                    >
                      0{index + 1}
                    </p>
                    <h3
                      className={`relative z-10 mt-4 text-3xl font-semibold ${
                        isFeatured ? "text-white" : "text-[var(--foreground)]"
                      }`}
                    >
                      {panel.title}
                    </h3>
                    <p
                      className={`relative z-10 mt-4 max-w-xl text-base leading-8 ${
                        isFeatured ? "text-white/86" : "text-[var(--muted)]"
                      }`}
                    >
                      {panel.copy}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-shell relative overflow-hidden bg-[#0f3a3b] text-white">
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <div className="absolute right-0 top-0 h-[28rem] w-[56%] bg-[url('/images/home/ourcaremethod-bg.png')] bg-cover bg-right-top bg-no-repeat shadow-[-24px_0_60px_rgba(5,24,25,0.42)]" />
            <div className="absolute inset-y-0 right-[48%] w-56 bg-[linear-gradient(90deg,rgba(15,58,59,1)_0%,rgba(15,58,59,0.92)_26%,rgba(15,58,59,0.52)_72%,rgba(15,58,59,0)_100%)]" />
            <div className="absolute right-0 top-0 h-[28rem] w-[56%] bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0)_58%),linear-gradient(180deg,rgba(8,25,28,0.32)_0%,rgba(8,25,28,0)_32%,rgba(8,25,28,0.34)_100%)]" />
          </div>
          <div className="container-shell relative z-10">
            <div className="mb-10 max-w-3xl lg:mb-12">
              <span className="eyebrow border-white/12 bg-white/85 text-[#122326]">Our care method</span>
              <h2 className="mt-6 text-4xl font-semibold leading-[1.16] sm:text-5xl">
                How we approach every patient journey.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
                Every treatment begins with understanding. Our three-step method ensures you receive care that is assessed, personalised and supported from start to finish.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {philosophySteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-[1.6rem] border border-white/10 bg-[rgba(45,73,72,0.72)] p-5 shadow-[0_26px_70px_rgba(6,16,20,0.24)] backdrop-blur"
                >
                  <p className="text-5xl font-semibold text-white/72">{step.number}</p>
                  <h3 className="mt-4 text-4xl font-semibold text-[#f2ede2]">{step.title}</h3>
                  <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-[1rem]">
                    <Image
                      src={step.image}
                      alt={`${step.title} step visual`}
                      fill
                      sizes="(min-width: 1024px) 28vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/84">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container-shell">
            <div className="mb-10 max-w-4xl">
              <span className="eyebrow">Browse by care path</span>
              <h2 className="mt-5 text-3xl font-semibold sm:text-4xl lg:text-5xl">
                Find the right treatment category for your concern.
              </h2>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {serviceGroups.map((group) => (
                <div key={group.title} className="surface-card rounded-[1.9rem] p-6 lg:p-7">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
                    {group.services.length} services
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold">{group.title}</h3>
                  <p className="mt-3 text-base leading-8 text-[var(--muted)]">{group.intro}</p>

                  <div className="mt-6 space-y-3">
                    {group.services.slice(0, 5).map((service) => (
                      <div
                        key={service.slug}
                        className="rounded-[1.2rem] border border-[rgba(30,36,34,0.08)] bg-white px-4 py-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-[var(--foreground)]">{service.name}</p>
                            <p className="mt-1 text-sm text-[var(--muted)]">{service.tagline}</p>
                          </div>
                          <Link
                            href={`/services/${service.slug}`}
                            className="text-sm font-semibold text-[var(--brand)]"
                          >
                            Explore
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

        <section className="section-shell bg-[linear-gradient(180deg,#faf7f1_0%,#f0e8dc_100%)]">
          <div className="container-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="eyebrow">Start with your concern</span>
              <h2 className="mt-5 text-3xl font-semibold sm:text-4xl lg:text-5xl">
                Most people do not begin with a procedure. They begin with a concern.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] lg:text-lg lg:leading-8">
                Tell us what bothers you and we will guide you to the right treatment path with honest, pressure-free consultation.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {siteConfig.concernCoverage.map((concern) => (
                  <span
                    key={concern}
                    className="rounded-full border border-[rgba(30,36,34,0.1)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] shadow-[0_12px_30px_rgba(18,24,28,0.04)]"
                  >
                    {concern}
                  </span>
                ))}
              </div>
            </div>

            <div className="surface-card rounded-[2rem] overflow-hidden">
              <div className="relative min-h-[17rem]">
                <Image
                  src={siteConfig.homepageGallery[5].src}
                  alt={siteConfig.homepageGallery[5].alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
                  Delhi reach
                </p>
                <h3 className="mt-4 text-2xl font-semibold lg:text-3xl">
                  Easy to access for patients across South Delhi and nearby NCR pockets.
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {siteConfig.neighborhoods.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-[rgba(30,36,34,0.1)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/book-appointment" className="btn-primary px-6 py-3 text-sm">
                    Book consultation
                  </Link>
                  <Link href="/contact" className="btn-secondary px-6 py-3 text-sm">
                    Contact the clinic
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

