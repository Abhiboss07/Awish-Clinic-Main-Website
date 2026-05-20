export interface MediaAsset {
  src: string;
  alt: string;
  caption?: string;
}

const pexels = (id: number, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export const clinicMedia = {
  heroConsultation: {
    src: pexels(5215008),
    alt: "Doctor discussing an aesthetic treatment plan with a patient in a calm clinic office.",
    caption: "Private consultation with a clear treatment discussion.",
  },
  privateConsultation: {
    src: pexels(5214997),
    alt: "Patient receiving a focused clinic consultation across a treatment desk.",
    caption: "One-to-one consultation and candidacy review.",
  },
  doctorPortrait: {
    src: pexels(6129680),
    alt: "Clinician in scrubs standing in a modern clinic environment.",
    caption: "Approachable medical care, not celebrity branding.",
  },
  clinicInterior: {
    src: pexels(5619453),
    alt: "Clean clinic interior with soft lighting and a modern reception feel.",
    caption: "A clean, private and organised clinic atmosphere.",
  },
  treatmentSuite: {
    src: pexels(16571735),
    alt: "Private treatment room prepared for a clinic procedure.",
    caption: "Comfortable treatment spaces designed around privacy.",
  },
  skinSession: {
    src: pexels(7446690),
    alt: "Dermatology-style skin consultation and facial assessment in progress.",
    caption: "Skin and hair concerns assessed before recommending treatment.",
  },
  laserSession: {
    src: pexels(29021128),
    alt: "Laser hair removal session being performed in a professional clinic.",
    caption: "Technology-led treatment with a clinical setup.",
  },
  clinicianPortrait: {
    src: pexels(32160039),
    alt: "Confident doctor standing in a bright clinic room.",
    caption: "Professional care with a reassuring local-clinic feel.",
  },
  planningSession: {
    src: pexels(6285383),
    alt: "Doctor and patient reviewing concerns together in a treatment consultation.",
    caption: "Treatment planning built around the patient's goals and comfort.",
  },
  officeConsultation: {
    src: pexels(7282008),
    alt: "Doctor consultation happening in a bright medical office.",
    caption: "Supportive conversations before and after treatment.",
  },
  surgeonConsultation: {
    src: pexels(8657368),
    alt: "Male doctor speaking with a patient during a clinic consultation.",
    caption: "Surgical questions answered with clarity and discretion.",
  },
} satisfies Record<string, MediaAsset>;

export const homepageGallery: MediaAsset[] = [
  clinicMedia.heroConsultation,
  clinicMedia.treatmentSuite,
  clinicMedia.skinSession,
  clinicMedia.clinicInterior,
  clinicMedia.planningSession,
  clinicMedia.clinicianPortrait,
];

export const galleryCollections = {
  clinic: [
    clinicMedia.clinicInterior,
    clinicMedia.treatmentSuite,
    clinicMedia.clinicianPortrait,
  ],
  consultation: [
    clinicMedia.heroConsultation,
    clinicMedia.privateConsultation,
    clinicMedia.officeConsultation,
    clinicMedia.surgeonConsultation,
  ],
  treatments: [
    clinicMedia.skinSession,
    clinicMedia.laserSession,
    clinicMedia.planningSession,
  ],
};
