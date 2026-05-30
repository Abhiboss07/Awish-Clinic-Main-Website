import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ImagePageHero from "@/components/layout/ImagePageHero";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ServiceTransformationReference from "@/components/services/ServiceTransformationReference";
import ServiceTestimonials from "@/components/ui/ServiceTestimonials";
import { getServiceBySlug, services } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import { generateMainSiteServiceMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Not Found" };
  return generateMainSiteServiceMetadata(service);
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hi, I'm interested in ${service.name} at Awish Clinic.`
  )}`;

  return (
    <>
      <Header />
      <main className="page-shell flex-1">
        {/* Dynamic Editorial Service Hero */}
        <ImagePageHero
          eyebrow="Back to services"
          eyebrowHref="/services"
          title={service.name}
          description={`${service.tagline} ${service.description}`}
          image={service.heroImage}
          imageAlt={service.name}
          actions={[
            {
              href: whatsappUrl,
              label: service.primaryCTA.text,
              external: true,
              newTab: true,
            },
            {
              href: `tel:${siteConfig.phone}`,
              label: service.secondaryCTA.text,
              variant: "ghost",
              external: true,
            },
          ]}
          badges={service.concernTags}
          highlights={[
            {
              eyebrow: "Consultation",
              title: service.procedureDetails.consultation,
            },
            {
              eyebrow: "Time and admission",
              title: `${service.procedureDetails.surgeryTime} | ${service.procedureDetails.admitTime}`,
            },
            {
              eyebrow: "Recovery",
              title: service.procedureDetails.recoveryPeriod,
            },
          ]}
        />

        {/* Dynamic Draggable Comparison Slider (Presents real human images mapped per service) */}
        <ServiceTransformationReference service={service} />

        {/* Dynamic Reviews Testimonials Strip */}
        <ServiceTestimonials testimonials={service.testimonials} serviceName={service.name} />

        {/* Symmetrical Details Split Section */}
        <section className="section-shell">
          <div className="container-shell grid gap-8 lg:grid-cols-2">
            
            {/* Left Column: Who this is for */}
            <div className="surface-card rounded-[2.5rem] p-8 border border-[rgba(30,36,34,0.08)] shadow-sm hover-lift-premium flex flex-col justify-between h-full">
              <div className="space-y-6">
                <span className="eyebrow w-fit border-[rgba(30,36,34,0.08)] bg-white text-[var(--accent)] font-bold">
                  Patient Candidacy
                </span>
                <h3 className="text-3xl font-semibold text-[var(--foreground)] font-serif leading-tight">
                  Who this page is for
                </h3>
                <div className="space-y-3 pt-2">
                  {service.idealFor.map((item) => (
                    <div key={item} className="rounded-[1.2rem] border border-[rgba(30,36,34,0.08)] bg-white px-5 py-4 text-sm font-semibold text-[var(--foreground)] shadow-sm">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {service.slug === "breast-reduction" ? (
                <div className="relative mt-6 min-h-[22rem] overflow-hidden rounded-[1.8rem] border border-[rgba(30,36,34,0.08)] bg-[#f6f3ef]">
                  <Image
                    src="/images/services/breast-reduction-image.png"
                    alt="Breast reduction consultation lifestyle visual"
                    fill
                    sizes="(min-width: 1024px) 36vw, 100vw"
                    className="object-contain"
                  />
                </div>
              ) : null}
            </div>

            {/* Right Column: Why it works */}
            <div className="surface-card rounded-[2.5rem] p-8 border border-[rgba(30,36,34,0.08)] shadow-sm hover-lift-premium flex flex-col justify-between h-full">
              <div className="space-y-6">
                <span className="eyebrow w-fit border-[rgba(30,36,34,0.08)] bg-white text-[var(--accent)] font-bold">
                  Treatment Efficiency
                </span>
                <h3 className="text-3xl font-semibold text-[var(--foreground)] font-serif leading-tight">
                  Why it works
                </h3>
                <p className="text-xl font-medium leading-8 text-[var(--foreground)]">{service.audienceSummary}</p>
                <div className="grid gap-4 sm:grid-cols-2 pt-2">
                  {service.solutionPoints.map((point) => (
                    <div key={point} className="rounded-[1.2rem] border border-[rgba(30,36,34,0.08)] bg-white p-5 text-xs leading-6 text-[var(--muted)] shadow-sm">
                      <span className="font-semibold text-[var(--foreground)]">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Aligned Slabs for Quick Facts */}
        <section className="section-shell bg-[rgba(255,255,255,0.45)]">
          <div className="container-shell">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[rgba(255,255,255,0.72)] border border-[rgba(30,36,34,0.08)] p-6 sm:p-8 lg:p-12 shadow-sm">
              <div className="pointer-events-none absolute right-0 top-0 z-0 hidden h-[90%] w-[55%] overflow-hidden rounded-bl-[8rem] border-l border-b border-[rgba(30,36,34,0.06)] md:block">
                <Image
                  src="/images/services/quickfacts.png"
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 32vw, (min-width: 768px) 40vw, 0px"
                  className="object-cover object-center"
                />
              </div>
              <div className="relative z-10 mb-10 max-w-2xl space-y-4">
                <span className="eyebrow">Quick Facts</span>
                <h2 className="text-4xl font-semibold sm:text-5xl leading-tight">
                  Everything you usually look for before you enquire.
                </h2>
              </div>
              <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Consultation", service.procedureDetails.consultation],
                  ["Time", service.procedureDetails.surgeryTime],
                  ["Admission", service.procedureDetails.admitTime],
                  ["Recovery", service.procedureDetails.recoveryPeriod],
                  ["Medication", service.procedureDetails.medicationDuration],
                  ["Gym", service.procedureDetails.gymAfter],
                  ["Painless", service.procedureDetails.painless ? "Yes" : "Depends on plan"],
                  ["After effects", service.procedureDetails.afterEffects],
                ].map(([label, value]) => (
                  <div key={label} className="surface-card rounded-[1.6rem] p-5 shadow-sm border border-[rgba(30,36,34,0.06)] transition hover:shadow-md">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">{label}</p>
                    <p className="mt-3.5 text-base font-semibold leading-7 text-[var(--foreground)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Symmetrical Process Steps & FAQ Directory Accordions */}
        <section className="section-shell">
          <div className="container-shell grid gap-12 lg:grid-cols-2 items-start">
            
            {/* Left Column: Process Steps */}
            <div className="space-y-6">
              <span className="eyebrow">Treatment Journey</span>
              <h2 className="text-4xl font-semibold sm:text-5xl">How this service is structured.</h2>
              <div className="space-y-4 pt-4">
                {service.procedureSteps.map((step, index) => (
                  <div key={step} className="surface-card rounded-[1.8rem] p-6 border border-[rgba(30,36,34,0.08)] shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand)] text-sm font-bold text-white shadow-md">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-[var(--foreground)] leading-snug">{step}</p>
                        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                          A clean, clinical explanation outlining exact safety milestones and recovery checks.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: FAQ Accordions */}
            <div className="space-y-6">
              <span className="eyebrow">Frequently Asked</span>
              <h2 className="text-4xl font-semibold sm:text-5xl">Answers before the consultation.</h2>
              
              <div className="space-y-4 pt-4">
                {service.faqs.map((faq) => (
                  <details key={faq.question} className="surface-card rounded-[1.8rem] p-6 border border-[rgba(30,36,34,0.08)] shadow-sm group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--foreground)] focus:outline-none">
                      <span className="leading-snug">{faq.question}</span>
                      <span className="text-[var(--brand)] font-bold text-lg transition duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-4 text-sm leading-7 text-[var(--muted)] border-t border-[rgba(30,36,34,0.06)] pt-4">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>

              {/* Patient Enquire Graphic Card */}
              <div className="relative mt-8 overflow-hidden rounded-[2.2rem] p-8 text-white border border-white/10 shadow-lg min-h-[16rem]">
                <Image
                  src="/images/services/why-patient-enquire.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="relative z-10 flex flex-col justify-end h-full min-h-[12rem] space-y-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      Why Patients Enquire
                    </p>
                    <p className="mt-2 text-2xl font-semibold leading-snug">
                      Consultation-first care with clear answers and realistic planning.
                    </p>
                  </div>
                  <p className="text-xs leading-6 text-white/80">
                    {siteConfig.positioning.trustLine}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.benefits.slice(0, 4).map((benefit) => (
                      <span
                        key={benefit}
                        className="rounded-full bg-white/12 border border-white/8 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-[2px]"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
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
