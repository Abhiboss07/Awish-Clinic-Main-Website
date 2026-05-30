import type { AudienceTone } from "@/data/services";
import LandingImage from "./LandingImage";
import LandingSectionHeading from "./LandingSectionHeading";
import { getToneTheme } from "./landingHelpers";

const testimonials = [
  {
    name: "Rahul S.",
    text: "The consultation was direct and honest. I felt comfortable asking basic questions, and the result looked natural.",
  },
  {
    name: "Priya M.",
    text: "It felt premium without feeling intimidating. The team made the whole process easier than I expected.",
  },
  {
    name: "Vikram K.",
    text: "Quick recovery, clear instructions, and a better result than the stock clinics I had checked earlier.",
  },
];

interface Props {
  tone?: AudienceTone;
  media?: {
    gallery: string[];
    hero: string;
  };
}

export default function TestimonialStrip({ tone = "professional", media }: Props) {
  const theme = getToneTheme(tone);

  return (
    <section className="bg-[#0b1720] py-20 text-white lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LandingSectionHeading
          eyebrow="Trust"
          title="The kind of feedback that matters"
          subtitle="Patients notice the feeling of the whole experience, not just the result. That matters for a clinic built around comfort and affordability."
          tone={tone}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 shadow-[0_26px_80px_rgba(0,0,0,0.24)]">
            <LandingImage
              src={media?.gallery?.[0] ?? media?.hero}
              alt="Patient experience visual"
              className="h-full min-h-[420px]"
              imageClassName="h-full w-full"
              fallbackTitle="Patient-first presentation"
              fallbackSubtitle="A supporting visual keeps the section feeling credible and image-rich."
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.7))]" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/56">
                {theme.name} impression
              </p>
              <p className="mt-3 max-w-md text-2xl font-semibold leading-tight">
                Calm, clear, and built for patients who want real care without a luxury-clinic attitude.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-[1.5rem] border border-white/10 bg-white/7 p-6 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 text-sm font-semibold text-white">
                    {t.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                      Verified patient
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/72">&quot;{t.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
