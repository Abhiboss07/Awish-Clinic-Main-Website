"use client";

import type { Service } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import LandingImage from "./LandingImage";
import { buildServiceUrl, getToneTheme, type LandingMediaSet } from "./landingHelpers";

export default function FinalCTA({
  service,
  media,
}: {
  service: Service;
  media?: Pick<LandingMediaSet, "hero" | "clinic">;
}) {
  const primaryUrl = buildServiceUrl(service.primaryCTA.action, service.name);
  const theme = getToneTheme(service.targetAudience.tone);

  return (
    <section className="relative overflow-hidden bg-stone-950 py-20 text-white lg:py-28">
      <div className="absolute inset-0 opacity-35">
        <LandingImage
          src={media?.hero ?? media?.clinic}
          alt="Awish Clinic closing visual"
          className="h-full w-full"
          imageClassName="h-full w-full object-cover"
          fallbackTitle="Awish Clinic"
          fallbackSubtitle="A polished closing image for the final CTA."
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.82)_55%,rgba(2,6,23,0.68)_100%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/56">
              {theme.name} clinic care
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Ready to take the next step with a clinic that feels more personal?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              Book a consultation, ask for honest pricing, and get a treatment plan that feels like it was made for Delhi patients who want quality without the intimidation.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={primaryUrl}
                target={service.primaryCTA.action === "whatsapp" ? "_blank" : undefined}
                rel={service.primaryCTA.action === "whatsapp" ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-semibold text-emerald-950 shadow-[0_18px_50px_rgba(16,185,129,0.3)] transition-transform hover:-translate-y-0.5"
              >
                {service.primaryCTA.text}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/6 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white/12"
              >
                Call Now
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/7 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/52">
                  Consultation
                </p>
                <p className="mt-2 text-sm leading-7 text-white/78">
                  Private, respectful, and focused on what fits your needs.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/7 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/52">
                  Outcome
                </p>
                <p className="mt-2 text-sm leading-7 text-white/78">
                  Premium delivery with an affordability story that feels real.
                </p>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-white/10">
              <LandingImage
                src={media?.clinic ?? media?.hero}
                alt="Clinic support visual"
                className="aspect-[16/11]"
                imageClassName="h-full w-full"
                fallbackTitle="Clinic support"
                fallbackSubtitle="A final supporting image keeps the closing panel from feeling static."
              />
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-white/56">
          {siteConfig.address.street}, {siteConfig.address.area}, {siteConfig.address.city} | {siteConfig.hours.weekdays}
        </p>
      </div>
    </section>
  );
}
