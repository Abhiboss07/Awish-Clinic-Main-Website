import type { AudienceTone, ProcedureDetail } from "@/data/services";
import LandingImage from "./LandingImage";
import LandingSectionHeading from "./LandingSectionHeading";
import { getToneTheme } from "./landingHelpers";

interface Props {
  details: ProcedureDetail;
  steps: string[];
  tone?: AudienceTone;
  media?: {
    procedure: string;
    clinic: string;
  };
}

export default function ProcedureDetails({
  details,
  steps,
  tone = "professional",
  media,
}: Props) {
  const theme = getToneTheme(tone);

  return (
    <section className="bg-[#10212d] py-20 text-white lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.96fr_1.04fr] lg:px-8">
        <div>
          <LandingSectionHeading
            align="left"
            eyebrow="Procedure overview"
            title="Clear steps, no mystery"
            subtitle="Every treatment should feel understandable before it ever feels exciting. We keep the process simple and direct."
            tone={tone}
          />

          <div className="mt-10 space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/6 p-4 backdrop-blur"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white font-semibold text-slate-950">
                  {i + 1}
                </div>
                <div className="pt-0.5">
                  <p className="font-semibold text-white">{step}</p>
                  <p className="mt-1 text-sm leading-7 text-white/68">
                    We explain what happens at this stage so you know what to expect next.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
            <LandingImage
              src={media?.procedure ?? media?.clinic}
              alt="Procedure environment"
              className="aspect-[16/10]"
              imageClassName="h-full w-full"
              fallbackTitle="Procedure environment"
              fallbackSubtitle="A real-world look at the type of space where the service is delivered."
            />
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
              Quick facts
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Duration", value: details.surgeryTime },
                { label: "Recovery", value: details.recoveryPeriod },
                { label: "Painless", value: details.painless ? "Yes" : "Minimal" },
                { label: "Scarless", value: details.scarless ? "Yes" : "Minimal" },
                { label: "Admission", value: details.admitTime },
                { label: "Medication", value: details.medicationDuration },
                { label: "Gym after", value: details.gymAfter },
                { label: "After effects", value: details.afterEffects },
              ].map((detail, i) => (
                <div
                  key={i}
                  className="rounded-[1.25rem] border border-white/10 bg-black/12 p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/52">
                    {detail.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">{detail.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-white/68">
              {theme.name} planning keeps the conversation practical, so treatment time, recovery, and expectations stay realistic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
