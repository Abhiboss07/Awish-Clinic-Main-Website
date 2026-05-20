import { clinicMedia, type MediaAsset } from "@/data/media";

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  text: string;
  location?: string;
}

export interface BeforeAfter {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
  focusPoints?: string[];
}

export interface ProcedureDetail {
  consultation: string;
  surgeryTime: string;
  admitTime: string;
  painless: boolean;
  scarless: boolean;
  recoveryPeriod: string;
  medicationDuration: string;
  gymAfter: string;
  afterEffects: string;
}

export interface ServiceImage {
  src: string;
  alt: string;
  caption?: string;
}

export type AudienceTone =
  | "casual"
  | "professional"
  | "empowering"
  | "supportive";
export type ServiceCategory = "surgical" | "skin-hair" | "weight" | "concern";

export interface Service {
  slug: string;
  subdomain: string;
  name: string;
  shortName: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  audienceSummary: string;
  idealFor: string[];
  concernTags: string[];
  problemPoints: string[];
  solutionPoints: string[];
  benefits: string[];
  procedureSteps: string[];
  procedureDetails: ProcedureDetail;
  heroImage: string;
  cardImage: string;
  gallery: ServiceImage[];
  targetAudience: {
    ageRange: string;
    gender: "male" | "female" | "all";
    tone: AudienceTone;
  };
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  faqs: FAQ[];
  priceIndicator: string;
  primaryCTA: { text: string; action: "whatsapp" | "call" | "form" };
  secondaryCTA: { text: string; action: "whatsapp" | "call" | "form" };
  beforeAfter?: BeforeAfter;
  testimonials?: Testimonial[];
}

type ServiceSeed = Omit<
  Service,
  "heroImage" | "cardImage" | "gallery" | "metaTitle" | "metaDescription"
> & {
  hero: MediaAsset;
  card: MediaAsset;
  gallery?: MediaAsset[];
  metaTitle?: string;
  metaDescription?: string;
};

const imageCard = (asset: MediaAsset): ServiceImage => ({
  src: asset.src,
  alt: asset.alt,
  caption: asset.caption,
});

const surgicalGallery = [
  clinicMedia.heroConsultation,
  clinicMedia.surgeonConsultation,
  clinicMedia.treatmentSuite,
];
const skinGallery = [
  clinicMedia.skinSession,
  clinicMedia.laserSession,
  clinicMedia.clinicInterior,
];
const weightGallery = [
  clinicMedia.privateConsultation,
  clinicMedia.officeConsultation,
  clinicMedia.clinicianPortrait,
];

const surgicalDetails: ProcedureDetail = {
  consultation: "Private candidacy review",
  surgeryTime: "Case dependent",
  admitTime: "Day care or short stay",
  painless: true,
  scarless: false,
  recoveryPeriod: "Staged recovery with early precautions",
  medicationDuration: "Short post-procedure course as advised",
  gymAfter: "Usually after the recovery review",
  afterEffects: "Swelling and early discomfort can be expected",
};

const skinDetails: ProcedureDetail = {
  consultation: "Skin review and plan selection",
  surgeryTime: "Approx. 30 to 60 minutes",
  admitTime: "No admission needed",
  painless: true,
  scarless: true,
  recoveryPeriod: "Minimal to no downtime for most plans",
  medicationDuration: "Only if advised for the selected treatment",
  gymAfter: "Usually same or next day",
  afterEffects: "Temporary redness or sensitivity may occur",
};

const weightDetails: ProcedureDetail = {
  consultation: "Assessment and planning session",
  surgeryTime: "Plan dependent",
  admitTime: "Depends on route selected",
  painless: true,
  scarless: true,
  recoveryPeriod: "Depends on programme or procedure",
  medicationDuration: "Case dependent",
  gymAfter: "Guided as per the selected plan",
  afterEffects: "Varies by route and needs direct review",
};

const withDetails = (
  base: ProcedureDetail,
  patch: Partial<ProcedureDetail>
): ProcedureDetail => ({ ...base, ...patch });

const makeService = (seed: ServiceSeed): Service => ({
  ...seed,
  heroImage: seed.hero.src,
  cardImage: seed.card.src,
  gallery: (seed.gallery ??
    (seed.category === "surgical"
      ? surgicalGallery
      : seed.category === "skin-hair"
        ? skinGallery
        : weightGallery)
  ).map(imageCard),
  metaTitle: seed.metaTitle ?? `${seed.name} in Delhi NCR | Cost & Results | Awish Clinic`,
  metaDescription:
    seed.metaDescription ??
    `Get ${seed.name.toLowerCase()} at Awish Clinic, Delhi. Board-certified dermatologists, personalised treatment plans and transparent pricing. Book your consultation today.`,
});

export const services: Service[] = [
  makeService({
    slug: "breast-reduction",
    subdomain: "breastreduction",
    name: "Breast Reduction",
    shortName: "Breast Reduction",
    category: "surgical",
    tagline: "Relief from back pain and discomfort with expert breast reduction surgery in Delhi.",
    description:
      "Awish Clinic offers breast reduction surgery in Delhi for women experiencing chronic back pain, shoulder strain and posture problems due to heavy breasts. Our board-certified surgeons perform a thorough physical assessment, discuss your comfort and proportion goals, and plan a safe, effective procedure with guided recovery support.",
    audienceSummary:
      "Ideal for women aged 23-50 experiencing chronic back pain, shoulder grooving, posture issues or clothing discomfort due to disproportionately large breasts who want lasting relief.",
    idealFor: ["Back or shoulder strain", "Balanced proportions", "Private surgical discussion"],
    concernTags: ["Breast Care", "Comfort", "Women Wellness"],
    problemPoints: [
      "Heavy breasts cause chronic back pain, neck strain and poor posture that worsen over time.",
      "Bra straps dig into shoulders, exercise is uncomfortable and clothing options feel limited.",
      "Finding a trustworthy surgeon who prioritises comfort over cosmetic upselling is difficult in Delhi.",
    ],
    solutionPoints: [
      "Private one-on-one assessment focused on your comfort, proportion goals and medical history.",
      "Detailed surgical planning with clear explanation of technique, recovery timeline and aftercare.",
      "Affordable breast reduction surgery at Awish Clinic, Sarita Vihar, with transparent pricing.",
    ],
    benefits: ["Chronic pain relief", "Improved posture", "Same-day discharge", "Transparent pricing in Delhi"],
    procedureSteps: [
      "Private consultation",
      "Planning and measurements",
      "Procedure day coordination",
      "Follow-up review",
    ],
    procedureDetails: withDetails(surgicalDetails, {
      surgeryTime: "Approx. 2 to 3 hours",
      recoveryPeriod: "Light first-week recovery with staged activity guidance",
      gymAfter: "Usually 4 to 6 weeks",
    }),
    hero: clinicMedia.heroConsultation,
    card: clinicMedia.surgeonConsultation,
    targetAudience: { ageRange: "23-50", gender: "female", tone: "empowering" },
    keywords: ["breast reduction delhi", "breast reduction surgery cost delhi", "breast care delhi", "affordable breast reduction delhi", "breast reduction surgeon sarita vihar", "breast reduction near me delhi NCR"],
    faqs: [
      {
        question: "Is breast reduction only about aesthetics?",
        answer: "No. Most patients seek breast reduction for relief from chronic back pain, shoulder strain and posture problems. At Awish Clinic, our surgeons assess both your physical discomfort and aesthetic goals to plan a procedure that improves your daily comfort and quality of life.",
      },
      {
        question: "How long is recovery after breast reduction surgery?",
        answer: "Recovery typically involves light activity for the first week, with most patients returning to normal routines within 2 to 3 weeks. Our team provides a staged recovery plan with scheduled follow-ups to monitor healing and guide your return to exercise, usually after 4 to 6 weeks.",
      },
    ],
    priceIndicator: "Fair quote after assessment",
    primaryCTA: { text: "Book a private consultation", action: "whatsapp" },
    secondaryCTA: { text: "Call the clinic", action: "call" },
  }),
  makeService({
    slug: "breast-enlargement",
    subdomain: "breastenlargement",
    name: "Breast Enlargement",
    shortName: "Breast Enlargement",
    category: "surgical",
    tagline: "Natural-looking breast augmentation with personalised planning and discreet care in Delhi.",
    description:
      "Awish Clinic provides breast augmentation surgery in Delhi for women seeking improved proportion and body confidence. Our surgeons offer a private consultation to understand your goals, discuss implant options and sizes, and plan a procedure focused on natural-looking results with clear recovery guidance.",
    audienceSummary:
      "Ideal for women aged 23-45 seeking improved breast proportion, post-pregnancy volume restoration or greater body confidence through safe, natural-looking augmentation.",
    idealFor: ["Restored proportion", "Private planning", "Natural-looking goals"],
    concernTags: ["Breast Care", "Body Confidence"],
    problemPoints: [
      "Many women feel self-conscious about breast size or asymmetry but want subtle, natural improvement — not dramatic change.",
      "Safety concerns around implants, recovery time and long-term results make the decision stressful.",
      "High-pressure cosmetic clinics in Delhi often prioritise sales over honest discussion of realistic outcomes.",
    ],
    solutionPoints: [
      "One-on-one consultation to map your goals, discuss implant types and plan proportionate results.",
      "Honest discussion of realistic outcomes, recovery timeline and long-term care.",
      "Affordable breast augmentation at Awish Clinic, Sarita Vihar, without high-pressure sales tactics.",
    ],
    benefits: ["Natural-looking results", "Private consultation", "Personalised implant planning", "Affordable pricing in Delhi"],
    procedureSteps: ["Goal mapping", "Proportion review", "Procedure planning", "Recovery follow-up"],
    procedureDetails: withDetails(surgicalDetails, {
      surgeryTime: "Approx. 2 to 3 hours",
      gymAfter: "Usually 4 to 6 weeks",
    }),
    hero: clinicMedia.surgeonConsultation,
    card: clinicMedia.heroConsultation,
    targetAudience: { ageRange: "23-45", gender: "female", tone: "empowering" },
    keywords: ["breast enlargement delhi", "breast augmentation delhi", "breast augmentation cost delhi", "breast implant surgery delhi NCR", "breast enlargement surgeon sarita vihar", "breast augmentation near me"],
    faqs: [
      {
        question: "Can I discuss all my options before deciding on breast augmentation?",
        answer: "Yes. At Awish Clinic, every patient begins with a private consultation where our surgeon assesses your body frame, discusses implant types and sizes, reviews before-and-after expectations and helps you make an informed decision with no pressure to commit.",
      },
      {
        question: "Can breast augmentation look natural?",
        answer: "Yes. Our surgeons focus on proportionate results that complement your body frame. During consultation, we discuss size, shape and placement options to ensure the outcome looks and feels natural.",
      },
    ],
    priceIndicator: "Assessment-led quote with planning clarity",
    primaryCTA: { text: "Start a discreet discussion", action: "whatsapp" },
    secondaryCTA: { text: "Call the clinic", action: "call" },
  }),
  makeService({
    slug: "hair-transplant",
    subdomain: "hairtransplant",
    name: "Hair Transplant",
    shortName: "Hair Transplant",
    category: "surgical",
    tagline: "Natural-looking hair restoration with FUE technique — results you can trust.",
    description:
      "Awish Clinic offers advanced FUE and FUT hair transplant procedures in Delhi for men and women experiencing hair loss, receding hairline or thinning. Our dermatologist-led approach includes detailed scalp analysis using trichoscopy, customised graft planning and comprehensive post-procedure care to ensure natural-looking, lasting results.",
    audienceSummary:
      "Ideal for men and women aged 25-45 experiencing visible hair thinning, receding hairline or pattern baldness who want a permanent, natural-looking solution.",
    idealFor: ["Visible thinning", "Receding hairline", "Pattern baldness"],
    concernTags: ["Hair Loss", "Confidence", "Hairline"],
    problemPoints: [
      "Hair loss affects confidence in professional and social settings and worsens without intervention.",
      "Over-the-counter products and oils rarely address the root cause of hair thinning or pattern baldness.",
      "Many clinics offer unrealistic promises without proper scalp assessment or transparent pricing.",
    ],
    solutionPoints: [
      "Comprehensive scalp analysis using advanced trichoscopy before any recommendation.",
      "FUE technique for minimally invasive, scar-free hair restoration with natural hairline design.",
      "Personalised graft planning based on your hairline goals, donor area assessment and long-term density targets.",
    ],
    benefits: ["Minimally invasive FUE technique", "Same-day discharge", "Natural hairline design", "30,000+ patient trust"],
    procedureSteps: ["Hairline assessment", "Donor review", "Procedure day", "Wash and follow-up plan"],
    procedureDetails: withDetails(surgicalDetails, {
      surgeryTime: "Depends on coverage goals and graft plan",
      admitTime: "Usually same-day discharge",
      recoveryPeriod: "Back to routine in a few days with guided precautions",
      gymAfter: "Usually around 1 month",
      afterEffects: "Temporary redness or scabbing can be expected",
    }),
    hero: clinicMedia.officeConsultation,
    card: clinicMedia.surgeonConsultation,
    gallery: [clinicMedia.officeConsultation, clinicMedia.heroConsultation, clinicMedia.treatmentSuite],
    targetAudience: { ageRange: "25-45", gender: "all", tone: "professional" },
    keywords: ["hair transplant delhi", "FUE hair transplant cost delhi", "best hair transplant clinic sarita vihar", "hair restoration delhi NCR", "hair loss treatment near me delhi", "affordable hair transplant delhi"],
    faqs: [
      {
        question: "When do hair transplant results start showing?",
        answer: "New hair growth typically begins 3 to 4 months after the procedure. You will notice increasing density over the following months, with full results visible by 10 to 12 months. At Awish Clinic, we schedule follow-up reviews to track your progress at each stage.",
      },
      {
        question: "When can I return to the gym after a hair transplant?",
        answer: "Most patients can resume light exercise within 2 weeks and return to full gym workouts after about 1 month. Our team provides specific activity guidelines based on your healing progress during follow-up visits.",
      },
    ],
    priceIndicator: "Plan-based quote after hairline assessment",
    primaryCTA: { text: "Get a hair assessment", action: "whatsapp" },
    secondaryCTA: { text: "Call for candidacy details", action: "call" },
    beforeAfter: {
      beforeImage: "https://images.pexels.com/photos/13846403/pexels-photo-13846403.jpeg?auto=compress&cs=tinysrgb&w=1600",
      afterImage: "https://images.pexels.com/photos/13846403/pexels-photo-13846403.jpeg?auto=compress&cs=tinysrgb&w=1600",
      beforeLabel: "BEFORE TREATMENT",
      afterLabel: "AFTER 10 MONTHS",
      title: "Receding Hairline Transformation",
      description: "Dr. Vijay Kumar designed a natural-looking hairline using the FUE technique, restoring 2,800 grafts for high-density coverage.",
      focusPoints: ["Natural Hairline Design", "High Graft Density", "Minimally Invasive FUE"]
    },
    testimonials: [
      {
        name: "Amit Sharma",
        text: "I was extremely nervous about my hair transplant, but Dr. Vijay and his team made me feel completely at ease. The graft planning was highly precise, and the results at 10 months are incredibly natural.",
        location: "Delhi"
      },
      {
        name: "Vikram Malhotra",
        text: "I researched many clinics in Delhi NCR, and I am glad I chose Awish. No technician-led shortcuts, board-certified MD dermatologists did the extraction and placement themselves. Top-tier professional standard.",
        location: "Gurugram"
      }
    ]
  }),
  makeService({
    slug: "rhinoplasty",
    subdomain: "rhinoplasty",
    name: "Rhinoplasty",
    shortName: "Rhinoplasty",
    category: "surgical",
    tagline: "Nose reshaping for better facial balance and improved breathing — expert rhinoplasty in Delhi.",
    description:
      "Awish Clinic performs rhinoplasty in Delhi for patients seeking improved facial harmony, nose shape correction or relief from breathing difficulties. Our surgeons assess your facial proportions, discuss your aesthetic and functional goals, and plan a procedure focused on natural-looking results with realistic recovery expectations.",
    audienceSummary:
      "Ideal for adults aged 20-45 who want to correct nose shape, improve facial symmetry, address a deviated septum or fix breathing issues through expert rhinoplasty.",
    idealFor: ["Profile balance", "Shape correction", "Breathing improvement"],
    concernTags: ["Facial Balance", "Profile", "Confidence"],
    problemPoints: [
      "An unbalanced nose shape can affect facial harmony and self-confidence in photos and social settings.",
      "Many patients want subtle, natural-looking improvement — not an obviously operated appearance.",
      "Breathing difficulties from a deviated septum or structural issues often go unaddressed alongside cosmetic concerns.",
    ],
    solutionPoints: [
      "Detailed facial proportion analysis and 3D planning to achieve balanced, natural-looking nose reshaping.",
      "Combined functional and cosmetic rhinoplasty to address both breathing and aesthetic concerns in one procedure.",
      "Private consultation at Awish Clinic, Sarita Vihar, with honest discussion of realistic outcomes and recovery.",
    ],
    benefits: ["Natural-looking results", "Combined cosmetic and functional correction", "Detailed 3D planning", "Expert surgeons in Delhi"],
    procedureSteps: ["Profile discussion", "Planning", "Procedure day", "Swelling and review guidance"],
    procedureDetails: withDetails(surgicalDetails, {
      surgeryTime: "Approx. 2 to 3 hours",
      afterEffects: "Swelling and bruising are part of early recovery",
    }),
    hero: clinicMedia.heroConsultation,
    card: clinicMedia.privateConsultation,
    targetAudience: { ageRange: "20-45", gender: "all", tone: "empowering" },
    keywords: ["rhinoplasty delhi", "nose surgery delhi", "nose reshaping cost delhi", "rhinoplasty surgeon sarita vihar", "nose job delhi NCR", "deviated septum surgery delhi"],
    faqs: [
      {
        question: "Will rhinoplasty results look natural?",
        answer: "Yes. At Awish Clinic, our surgeons focus on facial harmony and proportionate correction rather than dramatic change. During consultation, we assess your facial structure and discuss realistic outcomes so you know exactly what to expect.",
      },
      {
        question: "Can rhinoplasty fix breathing problems too?",
        answer: "Yes. Many patients at Awish Clinic combine cosmetic nose reshaping with functional correction for a deviated septum or other structural issues that affect breathing. Both concerns are assessed and addressed during the same procedure.",
      },
    ],
    priceIndicator: "Consultation-led quote with realistic planning",
    primaryCTA: { text: "Discuss rhinoplasty privately", action: "whatsapp" },
    secondaryCTA: { text: "Call for more details", action: "call" },
  }),
  makeService({
    slug: "dimple-creation",
    subdomain: "dimplecreation",
    name: "Dimple Creation",
    shortName: "Dimple Creation",
    category: "surgical",
    tagline: "Get natural-looking dimples with a quick, minimally invasive procedure in Delhi.",
    description:
      "Awish Clinic offers dimple creation surgery in Delhi — a quick, minimally invasive procedure that gives you natural-looking dimples. Popular before weddings and special occasions, this procedure takes under an hour with same-day discharge and minimal downtime. Our surgeons carefully plan dimple placement to complement your smile and facial structure.",
    audienceSummary:
      "Ideal for men and women aged 20-30 who want natural-looking dimples for smile enhancement, especially before weddings, photoshoots or special events.",
    idealFor: ["Pre-wedding prep", "Smile enhancement", "Quick aesthetic procedure"],
    concernTags: ["Smile", "Facial Aesthetics", "Bridal Prep"],
    problemPoints: [
      "Many people desire dimples but assume it requires a lengthy or risky surgical procedure.",
      "Patients need clarity on how natural the dimples will look, where they will be placed and how long recovery takes.",
      "Finding a qualified cosmetic surgeon for this niche procedure in Delhi can be challenging.",
    ],
    solutionPoints: [
      "Quick, minimally invasive dimple creation procedure completed in under an hour at Awish Clinic.",
      "Careful placement planning based on your facial structure and smile pattern for natural-looking results.",
      "Same-day discharge with brief recovery — most patients return to normal activities within a few days.",
    ],
    benefits: ["Under 1-hour procedure", "Same-day discharge", "Natural-looking dimples", "Minimal downtime"],
    procedureSteps: ["Smile review", "Placement discussion", "Procedure day", "Early healing review"],
    procedureDetails: withDetails(surgicalDetails, {
      surgeryTime: "Short procedure session",
      admitTime: "Usually same-day discharge",
      scarless: true,
      recoveryPeriod: "Short early recovery with brief swelling care",
    }),
    hero: clinicMedia.privateConsultation,
    card: clinicMedia.heroConsultation,
    targetAudience: { ageRange: "20-30", gender: "all", tone: "casual" },
    keywords: ["dimple creation delhi", "dimple surgery delhi", "dimple creation cost delhi", "dimple surgery near me", "dimple creation before wedding delhi", "facial aesthetics delhi"],
    faqs: [
      {
        question: "Is dimple creation a major procedure?",
        answer: "No. Dimple creation is a minor, minimally invasive procedure that typically takes under an hour. At Awish Clinic, it is performed under local anaesthesia with same-day discharge and most patients resume normal activities within 2 to 3 days.",
      },
      {
        question: "How much downtime should I expect after dimple creation?",
        answer: "Recovery is short. You may experience mild swelling for a few days which settles quickly. Most patients return to work and social activities within 2 to 3 days. Our team provides aftercare instructions and a follow-up review.",
      },
    ],
    priceIndicator: "Quick-procedure quote after consultation",
    primaryCTA: { text: "Ask about dimple creation", action: "whatsapp" },
    secondaryCTA: { text: "Call the clinic", action: "call" },
  }),
  makeService({
    slug: "hymenoplasty",
    subdomain: "hymenoplasty",
    name: "Hymenoplasty",
    shortName: "Hymenoplasty",
    category: "surgical",
    tagline: "Confidential hymenoplasty with complete privacy, compassionate care and same-day discharge in Delhi.",
    description:
      "Awish Clinic provides hymenoplasty in Delhi with complete confidentiality at every step. Our experienced surgeons perform this short procedure under local anaesthesia with same-day discharge. Every enquiry, consultation and follow-up is handled with strict privacy and non-judgemental, compassionate care.",
    audienceSummary:
      "For women aged 20-35 seeking a confidential, safe and professionally handled hymenoplasty procedure with complete privacy from initial enquiry through recovery.",
    idealFor: ["Confidential enquiry", "Sensitive care", "Private WhatsApp-first discussion"],
    concernTags: ["Privacy", "Women Wellness", "Sensitive Care"],
    problemPoints: [
      "Many women hesitate to seek this procedure due to fear of judgement or lack of privacy at clinics.",
      "Finding a qualified surgeon who handles this procedure with discretion and medical professionalism is difficult.",
      "Patients need reassurance about confidentiality before they feel comfortable asking detailed questions.",
    ],
    solutionPoints: [
      "Complete confidentiality from first enquiry to follow-up — no shared waiting areas for this procedure.",
      "Non-judgemental, compassionate care from experienced surgeons at Awish Clinic.",
      "Private WhatsApp enquiry option so you can ask questions without a phone call.",
    ],
    benefits: ["100% confidential process", "Same-day discharge", "Compassionate care", "Private WhatsApp enquiry"],
    procedureSteps: ["Private enquiry", "One-to-one consultation", "Procedure planning", "Privacy-first follow-up"],
    procedureDetails: withDetails(surgicalDetails, {
      surgeryTime: "Approx. 45 minutes to 1 hour",
      admitTime: "Generally same-day discharge",
      scarless: true,
      recoveryPeriod: "Short recovery with privacy-led follow-up guidance",
    }),
    hero: clinicMedia.clinicInterior,
    card: clinicMedia.privateConsultation,
    gallery: [clinicMedia.clinicInterior, clinicMedia.treatmentSuite, clinicMedia.heroConsultation],
    targetAudience: { ageRange: "20-35", gender: "female", tone: "supportive" },
    keywords: ["hymenoplasty delhi", "private hymenoplasty delhi", "hymenoplasty cost delhi", "confidential women's care delhi", "hymenoplasty surgeon near me", "hymenoplasty sarita vihar"],
    faqs: [
      {
        question: "Is privacy guaranteed for hymenoplasty at Awish Clinic?",
        answer: "Yes. At Awish Clinic, every step from your initial enquiry to follow-up is handled with strict confidentiality. We offer private consultation rooms, discreet scheduling and a WhatsApp enquiry option so your privacy is protected throughout.",
      },
      {
        question: "Can I ask questions without a phone call first?",
        answer: "Yes. You can reach out via WhatsApp to ask initial questions privately and at your own pace. Our team responds with discretion and will only schedule a consultation when you are ready.",
      },
    ],
    priceIndicator: "Private quote shared after confidential review",
    primaryCTA: { text: "Start a private conversation", action: "whatsapp" },
    secondaryCTA: { text: "Call discreetly", action: "call" },
  }),
  makeService({
    slug: "facelift",
    subdomain: "facelift",
    name: "Facelift",
    shortName: "Facelift",
    category: "surgical",
    tagline: "Look refreshed, not overdone — expert facelift surgery for natural facial rejuvenation in Delhi.",
    description:
      "Awish Clinic offers facelift surgery in Delhi for patients experiencing sagging skin, deep wrinkles and loss of facial definition. Our surgeons focus on natural-looking rejuvenation that restores a refreshed, youthful appearance without an overdone look. We also help you compare facelift with non-surgical alternatives like Botox, fillers and thread lifts.",
    audienceSummary:
      "Ideal for adults aged 35-60 noticing sagging jowls, deep nasolabial folds or loss of facial definition who want a refreshed, natural appearance through expert facelift surgery.",
    idealFor: ["Facial rejuvenation", "Sagging skin correction", "Natural anti-ageing results"],
    concernTags: ["Anti-Ageing", "Facial Rejuvenation", "Skin Wellness"],
    problemPoints: [
      "Visible sagging, deep wrinkles and loss of facial contour can make you look older and more tired than you feel.",
      "Many patients worry that a facelift will look unnatural or obviously surgical.",
      "It is confusing to compare surgical facelifts with non-surgical options like Botox, fillers and thread lifts.",
    ],
    solutionPoints: [
      "Facelift surgery focused on refinement and natural-looking rejuvenation — not overcorrection.",
      "Honest comparison of surgical versus non-surgical anti-ageing options during consultation.",
      "Experienced facelift surgeons at Awish Clinic, Delhi, with structured recovery planning and follow-up support.",
    ],
    benefits: ["Natural-looking rejuvenation", "Expert surgeons in Delhi", "Surgical vs non-surgical comparison", "Structured recovery plan"],
    procedureSteps: ["Concern mapping", "Planning", "Procedure coordination", "Recovery support"],
    procedureDetails: withDetails(surgicalDetails, {
      surgeryTime: "Depends on plan and combination work",
      recoveryPeriod: "Structured recovery with gradual settling over time",
      afterEffects: "Swelling and tightness should be expected early on",
    }),
    hero: clinicMedia.planningSession,
    card: clinicMedia.clinicianPortrait,
    targetAudience: { ageRange: "35-60", gender: "all", tone: "professional" },
    keywords: ["facelift delhi", "facelift surgery cost delhi", "facial rejuvenation delhi", "anti ageing surgery delhi", "facelift surgeon sarita vihar", "face lift near me delhi NCR"],
    faqs: [
      {
        question: "Will a facelift look dramatic or overdone?",
        answer: "No. At Awish Clinic, our surgeons focus on natural-looking rejuvenation that makes you look refreshed and rested — not obviously operated. During consultation, we discuss your goals and plan the degree of correction that suits your facial structure.",
      },
      {
        question: "Should I consider non-surgical anti-ageing options instead of a facelift?",
        answer: "It depends on the degree of ageing and your goals. During your consultation at Awish Clinic, our surgeon will assess your skin laxity and recommend whether a facelift, non-surgical options like Botox and fillers, or a combination approach is best for you.",
      },
    ],
    priceIndicator: "Planning-led quote after rejuvenation review",
    primaryCTA: { text: "Discuss facelift options", action: "whatsapp" },
    secondaryCTA: { text: "Call the clinic", action: "call" },
  }),
  makeService({
    slug: "blepharoplasty",
    subdomain: "blepharoplasty",
    name: "Blepharoplasty",
    shortName: "Blepharoplasty",
    category: "surgical",
    tagline: "Remove eye bags and droopy eyelids for a more rested, youthful look — eyelid surgery in Delhi.",
    description:
      "Awish Clinic performs blepharoplasty (eyelid surgery) in Delhi to correct droopy upper eyelids, under-eye bags and puffiness that make you look tired. Our surgeons assess your eye area, discuss whether upper, lower or combined eyelid correction is needed, and plan a procedure for a refreshed, more alert appearance with minimal scarring.",
    audienceSummary:
      "Ideal for adults aged 25-55 bothered by droopy eyelids, under-eye bags, puffiness or hooded eyes that create a tired, aged appearance despite adequate rest.",
    idealFor: ["Eye bags", "Droopy eyelids", "Tired-looking eyes"],
    concernTags: ["Eye Bags", "Eyelids", "Anti-Ageing"],
    problemPoints: [
      "Droopy eyelids and under-eye bags make you look tired and older, even when you are well-rested.",
      "Skincare products and eye creams cannot correct excess eyelid skin or prominent eye bags.",
      "Many patients are unsure whether they need upper eyelid, lower eyelid or combined correction.",
    ],
    solutionPoints: [
      "Expert assessment to determine whether upper, lower or combined blepharoplasty is right for you.",
      "Precise eyelid surgery with minimal scarring for a naturally refreshed, more alert appearance.",
      "Clear comparison of blepharoplasty with non-surgical alternatives like fillers and Botox during consultation.",
    ],
    benefits: ["Minimal scarring", "Refreshed eye appearance", "Upper and lower eyelid correction", "Same-day discharge"],
    procedureSteps: ["Assessment", "Planning", "Procedure day", "Recovery review"],
    procedureDetails: withDetails(surgicalDetails, {
      surgeryTime: "Varies by upper, lower or combined work",
      admitTime: "Commonly same-day discharge",
      recoveryPeriod: "Short early recovery with visible settling over time",
      afterEffects: "Temporary swelling or bruising can be expected",
    }),
    hero: clinicMedia.clinicianPortrait,
    card: clinicMedia.planningSession,
    targetAudience: { ageRange: "25-55", gender: "all", tone: "professional" },
    keywords: ["blepharoplasty delhi", "eyelid surgery delhi", "eye bag treatment delhi", "eyelid surgery cost delhi", "blepharoplasty surgeon sarita vihar", "eye bag removal near me delhi NCR"],
    faqs: [
      {
        question: "Is blepharoplasty only for eye bags?",
        answer: "No. Blepharoplasty treats multiple concerns including droopy upper eyelids, hooded eyes, under-eye bags and puffiness. At Awish Clinic, our surgeon assesses your specific concern and recommends upper, lower or combined eyelid correction accordingly.",
      },
      {
        question: "What should I expect during blepharoplasty recovery?",
        answer: "You may experience temporary swelling and mild bruising for 1 to 2 weeks. Most patients return to work within 7 to 10 days. Our team provides detailed aftercare instructions and schedules follow-up visits to monitor your healing.",
      },
    ],
    priceIndicator: "Eye-area assessment before final quote",
    primaryCTA: { text: "Ask about eyelid treatment", action: "whatsapp" },
    secondaryCTA: { text: "Call the clinic", action: "call" },
  }),
  makeService({
    slug: "white-glow",
    subdomain: "whiteglow",
    name: "White Glow",
    shortName: "White Glow",
    category: "skin-hair",
    tagline: "Clinic-grade skin brightening and glow treatments for radiant, even-toned skin in Delhi.",
    description:
      "Awish Clinic offers medical-grade skin brightening and glow treatments in Delhi including chemical peels, glutathione therapy and advanced facials for pigmentation, dullness and uneven skin tone. Our dermatologists assess your skin type, identify the cause of dullness and recommend a personalised treatment plan for lasting radiance.",
    audienceSummary:
      "Ideal for men and women aged 18-35 preparing for weddings, events or photoshoots who want visible skin brightening and radiance from clinic-grade treatments — not salon facials.",
    idealFor: ["Bridal prep", "Radiance boost", "Pigmentation correction"],
    concernTags: ["Pigmentation", "Skin Wellness", "Glow"],
    problemPoints: [
      "Dull, uneven skin tone and pigmentation affect confidence, especially before important events.",
      "Salon facials and over-the-counter products provide temporary results without addressing root causes.",
      "It is hard to tell which glow treatments are genuinely medical-grade versus marketing hype.",
    ],
    solutionPoints: [
      "Dermatologist-assessed skin analysis to identify the cause of dullness and pigmentation.",
      "Medical-grade treatments including chemical peels, glutathione and advanced facials for lasting results.",
      "Personalised session plans with clear timelines for event-ready skin at Awish Clinic, Delhi.",
    ],
    benefits: ["Medical-grade treatments", "Event-ready skin", "Dermatologist-led assessment", "Lasting radiance"],
    procedureSteps: ["Skin review", "Session selection", "Glow treatment", "Aftercare guidance"],
    procedureDetails: withDetails(skinDetails, {
      consultation: "Skin review and glow-plan discussion",
      gymAfter: "Usually same or next day depending on the session",
    }),
    hero: clinicMedia.skinSession,
    card: clinicMedia.clinicInterior,
    targetAudience: { ageRange: "18-35", gender: "all", tone: "casual" },
    keywords: ["white glow treatment delhi", "skin brightening delhi", "skin glow treatment cost delhi", "pigmentation treatment delhi", "bridal glow facial delhi", "skin whitening clinic sarita vihar"],
    faqs: [
      {
        question: "How is White Glow different from a salon facial?",
        answer: "White Glow at Awish Clinic uses medical-grade treatments like chemical peels and glutathione therapy prescribed by a dermatologist after skin analysis. Unlike salon facials, these treatments target the root cause of dullness and pigmentation for longer-lasting results.",
      },
      {
        question: "Can I compare White Glow with IV drips or medi-facials?",
        answer: "Yes. During your consultation at Awish Clinic, our dermatologist can help you choose between glow treatments, IV drip therapy and medi-facials based on your skin goals, timeline and budget.",
      },
    ],
    priceIndicator: "Session plans available after skin review",
    primaryCTA: { text: "Ask about glow sessions", action: "whatsapp" },
    secondaryCTA: { text: "Call for session planning", action: "call" },
    beforeAfter: {
      beforeImage: "https://images.pexels.com/photos/7955853/pexels-photo-7955853.jpeg?auto=compress&cs=tinysrgb&w=1600",
      afterImage: "https://images.pexels.com/photos/7955853/pexels-photo-7955853.jpeg?auto=compress&cs=tinysrgb&w=1600",
      beforeLabel: "UNEVEN & DULL",
      afterLabel: "AFTER 3 SESSIONS",
      title: "Skin Clarity & Brightness Boost",
      description: "Customized peeling sessions combined with medical-grade Glutathione and Vitamin C infusions, giving uniform tone and a radiant glow.",
      focusPoints: ["Even Skin Tone", "Reduces Hyperpigmentation", "Radiant De-tan Effect"]
    },
    testimonials: [
      {
        name: "Shreya Ghoshal",
        text: "I booked the White Glow package before my wedding, and the results were absolutely stunning. My skin tone became completely even, and the bridal glow lasted for weeks. Highly recommended dermatologist-led care!",
        location: "New Delhi"
      },
      {
        name: "Ananya Sen",
        text: "Unlike salon facials that fade in 2 days, the medical peels and therapy at Awish genuinely treated my sun tan and dark patches. The doctors explain every step so transparently.",
        location: "Jaipur"
      }
    ]
  }),
  makeService({
    slug: "pimple-scar-treatment",
    subdomain: "pimplescar",
    name: "Pimple Scar Treatment",
    shortName: "Pimple Scar Treatment",
    category: "skin-hair",
    tagline: "Reduce acne scars and improve skin texture with advanced dermatological treatments in Delhi.",
    description:
      "Awish Clinic provides advanced acne scar treatment in Delhi using microneedling, chemical peels, laser resurfacing and dermal fillers. Our dermatologists assess your scar type — ice pick, boxcar, rolling or hypertrophic — and create a personalised treatment plan to improve skin texture and restore smoother, clearer skin.",
    audienceSummary:
      "Ideal for students, young professionals and adults aged 18-30 dealing with persistent acne scars, pitted marks or uneven skin texture that over-the-counter products have failed to improve.",
    idealFor: ["Old acne scars", "Active marks", "Patients who have already tried products"],
    concernTags: ["Acne / Pimples", "Scarring", "Texture"],
    problemPoints: [
      "Acne scars remain visible long after breakouts stop, affecting confidence in social and professional settings.",
      "Over-the-counter creams and serums rarely improve deeper scars, pitted marks or uneven texture.",
      "Patients are unsure which treatment — microneedling, laser or peels — is right for their scar type.",
    ],
    solutionPoints: [
      "Expert scar-type assessment to determine whether microneedling, chemical peels, laser or fillers are most effective.",
      "Personalised multi-session treatment plans based on your scar depth, skin type and recovery preferences.",
      "Visible texture improvement with dermatologist-supervised treatments at Awish Clinic, Sarita Vihar.",
    ],
    benefits: ["Scar-type specific treatment", "Microneedling and laser options", "Visible texture improvement", "Affordable sessions in Delhi"],
    procedureSteps: ["Scar assessment", "Treatment selection", "Session delivery", "Aftercare and repeat planning"],
    procedureDetails: withDetails(skinDetails, {
      consultation: "Scar type and skin-texture review",
      recoveryPeriod: "Mild recovery depending on intensity",
      afterEffects: "Redness or sensitivity can be expected for a short period",
    }),
    hero: clinicMedia.skinSession,
    card: clinicMedia.privateConsultation,
    targetAudience: { ageRange: "18-30", gender: "all", tone: "casual" },
    keywords: ["pimple scar treatment delhi", "acne scar treatment delhi", "acne scar treatment cost delhi", "microneedling for acne scars delhi", "laser scar removal delhi", "acne scar clinic sarita vihar"],
    faqs: [
      {
        question: "Can treatment help with older acne scars?",
        answer: "Yes. At Awish Clinic, our dermatologists treat both old and recent acne scars. The consultation begins with identifying your scar type — ice pick, boxcar, rolling or hypertrophic — because different scars respond to different treatments like microneedling, laser resurfacing or chemical peels.",
      },
      {
        question: "How many sessions are needed for acne scar treatment?",
        answer: "Most patients need 4 to 6 sessions spaced 3 to 4 weeks apart, depending on scar depth and type. Our dermatologist creates a personalised plan during your first consultation and tracks progress at each follow-up.",
      },
    ],
    priceIndicator: "Session-based quote after scar review",
    primaryCTA: { text: "Share your skin concern", action: "whatsapp" },
    secondaryCTA: { text: "Call the clinic", action: "call" },
  }),
  makeService({
    slug: "anti-aging-treatments",
    subdomain: "antiaging",
    name: "Anti-Aging Treatments",
    shortName: "Anti-Aging",
    category: "skin-hair",
    tagline: "Botox, dermal fillers and thread lifts for subtle, natural-looking anti-ageing results in Delhi.",
    description:
      "Awish Clinic offers non-surgical anti-ageing treatments in Delhi including Botox for wrinkles and fine lines, dermal fillers for volume restoration and thread lifts for skin tightening. Our dermatologists assess your facial ageing pattern and recommend the right combination of treatments for subtle, natural-looking rejuvenation without surgery.",
    audienceSummary:
      "Ideal for adults aged 30-55 noticing fine lines, wrinkles, volume loss or skin laxity who want effective, non-surgical anti-ageing treatments with natural-looking results.",
    idealFor: ["Fine lines and wrinkles", "Volume loss", "Non-surgical skin tightening"],
    concernTags: ["Anti-Ageing", "Botox", "Fillers", "Thread Lift"],
    problemPoints: [
      "Fine lines, wrinkles and volume loss gradually change your appearance but surgery feels like too much.",
      "Many patients worry that Botox or fillers will look unnatural or frozen.",
      "Comparing Botox, fillers and thread lifts is confusing without expert guidance.",
    ],
    solutionPoints: [
      "Expert facial ageing assessment to recommend the right combination of Botox, fillers or thread lift.",
      "Focus on subtle, natural-looking results — never an overdone or frozen appearance.",
      "All non-surgical anti-ageing options available under one roof at Awish Clinic, Delhi, for easy comparison.",
    ],
    benefits: ["Botox, fillers and thread lift under one roof", "Natural-looking results", "No surgery or downtime", "Expert dermatologists in Delhi"],
    procedureSteps: ["Facial review", "Option selection", "Procedure session", "Maintenance planning"],
    procedureDetails: withDetails(skinDetails, {
      consultation: "Facial ageing review and non-surgical options discussion",
      surgeryTime: "Approx. 20 to 60 minutes",
      medicationDuration: "Typically none unless advised",
      gymAfter: "Usually 24 to 48 hours depending on treatment",
    }),
    hero: clinicMedia.planningSession,
    card: clinicMedia.clinicianPortrait,
    targetAudience: { ageRange: "30-55", gender: "all", tone: "empowering" },
    keywords: ["botox delhi", "fillers delhi", "thread lift delhi", "anti aging treatment delhi", "botox cost delhi", "dermal fillers near me sarita vihar"],
    faqs: [
      {
        question: "What is the difference between Botox, fillers and thread lifts?",
        answer: "Botox relaxes muscles to smooth wrinkles and fine lines. Dermal fillers restore lost volume in cheeks, lips and under-eye hollows. Thread lifts provide a subtle lifting effect for mild skin sagging. At Awish Clinic, our dermatologist assesses your concerns and recommends the right treatment or combination.",
      },
      {
        question: "Will Botox or fillers look overdone?",
        answer: "No. At Awish Clinic, our dermatologists use conservative, precise dosing focused on natural-looking results. The goal is always subtle refreshment — you will look like yourself, just more rested and youthful.",
      },
    ],
    priceIndicator: "Treatment quote after facial review",
    primaryCTA: { text: "Compare anti-ageing options", action: "whatsapp" },
    secondaryCTA: { text: "Call the clinic", action: "call" },
  }),
  makeService({
    slug: "laser-hair-removal",
    subdomain: "laserhairremoval",
    name: "Laser Hair Removal",
    shortName: "Laser Hair Removal",
    category: "skin-hair",
    tagline: "Permanent hair reduction for men and women — safe, effective laser hair removal in Delhi.",
    description:
      "Awish Clinic offers FDA-approved laser hair removal in Delhi for men and women across all body areas including face, underarms, bikini, legs, chest and back. Our dermatologists assess your skin type and hair colour to select the right laser technology, ensuring safe, effective and long-lasting hair reduction with minimal discomfort.",
    audienceSummary:
      "Ideal for men and women aged 18-40 tired of waxing, shaving and ingrown hairs who want permanent hair reduction through safe, clinic-grade laser treatment.",
    idealFor: ["Full body hair reduction", "Beard shaping for men", "Bikini and underarm laser"],
    concernTags: ["Laser Hair Removal", "Grooming", "Routine Convenience"],
    problemPoints: [
      "Waxing and shaving are time-consuming, painful and lead to ingrown hairs and skin irritation.",
      "Many laser centres in Delhi use outdated equipment or lack dermatologist supervision.",
      "Patients are unsure how many sessions they need and whether laser works on their skin tone.",
    ],
    solutionPoints: [
      "FDA-approved laser technology selected by our dermatologist based on your skin type and hair colour.",
      "Laser hair removal for all body areas — face, underarms, bikini, legs, chest, back and beard shaping.",
      "Clear session-based treatment plans with transparent per-area pricing at Awish Clinic, Sarita Vihar.",
    ],
    benefits: ["FDA-approved lasers", "All body areas covered", "For men and women", "Dermatologist-supervised sessions"],
    procedureSteps: ["Suitability review", "Area plan", "Laser sessions", "Progress review"],
    procedureDetails: withDetails(skinDetails, {
      consultation: "Hair and skin suitability review",
      surgeryTime: "Approx. 15 to 60 minutes per area",
      afterEffects: "Mild temporary redness can happen after sessions",
    }),
    hero: clinicMedia.laserSession,
    card: clinicMedia.skinSession,
    gallery: [clinicMedia.laserSession, clinicMedia.skinSession, clinicMedia.clinicInterior],
    targetAudience: { ageRange: "18-40", gender: "all", tone: "casual" },
    keywords: ["laser hair removal delhi", "laser hair removal cost delhi", "full body laser hair removal delhi", "laser hair removal for men delhi", "laser hair removal near me sarita vihar", "permanent hair removal delhi NCR"],
    faqs: [
      {
        question: "Does laser hair removal work for men too?",
        answer: "Yes. At Awish Clinic, we offer laser hair removal for men across all areas including chest, back, shoulders and beard shaping. Our dermatologist selects the right laser settings for male hair density and skin type.",
      },
      {
        question: "How many laser hair removal sessions do I need?",
        answer: "Most patients need 6 to 8 sessions spaced 4 to 6 weeks apart for optimal results. The exact number depends on your hair colour, thickness and the body area being treated. Our dermatologist creates a personalised plan during your first consultation.",
      },
    ],
    priceIndicator: "Area-based session plans available",
    primaryCTA: { text: "Ask about laser sessions", action: "whatsapp" },
    secondaryCTA: { text: "Call for area pricing", action: "call" },
  }),
  makeService({
    slug: "medi-facials",
    subdomain: "medifacials",
    name: "Medi-Facials",
    shortName: "Medi-Facials",
    category: "skin-hair",
    tagline: "Medical-grade facials for healthier, clearer skin — beyond what salon facials can deliver.",
    description:
      "Awish Clinic offers medi-facials in Delhi — dermatologist-prescribed facial treatments using medical-grade products and techniques including HydraFacial, chemical peels and LED therapy. Unlike salon facials, medi-facials target specific skin concerns like pigmentation, acne, dehydration and fine lines with clinically proven protocols.",
    audienceSummary:
      "Ideal for men and women aged 20-45 who want regular, medical-grade skin maintenance that delivers visible results beyond what salon facials offer — especially before weddings, events or photoshoots.",
    idealFor: ["Regular skin maintenance", "Event prep", "Low-downtime skin improvement"],
    concernTags: ["Skin Wellness", "Glow", "Maintenance", "Facial Care"],
    problemPoints: [
      "Salon facials feel generic, use inconsistent products and provide results that fade within days.",
      "Patients want skin treatments that actually target their specific concerns — not a one-size-fits-all facial.",
      "It is hard to find a clinic that offers regular skin maintenance with medical-grade protocols at fair prices.",
    ],
    solutionPoints: [
      "Dermatologist-prescribed medi-facials using HydraFacial, chemical peels and LED therapy for targeted results.",
      "Personalised facial protocols based on your specific skin concerns — pigmentation, acne, dehydration or ageing.",
      "Affordable maintenance plans at Awish Clinic, Delhi, designed for regular sessions with cumulative improvement.",
    ],
    benefits: ["Medical-grade products", "Dermatologist-prescribed protocols", "Zero downtime", "Visible results per session"],
    procedureSteps: ["Skin assessment", "Protocol selection", "Treatment session", "Home-care guidance"],
    procedureDetails: withDetails(skinDetails, {
      surgeryTime: "Approx. 45 to 60 minutes",
      afterEffects: "Skin may look fresh or mildly pink for a short time",
    }),
    hero: clinicMedia.skinSession,
    card: clinicMedia.clinicInterior,
    targetAudience: { ageRange: "20-45", gender: "all", tone: "casual" },
    keywords: ["medi facial delhi", "medical facial delhi", "HydraFacial delhi", "medi facial cost delhi", "best facial treatment near me sarita vihar", "skin maintenance clinic delhi NCR"],
    faqs: [
      {
        question: "How is a medi-facial different from a salon facial?",
        answer: "Medi-facials at Awish Clinic are prescribed by a dermatologist and use medical-grade products and techniques like HydraFacial, chemical peels and LED therapy. They target specific skin concerns with clinically proven protocols, unlike salon facials which use generic products with temporary results.",
      },
      {
        question: "How often should I get medi-facials?",
        answer: "Most patients benefit from medi-facials every 3 to 4 weeks for ongoing skin maintenance. Our dermatologist creates a personalised schedule based on your skin goals and recommends the right frequency for lasting improvement.",
      },
    ],
    priceIndicator: "Maintenance session plans available",
    primaryCTA: { text: "Book a medi-facial discussion", action: "whatsapp" },
    secondaryCTA: { text: "Call the clinic", action: "call" },
  }),
  makeService({
    slug: "iv-drips-skin-whitening",
    subdomain: "ivdrips",
    name: "IV Drips / Skin Whitening",
    shortName: "IV Drips",
    category: "skin-hair",
    tagline: "Glutathione IV drips and skin brightening infusions for radiance from within — at Awish Clinic, Delhi.",
    description:
      "Awish Clinic offers IV drip therapy and skin brightening infusions in Delhi including glutathione drips, vitamin C infusions and wellness cocktails. Our dermatologists assess your suitability, recommend the right formulation and administer treatments in a clean, medically supervised clinic setting for safe, effective internal glow support.",
    audienceSummary:
      "Ideal for men and women aged 20-40 interested in skin brightening from within, pre-event glow preparation or overall wellness support through medically supervised IV therapy.",
    idealFor: ["Glutathione skin brightening", "Wellness and hydration support", "Pre-event glow preparation"],
    concernTags: ["Glow", "Skin Wellness", "Hydration"],
    problemPoints: [
      "IV drip marketing online is often exaggerated, making it hard to know what actually works.",
      "Many centres offer IV therapy without dermatologist supervision or proper suitability screening.",
      "Patients are unsure whether IV drips or topical glow treatments are better for their goals.",
    ],
    solutionPoints: [
      "Medically supervised glutathione and vitamin C IV therapy administered by trained professionals.",
      "Dermatologist suitability assessment before any IV drip session to ensure safety and effectiveness.",
      "Easy comparison with White Glow and medi-facial treatments at Awish Clinic to find the right option.",
    ],
    benefits: ["Dermatologist-supervised IV therapy", "Glutathione and vitamin infusions", "Safe clinical setting", "Visible glow from within"],
    procedureSteps: ["Suitability review", "Session recommendation", "IV session", "Follow-up guidance"],
    procedureDetails: withDetails(skinDetails, {
      consultation: "Suitability and goals review",
      surgeryTime: "Approx. 30 to 45 minutes",
      afterEffects: "Temporary sensitivity at the insertion site may occur",
    }),
    hero: clinicMedia.planningSession,
    card: clinicMedia.heroConsultation,
    targetAudience: { ageRange: "20-40", gender: "all", tone: "casual" },
    keywords: ["iv drips delhi", "glutathione drip delhi", "skin whitening drip cost delhi", "vitamin C infusion delhi", "wellness drip near me sarita vihar", "skin brightening IV therapy delhi NCR"],
    faqs: [
      {
        question: "Are IV drips for skin brightening safe?",
        answer: "Yes, when administered under medical supervision. At Awish Clinic, our dermatologist assesses your suitability before recommending glutathione or vitamin C infusions. All IV sessions are conducted in a clean clinical setting by trained medical professionals.",
      },
      {
        question: "Should I choose IV drips or White Glow treatments?",
        answer: "It depends on your goals. IV drips work from within to support skin brightness and hydration, while White Glow treatments target the skin surface directly. During your consultation at Awish Clinic, our dermatologist will recommend the best option or combination based on your skin and timeline.",
      },
    ],
    priceIndicator: "Session quote after suitability review",
    primaryCTA: { text: "Ask about IV drips", action: "whatsapp" },
    secondaryCTA: { text: "Call the clinic", action: "call" },
  }),
  makeService({
    slug: "overweight-treatment",
    subdomain: "overweight",
    name: "Overweight Treatment",
    shortName: "Overweight Treatment",
    category: "weight",
    tagline: "Start your weight loss journey with expert medical assessment and personalised guidance in Delhi.",
    description:
      "Awish Clinic offers comprehensive weight management consultations in Delhi to help you understand the root causes of weight gain and find the right treatment path. Our doctors assess your BMI, metabolic health, lifestyle and medical history to recommend whether a structured programme, non-surgical treatment or bariatric surgery is best for you — with no pressure to commit.",
    audienceSummary:
      "Ideal for men and women aged 20-55 who feel stuck with weight gain, have tried diets and exercise without lasting results, and want expert medical guidance on the right weight loss approach.",
    idealFor: ["Medical weight assessment", "Personalised weight loss plan", "Comparing surgical and non-surgical options"],
    concernTags: ["Weight Management", "Lifestyle Support", "Health Confidence"],
    problemPoints: [
      "Many people struggle with weight gain but are unsure whether they need a diet plan, medical programme or surgical intervention.",
      "Crash diets and generic gym plans rarely produce lasting weight loss results.",
      "Weight loss clinics often feel judgemental or push expensive procedures without proper assessment.",
    ],
    solutionPoints: [
      "Comprehensive medical assessment including BMI, metabolic screening and lifestyle review.",
      "Honest guidance on all available options — structured programmes, non-surgical treatments and bariatric surgery.",
      "Supportive, non-judgemental consultations at Awish Clinic, Delhi, with no pressure to commit to any route.",
    ],
    benefits: ["Comprehensive medical assessment", "All weight loss options under one roof", "No-pressure consultation", "Expert doctors in Delhi"],
    procedureSteps: ["Initial assessment", "Routine review", "Route recommendation", "Follow-up plan"],
    procedureDetails: withDetails(weightDetails, {
      surgeryTime: "Not procedure-led at this stage",
      admitTime: "No admission needed",
      recoveryPeriod: "No recovery downtime",
      afterEffects: "None; this page functions as an intake route",
    }),
    hero: clinicMedia.officeConsultation,
    card: clinicMedia.privateConsultation,
    targetAudience: { ageRange: "20-55", gender: "all", tone: "supportive" },
    keywords: ["overweight treatment delhi", "weight management delhi", "weight loss consultation delhi", "weight loss doctor near me sarita vihar", "obesity treatment delhi NCR", "best weight loss clinic delhi"],
    faqs: [
      {
        question: "Is this consultation for people just starting their weight loss journey?",
        answer: "Yes. At Awish Clinic, this consultation is designed as your starting point. Our doctor assesses your BMI, metabolic health and lifestyle to recommend the most effective weight loss approach — whether that is a structured programme, non-surgical treatment or surgery.",
      },
      {
        question: "Will I be pushed toward weight loss surgery?",
        answer: "No. At Awish Clinic, surgery is only recommended when medically appropriate. Our doctors assess all options first and help you understand the pros and cons of each approach so you can make an informed decision at your own pace.",
      },
    ],
    priceIndicator: "Consultation-led assessment",
    primaryCTA: { text: "Start your weight discussion", action: "whatsapp" },
    secondaryCTA: { text: "Call the clinic", action: "call" },
  }),
  makeService({
    slug: "non-surgical-weight-reduction",
    subdomain: "nonsurgicalweight",
    name: "Non-Surgical Weight Reduction",
    shortName: "Non-Surgical Weight",
    category: "weight",
    tagline: "Medically supervised weight loss without surgery — structured programmes with real results in Delhi.",
    description:
      "Awish Clinic offers non-surgical weight reduction programmes in Delhi including medically supervised diet plans, metabolic therapy, body contouring and lifestyle coaching. Our doctors create a personalised weight loss plan based on your BMI, health profile and goals, with regular monitoring and adjustments to ensure steady, sustainable progress.",
    audienceSummary:
      "Ideal for men and women aged 20-55 who want to lose weight without surgery through a medically supervised programme with regular monitoring, dietary guidance and measurable progress.",
    idealFor: ["Non-surgical weight loss", "Medically guided programmes", "Sustainable weight management"],
    concernTags: ["Weight Management", "Non-Surgical Care", "Lifestyle Support"],
    problemPoints: [
      "Diets and gym memberships alone rarely produce lasting weight loss without medical guidance.",
      "Many non-surgical weight loss programmes online offer vague promises with no real medical supervision.",
      "Patients want to know whether ongoing monitoring, dietary support and adjustments are included.",
    ],
    solutionPoints: [
      "Medically supervised weight loss programmes with regular progress monitoring and plan adjustments.",
      "Personalised diet plans, metabolic therapy and body contouring options based on your health profile.",
      "Affordable non-surgical weight care at Awish Clinic, Delhi, with consistent support throughout your journey.",
    ],
    benefits: ["No surgery required", "Medically supervised programme", "Regular progress monitoring", "Personalised diet and lifestyle plan"],
    procedureSteps: ["Assessment", "Plan selection", "Programme rollout", "Progress review"],
    procedureDetails: withDetails(weightDetails, {
      consultation: "Weight profile and goals assessment",
      admitTime: "No admission needed",
      recoveryPeriod: "No downtime for plan-based care",
    }),
    hero: clinicMedia.privateConsultation,
    card: clinicMedia.officeConsultation,
    targetAudience: { ageRange: "20-55", gender: "all", tone: "supportive" },
    keywords: ["non surgical weight reduction delhi", "weight loss without surgery delhi", "weight loss clinic delhi", "medical weight loss programme delhi NCR", "non surgical weight loss near me sarita vihar", "guided weight care delhi"],
    faqs: [
      {
        question: "Is non-surgical weight reduction effective without surgery?",
        answer: "Yes. Many patients achieve significant, sustainable weight loss through medically supervised programmes that combine personalised diet plans, metabolic support and lifestyle coaching. At Awish Clinic, our doctors monitor your progress regularly and adjust your plan to keep results on track.",
      },
      {
        question: "Will the weight loss plan be customised for me?",
        answer: "Yes. At Awish Clinic, every weight loss plan is created after a thorough assessment of your BMI, metabolic health, medical history and personal goals. There are no generic packages — your programme is tailored to your body and adjusted based on your progress.",
      },
    ],
    priceIndicator: "Programme quote after review",
    primaryCTA: { text: "Explore non-surgical options", action: "whatsapp" },
    secondaryCTA: { text: "Call the clinic", action: "call" },
  }),
  makeService({
    slug: "surgical-weight-reduction",
    subdomain: "surgicalweight",
    name: "Surgical Weight Reduction",
    shortName: "Surgical Weight",
    category: "weight",
    tagline: "Expert bariatric surgery in Delhi — life-changing weight loss with long-term medical support.",
    description:
      "Awish Clinic offers surgical weight reduction in Delhi including gastric bypass, sleeve gastrectomy and mini gastric bypass for patients with clinically significant obesity. Our bariatric team conducts a thorough candidacy assessment, pre-surgical counselling and post-operative support programme to ensure safe, lasting weight loss with ongoing medical monitoring.",
    audienceSummary:
      "For men and women aged 25-60 with a BMI of 35 or above, or BMI 30+ with obesity-related health conditions, who have not achieved lasting results through diet, exercise or non-surgical programmes.",
    idealFor: ["Bariatric surgery candidacy", "Long-term weight loss", "Post-surgery support and monitoring"],
    concernTags: ["Weight Management", "Surgical Support", "Long-Term Planning"],
    problemPoints: [
      "Clinically significant obesity carries serious health risks including diabetes, hypertension and joint problems.",
      "Years of failed diets and non-surgical approaches can leave patients feeling hopeless about lasting weight loss.",
      "Patients need to know whether long-term medical support, nutritional guidance and follow-up are included after surgery.",
    ],
    solutionPoints: [
      "Thorough bariatric candidacy assessment including BMI evaluation, metabolic screening and comorbidity review.",
      "Expert bariatric surgeons performing gastric bypass, sleeve gastrectomy and mini gastric bypass at Awish Clinic, Delhi.",
      "Comprehensive post-surgery support programme including nutritional counselling, progress monitoring and long-term follow-up.",
    ],
    benefits: ["Expert bariatric surgeons", "Comprehensive pre and post-surgery support", "Long-term follow-up programme", "Life-changing weight loss results"],
    procedureSteps: ["Detailed assessment", "Pre-procedure counselling", "Procedure coordination", "Recovery programme"],
    procedureDetails: withDetails(weightDetails, {
      consultation: "Detailed candidacy and suitability review",
      scarless: false,
      recoveryPeriod: "Structured recovery and long-term follow-up planning",
      medicationDuration: "Case-specific medication and nutrition guidance",
      gymAfter: "Return is staged and clinically reviewed",
    }),
    hero: clinicMedia.surgeonConsultation,
    card: clinicMedia.officeConsultation,
    targetAudience: { ageRange: "25-60", gender: "all", tone: "supportive" },
    keywords: ["surgical weight reduction delhi", "weight loss surgery delhi", "bariatric surgery cost delhi", "gastric bypass delhi", "sleeve gastrectomy delhi NCR", "bariatric surgeon near me sarita vihar"],
    faqs: [
      {
        question: "Who is a candidate for bariatric surgery?",
        answer: "Bariatric surgery is typically recommended for patients with a BMI of 35 or above, or BMI 30+ with obesity-related conditions like diabetes or hypertension. At Awish Clinic, our bariatric team conducts a comprehensive assessment to determine whether surgery is the right option for you.",
      },
      {
        question: "Is there long-term follow-up after bariatric surgery?",
        answer: "Yes. At Awish Clinic, bariatric surgery includes a structured post-operative support programme with regular follow-up visits, nutritional counselling, progress monitoring and medical check-ups to ensure healthy, sustained weight loss over the long term.",
      },
    ],
    priceIndicator: "Case-specific quote after candidacy review",
    primaryCTA: { text: "Discuss surgical weight care", action: "whatsapp" },
    secondaryCTA: { text: "Call the clinic", action: "call" },
  }),
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServiceBySubdomain(subdomain: string): Service | undefined {
  return services.find((service) => service.subdomain === subdomain);
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((service) => service.category === category);
}
