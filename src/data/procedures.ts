import { clinicMedia, type MediaAsset } from "@/data/media";

/**
 * Visual treatment for a category band. Drives the overlay strength, the pill
 * styling and the title colour so each section echoes the reference design
 * while staying on the Awish Clinic palette.
 */
export type ProcedureTone =
  | "accent" // translucent accent pills, white text (Women)
  | "lightSolid" // solid white pills, dark text (Men, Breast)
  | "beige" // soft beige pills, dark text (Face)
  | "tanGlass" // translucent tan pills, white text (Body)
  | "outline"; // transparent pills with white outline (Non Surgical, Dental)

/**
 * How the category band is composed.
 * - "oval": pills ringed on an ellipse around a centred title (over the image).
 * - "split": tan panel of clustered pills on the left, image on the right,
 *   with the title sitting on the boundary (the Face reference layout).
 * - "columns": two vertical columns of pills flanking the centred title
 *   over the image (the Men reference layout).
 */
export type ProcedureLayout = "oval" | "split" | "columns";

export interface ProcedureCategory {
  slug: string;
  name: string;
  image: MediaAsset;
  tone: ProcedureTone;
  layout?: ProcedureLayout;
  /** For the "split" layout: which side the image sits on. Default "right". */
  imageSide?: "left" | "right";
  /** For the "split" layout: how the panel pills are arranged. Default "cluster". */
  panelArrangement?: "cluster" | "zigzag";
  /** For the "columns" layout: force a uniform pill width. Default true. */
  uniformPills?: boolean;
  /** For the "oval" layout: place the lone pill at the bottom instead of the top. */
  capAtBottom?: boolean;
  /** CSS object-position for the background image (e.g. "75% 50%"). Default center. */
  imagePosition?: string;
  procedures: string[];
}

const categorySeeds: ProcedureCategory[] = [
  {
    slug: "women",
    name: "Women",
    image: { src: "/images/procedures/Women.png", alt: "Women's procedures" },
    tone: "accent",
    procedures: [
      "Monsplasty",
      "Labiaplasty",
      "Hymenplasty",
      "G-Spot Augmentation",
      "Perineoplasty",
      "Clitoral Hood Reduction",
      "Labia Fat Grafting",
      "Vaginoplasty",
    ],
  },
  {
    slug: "men",
    name: "Men",
    image: { src: "/images/procedures/Men.png", alt: "Men's procedures" },
    tone: "lightSolid",
    layout: "columns",
    procedures: [
      "Liposuction",
      "Rhinoplasty",
      "Blepharoplasty",
      "Fillers",
      "Gynecomastia (Chest Reduction)",
      "Body Contouring",
      "Facelift",
      "Pubic Lift",
    ],
  },
  {
    slug: "breast",
    name: "Breast",
    image: { src: "/images/procedures/Breast.png", alt: "Breast procedures" },
    tone: "lightSolid",
    layout: "split",
    imageSide: "left",
    panelArrangement: "zigzag",
    procedures: [
      "Breast Reduction",
      "Breast Implants",
      "Fat Grafting To Breast",
      "Breast Lift",
      "Breast Implant Removal",
      "Breast Augmentation",
      "Implant Revision",
    ],
  },
  {
    slug: "face",
    name: "Face",
    image: { src: "/images/procedures/face.png", alt: "Face procedures" },
    imagePosition: "78% 50%",
    tone: "beige",
    layout: "split",
    imageSide: "right",
    panelArrangement: "cluster",
    procedures: [
      "Brow Lift",
      "Neck Lift",
      "Facelift",
      "Forehead",
      "Ears",
      "Nose",
      "Eyes",
      "Lip",
      "Dimples",
      "Cheek",
      "Jawline",
      "Chin",
      "Fat Grafting",
      "Facial Implants",
      "Buccal Fat Removal",
    ],
  },
  {
    slug: "body",
    name: "Body",
    image: { src: "/images/procedures/body.png", alt: "Body procedures" },
    tone: "tanGlass",
    layout: "columns",
    procedures: [
      "Liposuction",
      "Mommy Makeover",
      "Tummy Tuck",
      "Brazilian Butt Lift",
      "Arm Lift / Brachioplasty",
      "Thigh Lift",
    ],
  },
  {
    slug: "non-surgical",
    name: "Non Surgical",
    image: clinicMedia.clinicInterior,
    tone: "outline",
    procedures: [
      "Lip Fillers",
      "Dermal Fillers",
      "Scar Treatment",
      "Thread Lift",
      "Ultherapy",
      "Botox",
      "Mesotherapy",
      "Anti-wrinkle Injections",
      "Kybella",
      "Chemical Peels",
      "Skin Rejuvenation",
    ],
  },
  {
    slug: "dental",
    name: "Dental",
    image: { src: "/images/procedures/dental.png", alt: "Dental procedures" },
    tone: "outline",
    capAtBottom: true,
    procedures: [
      "Dental Implants",
      "Bridges",
      "Dental Bonding",
      "Tooth Extractions",
      "Teeth Whitening",
      "Dentures",
      "Braces",
      "Fillings",
      "Veneers",
      "Caps / Crowns",
      "Tooth Contouring & Reshaping",
    ],
  },
];

// Display order of the category bands and the jump-to chips.
const displayOrder = [
  "face",
  "breast",
  "body",
  "men",
  "women",
  "non-surgical",
  "dental",
];

export const procedureCategories: ProcedureCategory[] = displayOrder
  .map((slug) => categorySeeds.find((category) => category.slug === slug))
  .filter((category): category is ProcedureCategory => Boolean(category));

/**
 * Procedures that map to an existing Awish service page. Everything not listed
 * here falls back to the contact form.
 */
const procedureServiceSlugs: Record<string, string> = {
  Facelift: "facelift",
  Rhinoplasty: "rhinoplasty",
  Nose: "rhinoplasty",
  Blepharoplasty: "blepharoplasty",
  Eyes: "blepharoplasty",
  Dimples: "dimple-creation",
  "Breast Reduction": "breast-reduction",
  "Breast Augmentation": "breast-enlargement",
  "Breast Implants": "breast-enlargement",
  Hymenplasty: "hymenoplasty",
  "Scar Treatment": "pimple-scar-treatment",
};

/**
 * Where a procedure pill links: its matching service page when one exists,
 * otherwise the contact form.
 */
export function procedureHref(label: string): string {
  const slug = procedureServiceSlugs[label];
  return slug ? `/services/${slug}` : "/contact#enquiry-form";
}
