"use client";

import type { Service } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";
import LandingImage from "./LandingImage";
import {
  buildServiceUrl,
  describeAudience,
  getToneHeadline,
  getToneSubtitle,
  getToneTheme,
  type LandingMediaSet,
} from "./landingHelpers";

export default function LandingHero({
  service,
  media,
}: {
  service: Service;
  media: LandingMediaSet;
}) {
  const primaryUrl = buildServiceUrl(service.primaryCTA.action, service.name);
  const secondaryUrl = buildServiceUrl(service.secondaryCTA.action, service.name);
  const secondaryTarget =
    service.secondaryCTA.action === "whatsapp" ? "_blank" : undefined;
  const secondaryRel =
    service.secondaryCTA.action === "whatsapp" ? "noopener noreferrer" : undefined;
  const tone = getToneTheme(service.targetAudience.tone);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.22),_transparent_30%),linear-gradient(135deg,#07121f_0%,#102636_45%,#183334_100%)] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.44))]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/90">
              {siteConfig.name} - Delhi
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">
              {tone.name} care
            </span>
            <span className="inline-flex items-center rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-100">
              {describeAudience(service)}
            </span>
          </div>

          <p className="mb-4 max-w-2xl text-sm font-semibold uppercase tracking-[0.28em] text-emerald-200/90">
            {tone.eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {getToneHeadline(service.targetAudience.tone, service.name)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
            {getToneSubtitle(service.targetAudience.tone, service.name)} {service.description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={primaryUrl}
              target={service.primaryCTA.action === "whatsapp" ? "_blank" : undefined}
              rel={service.primaryCTA.action === "whatsapp" ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-slate-900 shadow-[0_18px_60px_rgba(15,23,42,0.2)] transition-transform hover:-translate-y-0.5"
            >
              {service.primaryCTA.text}
            </a>
            <a
              href={secondaryUrl}
              target={secondaryTarget}
              rel={secondaryRel}
              className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/6 px-7 py-3.5 text-base font-semibold text-white/92 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white/12"
            >
              {service.secondaryCTA.text}
            </a>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/12 bg-white/6 p-4 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                Positioning
              </p>
              <p className="mt-2 text-sm font-medium text-white">Affordable, premium care</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/6 p-4 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                Consultation
              </p>
              <p className="mt-2 text-sm font-medium text-white">Clear answers, no pressure</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/6 p-4 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                Location
              </p>
              <p className="mt-2 text-sm font-medium text-white">Built for Delhi patients</p>
            </div>
          </div>

          {service.priceIndicator && (
            <p className="mt-6 text-sm text-white/72">
              {service.priceIndicator} - Free consultation available.
            </p>
          )}
        </div>

        <div className="relative">
          <div className="absolute -right-8 top-8 h-44 w-44 rounded-full bg-emerald-400/18 blur-3xl" />
          <div className="absolute -left-8 bottom-4 h-52 w-52 rounded-full bg-sky-300/14 blur-3xl" />
          <div className="relative grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-white/7 shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
              <LandingImage
                src={media.hero}
                alt={`${service.name} hero`}
                className="h-full min-h-[420px]"
                imageClassName="h-full w-full"
                objectPosition="center top"
                priority
                fallbackTitle={service.tagline}
                fallbackSubtitle="Premium visual placeholder while the production image is wired up."
              />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.72))] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/68">
                  {siteConfig.address.city}
                </p>
                <p className="mt-2 max-w-xs text-lg font-semibold leading-tight text-white">
                  {service.shortName} designed for clear results and calm consultations.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.75rem] border border-white/12 bg-white/7 p-4 backdrop-blur">
                <LandingImage
                  src={media.portrait}
                  alt={siteConfig.doctor.name}
                  className="aspect-[4/5] rounded-[1.25rem]"
                  imageClassName="h-full w-full"
                  objectPosition="center top"
                  fallbackTitle={siteConfig.doctor.name}
                  fallbackSubtitle={siteConfig.doctor.title}
                />
                <div className="mt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/52">
                    Doctor-led care
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/90">
                    Every consultation is built around honest advice and realistic expectations.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/7">
                  <LandingImage
                    src={media.procedure}
                    alt={`${service.name} treatment environment`}
                    className="aspect-[16/11]"
                    imageClassName="h-full w-full"
                    fallbackTitle="Clinic-grade treatment environment"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/7">
                    <LandingImage
                      src={media.clinic}
                      alt="Awish Clinic interior"
                      className="aspect-square"
                      imageClassName="h-full w-full"
                      fallbackTitle="Clinic interior"
                    />
                  </div>
                  <div className="rounded-[1.5rem] border border-white/12 bg-white/7 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/52">
                      Quick facts
                    </p>
                    <div className="mt-4 space-y-3">
                      <p className="text-sm text-white/86">Delhi-focused patient base</p>
                      <p className="text-sm text-white/86">Affordable plans, premium delivery</p>
                      <p className="text-sm text-white/86">Discreet, respectful consultations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
