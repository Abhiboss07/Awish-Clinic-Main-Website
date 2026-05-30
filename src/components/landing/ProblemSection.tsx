import type { AudienceTone } from "@/data/services";
import LandingImage from "./LandingImage";
import LandingSectionHeading from "./LandingSectionHeading";
import {
  getToneAccentClasses,
  getToneProblemTitle,
  getToneTheme,
} from "./landingHelpers";

interface Props {
  problems: string[];
  tone: AudienceTone;
  serviceName?: string;
  media?: {
    support: string;
    clinic: string;
    gallery: string[];
  };
}

export default function ProblemSection({
  problems,
  tone,
  serviceName,
  media,
}: Props) {
  const theme = getToneTheme(tone);
  const accent = getToneAccentClasses(tone);
  const supportImage = media?.support ?? media?.gallery?.[0] ?? media?.clinic;

  return (
    <section className="bg-[#f5efe6] py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-900 text-white shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
          <LandingImage
            src={supportImage}
            alt={`${serviceName ?? "Clinic"} patient consultation`}
            className="h-full min-h-[460px]"
            imageClassName="h-full w-full"
            fallbackTitle={serviceName ?? "Patient consultation"}
            fallbackSubtitle="A calmer consultation setting with space for honest questions."
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.1),rgba(2,6,23,0.74))]" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
              Local clinic care in Delhi
            </p>
            <p className="mt-3 max-w-md text-2xl font-semibold leading-tight">
              The concerns are real. The solution should feel simple and respectful.
            </p>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/76">
              {theme.name} care means we listen first, explain the options clearly, and keep the process grounded in what works for your day-to-day life.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <LandingSectionHeading
            align="left"
            eyebrow={theme.eyebrow}
            title={getToneProblemTitle(tone)}
            subtitle={`For ${serviceName ?? "this service"}, we keep the discussion focused on the concerns people actually feel, not on overdone promises.`}
            tone={tone}
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {problems.map((point, i) => (
              <div
                key={i}
                className="rounded-[1.5rem] border border-stone-200 bg-white/80 p-5 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${accent.surface}`}
                  >
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
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-stone-900">
                      {point}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-stone-600">
                      We translate this concern into a treatment plan with clear expectations and practical aftercare.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
