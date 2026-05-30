import LandingImage from "./LandingImage";
import LandingSectionHeading from "./LandingSectionHeading";

interface Props {
  serviceName?: string;
  media?: {
    gallery: string[];
    hero: string;
    support: string;
  };
}

export default function BeforeAfterGallery({ serviceName = "this treatment", media }: Props) {
  const gallery = media?.gallery ?? [media?.hero ?? "", media?.support ?? ""].filter(Boolean);

  return (
    <section className="bg-stone-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LandingSectionHeading
          eyebrow="Visual proof"
          title="A more visual way to show credibility"
          subtitle={`Instead of a generic stock gallery, we show the kind of imagery that helps patients picture how ${serviceName} is handled in real life.`}
          tone="professional"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {(gallery.length ? gallery : [media?.hero, media?.support].filter(Boolean))
            .slice(0, 3)
            .map((src, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)]"
              >
                <div className="relative">
                  <LandingImage
                    src={src}
                    alt={`${serviceName} gallery ${i + 1}`}
                    className="aspect-[4/5]"
                    imageClassName="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    fallbackTitle={`${serviceName} visual ${i + 1}`}
                    fallbackSubtitle="A supporting image for a richer, more credible landing page."
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur">
                    {i === 0 ? "Consultation" : i === 1 ? "Treatment" : "Follow-up"}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-stone-900">
                    {i === 0 ? "Detailed first visit" : i === 1 ? "Care in progress" : "Thoughtful recovery support"}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-stone-600">
                    Designed to feel premium and calm, while still making affordability feel believable.
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
