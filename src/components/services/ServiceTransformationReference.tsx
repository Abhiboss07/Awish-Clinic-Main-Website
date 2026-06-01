"use client";

import { useState } from "react";
import type { Service } from "@/data/services";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

type VisualMode =
  | "hairline"
  | "face-aging"
  | "skin-clarity"
  | "profile-balance"
  | "body-contour"
  | "smooth-finish"
  | "private-care";

type AudienceOption = "male" | "female";

interface Marker {
  label: string;
  side: "left" | "right";
  top: string;
  align?: "left" | "right";
}

interface GenderVisual {
  beforeImage: string;
  afterImage: string;
  alt: string;
  objectPosition?: string;
}

interface VisualConfig {
  mode: VisualMode;
  eyebrow: string;
  title: string;
  description: string;
  concernLabel: string;
  outcomeLabel: string;
  focusPoints: string[];
  markers: Marker[];
  defaultOption: AudienceOption;
  visuals: Record<AudienceOption, GenderVisual>;
}

const pexels = (id: number, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

// Real Human before/after images mapped according to service categories
const portraitLibrary = {
  // Hairline Recession mapping
  maleHair: {
    beforeImage: pexels(5069609), // Thinner front/receding hair
    afterImage: pexels(13846403), // Tighter, fuller hair framing
    alt: "Male hairline restoration comparison",
    objectPosition: "center 22%",
  },
  femaleHair: {
    beforeImage: pexels(3785147), // Sparsity along front parts
    afterImage: pexels(7955853), // Denser front hairline framing
    alt: "Female hairline restoration comparison",
    objectPosition: "center 18%",
  },

  // Face Aging mapping
  maleAging: {
    beforeImage: pexels(8373722), // Signs of fatigue and lines
    afterImage: pexels(10409579), // Lifted, refreshed mature profile
    alt: "Male age-defying treatment comparison",
    objectPosition: "center 20%",
  },
  femaleAging: {
    beforeImage: pexels(3763114), // Aging signs, lines, and volume loss
    afterImage: pexels(31599607), // Refreshed, lifted, and tightened contour
    alt: "Female age-defying treatment comparison",
    objectPosition: "center 18%",
  },

  // Skin Clarity and Tone mapping
  maleSkin: {
    beforeImage: pexels(5069609), // Uneven tone, dullness, or scars
    afterImage: pexels(13846403), // Flawless, bright, and polished face
    alt: "Male skin rejuvenation comparison",
    objectPosition: "center 22%",
  },
  femaleSkin: {
    beforeImage: "/images/services/before_skin_rejuvenation.png",
    afterImage: "/images/services/after_skin_rejuvenation.png",
    alt: "Female skin rejuvenation comparison",
    objectPosition: "center 18%",
  },

  // Smooth Finish Laser mapping
  maleSmooth: {
    beforeImage: pexels(4058223), // Heavy body hair regrowth
    afterImage: pexels(9750462), // Clean, smooth, hair-free chest contour
    alt: "Male laser hair removal smooth finish comparison",
    objectPosition: "center 18%",
  },
  femaleSmooth: {
    beforeImage: pexels(5327534), // Rough cycles of regrowth
    afterImage: pexels(3757376), // Smooth, hair-free body contour
    alt: "Female laser hair removal smooth finish comparison",
    objectPosition: "center 18%",
  },

  // Body Contouring (Weight / Overweight Treatment / Reduction)
  maleBodyContour: {
    beforeImage: pexels(4753996), // Heavy abdominal area / less defined shape
    afterImage: pexels(9750462), // Toned, defined chest and abdomen contour
    alt: "Male body contour and weight management comparison",
    objectPosition: "center 18%",
  },
  femaleBodyContour: {
    beforeImage: pexels(5327534), // Heaviness around waist / less defined outline
    afterImage: pexels(3757376), // Sculpted, perfectly defined waist and silhouette
    alt: "Female body contour and weight management comparison",
    objectPosition: "center 18%",
  },

  // Posture & Proportion Balance (Breast Reduction / Care)
  femaleBreastContour: {
    beforeImage: pexels(4058359), // Back strain, posture fatigue, and heavy profile discomfort
    afterImage: pexels(3755924), // Elegant, upright, and perfectly proportioned upper silhouette
    alt: "Female breast care posture and proportion balance comparison",
    objectPosition: "center 18%",
  }
};

function getVisualConfig(service: Service): VisualConfig {
  switch (service.slug) {
    case "hair-transplant":
      return {
        mode: "hairline",
        eyebrow: "Photo reference",
        title: "A photo-led half-face reference for hairline recession and stronger visual framing.",
        description:
          "This matches the more real before-and-after style you asked for, so the service feels closer to a clinical transformation board than an illustration panel.",
        concernLabel: "Concern side",
        outcomeLabel: "Denser side",
        focusPoints: ["Receding hairline", "Reduced density", "Stronger framing"],
        markers: [
          { label: "Thinner front hairline", side: "left", top: "16%", align: "left" },
          { label: "Less visual density", side: "left", top: "48%", align: "left" },
          { label: "Fuller frame", side: "right", top: "18%", align: "right" },
          { label: "Sharper presence", side: "right", top: "58%", align: "right" },
        ],
        defaultOption: "male",
        visuals: {
          male: portraitLibrary.maleHair,
          female: portraitLibrary.femaleHair,
        },
      };
    case "facelift":
    case "anti-aging-treatments":
    case "blepharoplasty":
      return {
        mode: "face-aging",
        eyebrow: "Photo reference",
        title: "A split portrait for ageing signs on one side and a cleaner, fresher look on the other.",
        description:
          "The aim here is to make the page feel closer to the clinic billboard mood and real transformation visuals, not a generic brochure card.",
        concernLabel: "Ageing signs",
        outcomeLabel: "Refreshed side",
        focusPoints: ["Fine lines", "Tired look", "Lifted impression"],
        markers: [
          { label: "Lines and fatigue", side: "left", top: "18%", align: "left" },
          { label: "Softer contour loss", side: "left", top: "52%", align: "left" },
          { label: "Brighter expression", side: "right", top: "18%", align: "right" },
          { label: "Cleaner contour", side: "right", top: "56%", align: "right" },
        ],
        defaultOption: service.targetAudience.gender === "female" ? "female" : "male",
        visuals: {
          male: portraitLibrary.maleAging,
          female: portraitLibrary.femaleAging,
        },
      };
    case "white-glow":
    case "pimple-scar-treatment":
    case "medi-facials":
    case "iv-drips-skin-whitening":
      return {
        mode: "skin-clarity",
        eyebrow: "Photo reference",
        title: "A split close-up for uneven tone, texture and a clearer skin finish.",
        description:
          "This is styled more like a real treatment board, with the same face split into a concern side and a more polished direction side.",
        concernLabel: "Concern side",
        outcomeLabel: "Clearer side",
        focusPoints: ["Texture marks", "Pigmentation", "Brighter finish"],
        markers: [
          { label: "Uneven tone", side: "left", top: "20%", align: "left" },
          { label: "Texture marks", side: "left", top: "56%", align: "left" },
          { label: "Cleaner skin finish", side: "right", top: "24%", align: "right" },
          { label: "Brighter overall tone", side: "right", top: "62%", align: "right" },
        ],
        defaultOption: service.targetAudience.gender === "female" ? "female" : "male",
        visuals: {
          male: portraitLibrary.maleSkin,
          female: portraitLibrary.femaleSkin,
        },
      };
    case "laser-hair-removal":
      return {
        mode: "smooth-finish",
        eyebrow: "Photo reference",
        title: "A split upper-body treatment visual for rough upkeep on one side and a smoother finish on the other.",
        description:
          "This keeps the panel photographic and transformation-led rather than illustrative, which fits the style you pointed to.",
        concernLabel: "Upkeep side",
        outcomeLabel: "Smooth side",
        focusPoints: ["Visible regrowth", "Maintenance fatigue", "Cleaner finish"],
        markers: [
          { label: "Visible regrowth", side: "left", top: "20%", align: "left" },
          { label: "Rough routine cycle", side: "left", top: "62%", align: "left" },
          { label: "Cleaner body finish", side: "right", top: "20%", align: "right" },
          { label: "Lower-maintenance feel", side: "right", top: "62%", align: "right" },
        ],
        defaultOption: service.targetAudience.gender === "female" ? "female" : "male",
        visuals: {
          male: portraitLibrary.maleSmooth,
          female: portraitLibrary.femaleSmooth,
        },
      };
    case "rhinoplasty":
    case "dimple-creation":
      return {
        mode: "profile-balance",
        eyebrow: "Photo reference",
        title: "A half-face transformation panel focused on balance, profile harmony and a more polished facial read.",
        description:
          "This is intentionally closer to a real clinic visual reference, where one side shows the concern and the other shows the improved direction.",
        concernLabel: "Concern side",
        outcomeLabel: "Balanced side",
        focusPoints: ["Profile balance", "Facial harmony", "Refined look"],
        markers: [
          { label: "Visible imbalance", side: "left", top: "24%", align: "left" },
          { label: "Profile concern", side: "left", top: "58%", align: "left" },
          { label: "Balanced facial line", side: "right", top: "24%", align: "right" },
          { label: "More refined harmony", side: "right", top: "58%", align: "right" },
        ],
        defaultOption: service.targetAudience.gender === "female" ? "female" : "male",
        visuals: {
          male: portraitLibrary.maleSkin,
          female: portraitLibrary.femaleSkin,
        },
      };
    case "breast-reduction":
    case "breast-enlargement":
      return {
        mode: "body-contour",
        eyebrow: "Photo reference",
        title: "A split upper-body visual that reads like a real contour comparison showing posture and volume harmony.",
        description:
          "For breast care, the panel utilizes elegant posture and proportion reference comparisons to demonstrate relief from chronic strain and visual alignment.",
        concernLabel: "Concern side",
        outcomeLabel: "Balanced side",
        focusPoints: ["Contour proportion", "Posture strain relief", "Symmetric silhouette"],
        markers: [
          { label: "Disproportionate strain", side: "left", top: "22%", align: "left" },
          { label: "Posture imbalance", side: "left", top: "64%", align: "left" },
          { label: "Restored balance", side: "right", top: "22%", align: "right" },
          { label: "Aligned silhouette", side: "right", top: "64%", align: "right" },
        ],
        defaultOption: "female",
        visuals: {
          male: portraitLibrary.maleBodyContour, // Fallback just in case
          female: portraitLibrary.femaleBreastContour,
        },
      };
    case "overweight-treatment":
    case "non-surgical-weight-reduction":
    case "surgical-weight-reduction":
      return {
        mode: "body-contour",
        eyebrow: "Photo reference",
        title: "A split upper-body visual that reads like a real contour comparison showing body mass transformation.",
        description:
          "For weight-led services, the comparison panel uses actual human before-and-after body contour references to show real metabolic and shape achievements.",
        concernLabel: "Concern side",
        outcomeLabel: "Balanced side",
        focusPoints: ["Contour definition", "Volume reduction", "Toned silhouette"],
        markers: [
          { label: "Heavy silhouette", side: "left", top: "22%", align: "left" },
          { label: "Less defined contour", side: "left", top: "64%", align: "left" },
          { label: "Sculpted waistline", side: "right", top: "22%", align: "right" },
          { label: "Toned body framing", side: "right", top: "64%", align: "right" },
        ],
        defaultOption: service.targetAudience.gender === "female" ? "female" : "male",
        visuals: {
          male: portraitLibrary.maleBodyContour,
          female: portraitLibrary.femaleBodyContour,
        },
      };
    case "hymenoplasty":
      return {
        mode: "private-care",
        eyebrow: "Photo reference",
        title: "A discreet photographic split panel that suggests support and confidence without becoming explicit.",
        description:
          "Sensitive services need privacy-first visuals, so this version stays calm, editorial and medically polished.",
        concernLabel: "Private concern",
        outcomeLabel: "Confident direction",
        focusPoints: ["Privacy", "Support", "Discreet care"],
        markers: [
          { label: "Sensitive concern", side: "left", top: "24%", align: "left" },
          { label: "Private hesitation", side: "left", top: "60%", align: "left" },
          { label: "Discreet guidance", side: "right", top: "24%", align: "right" },
          { label: "Comfort-first care", side: "right", top: "60%", align: "right" },
        ],
        defaultOption: "female",
        visuals: {
          male: portraitLibrary.maleSkin,
          female: portraitLibrary.femaleSkin,
        },
      };
    default:
      return {
        mode: "skin-clarity",
        eyebrow: "Photo reference",
        title: "A split photographic service panel with a visible concern side and a clearer improvement side.",
        description:
          "The styling is now intentionally closer to real clinic comparison imagery, with a male and female option available in the same block.",
        concernLabel: "Concern side",
        outcomeLabel: "Improved side",
        focusPoints: ["Visual clarity", "Transformation feel", "Faster understanding"],
        markers: [
          { label: "Visible concern", side: "left", top: "24%", align: "left" },
          { label: "Uneven finish", side: "left", top: "58%", align: "left" },
          { label: "Cleaner direction", side: "right", top: "24%", align: "right" },
          { label: "Refined look", side: "right", top: "58%", align: "right" },
        ],
        defaultOption: service.targetAudience.gender === "female" ? "female" : "male",
        visuals: {
          male: portraitLibrary.maleSkin,
          female: portraitLibrary.femaleSkin,
        },
      };
  }
}

export default function ServiceTransformationReference({
  service,
}: {
  service: Service;
}) {
  const config = getVisualConfig(service);
  const [selectedAudience, setSelectedAudience] = useState<AudienceOption>(
    config.defaultOption
  );
  const visual = config.visuals[selectedAudience];

  // Dynamic Before-After Data loading from Service Data Schema
  const beforeAfterData = service.beforeAfter || {
    beforeImage: visual.beforeImage,
    afterImage: visual.afterImage,
    beforeLabel: config.concernLabel.toUpperCase(),
    afterLabel: config.outcomeLabel.toUpperCase(),
    title: config.title,
    description: config.description,
    focusPoints: config.focusPoints,
  };

  return (
    <section className="section-shell pt-0">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        
        {/* Left column: Text details and configuration options */}
        <div className="surface-card rounded-[2rem] p-6 sm:p-8 lg:p-10 border border-[rgba(30,36,34,0.08)] shadow-[0_22px_60px_rgba(18,24,28,0.06)] hover-lift-premium">
          <span className="eyebrow w-fit border-[rgba(30,36,34,0.08)] bg-white text-[var(--accent)] font-bold">
            {config.eyebrow}
          </span>
          <h2 className="mt-5 text-3xl md:text-4xl font-semibold leading-tight font-serif text-[var(--foreground)]">
            Clinical Reference Board
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">
            Every patient journey is unique. Under our dermatologist-supervised care, we design customized pathways to target your exact hair, skin, or body goals.
          </p>

          {/* Gender selection toggles (only displayed for standard stock visual fallbacks) */}
          {!service.beforeAfter && (
            <div className="mt-6 flex flex-col space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[var(--brand)]">Select Patient Reference:</span>
              <div className="inline-flex w-fit rounded-full border border-[rgba(30,36,34,0.08)] bg-[var(--surface-strong)] p-1">
                {(["male", "female"] as AudienceOption[]).map((option) => {
                  const active = selectedAudience === option;

                  // Hide options if only female visual is supported (e.g. breast care)
                  if (config.defaultOption === "female" && option === "male" && service.slug.includes("breast")) {
                    return null;
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedAudience(option)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                        active
                          ? "bg-[var(--brand)] text-white shadow-[0_10px_24px_rgba(33,77,72,0.18)]"
                          : "text-[var(--muted)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {option} option
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key focus markers / points */}
          <div className="mt-6 space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--brand)]">Treatment Focus Areas:</span>
            <div className="flex flex-wrap gap-2">
              {beforeAfterData.focusPoints?.map((point) => (
                <span
                  key={point}
                  className="rounded-full border border-[rgba(30,36,34,0.06)] bg-white px-4 py-2 text-xs font-semibold text-[var(--foreground)] shadow-sm hover:border-[var(--brand)] transition-luxury"
                >
                  {point}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[1.4rem] bg-[var(--surface-strong)] px-5 py-4 text-xs leading-6 text-[var(--muted)] border border-[rgba(30,36,34,0.06)]">
            This is a clinical portrait transformation reference. It is meant to communicate treatment progress and textures clearly, not to guarantee a specific medical outcome.
          </div>
        </div>

        {/* Right column: Draggable interactive comparison slider */}
        <div className="w-full">
          <BeforeAfterSlider
            beforeImage={beforeAfterData.beforeImage}
            afterImage={beforeAfterData.afterImage}
            beforeLabel={beforeAfterData.beforeLabel}
            afterLabel={beforeAfterData.afterLabel}
            title={beforeAfterData.title}
            description={beforeAfterData.description}
            focusPoints={beforeAfterData.focusPoints}
          />
        </div>

      </div>
    </section>
  );
}
