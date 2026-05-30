import type { AudienceTone } from "@/data/services";
import LandingImage from "./LandingImage";
import LandingSectionHeading from "./LandingSectionHeading";
import {
  getToneAccentClasses,
  getToneSolutionTitle,
  getToneTheme,
} from "./landingHelpers";

interface Props {
  solutions: string[];
  benefits: string[];
  tone?: AudienceTone;
  serviceName?: string;
  media?: {
    hero: string;
    procedure: string;
    gallery: string[];
  };
}

export default function SolutionSection({
  solutions,
  benefits,
  tone = "professional",
  serviceName,
  media,
}: Props) {
  const theme = getToneTheme(tone);
  const accent = getToneAccentClasses(tone);
  const featureImage = media?.procedure ?? media?.gallery?.[1] ?? media?.hero;

  return (
    <>
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <LandingSectionHeading
                align="left"
                eyebrow={theme.eyebrow}
                title={getToneSolutionTitle(tone)}
                subtitle={`Everything we do for ${serviceName ?? "this treatment"} is meant to feel clear, measured, and genuinely useful.`}
                tone={tone}
              />

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {solutions.map((point, i) => (
                  <div
                    key={i}
                    className={`rounded-[1.5rem] border ${theme.border} ${theme.surface} p-5`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${accent.surface}`}>
                        <svg
                          className={`h-5 w-5 ${accent.text}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900">{point}</p>
                        <p className="mt-2 text-sm leading-7 text-stone-600">
                          A treatment step or recommendation that supports better comfort, better results, and fewer surprises.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_35%),linear-gradient(180deg,_rgba(255,255,255,0.8),_rgba(255,255,255,0.96))]" />
              <div className="grid gap-4 rounded-[2rem] border border-stone-200 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
                <LandingImage
                  src={featureImage}
                  alt={`${serviceName ?? "Clinic treatment"} visual`}
                  className="aspect-[4/3] rounded-[1.5rem]"
                  imageClassName="h-full w-full"
                  fallbackTitle="Treatment planning"
                  fallbackSubtitle="A calm visual cue for the treatment environment and care process."
                />
                <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[1.25rem] border border-stone-200 bg-white p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                      Why patients feel better here
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-700">
                      <li>Transparent recommendations and no unnecessary add-ons.</li>
                      <li>Affordable planning that still feels polished.</li>
                      <li>Care designed for Delhi patients who value convenience.</li>
                    </ul>
                  </div>
                  <div className="rounded-[1.25rem] border border-stone-200 bg-stone-950 p-5 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                      Key benefits
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {benefits.slice(0, 5).map((benefit) => (
                        <span
                          key={benefit}
                          className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-medium text-white/88"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f172a] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
              Outcomes
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              What the process should feel like
            </h3>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-center backdrop-blur"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <svg className="h-6 w-6 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-semibold leading-6">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
