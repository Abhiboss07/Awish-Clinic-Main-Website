import { siteConfig } from "@/data/siteConfig";
import LandingImage from "./LandingImage";
import LandingSectionHeading from "./LandingSectionHeading";

interface Props {
  media?: {
    clinic: string;
  };
}

export default function LocationCTA({ media }: Props) {
  return (
    <section className="bg-stone-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LandingSectionHeading
          eyebrow="Location"
          title="Built for Delhi patients who want convenience"
          subtitle="The clinic experience should feel simple to find, easy to visit, and confident once you arrive."
          tone="professional"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <LandingImage
              src={media?.clinic}
              alt="Awish Clinic exterior or reception"
              className="aspect-[16/10]"
              imageClassName="h-full w-full"
              fallbackTitle="Clinic arrival experience"
              fallbackSubtitle="A polished visual helps the location section feel like a real place, not a template."
            />
            <div className="p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                    Address
                  </p>
                  <p className="mt-2 text-sm leading-7 text-stone-700">
                    {[siteConfig.address.street, siteConfig.address.area, siteConfig.address.city]
                      .filter(Boolean)
                      .join(", ")}
                    {siteConfig.address.pincode ? ` - ${siteConfig.address.pincode}` : ""}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                    Hours
                  </p>
                  <p className="mt-2 text-sm leading-7 text-stone-700">
                    Mon-Fri: {siteConfig.hours.weekdays}
                    <br />
                    Sat: {siteConfig.hours.saturday}
                    <br />
                    Sun: {siteConfig.hours.sunday}
                  </p>
                </div>
              </div>
              <a
                href={siteConfig.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Get directions
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <iframe
              src={siteConfig.address.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 350 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Awish Clinic Location"
            />
            <div className="grid gap-4 p-4 sm:grid-cols-3">
              {["Discreet visits", "Local Delhi access", "Clear, friendly support"].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-4 text-sm font-medium text-stone-800"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
