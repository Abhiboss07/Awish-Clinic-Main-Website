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
      <main className="page-shell flex-1 bg-[var(--surface)] text-[var(--foreground)] selection:bg-emerald-100 selection:text-emerald-900">
        <HeroVideoSection />

        {/* Floating Trust Metrics Board */}
        <section className="relative z-30 -mt-16 pb-12">
          <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="rounded-[2.5rem] border border-[rgba(255,255,255,0.4)] bg-[rgba(255,253,249,0.78)] p-6 sm:p-8 shadow-[0_32px_80px_rgba(13,20,24,0.12)] backdrop-blur-2xl">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {trustMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="group rounded-[1.8rem] border border-[rgba(30,36,34,0.06)] bg-white/95 px-6 py-6 shadow-sm hover:border-emerald-500/20 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--accent)] group-hover:text-emerald-600 transition-colors">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-4xl font-bold text-[var(--foreground)] lg:text-5xl tracking-tight">
                      {metric.value}
                    </p>
                    <p className="mt-3 text-xs leading-6 text-[var(--muted)] font-medium">
                      {metric.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Explore Our Treatments Section */}
        <section className="py-12 sm:py-20 relative overflow-hidden">
          <div className="absolute top-1/3 right-0 w-[45rem] h-[45rem] bg-[radial-gradient(circle,rgba(33,77,72,0.04)_0%,transparent_70%)] blur-3xl pointer-events-none" />
          <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full border border-emerald-500/10 bg-emerald-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-800">
                  Explore Our Treatments
                </span>
                <h2 className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.15] text-[var(--foreground)] tracking-tight">
                  Treatment pathways designed around your goals.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)] lg:text-lg">
                  Browse key treatment areas to find the right care path for your skin, hair, body or confidence goals.
                </p>
              </div>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-2xl bg-[var(--brand)] px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-emerald-900 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                View all services
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {treatmentCollections.map((item, index) => (
                <article
                  key={item.title}
                  className={`group relative overflow-hidden rounded-[2.2rem] border border-[rgba(30,36,34,0.08)] bg-white shadow-[0_24px_70px_rgba(18,24,28,0.06)] hover:shadow-xl transition-all duration-500 ${
                    index === 0 ? "xl:col-span-2" : ""
                  }`}
                >
                  <div className={`relative w-full overflow-hidden ${index === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes={
                        index === 0
                          ? "(min-width: 1280px) 60vw, 100vw"
                          : "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                      }
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,12,16,0)_0%,rgba(6,12,16,0.2)_40%,rgba(6,12,16,0.85)_100%)] z-10" />
                    
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                      <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm">
                          Treatment collection
                        </span>
                        <h3 className="mt-3 text-2xl sm:text-4xl font-bold text-white tracking-tight">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-lg text-sm leading-7 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {item.subtitle}
                        </p>
                        <Link
                          href={item.href}
                          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white hover:text-[var(--brand)] transition-all duration-300"
                        >
                          Explore
                          <span className="font-sans font-normal text-xs transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Awish Feels Different Section */}
        <section className="py-12 sm:py-24 bg-[rgba(255,255,255,0.45)] relative overflow-hidden border-y border-[rgba(30,36,34,0.04)]">
          <div className="absolute top-1/2 left-0 w-[40rem] h-[40rem] bg-[radial-gradient(circle,rgba(33,77,72,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" />
          <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 w-full grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
            
            {/* Left Column Description and Gallery Grid */}
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-emerald-500/10 bg-emerald-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-800">
                Why Awish feels different
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold leading-[1.15] text-[var(--foreground)] tracking-tight">
                Premium in presentation, calm in tone, practical in guidance.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)] lg:text-lg">
                A clinic experience that balances polished visual confidence with the warmth and trust of a neighbourhood dermatology practice.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 pt-4">
                <div className="image-panel relative min-h-[19rem] rounded-[2rem] overflow-hidden border border-[rgba(30,36,34,0.08)] shadow-md group">
                  <Image
                    src={siteConfig.homepageGallery[3].src}
                    alt={siteConfig.homepageGallery[3].alt}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
                <div className="image-panel relative min-h-[19rem] rounded-[2rem] overflow-hidden border border-[rgba(30,36,34,0.08)] shadow-md group">
                  <Image
                    src={siteConfig.homepageGallery[4].src}
                    alt={siteConfig.homepageGallery[4].alt}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              </div>
            </div>

            {/* Right Column Editorial Glass Cards */}
            <div className="grid gap-6">
              {editorialPanels.map((panel, index) => {
                const isFeatured = index === 1;

                return (
                  <div
                    key={panel.title}
                    className={`relative overflow-hidden rounded-[2.2rem] border p-8 lg:p-10 transition-all duration-300 hover:scale-[1.01] ${
                      isFeatured
                        ? "border-[rgba(20,52,49,0.22)] text-white shadow-[0_32px_80px_rgba(16,40,38,0.25)]"
                        : "surface-card border-[rgba(30,36,34,0.08)] bg-white text-[var(--foreground)] shadow-sm hover:shadow-md"
                    }`}
                    style={
                      isFeatured
                        ? {
                            background:
                              "radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 30%), linear-gradient(135deg, #102624 0%, #1a423d 50%, #0d201e 100%)",
                          }
                        : undefined
                    }
                  >
                    {isFeatured ? (
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/18" />
                    ) : null}

                    <p
                      className={`text-[10px] font-bold uppercase tracking-[0.26em] ${
                        isFeatured ? "text-white/60" : "text-[var(--accent)]"
                      }`}
                    >
                      0{index + 1}
                    </p>
                    <h3
                      className={`mt-4 text-2xl sm:text-3xl font-bold tracking-tight ${
                        isFeatured ? "text-white" : "text-[var(--foreground)]"
                      }`}
                    >
                      {panel.title}
                    </h3>
                    <p
                      className={`mt-4 text-sm sm:text-base leading-8 ${
                        isFeatured ? "text-white/80" : "text-[var(--muted)]"
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

        {/* Our Care Method Section */}
        <section className="py-12 sm:py-24 relative overflow-hidden bg-[#0d2325] text-white">
          {/* Subtle Background Artistry */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <div className="absolute right-0 top-0 h-full w-[52%] bg-[url('/images/home/ourcaremethod-bg.png')] bg-cover bg-right-top bg-no-repeat opacity-[0.9] shadow-[-20px_0_60px_rgba(5,24,25,0.6)]" />
            <div className="absolute inset-y-0 right-[44%] w-64 bg-[linear-gradient(90deg,#0d2325_0%,rgba(13,35,37,0.92)_30%,rgba(13,35,37,0.4)_75%,rgba(13,35,37,0)_100%)]" />
            <div className="absolute right-0 top-0 h-full w-[52%] bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0)_60%)]" />
          </div>

          <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10">
            <div className="mb-12 lg:mb-16 max-w-3xl">
              <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0d2325]">
                Our care method
              </span>
              <h2 className="mt-6 text-3xl sm:text-5xl font-bold leading-[1.12] tracking-tight">
                How we approach every patient journey.
              </h2>
              <p className="mt-5 max-w-2xl text-base sm:text-lg leading-8 text-white/80">
                Every treatment begins with understanding. Our three-step method ensures you receive care that is assessed, personalised and supported from start to finish.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {philosophySteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-[2rem] border border-white/10 bg-[rgba(25,48,51,0.55)] p-6 sm:p-8 shadow-[0_24px_60px_rgba(6,16,20,0.3)] backdrop-blur-md hover:border-white/20 transition-all duration-300"
                >
                  <p className="text-4xl sm:text-5xl font-bold text-white/50 tracking-tight">{step.number}</p>
                  <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-emerald-100 tracking-tight">{step.title}</h3>
                  <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[1.25rem] border border-white/5 group shadow-inner">
                    <Image
                      src={step.image}
                      alt={`${step.title} step visual`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 90vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 text-sm sm:text-base leading-7 sm:leading-8 text-white/80 font-medium">
                    {step.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Browse by Care Path Section */}
        <section className="py-12 sm:py-24 relative overflow-hidden">
          <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="mb-12 max-w-4xl">
              <span className="inline-flex rounded-full border border-emerald-500/10 bg-emerald-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-800">
                Browse by care path
              </span>
              <h2 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
                Find the right treatment category for your concern.
              </h2>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {serviceGroups.map((group) => (
                <div
                  key={group.title}
                  className="surface-card rounded-[2.2rem] border border-[rgba(30,36,34,0.08)] bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-800">
                      {group.services.length} services available
                    </span>
                    <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">{group.title}</h3>
                    <p className="mt-3 text-sm sm:text-base leading-7 text-[var(--muted)]">{group.intro}</p>

                    <div className="mt-6 space-y-3">
                      {group.services.slice(0, 5).map((service) => (
                        <div
                          key={service.slug}
                          className="rounded-[1.4rem] border border-[rgba(30,36,34,0.06)] bg-[var(--surface)] hover:bg-white hover:border-emerald-500/20 px-5 py-4 transition-all duration-200 group/item"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-sm sm:text-base text-[var(--foreground)] truncate group-hover/item:text-emerald-800">
                                {service.name}
                              </p>
                              <p className="mt-1 text-xs text-[var(--muted)] line-clamp-1">
                                {service.tagline}
                              </p>
                            </div>
                            <Link
                              href={`/services/${service.slug}`}
                              className="text-xs font-bold uppercase tracking-wider text-[var(--brand)] shrink-0 inline-flex items-center gap-1 mt-1"
                            >
                              Explore
                              <span className="text-[10px] transform group-hover/item:translate-x-0.5 transition-transform">↗</span>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Start with Your Concern Section */}
        <section className="py-12 sm:py-24 bg-[linear-gradient(180deg,#faf7f1_0%,#f0e8dc_100%)] relative overflow-hidden border-t border-[rgba(30,36,34,0.06)]">
          <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16 w-full grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            
            {/* Left Column Concern Cloud */}
            <div>
              <span className="inline-flex rounded-full border border-emerald-500/10 bg-emerald-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-800">
                Start with your concern
              </span>
              <h2 className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.12] tracking-tight text-[var(--foreground)]">
                Most people do not begin with a procedure. They begin with a concern.
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-8 text-[var(--muted)]">
                Tell us what bothers you and we will guide you to the right treatment path with honest, pressure-free consultation.
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {siteConfig.concernCoverage.map((concern) => (
                  <span
                    key={concern}
                    className="rounded-full border border-[rgba(30,36,34,0.08)] bg-white px-5 py-3 text-xs sm:text-sm font-bold text-[var(--foreground)] shadow-sm hover:shadow-md hover:border-emerald-500/20 hover:scale-[1.02] transition-all duration-300"
                  >
                    {concern}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column Editorial Map Card */}
            <div className="surface-card rounded-[2.5rem] overflow-hidden border border-[rgba(30,36,34,0.08)] bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="relative min-h-[19rem] overflow-hidden">
                <Image
                  src={siteConfig.homepageGallery[5].src}
                  alt={siteConfig.homepageGallery[5].alt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="p-8 sm:p-10">
                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-800">
                  Delhi NCR Reach
                </span>
                <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                  Easy to access for patients across South Delhi and nearby NCR pockets.
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {siteConfig.neighborhoods.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-[rgba(30,36,34,0.06)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/book-appointment"
                    className="inline-flex items-center justify-center rounded-2xl bg-[var(--brand)] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-emerald-900 transition-all duration-300"
                  >
                    Book consultation
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl border border-[rgba(30,36,34,0.12)] bg-white px-8 py-4 text-xs font-bold uppercase tracking-wider text-[var(--foreground)] shadow-sm hover:bg-[var(--surface)] transition-all duration-300"
                  >
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
