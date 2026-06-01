import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import {
  procedureCategories,
  procedureHref,
  type ProcedureCategory,
  type ProcedureTone,
} from "@/data/procedures";

export const metadata: Metadata = {
  title: "Procedures",
  description:
    "A detailed list of all the aesthetic, surgical, non-surgical and dental procedures available at Awish Clinic, organised by Women, Men, Breast, Face, Body, Non Surgical and Dental care.",
};

const PAGE_TOP_ID = "procedures-top";

// Every category band uses the same height so the background image is
// presented at a consistent, preserved size regardless of its aspect ratio.
const BAND_MIN_H = "xl:min-h-[44rem]";
const OVAL_BOX_H = 38; // rem — fixed height of the desktop oval positioning box

/** Per-tone styling for the overlay, procedure pills and category title. */
const toneStyles: Record<
  ProcedureTone,
  { overlay: string; pill: string; title: string }
> = {
  accent: {
    overlay:
      "bg-[linear-gradient(120deg,rgba(20,14,11,0.72)_0%,rgba(20,14,11,0.42)_100%)]",
    pill: "bg-[rgba(138,79,57,0.62)] text-white hover:bg-[rgba(138,79,57,0.82)]",
    title: "text-white",
  },
  lightSolid: {
    overlay:
      "bg-[linear-gradient(120deg,rgba(15,18,17,0.62)_0%,rgba(15,18,17,0.28)_100%)]",
    pill: "bg-white text-[var(--foreground)] hover:bg-[var(--surface-strong)]",
    title: "text-white",
  },
  beige: {
    overlay: "bg-[rgba(196,176,160,0.78)]",
    pill: "bg-white/20 text-white hover:bg-white/35",
    title: "text-white",
  },
  tanGlass: {
    overlay:
      "bg-[linear-gradient(120deg,rgba(28,22,16,0.42)_0%,rgba(28,22,16,0.18)_100%)]",
    pill: "bg-[rgba(120,98,80,0.55)] text-white hover:bg-[rgba(120,98,80,0.78)]",
    title: "text-white",
  },
  outline: {
    overlay:
      "bg-[linear-gradient(120deg,rgba(8,10,12,0.78)_0%,rgba(8,10,12,0.5)_100%)]",
    pill: "border border-white/70 bg-transparent text-white hover:bg-white/15",
    title: "text-white",
  },
};

// A uniform pill width per section: wide enough for the longest label, so every
// box in a section lines up. Estimated from label length (text-base) + padding.
function uniformPillWidth(procedures: string[]) {
  const maxLen = Math.max(...procedures.map((p) => p.length));
  return `${(maxLen * 0.56 + 3.5).toFixed(2)}rem`;
}

// One consistent pill box size across every section.
function ProcedurePill({
  label,
  className,
  minWidth,
}: {
  label: string;
  className: string;
  minWidth?: string;
}) {
  return (
    <Link
      href={procedureHref(label)}
      style={minWidth ? { minWidth } : undefined}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-3.5 text-base font-semibold shadow-[0_10px_30px_rgba(18,24,28,0.12)] backdrop-blur-sm ${className}`}
    >
      {label}
    </Link>
  );
}

function TopButton({ small = false }: { small?: boolean }) {
  const size = small ? "h-11 w-11 text-[10px]" : "h-12 w-12 text-[11px]";
  return (
    <Link
      href={`#${PAGE_TOP_ID}`}
      className={`inline-flex items-center justify-center rounded-full bg-[var(--foreground)] ${size} font-bold uppercase tracking-[0.18em] text-white hover:bg-black`}
      aria-label="Back to top"
    >
      Top
    </Link>
  );
}

/** Mobile fallback shared by every band: title on top, pills wrapped below. */
function MobilePills({
  category,
  titleClass,
  pillClass,
}: {
  category: ProcedureCategory;
  titleClass: string;
  pillClass: string;
}) {
  return (
    <div className="flex flex-col items-center gap-7 xl:hidden">
      <div className="flex flex-col items-center gap-4">
        <h2 className={`text-4xl font-semibold sm:text-5xl ${titleClass}`}>
          {category.name}
        </h2>
        <TopButton small />
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {category.procedures.map((label) => (
          <ProcedurePill key={label} label={label} className={pillClass} />
        ))}
      </div>
    </div>
  );
}

/** Default band: pills ringed on an ellipse around the centred title. */
function OvalBand({ category }: { category: ProcedureCategory }) {
  const tone = toneStyles[category.tone];
  const count = category.procedures.length;
  const radiusX = 48; // % of width — wider than tall for a stretched oval
  const radiusY = 34; // % of height

  // Evenly spaced points on the ellipse, then re-ordered so the labels fill it
  // in vertical reading order: top, then down in left/right pairs, then bottom.
  // capAtBottom mirrors the oval so the lone pill sits at the bottom (Dental).
  const points = category.procedures.map((_, index) => {
    const angle = (-90 + (360 / count) * index) * (Math.PI / 180);
    const y = 50 + radiusY * Math.sin(angle);
    return {
      x: 50 + radiusX * Math.cos(angle),
      y: category.capAtBottom ? 100 - y : y,
    };
  });
  const slots = [...points].sort((a, b) =>
    Math.abs(a.y - b.y) > 0.5 ? a.y - b.y : a.x - b.x
  );

  return (
    <section
      id={category.slug}
      className={`relative isolate flex items-center overflow-hidden scroll-mt-24 ${BAND_MIN_H}`}
    >
      <Image
        src={category.image.src}
        alt={category.image.alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className={`absolute inset-0 ${tone.overlay}`} />

      <div className="relative w-full container-shell py-14">
        {/* Desktop: pills sit on an oval around the centred title. */}
        <div
          className="relative mx-auto hidden max-w-5xl xl:block"
          style={{ height: `${OVAL_BOX_H}rem` }}
        >
          {category.procedures.map((label, index) => {
            const { x, y } = slots[index];
            return (
              <div
                key={label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <ProcedurePill label={label} className={tone.pill} />
              </div>
            );
          })}

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
            <h2 className={`text-5xl font-semibold ${tone.title}`}>
              {category.name}
            </h2>
            <TopButton />
          </div>
        </div>

        <MobilePills
          category={category}
          titleClass={tone.title}
          pillClass={tone.pill}
        />
      </div>
    </section>
  );
}

/** Pills in a centred zigzag: single, pair, single, pair... down the panel. */
function ZigzagPills({
  procedures,
  pillClass,
}: {
  procedures: string[];
  pillClass: string;
}) {
  const rows: string[][] = [];
  for (let i = 0, single = true; i < procedures.length; single = !single) {
    if (single) {
      rows.push([procedures[i]]);
      i += 1;
    } else {
      rows.push(procedures.slice(i, i + 2));
      i += 2;
    }
  }
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-7 px-8">
      {rows.map((row, index) => (
        <div
          key={index}
          className={`flex gap-4 ${row.length === 1 ? "justify-center" : "justify-between"}`}
        >
          {row.map((label) => (
            <ProcedurePill key={label} label={label} className={pillClass} />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Pills wrapped into a tight centred cluster on the panel. */
function ClusterPills({
  procedures,
  pillClass,
}: {
  procedures: string[];
  pillClass: string;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-wrap justify-center gap-4 px-10">
      {procedures.map((label) => (
        <ProcedurePill key={label} label={label} className={pillClass} />
      ))}
    </div>
  );
}

/** Split band: pills on a tan panel beside the image, title straddling the seam. */
function SplitBand({ category }: { category: ProcedureCategory }) {
  const tone = toneStyles[category.tone];
  const imageSide = category.imageSide ?? "right";
  const panel = category.tone === "beige" ? "bg-[#c4b0a1]" : "bg-[#d8cabe]";

  // The title sits on the seam: the panel edge that touches the image.
  const seamTitle =
    imageSide === "right"
      ? "right-0 translate-x-1/2 text-[var(--foreground)]"
      : "left-0 -translate-x-1/2 text-white";

  const Pills = category.panelArrangement === "zigzag" ? ZigzagPills : ClusterPills;

  return (
    <section id={category.slug} className="relative scroll-mt-24">
      {/* Desktop: panel + image side by side, title on the seam. */}
      <div className="hidden xl:grid xl:grid-cols-2">
        <div
          className={`relative flex min-h-[44rem] items-center ${panel} px-6 py-24 ${
            imageSide === "right" ? "xl:order-1" : "xl:order-2"
          }`}
        >
          <Pills procedures={category.procedures} pillClass={tone.pill} />

          <div
            className={`absolute top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-3 ${seamTitle}`}
          >
            <h2 className="text-5xl font-semibold">{category.name}</h2>
            <TopButton />
          </div>
        </div>

        <div
          className={`relative min-h-[44rem] ${
            imageSide === "right" ? "xl:order-2" : "xl:order-1"
          }`}
        >
          <Image
            src={category.image.src}
            alt={category.image.alt}
            fill
            sizes="50vw"
            className="object-cover"
            style={{ objectPosition: category.imagePosition ?? "center" }}
          />
        </div>
      </div>

      {/* Mobile/tablet: image on top, tan panel of pills below. */}
      <div className="xl:hidden">
        <div className="relative h-64 sm:h-80">
          <Image
            src={category.image.src}
            alt={category.image.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className={`${panel} px-6 py-12`}>
          <div className="mb-8 flex flex-col items-center gap-3">
            <h2 className="text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">
              {category.name}
            </h2>
            <TopButton small />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {category.procedures.map((label) => (
              <ProcedurePill key={label} label={label} className={tone.pill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Columns band: two vertical columns of pills flanking the centred title. */
function ColumnsBand({ category }: { category: ProcedureCategory }) {
  const tone = toneStyles[category.tone];
  const left = category.procedures.filter((_, index) => index % 2 === 0);
  const right = category.procedures.filter((_, index) => index % 2 === 1);
  // Men: uniform-width pills. Body: content-width (uniformPills: false).
  const minWidth =
    category.uniformPills === false
      ? undefined
      : uniformPillWidth(category.procedures);
  return (
    <section
      id={category.slug}
      className={`relative isolate flex items-center overflow-hidden scroll-mt-24 ${BAND_MIN_H}`}
    >
      <Image
        src={category.image.src}
        alt={category.image.alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className={`absolute inset-0 ${tone.overlay}`} />

      <div className="relative w-full container-shell py-14">
        {/* Desktop: two columns either side of the centred title. */}
        <div className="hidden items-center gap-12 xl:grid xl:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-col items-end gap-9">
            {left.map((label) => (
              <ProcedurePill
                key={label}
                label={label}
                className={tone.pill}
                minWidth={minWidth}
              />
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 px-8">
            <h2 className={`text-6xl font-semibold ${tone.title}`}>
              {category.name}
            </h2>
            <TopButton />
          </div>

          <div className="flex flex-col items-start gap-9">
            {right.map((label) => (
              <ProcedurePill
                key={label}
                label={label}
                className={tone.pill}
                minWidth={minWidth}
              />
            ))}
          </div>
        </div>

        <MobilePills
          category={category}
          titleClass={tone.title}
          pillClass={tone.pill}
        />
      </div>
    </section>
  );
}

function CategoryBand({ category }: { category: ProcedureCategory }) {
  if (category.layout === "split") {
    return <SplitBand category={category} />;
  }
  if (category.layout === "columns") {
    return <ColumnsBand category={category} />;
  }
  return <OvalBand category={category} />;
}

export default function ProceduresPage() {
  return (
    <>
      <Header />
      <main id={PAGE_TOP_ID} className="page-shell flex-1">
        <section className="section-shell">
          <div className="container-shell text-center">
            <span className="eyebrow">Procedures</span>
            <h1 className="mt-6 text-4xl font-semibold sm:text-5xl lg:text-6xl">
              Procedures
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Here is a detailed list of the cosmetic, surgical, non-surgical and
              dental procedures available to you at Awish Clinic. Select a category
              to jump to it, then tap a procedure to read the related blog posts.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {procedureCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`#${category.slug}`}
                  className="rounded-full bg-[var(--accent-soft)] px-6 py-3 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="space-y-3 pb-6">
          {procedureCategories.map((category) => (
            <CategoryBand key={category.slug} category={category} />
          ))}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
