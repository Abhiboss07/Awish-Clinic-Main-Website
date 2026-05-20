import { homepageGallery } from "@/data/media";

export const siteConfig = {
  name: "Awish Clinic",
  tagline: "Best Dermatologist & Aesthetic Clinic in Delhi NCR | Hair, Skin & Cosmetic Care",
  description:
    "Awish Clinic is a leading dermatology, hair transplant and aesthetic surgery clinic in Sarita Vihar, New Delhi, with locations across Gurugram, East Patel Nagar and Jaipur. Founded by board-certified dermatologists Dr. Vijay Kumar (MBBS, MD) and Dr. Pooja Varshney (MBBS, MD), the clinic specialises in FUE hair transplant, acne scar treatment, anti-aging procedures, laser hair removal, cosmetic surgery and medically supervised weight management. With over 30,000 satisfied patients and 45+ awards, Awish Clinic offers affordable, consultation-first treatment plans with advanced techniques and personalised care.",
  shortDescription:
    "Best dermatologist and aesthetic clinic in Delhi NCR — hair transplant, skin treatment, cosmetic surgery and weight care.",
  url: "https://awishclinic.com",
  phone: "+91 82876 40479",
  whatsapp: "+91 82876 40479",
  email: "awishclinics@gmail.com",
  address: {
    street: "L-5, 5, Pocket L",
    area: "Sarita Vihar",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110076",
    country: "India",
    mapUrl:
      "https://maps.google.com/?q=L-5,+5,+Pocket+L,+Sarita+Vihar,+New+Delhi,+Delhi+110076,+India",
    embedUrl:
      "https://www.google.com/maps?q=L-5,+5,+Pocket+L,+Sarita+Vihar,+New+Delhi,+Delhi+110076,+India&output=embed",
  },
  locations: [
    {
      label: "Sarita Vihar, New Delhi",
      city: "New Delhi",
      region: "Delhi NCR",
      fullAddress:
        "L-5, 5, Pocket L, Sarita Vihar, New Delhi, Delhi 110076, India",
      shortAddress: "L-5, 5, Pocket L, Sarita Vihar, New Delhi",
      mapUrl:
        "https://maps.google.com/?q=L-5,+5,+Pocket+L,+Sarita+Vihar,+New+Delhi,+Delhi+110076,+India",
      note: "Primary clinic location",
      primary: true,
    },
    {
      label: "Sector 31, Gurugram",
      city: "Gurugram",
      region: "Haryana",
      fullAddress:
        "694, near Govt. Model Sanskriti Primary School, Sector 31, Gurugram, Haryana 122001, India",
      shortAddress:
        "694, near Govt. Model Sanskriti Primary School, Sector 31, Gurugram",
      mapUrl:
        "https://maps.google.com/?q=694,+near+Govt.+Model+Sanskriti+Primary+School,+Sector+31,+Gurugram,+Haryana+122001,+India",
      note: "Consultation availability",
      primary: false,
    },
    {
      label: "East Patel Nagar, New Delhi",
      city: "New Delhi",
      region: "Delhi NCR",
      fullAddress:
        "Back Side, 25/4, Block 25, East Patel Nagar, Patel Nagar, New Delhi, Delhi 110008, India",
      shortAddress:
        "Back Side, 25/4, Block 25, East Patel Nagar, Patel Nagar, New Delhi",
      mapUrl:
        "https://maps.google.com/?q=Back+Side,+25/4,+Block+25,+East+Patel+Nagar,+Patel+Nagar,+New+Delhi,+Delhi+110008,+India",
      note: "Delhi consultation access",
      primary: false,
    },
    {
      label: "Swej Farm, Jaipur",
      city: "Jaipur",
      region: "Rajasthan",
      fullAddress:
        "FIRST FLOOR, S-7, SWEJ FARM, opp. MAHIMA TRAINITY MALL, near POLICE CHOKI SWEJ FARM, Sunder Singh Bhandari Nagar, JOA Scheme, Civil Lines, Jaipur, Rajasthan 302019, India",
      shortAddress:
        "First Floor, S-7, Swej Farm, Civil Lines, Jaipur, Rajasthan 302019",
      mapUrl:
        "https://maps.google.com/?q=FIRST+FLOOR,+S-7,+SWEJ+FARM,+opp.+MAHIMA+TRAINITY+MALL,+near+POLICE+CHOKI+SWEJ+FARM,+Sunder+Singh+Bhandari+Nagar,+JOA+Scheme,+Civil+Lines,+Jaipur,+Rajasthan+302019,+India",
      note: "Jaipur availability",
      primary: false,
    },
  ],
  hours: {
    weekdays: "10:00 AM - 8:00 PM",
    saturday: "10:00 AM - 8:00 PM",
    sunday: "10:00 AM - 8:00 PM",
  },
  social: {
    instagram: "https://instagram.com/awishclinic",
    facebook: "https://facebook.com/awishclinic",
    youtube: "https://youtube.com/@awishclinic",
  },
  doctor: {
    name: "Dr. Vijay Kumar",
    title: "MBBS, MD (Dermatologist)",
    qualifications: "Board-certified hair transplant & aesthetic dermatology specialist",
    experience: "Clinic led alongside Dr. Pooja Varshney",
    image: "/images/doctor/Dr.%20Vijay%20Kumar.png",
    bio: "Dr. Vijay Kumar is a board-certified dermatologist (MBBS, MD) specialising in hair transplant, aesthetic dermatology and cosmetic procedures. He leads the clinical team at Awish Clinic with a consultation-first approach, ensuring every patient receives an honest assessment, realistic expectations and a personalised treatment plan.",
  },
  doctorQuote:
    "Medicine can cure diseases, but only doctors can cure patients.",
  doctorTeam: [
    {
      name: "Dr. Vijay Kumar",
      title: "MBBS, MD (Dermatologist)",
      image: "/images/doctor/Dr.%20Vijay%20Kumar.png",
      focus: "Hair transplant, aesthetic dermatology & cosmetic procedures",
      summary:
        "Board-certified dermatologist leading hair transplant procedures, skin treatments and aesthetic consultations. Known for honest assessments and personalised treatment planning across all Awish Clinic locations.",
      specialties: [
        "Hair Transplant",
        "Hair Loss",
        "Acne Treatment",
        "Aesthetic Dermatology",
      ],
    },
    {
      name: "Dr. Pooja Varshney",
      title: "MBBS, MD (Dermatologist)",
      image: "/images/doctor/DR.%20POOJA%20VARSHNEY.png",
      focus: "Acne scars, cosmetology & skin rejuvenation",
      summary:
        "Specialist in acne scar treatment, cosmetology and skin rejuvenation. Patients trust her for detailed skin assessments, chemical peel planning and compassionate, thorough consultations.",
      specialties: [
        "Pimple Scar Treatment",
        "Skin Treatment",
        "Cosmetology",
        "Glow and Peel Planning",
      ],
    },
  ],
  stats: {
    patients: "30,000+",
    healthSections: "15+",
    awardsWon: "45+",
    openDays: "7 days",
  },
  positioning: {
    primary:
      "Trusted by 30,000+ patients across Delhi NCR for affordable dermatology consultation, advanced hair transplant, proven skin treatments and personalised aesthetic care — without the celebrity-clinic markup.",
    trustLine:
      "Board-certified dermatologists, FDA-approved techniques, transparent pricing and personalised treatment plans — all under one roof in Sarita Vihar, Delhi.",
  },
  carePillars: [
    {
      title: "All-in-One Skin, Hair & Body Care",
      description:
        "Consult for hair loss, acne, pigmentation, cosmetic surgery and weight management in a single visit — no referrals needed.",
    },
    {
      title: "Board-Certified Dermatologists",
      description:
        "Every treatment plan is designed by MBBS, MD dermatologists with years of specialised experience in skin, hair and aesthetic medicine.",
    },
    {
      title: "Personalised Treatment Plans",
      description:
        "Your treatment is tailored to your skin type, hair condition, body goals and budget — no one-size-fits-all prescriptions.",
    },
    {
      title: "Advanced, Affordable Techniques",
      description:
        "Access FDA-approved treatments, latest laser technology and proven surgical techniques at fair, transparent prices.",
    },
  ],
  audiences: [
    {
      label: "Men's confidence",
      copy:
        "FUE hair transplant, beard shaping, laser hair removal and anti-aging treatments designed for men who want natural-looking results with minimal downtime.",
    },
    {
      label: "Women's discreet care",
      copy:
        "Breast surgery, body contouring, skin rejuvenation and cosmetic procedures in a private, comfortable clinic environment with female dermatologist consultation available.",
    },
    {
      label: "Younger skin concerns",
      copy:
        "Acne treatment, pimple scar removal, skin brightening and medi-facials for students and young professionals who want clear, camera-ready skin.",
    },
    {
      label: "Weight journeys",
      copy:
        "Medically supervised weight loss programmes, non-surgical body contouring and bariatric surgery consultation with ongoing nutritional support and follow-up care.",
    },
  ],
  concernCoverage: [
    "Acne / Pimples",
    "Hair Loss",
    "Pigmentation",
    "Breast Care",
    "Skin Wellness",
  ],
  neighborhoods: [
    "Sarita Vihar",
    "South Delhi",
    "East Patel Nagar",
    "Jamia Nagar",
    "Okhla",
    "New Friends Colony",
    "Greater Kailash",
    "Jasola",
    "Gurugram",
    "Jaipur",
    "Noida and nearby NCR pockets",
  ],
  homepageGallery,
  launchNotes: [
    "Swap stock-led visuals with owned clinic photography and approved patient imagery when available.",
    "Replace placeholder social handles with the final approved clinic profiles before publishing the live domain.",
    "Add any registrations, memberships or additional doctor certifications you want shown publicly before launch.",
  ],
};
