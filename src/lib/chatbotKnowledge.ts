import { faqChatbotCategories, type FAQChatbotItem } from "@/data/faqChatbot";
import { services } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";

export type ChatbotRole = "user" | "assistant";

export interface ChatbotHistoryMessage {
  role: ChatbotRole;
  content: string;
}

export interface KnowledgeSnippet {
  id: string;
  title: string;
  content: string;
  source: "site" | "service" | "faq";
  keywords: string[];
  followUps?: string[];
}

interface IndexedKnowledgeSnippet extends KnowledgeSnippet {
  normalizedTitle: string;
  normalizedText: string;
  tokenSet: Set<string>;
}

const stopWords = new Set([
  "a",
  "about",
  "after",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "but",
  "by",
  "can",
  "do",
  "for",
  "from",
  "get",
  "had",
  "has",
  "have",
  "how",
  "i",
  "if",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "our",
  "should",
  "the",
  "their",
  "there",
  "this",
  "to",
  "we",
  "what",
  "when",
  "where",
  "which",
  "who",
  "will",
  "with",
  "you",
  "your",
]);

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value: string) =>
  normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 1 && !stopWords.has(token));

const buildSiteSnippets = (): KnowledgeSnippet[] => {
  const contactParts = [
    siteConfig.address.street,
    siteConfig.address.area,
    siteConfig.address.city,
    siteConfig.address.state,
  ].filter((part) => part && !/[x]{2,}/i.test(part));

  return [
    {
      id: "site-overview",
      title: "Awish Clinic overview",
      source: "site",
      content: `Awish Clinic is a leading dermatology and aesthetic clinic in Sarita Vihar, Delhi NCR offering hair transplant (FUE), skin treatments, cosmetic surgery and weight management. The clinic is led by Dr. Vijay Kumar and Dr. Pooja Varshney, both qualified with MBBS and MD degrees. ${siteConfig.positioning.primary}`,
      keywords: ["awish", "clinic", "delhi", "sarita vihar", "dermatology", "aesthetic", "skin", "hair", "cosmetic", "weight", "best clinic"],
      followUps: [
        "What treatments does Awish Clinic offer?",
        "Who are the doctors at Awish Clinic?",
        "How do I book an appointment?",
      ],
    },
    {
      id: "site-services",
      title: "Awish Clinic treatments and services",
      source: "site",
      content:
        "Awish Clinic offers FUE hair transplant, PRP therapy, GFC hair treatment, acne treatment, pigmentation correction, anti-ageing procedures, laser skin treatments, gynecomastia surgery, breast augmentation, liposuction, rhinoplasty, weight management programmes, white beard treatment and hymenoplasty. All procedures are performed by MBBS, MD qualified doctors.",
      keywords: ["services", "treatments", "FUE", "hair transplant", "PRP", "GFC", "acne", "pigmentation", "laser", "gynecomastia", "breast", "liposuction", "rhinoplasty", "weight loss", "white beard", "hymenoplasty"],
      followUps: [
        "How much does hair transplant cost in Delhi?",
        "What skin treatments are available?",
        "Is Awish Clinic good for acne treatment?",
      ],
    },
    {
      id: "site-location",
      title: "Awish Clinic location and directions",
      source: "site",
      content: `Awish Clinic is located in Sarita Vihar, Delhi NCR, easily accessible from ${siteConfig.neighborhoods.slice(0, 6).join(", ")} and surrounding areas. The clinic address is ${contactParts.join(", ")}. Open 7 days a week from 10 AM to 8 PM. Call +91 82876 40479 for directions or to book an appointment.`,
      keywords: ["location", "address", "delhi", "sarita vihar", "ncr", "near me", "directions", "how to reach", ...siteConfig.neighborhoods.map(normalizeText)],
      followUps: [
        "What are Awish Clinic's opening hours?",
        "How do I book an appointment at Awish Clinic?",
        "Is Awish Clinic near Faridabad?",
      ],
    },
    {
      id: "site-contact",
      title: "Awish Clinic contact and appointment booking",
      source: "site",
      content:
        "You can contact Awish Clinic by calling or WhatsApp at +91 82876 40479. The clinic is open 7 days a week from 10 AM to 8 PM at Sarita Vihar, Delhi NCR. Walk-ins are welcome but booking in advance is recommended. Consultations are private, pressure-free and include a thorough assessment by qualified MBBS, MD doctors with transparent pricing.",
      keywords: ["contact", "phone", "whatsapp", "appointment", "book", "consultation", "walk-in", "hours", "timing", "open"],
      followUps: [
        "What happens during a consultation?",
        "Is the consultation free?",
        "What are the clinic timings?",
      ],
    },
    {
      id: "site-consultation",
      title: "Consultation at Awish Clinic",
      source: "site",
      content:
        "Consultations at Awish Clinic are private, detailed and pressure-free. During your first visit, the doctor will assess your concern, explain treatment options, discuss realistic expectations and provide transparent pricing. There are no hidden charges. Pricing is personalised based on your specific treatment plan rather than fixed public packages. Call +91 82876 40479 to book.",
      keywords: ["consultation", "private", "price", "pricing", "cost", "book", "appointment", "realistic", "assessment", "first visit"],
      followUps: [
        "How much does consultation cost?",
        "What should I bring for my first visit?",
        "Can I get a quote over the phone?",
      ],
    },
    {
      id: "site-doctors",
      title: "Doctors at Awish Clinic",
      source: "site",
      content: `Awish Clinic has two experienced doctors. Dr. Vijay Kumar (MBBS, MD) specialises in hair transplant (FUE), cosmetic surgery and aesthetic procedures. Dr. Pooja Varshney (MBBS, MD, Dermatologist) specialises in skin treatments, acne, pigmentation and anti-ageing care. Both doctors are board-certified and the clinic is known for doctor-led procedures, not technician-driven treatments.`,
      keywords: ["doctor", "dr vijay kumar", "dr pooja varshney", "dermatologist", "surgeon", "MBBS", "MD", "credentials", "qualification", "experience", "specialist"],
      followUps: [
        "Which doctor handles hair transplant?",
        "Who is the best dermatologist at Awish Clinic?",
        "What are the doctors' qualifications?",
      ],
    },
    {
      id: "site-safety",
      title: "Safety and quality at Awish Clinic",
      source: "site",
      content:
        "All treatments at Awish Clinic are performed by board-certified MBBS, MD doctors following international safety protocols. The clinic uses FDA-approved equipment and medical-grade materials. Pre-treatment tests are conducted to ensure patient safety. Procedures are doctor-led with personalised care plans and scheduled follow-ups for every patient.",
      keywords: ["safe", "safety", "quality", "FDA", "certified", "sterile", "hygiene", "standards", "protocol", "trust"],
      followUps: [
        "Are treatments at Awish Clinic safe?",
        "What safety protocols does the clinic follow?",
        "Are the doctors certified?",
      ],
    },
    {
      id: "site-hair-transplant",
      title: "Hair transplant at Awish Clinic",
      source: "site",
      content:
        "Awish Clinic in Sarita Vihar, Delhi specialises in FUE (Follicular Unit Extraction) hair transplant, the most advanced and scarless hair restoration technique. Dr. Vijay Kumar (MBBS, MD) personally performs every procedure. The clinic also offers PRP and GFC therapy for hair growth support. Results start showing from 3 months with full growth by 9 to 12 months. Hair transplant cost depends on graft count and is discussed during a free scalp assessment. Call +91 82876 40479.",
      keywords: ["hair transplant", "FUE", "hair loss", "baldness", "hairline", "grafts", "PRP", "GFC", "scalp", "donor area", "hair restoration", "cost"],
      followUps: [
        "How much does hair transplant cost in Delhi?",
        "How many grafts do I need?",
        "When will I see results after hair transplant?",
      ],
    },
    {
      id: "site-skin-care",
      title: "Skin treatments at Awish Clinic",
      source: "site",
      content:
        "Awish Clinic offers expert skin treatments including acne treatment, acne scar removal, pigmentation correction (melasma, sun spots, dark spots), chemical peels, laser skin treatments, microneedling, microdermabrasion, anti-ageing treatments (Botox, fillers, thread lifts) and skin rejuvenation. Dr. Pooja Varshney (MBBS, MD, Dermatologist) creates personalised treatment plans for every patient at the Sarita Vihar clinic. Call +91 82876 40479.",
      keywords: ["skin", "acne", "pigmentation", "melasma", "dark spots", "chemical peel", "laser", "microneedling", "anti-ageing", "botox", "fillers", "dermatologist", "skin care"],
      followUps: [
        "Is Awish Clinic good for acne treatment?",
        "What pigmentation treatments are available?",
        "Does Awish Clinic offer Botox?",
      ],
    },
    {
      id: "site-cosmetic-surgery",
      title: "Cosmetic surgery at Awish Clinic",
      source: "site",
      content:
        "Awish Clinic in Delhi performs cosmetic surgeries including breast augmentation, breast reduction, gynecomastia (male breast reduction), liposuction, rhinoplasty (nose surgery) and body contouring. All surgeries are performed by Dr. Vijay Kumar (MBBS, MD) using advanced techniques for natural-looking, safe results. Most procedures are day-care with same-day discharge. Book a confidential consultation at +91 82876 40479.",
      keywords: ["cosmetic surgery", "plastic surgery", "breast augmentation", "breast reduction", "gynecomastia", "liposuction", "rhinoplasty", "nose job", "body contouring", "surgery"],
      followUps: [
        "How much does gynecomastia surgery cost in Delhi?",
        "What is the recovery time after breast surgery?",
        "Is liposuction safe?",
      ],
    },
    {
      id: "site-weight-management",
      title: "Weight management at Awish Clinic",
      source: "site",
      content:
        "Awish Clinic offers comprehensive weight management programmes including medical assessment, customised diet plans, lifestyle counselling and surgical options like liposuction and body contouring. Our doctors create personalised weight loss plans based on your health profile, BMI and goals. Visit our Sarita Vihar clinic or call +91 82876 40479 to start your journey.",
      keywords: ["weight loss", "weight management", "obesity", "diet", "liposuction", "body contouring", "BMI", "fat removal"],
      followUps: [
        "Does Awish Clinic offer weight loss treatment?",
        "What is the cost of liposuction in Delhi?",
        "How does the weight management programme work?",
      ],
    },
  ];
};

const buildServiceSnippet = (serviceIndex: number): KnowledgeSnippet => {
  const service = services[serviceIndex];

  return {
    id: `service-${service.slug}`,
    title: service.name,
    source: "service",
    content: `${service.name} is listed as a ${service.category.replace("-", " ")} service. ${service.description} It is presented for ${service.audienceSummary.toLowerCase()} Key points include ${service.benefits.slice(0, 3).join(", ").toLowerCase()}. The site frames pricing as ${service.priceIndicator.toLowerCase()}.`,
    keywords: [
      service.slug,
      service.subdomain,
      service.name,
      service.shortName,
      ...service.concernTags,
      ...service.keywords,
      ...service.idealFor,
    ].flatMap((entry) => tokenize(entry)),
    followUps: service.faqs.slice(0, 3).map((faq) => faq.question),
  };
};

const buildFaqSnippet = (
  categoryId: string,
  categoryTitle: string,
  item: FAQChatbotItem,
  questionIndex: number
): KnowledgeSnippet => ({
  id: `faq-${categoryId}-${questionIndex}`,
  title: item.question,
  source: "faq",
  content: item.answer,
  keywords: [...tokenize(categoryTitle), ...tokenize(item.question), ...tokenize(item.answer).slice(0, 10)],
  followUps: [
    `Tell me more about ${categoryTitle.toLowerCase()} at Awish Clinic.`,
    "How do I book an appointment?",
    "What are the doctors' qualifications?",
  ],
});

const rawKnowledge: KnowledgeSnippet[] = [
  ...buildSiteSnippets(),
  ...services.map((_, index) => buildServiceSnippet(index)),
  ...faqChatbotCategories.flatMap((category) =>
    category.items.map((item, index) =>
      buildFaqSnippet(category.id, category.title, item, index)
    )
  ),
];

const indexedKnowledge: IndexedKnowledgeSnippet[] = rawKnowledge.map((snippet) => {
  const combinedText = `${snippet.title} ${snippet.content} ${snippet.keywords.join(" ")}`;

  return {
    ...snippet,
    normalizedTitle: normalizeText(snippet.title),
    normalizedText: normalizeText(combinedText),
    tokenSet: new Set(tokenize(combinedText)),
  };
});

const scoreSnippet = (
  snippet: IndexedKnowledgeSnippet,
  normalizedQuery: string,
  queryTokens: string[]
) => {
  let score = 0;

  if (!normalizedQuery) {
    return score;
  }

  if (snippet.normalizedTitle === normalizedQuery) {
    score += 24;
  } else if (snippet.normalizedTitle.includes(normalizedQuery)) {
    score += 14;
  }

  if (snippet.normalizedText.includes(normalizedQuery)) {
    score += 10;
  }

  for (const token of queryTokens) {
    if (snippet.normalizedTitle.includes(token)) {
      score += 5;
    }

    if (snippet.tokenSet.has(token)) {
      score += 2;
    }
  }

  if (
    queryTokens.some((token) => token === "price" || token === "pricing" || token === "cost") &&
    snippet.normalizedText.includes("price")
  ) {
    score += 4;
  }

  return score;
};

export function searchKnowledge(message: string, limit = 5): KnowledgeSnippet[] {
  const normalizedQuery = normalizeText(message);
  const queryTokens = tokenize(message);

  if (!normalizedQuery) {
    return rawKnowledge.slice(0, limit);
  }

  return indexedKnowledge
    .map((snippet) => ({
      snippet,
      score: scoreSnippet(snippet, normalizedQuery, queryTokens),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((entry) => ({
      id: entry.snippet.id,
      title: entry.snippet.title,
      content: entry.snippet.content,
      source: entry.snippet.source,
      keywords: entry.snippet.keywords,
      followUps: entry.snippet.followUps,
    }));
}

export function formatKnowledgeContext(snippets: KnowledgeSnippet[]) {
  if (!snippets.length) {
    return "No direct knowledge match was found. Ask the visitor to narrow the question to a service, concern, consultation, location or FAQ topic from the site.";
  }

  return snippets
    .map((snippet, index) => `${index + 1}. ${snippet.title}: ${snippet.content}`)
    .join("\n");
}

const withSentenceCap = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return trimmed;
  }

  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
};

export function buildRelatedQuestions(snippets: KnowledgeSnippet[]): string[] {
  const suggestions = new Set<string>();

  for (const snippet of snippets) {
    for (const followUp of snippet.followUps ?? []) {
      if (followUp.trim()) {
        suggestions.add(followUp.trim());
      }
    }
  }

  return Array.from(suggestions).slice(0, 3);
}

export function buildLocalAssistantReply(message: string): string {
  const snippets = searchKnowledge(message, 3);
  const query = normalizeText(message);

  if (!snippets.length) {
    return "I can help with questions about Awish Clinic in Sarita Vihar, Delhi. Ask about hair transplant, skin treatments, cosmetic surgery, weight management, our doctors, pricing, appointment booking or any treatment concern. Call +91 82876 40479 for immediate assistance.";
  }

  const faqSnippet = snippets.find((snippet) => snippet.source === "faq");
  const locationSnippet = snippets.find((snippet) => snippet.id === "site-location");
  const consultationSnippet = snippets.find((snippet) => snippet.id === "site-consultation");

  if (faqSnippet) {
    let answer = withSentenceCap(faqSnippet.content);

    if (/\b(price|pricing|cost|fees|package)\b/.test(query) && !answer.toLowerCase().includes("price") && !answer.toLowerCase().includes("cost")) {
      answer += " Pricing at Awish Clinic is personalised based on your treatment plan. Call +91 82876 40479 for a consultation and transparent quote.";
    }

    return answer;
  }

  const primary = withSentenceCap(snippets[0].content);
  const secondary = snippets[1]
    ? ` ${withSentenceCap(snippets[1].content)}`
    : "";
  const pricingNote =
    /\b(price|pricing|cost|fees|package)\b/.test(query) && !primary.toLowerCase().includes("price") && !primary.toLowerCase().includes("cost")
      ? " Pricing at Awish Clinic is personalised after assessment. Call +91 82876 40479 for a transparent quote."
      : "";
  const locationNote =
    /\b(location|delhi|near|ncr|address|direction)\b/.test(query) && locationSnippet
      ? ` ${withSentenceCap(locationSnippet.content)}`
      : "";
  const consultationNote =
    /\b(book|appointment|consultation|consult)\b/.test(query) && consultationSnippet
      ? ` ${withSentenceCap(consultationSnippet.content)}`
      : "";

  return `${primary}${secondary}${pricingNote}${locationNote}${consultationNote}`;
}

export function sanitizeHistory(history: unknown): ChatbotHistoryMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter(
      (item): item is ChatbotHistoryMessage =>
        typeof item === "object" &&
        item !== null &&
        "role" in item &&
        "content" in item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string"
    )
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, 1200),
    }))
    .filter((item) => item.content.length > 0)
    .slice(-6);
}
