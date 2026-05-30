import { siteConfig } from "@/data/siteConfig";
import LandingImage from "./LandingImage";
import { getToneTheme, type LandingMediaSet } from "./landingHelpers";

interface Props {
  media?: Pick<LandingMediaSet, "portrait">;
}

export default function DoctorMiniProfile({ media }: Props) {
  const { doctor } = siteConfig;
  const theme = getToneTheme("professional");

  return (
    <section className="bg-[#faf7f1] py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)]">
          <LandingImage
            src={media?.portrait}
            alt={doctor.name}
            className="aspect-[4/5]"
            imageClassName="h-full w-full"
            priority
            fallbackTitle={doctor.name}
            fallbackSubtitle={doctor.title}
          />
          <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/12 bg-black/40 p-4 text-white backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/58">
              Doctor-led care
            </p>
            <p className="mt-2 text-lg font-semibold">{doctor.name}</p>
            <p className="text-sm text-white/78">{doctor.title}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p
            className={`inline-flex w-fit items-center rounded-full border px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${theme.border} ${theme.surface} ${theme.muted}`}
          >
            Your doctor
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            {doctor.name}
          </h2>
          <p className="mt-4 text-lg font-medium text-stone-700">{doctor.title}</p>
          <p className="mt-2 text-sm text-stone-500">
            {doctor.qualifications} | {doctor.experience}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600">
            {doctor.bio}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Doctor-led consultations", "Affordable treatment plans", "Respectful, private care"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-stone-200 bg-white px-4 py-4 text-sm font-medium text-stone-800"
                >
                  {item}
                </div>
              )
            )}
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Doctor note
            </p>
            <p className="mt-3 text-lg font-semibold leading-8 text-emerald-950">
              &quot;Medicine can cure diseases but only doctors can cure patients.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
