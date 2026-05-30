import type { AudienceTone } from "@/data/services";
import LandingSectionHeading from "./LandingSectionHeading";
import {
  buildPriceInquiryMessage,
  buildWhatsAppUrl,
  getToneTheme,
} from "./landingHelpers";

interface Props {
  priceIndicator: string;
  serviceName?: string;
  tone?: AudienceTone;
}

export default function PricingSection({
  priceIndicator,
  serviceName = "this treatment",
  tone = "professional",
}: Props) {
  const theme = getToneTheme(tone);
  const whatsappUrl = buildWhatsAppUrl(buildPriceInquiryMessage());

  return (
    <section className="bg-[linear-gradient(180deg,#faf7f1_0%,#f5efe6_100%)] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <LandingSectionHeading
          eyebrow={theme.eyebrow}
          title="Transparent pricing that still feels premium"
          subtitle={`The goal is simple: make ${serviceName.toLowerCase()} feel affordable without making it feel cheap.`}
          tone={tone}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-white/85 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              Price cue
            </p>
            <p className="mt-4 text-4xl font-semibold tracking-tight text-stone-900">
              {priceIndicator}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-600">
              We keep the conversation direct, share only the cost factors that matter, and help patients understand where value is coming from.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Free consultation", "EMI options", "No hidden surprises"].map((item) => (
                <div
                  key={item}
                  className={`rounded-[1.25rem] border ${theme.border} ${theme.surface} px-4 py-3 text-sm font-medium ${theme.text}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-stone-950 p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/52">
              Ask for an exact quote
            </p>
            <p className="mt-4 text-2xl font-semibold tracking-tight">
              Share your details and get a practical answer.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/68">
              The quote conversation is designed to be comfortable, respectful, and fast, so Delhi patients do not have to chase answers.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Procedure-specific guidance",
                "Options based on your goals",
                "Clinician-led consultation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-[1.1rem] border border-white/10 bg-white/5 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  <span className="text-sm text-white/86">{item}</span>
                </div>
              ))}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-6 py-3.5 text-sm font-semibold text-emerald-950 transition-transform hover:-translate-y-0.5"
            >
              Get Exact Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
