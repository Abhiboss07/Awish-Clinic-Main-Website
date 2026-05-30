import type { AudienceTone, FAQ } from "@/data/services";
import LandingSectionHeading from "./LandingSectionHeading";
import { getToneFaqIntro } from "./landingHelpers";

interface Props {
  faqs: FAQ[];
  serviceName: string;
  tone?: AudienceTone;
}

export default function FAQAccordion({
  faqs,
  serviceName,
  tone = "professional",
}: Props) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LandingSectionHeading
          eyebrow="Questions"
          title="The answers people usually want first"
          subtitle={getToneFaqIntro(tone, serviceName)}
          tone={tone}
        />

        <div className="mx-auto mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-[2rem] border border-stone-200 bg-[linear-gradient(180deg,#f5efe6_0%,#ffffff_100%)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
              Why it helps
            </p>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-stone-900">
              People decide faster when the process feels transparent.
            </p>
            <p className="mt-4 text-base leading-8 text-stone-600">
              We use the FAQ section to remove uncertainty, not to overwhelm. The goal is a clean, trustworthy answer set for patients in Delhi who want confidence before booking.
            </p>
            <div className="mt-8 space-y-3">
              {["Clear expectations", "Privacy-minded answers", "Affordable treatment context"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[1rem] border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-800"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-[1.5rem] border border-stone-200 bg-stone-50/80 shadow-[0_16px_40px_rgba(15,23,42,0.04)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
                  <span className="pr-4 text-sm font-semibold tracking-tight text-stone-900 sm:text-base">
                    {faq.question}
                  </span>
                  <svg
                    className="h-5 w-5 shrink-0 text-stone-500 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm leading-7 text-stone-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
