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

        <ServiceTransformationReference service={service} />

        <ServiceTestimonials testimonials={service.testimonials} serviceName={service.name} />

        <section className="section-shell">
          <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="surface-card rounded-[1.8rem] p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">Who this page is for</p>
              <div className="mt-5 space-y-3">
                {service.idealFor.map((item) => (
                  <div key={item} className="rounded-[1.2rem] border border-[rgba(30,36,34,0.08)] bg-white px-4 py-4 text-sm font-medium text-[var(--foreground)]">
                    {item}
                  </div>
                ))}
              </div>
              {service.slug === "breast-reduction" ? (
                <div className="relative mt-5 min-h-[24rem] overflow-hidden rounded-[1.2rem] border border-[rgba(30,36,34,0.08)] bg-[#f6f3ef]">
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

            <div className="surface-card rounded-[1.8rem] p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">Why it works</p>
              <p className="mt-4 text-3xl font-semibold">{service.audienceSummary}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.solutionPoints.map((point) => (
                  <div key={point} className="rounded-[1.2rem] border border-[rgba(30,36,34,0.08)] bg-white p-4 text-sm leading-7 text-[var(--muted)]">
                    <span className="font-semibold text-[var(--foreground)]">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell bg-[rgba(255,255,255,0.45)]">
          <div className="container-shell">
            <div className="relative overflow-hidden rounded-[2rem] bg-[rgba(255,255,255,0.72)] p-6 sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute right-0 top-0 z-0 hidden h-[80%] w-[60%] overflow-hidden rounded-bl-[7rem] md:block">
                <Image
                  src="/images/services/quickfacts.png"
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 32vw, (min-width: 768px) 40vw, 0px"
                  className="object-cover object-center"
                />
              </div>
              <div className="relative z-10 mb-8 max-w-4xl">
                <span className="eyebrow">Quick facts</span>
                <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">The information users <br /> usually look for before <br /> they enquire.</h2>
              </div>
              <div className="relative z-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                  <div key={label} className="surface-card rounded-[1.6rem] p-5">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">{label}</p>
                    <p className="mt-3 text-lg font-semibold leading-7 text-[var(--foreground)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <span className="eyebrow">Process</span>
              <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">How this service is structured.</h2>
              <div className="mt-8 space-y-4">
                {service.procedureSteps.map((step, index) => (
                  <div key={step} className="surface-card rounded-[1.5rem] p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand)] text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-[var(--foreground)]">{step}</p>
                        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                          A cleaner, more direct explanation so users understand what happens next.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow">FAQs</span>
              <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">Answers before the consultation.</h2>
              <div className="mt-8 space-y-4">
                {service.faqs.map((faq) => (
                  <details key={faq.question} className="surface-card rounded-[1.5rem] p-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--foreground)]">
                      {faq.question}
                      <span className="text-[var(--accent)]">+</span>
                    </summary>
                    <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{faq.answer}</p>
                  </details>
                ))}
              </div>

              <div className="relative mt-8 overflow-hidden rounded-[1.8rem] p-6 text-white">
                <Image
                  src="/images/services/why-patient-enquire.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="relative z-10">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">
                    Why patients enquire
                  </p>
                  <p className="mt-3 text-2xl font-semibold">
                    Consultation-first care with <br />clear answers and realistic <br /> planning.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/84">
                    {siteConfig.positioning.trustLine}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.benefits.slice(0, 4).map((benefit) => (
                      <span
                        key={benefit}
                        className="rounded-full bg-white/14 px-4 py-2 text-sm font-semibold text-white backdrop-blur-[2px]"
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
      <Footer />
      <WhatsAppButton />
    </>
  );
}
