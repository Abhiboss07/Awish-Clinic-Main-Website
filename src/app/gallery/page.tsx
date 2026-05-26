"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { galleryCollections } from "@/data/media";
import { services } from "@/data/services";

const categoryLabels: Record<string, string> = {
  all: "All",
  clinic: "Clinic",
  consultation: "Consultation",
  treatments: "Treatments",
  services: "Services",
};
const serviceGalleryOverrides: Record<string, string> = {
  "breast-enlargement": "/images/gallery/breast-enlargement.png",
  "breast-reduction": "/images/gallery/breast-reduction.png",
  blepharoplasty: "/images/gallery/blepharoplasty.png",
  facelift: "/images/gallery/facelift.png",
  hymenoplasty: "/images/gallery/hymenoplasty.png",
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const galleryItems = useMemo(
    () => [
      ...galleryCollections.clinic.map((item, index) => ({
        id: `clinic-${index}`,
        category: "clinic",
        title: "Clinic environment",
        caption: item.caption || "Clean, organised spaces designed around comfort and privacy.",
        src: item.src,
        alt: item.alt,
      })),
      ...galleryCollections.consultation.map((item, index) => ({
        id: `consult-${index}`,
        category: "consultation",
        title: "Consultation style",
        caption: item.caption || "One-to-one guidance that keeps the conversation easy and clear.",
        src: item.src,
        alt: item.alt,
      })),
      ...galleryCollections.treatments.map((item, index) => ({
        id: `treatment-${index}`,
        category: "treatments",
        title: "Treatment setting",
        caption: item.caption || "Modern equipment and thoughtful session planning.",
        src: item.src,
        alt: item.alt,
      })),
      ...services.slice(0, 8).map((service) => ({
        id: `service-${service.slug}`,
        category: "services",
        title: service.name,
        caption: service.tagline,
        src: serviceGalleryOverrides[service.slug] ?? service.cardImage,
        alt: service.name,
      })),
    ],
    []
  );

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <Header />
      <main className="page-shell flex-1">
        <section className="section-shell">
          <div className="container-shell">
            <div className="grid gap-6 lg:grid-cols-[0.44fr_0.56fr] lg:items-stretch">
              <div className="p-2 sm:p-3">
                <span className="eyebrow">Gallery</span>
                <h1 className="mt-5 text-4xl font-semibold leading-tight text-[var(--foreground)] sm:text-5xl">
                  A closer look at the clinic atmosphere and care experience.
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                  Take a closer look at our consultation rooms, treatment areas and clinic environment at Awish
                  Clinic, Sarita Vihar. See how we care for patients across cosmetic, skin, hair and weight services.
                </p>
              </div>
              <div className="relative min-h-[280px] overflow-hidden rounded-[1.8rem] border border-[rgba(30,36,34,0.08)] bg-white sm:min-h-[340px]">
                <Image
                  src="/images/gallery/awishclinic.png"
                  alt="Awish Clinic reception and lounge area"
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Consultation moments",
                  copy: "See our doctors with patients in real consultation and treatment settings.",
                  src: "/images/gallery/consultation_moments.png",
                  alt: "Consultation moments at Awish Clinic",
                },
                {
                  title: "Treatment spaces",
                  copy: "Our clinic spaces, equipment and treatment rooms across multiple locations.",
                  src: "/images/gallery/treatment_spaces.png",
                  alt: "Treatment spaces at Awish Clinic",
                },
                {
                  title: "Service imagery",
                  copy: "Each service - from hair transplant to cosmetic surgery - shown with dedicated visuals.",
                  src: "/images/gallery/serviceimagery.png",
                  alt: "Service imagery at Awish Clinic",
                },
              ].map((item) => (
                <article key={item.title} className="surface-card overflow-hidden rounded-[1.6rem]">
                  <div className="relative aspect-[16/10]">
                    <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">{item.title}</p>
                    <p className="mt-3 text-lg leading-8 text-[var(--foreground)]">{item.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container-shell">
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveCategory(key)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold ${
                    activeCategory === key
                      ? "bg-[var(--brand)] text-white shadow-[0_16px_42px_rgba(33,77,72,0.18)]"
                      : "border border-[rgba(30,36,34,0.12)] bg-white text-[var(--foreground)] hover:bg-[var(--surface)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item, index) => (
                <article
                  key={item.id}
                  className={`surface-card overflow-hidden rounded-[1.8rem] ${
                    index % 5 === 0 ? "xl:col-span-2" : ""
                  }`}
                >
                  <div className={`relative ${index % 5 === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes={index % 5 === 0 ? "(min-width: 1280px) 52vw, 100vw" : "(min-width: 1280px) 26vw, (min-width: 768px) 42vw, 100vw"}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
                      {categoryLabels[item.category]}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold">{item.title}</h2>
                    <p className="mt-3 text-base leading-8 text-[var(--muted)]">{item.caption}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell bg-[linear-gradient(180deg,#faf7f1_0%,#f0e8dc_100%)]">
          <div className="container-shell grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Consultation-led atmosphere",
                copy: "See real consultation moments, treatment rooms and the day-to-day atmosphere of our clinic.",
              },
              {
                title: "Multiple visual touchpoints",
                copy: "Browse images of our clinic environment, equipment and patient care areas across all locations.",
              },
              {
                title: "Service-specific visuals",
                copy: "Each service — from hair transplant to skin treatments — has dedicated imagery showing the procedure and care involved.",
              },
            ].map((item) => (
              <div key={item.title} className="surface-card rounded-[1.8rem] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {item.title}
                </p>
                <p className="mt-4 text-base leading-8 text-[var(--muted)]">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
