import type { AudienceTone, Service, ServiceCategory } from "@/data/services";
import { clinicMedia } from "@/data/media";
import { siteConfig } from "@/data/siteConfig";

export type LandingMediaSet = {
  hero: string;
  portrait: string;
  clinic: string;
  procedure: string;
  support: string;
  gallery: string[];
};

type ToneTheme = {
  name: string;
  eyebrow: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
};

const toneThemes: Record<AudienceTone, ToneTheme> = {
  casual: {
    name: "Approachable",
    eyebrow: "Friendly care that feels easy to start",
    surface: "bg-emerald-50",
    text: "text-emerald-800",
    muted: "text-stone-600",
    border: "border-emerald-200",
  },
  professional: {
    name: "Precise",
    eyebrow: "Measured care with clear treatment steps",
    surface: "bg-slate-50",
    text: "text-slate-800",
    muted: "text-slate-600",
    border: "border-slate-200",
  },
  empowering: {
    name: "Confident",
    eyebrow: "Results-led care that restores confidence",
    surface: "bg-teal-50",
    text: "text-teal-800",
    muted: "text-teal-700",
    border: "border-teal-200",
  },
  supportive: {
    name: "Reassuring",
    eyebrow: "Guided care for decisions that matter",
    surface: "bg-amber-50",
    text: "text-amber-800",
    muted: "text-stone-600",
    border: "border-amber-200",
  },
};

const fallbackImages: Record<ServiceCategory, Omit<LandingMediaSet, "portrait">> = {
  surgical: {
    hero: clinicMedia.heroConsultation.src,
    clinic: clinicMedia.clinicInterior.src,
    procedure: clinicMedia.treatmentSuite.src,
    support: clinicMedia.surgeonConsultation.src,
    gallery: [
      clinicMedia.heroConsultation.src,
      clinicMedia.surgeonConsultation.src,
      clinicMedia.treatmentSuite.src,
    ],
  },
  "skin-hair": {
    hero: clinicMedia.skinSession.src,
    clinic: clinicMedia.clinicInterior.src,
    procedure: clinicMedia.laserSession.src,
    support: clinicMedia.planningSession.src,
    gallery: [
      clinicMedia.skinSession.src,
      clinicMedia.laserSession.src,
      clinicMedia.clinicInterior.src,
    ],
  },
  weight: {
    hero: clinicMedia.officeConsultation.src,
    clinic: clinicMedia.privateConsultation.src,
    procedure: clinicMedia.clinicianPortrait.src,
    support: clinicMedia.planningSession.src,
    gallery: [
      clinicMedia.officeConsultation.src,
      clinicMedia.privateConsultation.src,
      clinicMedia.clinicianPortrait.src,
    ],
  },
  concern: {
    hero: clinicMedia.heroConsultation.src,
    clinic: clinicMedia.clinicInterior.src,
    procedure: clinicMedia.treatmentSuite.src,
    support: clinicMedia.planningSession.src,
    gallery: [
      clinicMedia.heroConsultation.src,
      clinicMedia.privateConsultation.src,
      clinicMedia.clinicInterior.src,
    ],
  },
};

function cleanSrc(src?: string) {
  return src && src.trim().length > 0 ? src : undefined;
}

function pickFallback(service: Service) {
  const fallback = fallbackImages[service.category] ?? fallbackImages.concern;
  return {
    ...fallback,
    portrait: cleanSrc(siteConfig.doctor.image) ?? clinicMedia.doctorPortrait.src,
  };
}

export function getToneTheme(tone: AudienceTone) {
  return toneThemes[tone];
}

export function getToneAccentClasses(tone: AudienceTone) {
  const theme = getToneTheme(tone);
  return { surface: theme.surface, text: theme.text };
}

export function getToneHeadline(tone: AudienceTone, serviceName: string) {
  if (tone === "casual") return `Real results for ${serviceName.toLowerCase()} without the clinic stiffness`;
  if (tone === "empowering") return `Confidence-first ${serviceName.toLowerCase()} for natural-looking results`;
  if (tone === "supportive") return `A calmer, guided path to ${serviceName.toLowerCase()}`;
  return `${serviceName} planned with precision, privacy, and clarity`;
}

export function getToneSubtitle(tone: AudienceTone, serviceName: string) {
  if (tone === "casual") return "Affordable care, clear answers, and a team that keeps things simple from first call to follow-up.";
  if (tone === "empowering") return `Designed to help you feel more like yourself again with ${serviceName.toLowerCase()} that still looks natural.`;
  if (tone === "supportive") return "For people who want honest guidance, a respectful conversation, and a treatment plan that fits real life.";
  return "Structured consultations, transparent planning, and treatment decisions that are easy to understand.";
}

export function getToneProblemTitle(tone: AudienceTone) {
  if (tone === "casual") return "What patients usually want fixed";
  if (tone === "empowering") return "What should no longer hold you back";
  if (tone === "supportive") return "What we can help ease";
  return "What typically brings people in";
}

export function getToneSolutionTitle(tone: AudienceTone) {
  if (tone === "casual") return "A clearer, easier path forward";
  if (tone === "empowering") return "Care that is built around confidence";
  if (tone === "supportive") return "Answers, support, and a treatment plan";
  return "A structured plan with fewer unknowns";
}

export function getToneFaqIntro(tone: AudienceTone, serviceName: string) {
  if (tone === "casual") return `Straight answers about ${serviceName.toLowerCase()} before you decide.`;
  if (tone === "empowering") return `Everything you want to know before choosing ${serviceName.toLowerCase()} with confidence.`;
  if (tone === "supportive") return "We have answered the most common questions so you can move ahead calmly and informed.";
  return `A practical checklist of the questions patients usually ask about ${serviceName.toLowerCase()}.`;
}

export function buildLandingMedia(service: Service): LandingMediaSet {
  const fallback = pickFallback(service);
  const hero = cleanSrc(service.heroImage) ?? fallback.hero;
  const card = cleanSrc(service.cardImage) ?? fallback.support;
  const serviceGallery = service.gallery
    .map((item) => cleanSrc(item.src))
    .filter(Boolean) as string[];
  const gallery = Array.from(
    new Set([
      hero,
      card,
      fallback.portrait,
      fallback.clinic,
      fallback.procedure,
      fallback.support,
      ...serviceGallery,
      ...fallback.gallery,
    ])
  );

  return {
    hero,
    portrait: fallback.portrait,
    clinic: fallback.clinic,
    procedure: fallback.procedure,
    support: fallback.support,
    gallery: gallery.slice(0, 5),
  };
}

export function buildWhatsAppUrl(message: string) {
  const number = siteConfig.whatsapp.replace(/[^0-9]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildServiceUrl(
  action: "whatsapp" | "call" | "form",
  serviceName: string
) {
  if (action === "whatsapp") {
    return buildWhatsAppUrl(
      `Hi, I'm interested in ${serviceName} at Awish Clinic. Please share details.`
    );
  }

  if (action === "call") {
    return `tel:${siteConfig.phone}`;
  }

  return "#contact-form";
}

export function buildPriceInquiryMessage() {
  return "Hi, I'd like to know the pricing details.";
}

export function describeAudience(service: Service) {
  const gender =
    service.targetAudience.gender === "all"
      ? "all patients"
      : service.targetAudience.gender === "male"
        ? "men"
        : "women";

  return `${service.targetAudience.ageRange} years, ${gender}`;
}
