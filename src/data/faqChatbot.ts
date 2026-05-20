export interface FAQChatbotItem {
  question: string;
  answer: string;
}

export interface FAQChatbotCategory {
  id: string;
  title: string;
  intro: string;
  items: FAQChatbotItem[];
}

export const faqChatbotCategories: FAQChatbotCategory[] = [
  {
    id: "common",
    title: "Common Questions",
    intro: "Quick answers to the questions patients usually ask before visiting Awish Clinic in Sarita Vihar, Delhi.",
    items: [
      {
        question: "Which is the best skin and hair clinic near Sarita Vihar?",
        answer:
          "Awish Clinic in Sarita Vihar, Delhi NCR is a leading dermatology and aesthetic clinic specialising in hair transplant (FUE), skin treatments, cosmetic surgery and weight management. The clinic is led by experienced doctors including Dr. Vijay Kumar and Dr. Pooja Varshney, both with MBBS and MD qualifications. We are open 7 days a week from 10 AM to 8 PM. Call us at +91 82876 40479 to book your appointment.",
      },
      {
        question: "What treatments does Awish Clinic offer?",
        answer:
          "Awish Clinic offers a wide range of treatments including FUE hair transplant, PRP therapy, GFC hair treatment, acne and acne scar treatment, pigmentation correction, anti-ageing procedures, laser skin treatments, gynecomastia surgery, breast augmentation, liposuction, rhinoplasty, weight management programmes and white beard treatment. All procedures are performed by qualified MBBS, MD doctors at our Sarita Vihar clinic in Delhi.",
      },
      {
        question: "How long does treatment take at Awish Clinic?",
        answer:
          "Treatment duration at Awish Clinic varies by procedure. Hair transplant (FUE) typically takes 4 to 8 hours depending on the number of grafts. Breast procedures usually take 2 to 3 hours. Gynecomastia surgery takes about 1 to 1.5 hours. White beard treatment takes around 1.5 hours. Hymenoplasty takes approximately 45 minutes to 1 hour. During your consultation, Dr. Vijay Kumar or Dr. Pooja Varshney will give you a precise time estimate for your specific case.",
      },
      {
        question: "Do I need to stay overnight at Awish Clinic after treatment?",
        answer:
          "Most treatments at Awish Clinic are day-care procedures, meaning you go home the same day. Some breast surgeries may require one day of admission depending on the anaesthesia plan. Gynecomastia surgery may need 7 to 8 hours of post-procedure observation. Our doctors will discuss admission requirements during your pre-treatment consultation at our Sarita Vihar clinic.",
      },
      {
        question: "Are treatments at Awish Clinic painless?",
        answer:
          "Yes, all treatments at Awish Clinic are designed to be painless and comfortable. We use local anaesthesia, sedation or general anaesthesia as appropriate for each procedure. Our doctors Dr. Vijay Kumar and Dr. Pooja Varshney prioritise patient comfort and use advanced techniques to minimise discomfort during and after every procedure.",
      },
      {
        question: "Will there be visible scars after treatment?",
        answer:
          "Awish Clinic uses advanced scarless and minimally invasive techniques for most procedures. FUE hair transplant leaves no linear scar. Cosmetic surgeries are planned with hidden incision lines for the most natural-looking results. During your consultation at our Sarita Vihar clinic, the doctor will explain exactly what to expect regarding scarring for your specific treatment.",
      },
      {
        question: "What is the recovery time after treatment at Awish Clinic?",
        answer:
          "Recovery time depends on the treatment. After FUE hair transplant, most patients return to work within 3 to 5 days. Breast surgery typically requires about 3 days for dressing follow-up and 10 days for stitch removal. Skin treatments like chemical peels and laser sessions usually have minimal downtime. Our doctors at Awish Clinic, Sarita Vihar will provide a personalised recovery plan during your consultation. Call +91 82876 40479 for details.",
      },
      {
        question: "Are there any side effects of cosmetic treatments?",
        answer:
          "Treatments at Awish Clinic are performed by qualified MBBS, MD doctors using proven, safe techniques, so side effects are rare and typically minor. Temporary redness, swelling or mild discomfort may occur depending on the procedure, but these resolve within a few days. Dr. Vijay Kumar and Dr. Pooja Varshney will discuss all potential risks transparently during your consultation.",
      },
      {
        question: "How long do I need to take medicines after treatment?",
        answer:
          "Medication duration varies by procedure. Most treatments at Awish Clinic require medicines for about 10 days post-procedure. White beard treatment may need 5 days of antibiotics along with 4 to 5 months of hair vitaliser support. Your doctor will provide a detailed prescription and follow-up schedule after your treatment at our Sarita Vihar clinic.",
      },
      {
        question: "Are treatments at Awish Clinic safe?",
        answer:
          "Absolutely. All treatments at Awish Clinic are performed by board-certified doctors with MBBS and MD qualifications. Dr. Vijay Kumar and Dr. Pooja Varshney follow international safety protocols and use FDA-approved equipment and materials. We also conduct pre-treatment tests and thorough assessments to ensure every patient is a safe candidate.",
      },
      {
        question: "What tests are needed before treatment?",
        answer:
          "Yes, pre-treatment tests are generally required at Awish Clinic to ensure your safety and the best possible results. The specific tests depend on the procedure, for example blood tests before surgery or scalp analysis before hair transplant. During your first visit to our Sarita Vihar clinic, the doctor will prescribe the exact tests you need.",
      },
      {
        question: "What are Awish Clinic's opening hours?",
        answer:
          "Awish Clinic in Sarita Vihar, Delhi is open 7 days a week from 10 AM to 8 PM. You can book an appointment by calling +91 82876 40479 or visiting us directly. Walk-ins are welcome, but we recommend booking in advance to reduce your waiting time.",
      },
      {
        question: "How do I book an appointment at Awish Clinic?",
        answer:
          "You can book an appointment at Awish Clinic by calling or WhatsApp at +91 82876 40479. Our team is available 7 days a week from 10 AM to 8 PM. You can also visit our clinic directly in Sarita Vihar, Delhi NCR. First consultations include a thorough assessment by our MBBS, MD qualified doctors.",
      },
    ],
  },
  {
    id: "hair-transplant",
    title: "Hair Transplant",
    intro: "Everything you need to know about FUE hair transplant at Awish Clinic in Delhi.",
    items: [
      {
        question: "How much does a hair transplant cost in Delhi?",
        answer:
          "Hair transplant cost at Awish Clinic in Delhi depends on the number of grafts needed and the technique used. We specialise in the FUE (Follicular Unit Extraction) method, which is the most advanced and scarless technique available. During your consultation, Dr. Vijay Kumar will assess your scalp, discuss your hairline goals and provide a transparent, personalised quote. Contact us at +91 82876 40479 for a free assessment.",
      },
      {
        question: "Is FUE hair transplant safe?",
        answer:
          "Yes, FUE hair transplant at Awish Clinic is completely safe. It is a minimally invasive procedure performed by Dr. Vijay Kumar (MBBS, MD) using advanced micro-extraction tools. FUE leaves no linear scar, involves minimal pain and has a quick recovery time. Thousands of patients across Delhi NCR trust Awish Clinic for their hair restoration.",
      },
      {
        question: "How many grafts do I need for a hair transplant?",
        answer:
          "The number of grafts depends on the extent of your hair loss, the density you want and your donor area capacity. At Awish Clinic, Dr. Vijay Kumar performs a detailed scalp analysis during your consultation to determine the exact graft count. Typical procedures range from 1,500 to 4,000+ grafts. Call +91 82876 40479 to schedule your free scalp assessment at our Sarita Vihar clinic.",
      },
      {
        question: "When will I see results after hair transplant?",
        answer:
          "After an FUE hair transplant at Awish Clinic, initial hair growth starts around 3 months post-procedure. Noticeable improvement is visible by 6 months, and full results typically appear between 9 to 12 months. Dr. Vijay Kumar and the team at our Sarita Vihar clinic will monitor your progress with scheduled follow-ups.",
      },
      {
        question: "Can I go to the gym after hair transplant?",
        answer:
          "After your FUE hair transplant at Awish Clinic, we recommend avoiding heavy exercise and gym workouts for at least 2 to 3 weeks to allow the grafts to settle properly. Light walking is fine from day one. Dr. Vijay Kumar will give you a personalised recovery timeline based on your procedure during your follow-up visits.",
      },
      {
        question: "Is hair transplant done by a doctor or technician at Awish Clinic?",
        answer:
          "At Awish Clinic, every hair transplant procedure is performed personally by our qualified doctors, not technicians. Dr. Vijay Kumar (MBBS, MD) leads the hair transplant team and is involved in every step from extraction to implantation. This ensures the highest quality results and patient safety at our Sarita Vihar clinic in Delhi.",
      },
      {
        question: "What are the qualifications of hair transplant doctors at Awish Clinic?",
        answer:
          "Our hair transplant team is led by Dr. Vijay Kumar (MBBS, MD), supported by Dr. Pooja Varshney (MBBS, MD, Dermatologist). Both doctors are board-certified with extensive experience in FUE hair transplant and aesthetic medicine. Awish Clinic in Sarita Vihar, Delhi is known for doctor-led, not technician-driven, procedures.",
      },
      {
        question: "When can I wash my hair after hair transplant?",
        answer:
          "After your FUE hair transplant at Awish Clinic, you can typically start gentle hair washing from the third day onwards, following the specific instructions given by Dr. Vijay Kumar. We provide a detailed post-procedure care guide and special shampoo recommendations to protect your newly transplanted grafts.",
      },
      {
        question: "Is there any cancer risk from hair transplant?",
        answer:
          "No, there is absolutely no cancer risk associated with FUE hair transplant. The procedure simply relocates your own hair follicles from the donor area to the thinning area. No chemicals, radiation or foreign substances are involved. Dr. Vijay Kumar at Awish Clinic uses safe, well-established surgical techniques with no known long-term health risks.",
      },
      {
        question: "How many PRP sessions are included in the hair transplant package?",
        answer:
          "Awish Clinic offers customised hair transplant packages that typically include PRP (Platelet-Rich Plasma) sessions to boost graft survival and hair growth. The exact number of PRP sessions depends on your treatment plan. Dr. Vijay Kumar will discuss the complete package details during your consultation. Call +91 82876 40479 to learn more.",
      },
      {
        question: "What is GFC hair treatment and is it included?",
        answer:
          "GFC (Growth Factor Concentrate) is an advanced hair growth therapy available at Awish Clinic that uses concentrated growth factors from your own blood to stimulate hair follicles. It can be included as part of your hair transplant package or as a standalone treatment for hair thinning. Dr. Pooja Varshney can explain whether GFC or PRP is better suited for your hair loss pattern during your consultation at our Sarita Vihar clinic.",
      },
    ],
  },
  {
    id: "skin-treatments",
    title: "Skin Treatments",
    intro: "Answers about acne, pigmentation, anti-ageing and laser treatments at Awish Clinic, Delhi.",
    items: [
      {
        question: "Is Awish Clinic good for acne treatment?",
        answer:
          "Yes, Awish Clinic in Sarita Vihar, Delhi is highly regarded for acne treatment. Dr. Pooja Varshney (MBBS, MD, Dermatologist) specialises in treating all grades of acne including hormonal acne, cystic acne and acne scars. We offer medical-grade treatments including chemical peels, laser therapy, microneedling and customised skincare protocols. Book your consultation at +91 82876 40479.",
      },
      {
        question: "Which is the best dermatologist near Sarita Vihar for skin problems?",
        answer:
          "Dr. Pooja Varshney at Awish Clinic is one of the best dermatologists near Sarita Vihar, Delhi. She holds MBBS and MD degrees and specialises in treating acne, pigmentation, eczema, psoriasis, fungal infections and anti-ageing concerns. Awish Clinic is conveniently located in Sarita Vihar and is open 7 days a week. Call +91 82876 40479 to book an appointment.",
      },
      {
        question: "What pigmentation treatments are available at Awish Clinic?",
        answer:
          "Awish Clinic offers advanced pigmentation treatments including chemical peels, laser toning, microdermabrasion, PRP skin rejuvenation and prescription depigmenting creams. Dr. Pooja Varshney will assess your pigmentation type, whether it is melasma, sun spots, post-inflammatory hyperpigmentation or uneven skin tone, and create a personalised treatment plan at our Sarita Vihar clinic.",
      },
      {
        question: "Does Awish Clinic offer anti-ageing treatments?",
        answer:
          "Yes, Awish Clinic in Delhi offers a comprehensive range of anti-ageing treatments including Botox, dermal fillers, thread lifts, chemical peels, microneedling with PRP and laser skin rejuvenation. Our doctors Dr. Vijay Kumar and Dr. Pooja Varshney focus on natural-looking results that restore youthful skin without an overdone appearance. Visit us in Sarita Vihar or call +91 82876 40479.",
      },
      {
        question: "What laser treatments does Awish Clinic offer?",
        answer:
          "Awish Clinic offers laser treatments for hair removal, acne scars, pigmentation, skin tightening, tattoo removal and skin rejuvenation. We use advanced FDA-approved laser technology for safe and effective results. Dr. Pooja Varshney and Dr. Vijay Kumar determine the right laser type and number of sessions based on your skin concern during your consultation at our Sarita Vihar clinic in Delhi.",
      },
    ],
  },
  {
    id: "breast",
    title: "Breast Procedures",
    intro: "Answers about breast augmentation, reduction and related procedures at Awish Clinic.",
    items: [
      {
        question: "Does breast augmentation at Awish Clinic affect breastfeeding?",
        answer:
          "No, breast augmentation at Awish Clinic does not affect breastfeeding. Our surgeons use techniques that preserve the milk ducts and mammary glands. Dr. Vijay Kumar (MBBS, MD) will discuss implant placement options during your consultation at our Sarita Vihar clinic to ensure breastfeeding is not affected.",
      },
      {
        question: "Does breast augmentation change after pregnancy?",
        answer:
          "No, the breast augmentation results from Awish Clinic are designed to remain stable after pregnancy. While natural breast tissue may change with pregnancy and weight fluctuations, the implants themselves maintain their position and shape. Dr. Vijay Kumar can discuss this in detail during your pre-surgery consultation.",
      },
      {
        question: "How long do breast implants last?",
        answer:
          "Breast implants placed at Awish Clinic are high-quality, medical-grade silicone implants that typically last around 20 years or more. Regular follow-ups are recommended to ensure everything remains in excellent condition. Dr. Vijay Kumar at our Sarita Vihar clinic will guide you on long-term care and monitoring.",
      },
      {
        question: "What is the recovery time after breast surgery at Awish Clinic?",
        answer:
          "After breast surgery at Awish Clinic, dressing follow-up is typically around 3 days and stitches are removed in about 10 days. Most patients return to light daily activities within a week. Dr. Vijay Kumar provides a detailed post-operative care plan and schedules follow-up visits at our Sarita Vihar clinic. Call +91 82876 40479 for more information.",
      },
      {
        question: "How much does breast augmentation cost in Delhi?",
        answer:
          "Breast augmentation cost at Awish Clinic in Delhi depends on the type of implant, surgical technique and your specific goals. We offer transparent, consultation-led pricing with no hidden charges. Dr. Vijay Kumar will provide a detailed quote after your assessment. Book a confidential consultation at +91 82876 40479 at our Sarita Vihar clinic.",
      },
    ],
  },
  {
    id: "gynecomastia",
    title: "Gynecomastia",
    intro: "Frequently asked questions about male breast reduction surgery at Awish Clinic in Delhi.",
    items: [
      {
        question: "What is the cost of gynecomastia surgery in Delhi?",
        answer:
          "Gynecomastia surgery cost at Awish Clinic in Delhi varies based on the grade of gynecomastia and the surgical approach needed (liposuction alone or combined with gland excision). Dr. Vijay Kumar (MBBS, MD) provides personalised pricing after a thorough assessment at our Sarita Vihar clinic. Call +91 82876 40479 for a confidential consultation.",
      },
      {
        question: "Will I be discharged the same day after gynecomastia surgery?",
        answer:
          "Gynecomastia surgery at Awish Clinic typically requires 7 to 8 hours of post-operative observation. Most patients are discharged the same day or the next morning depending on their recovery. Dr. Vijay Kumar will advise on your expected discharge timing during your pre-surgery consultation at our Sarita Vihar clinic.",
      },
      {
        question: "Does gynecomastia come back after surgery?",
        answer:
          "Gynecomastia surgery results at Awish Clinic are permanent in most cases. Once the excess glandular tissue is removed, it does not typically grow back. Maintaining a stable weight and avoiding certain medications helps ensure long-lasting results. Dr. Vijay Kumar will discuss preventive measures during your consultation.",
      },
      {
        question: "Is gynecomastia surgery painless?",
        answer:
          "Yes, gynecomastia surgery at Awish Clinic is performed under anaesthesia, so you feel no pain during the procedure. Post-surgery discomfort is mild and well-managed with prescribed pain medication. Dr. Vijay Kumar uses minimally invasive techniques at our Sarita Vihar clinic for faster recovery and minimal discomfort.",
      },
      {
        question: "Do I need to wear a compression vest after gynecomastia surgery?",
        answer:
          "Yes, wearing a compression vest after gynecomastia surgery is important for proper healing and achieving the best results. At Awish Clinic, Dr. Vijay Kumar recommends wearing the vest for about 4 to 6 weeks. It helps reduce swelling, supports the chest contour and ensures smooth recovery.",
      },
      {
        question: "When can I go to the gym after gynecomastia surgery?",
        answer:
          "After gynecomastia surgery at Awish Clinic, light activities can be resumed within a week. Gym workouts and heavy lifting should be avoided for about 4 to 6 weeks to allow proper healing. Dr. Vijay Kumar will provide a phased return-to-exercise plan during your follow-up at our Sarita Vihar clinic.",
      },
    ],
  },
  {
    id: "white-beard",
    title: "White Beard Treatment",
    intro: "Answers about white or grey beard treatment at Awish Clinic in Delhi.",
    items: [
      {
        question: "What is white beard treatment and how does it work?",
        answer:
          "White beard treatment at Awish Clinic uses advanced techniques to restore natural colour to grey or white beard hair. The procedure is painless, scarless and gives permanent results. Dr. Vijay Kumar or Dr. Pooja Varshney will assess your beard during a consultation at our Sarita Vihar clinic and recommend the best approach for your case.",
      },
      {
        question: "Is white beard treatment painless?",
        answer:
          "Yes, white beard treatment at Awish Clinic is completely painless. The procedure is designed for maximum comfort with no significant downtime. You can return to your normal routine almost immediately. Visit us at Sarita Vihar, Delhi or call +91 82876 40479 to book your consultation.",
      },
      {
        question: "Is white beard treatment permanent?",
        answer:
          "Yes, white beard treatment results at Awish Clinic are permanent. Once the treatment is complete, the treated hairs maintain their restored colour. The procedure typically takes around 1.5 hours and may require 5 days of antibiotics plus 4 to 5 months of hair vitaliser support for optimal results.",
      },
      {
        question: "Does white beard treatment leave scars on the face?",
        answer:
          "No, white beard treatment at Awish Clinic is a scarless procedure. Our doctors use gentle, non-invasive techniques that leave no visible marks on your face. The treatment is safe and suitable for all skin types. Book a consultation at our Sarita Vihar clinic by calling +91 82876 40479.",
      },
      {
        question: "Why does my beard turn white or grey?",
        answer:
          "Beard greying can be caused by genetics, stress, nutritional deficiencies (vitamin B12, iron), hormonal changes or autoimmune conditions. At Awish Clinic, Dr. Pooja Varshney (MBBS, MD, Dermatologist) can identify the underlying cause through blood tests and scalp analysis, and recommend targeted treatment at our Sarita Vihar clinic in Delhi.",
      },
      {
        question: "Are there side effects of white beard treatment?",
        answer:
          "White beard treatment at Awish Clinic has minimal to no side effects. The procedure is safe and performed by qualified MBBS, MD doctors. Mild temporary redness may occur but resolves quickly. Dr. Vijay Kumar and Dr. Pooja Varshney will discuss your medical history to ensure the treatment is right for you.",
      },
      {
        question: "How much does white beard treatment cost in Delhi?",
        answer:
          "White beard treatment cost at Awish Clinic in Delhi depends on the extent of greying and the number of sessions needed. We offer transparent pricing discussed during your consultation. Contact us at +91 82876 40479 or visit our Sarita Vihar clinic for a personalised assessment and quote.",
      },
      {
        question: "Where is the best clinic for white beard treatment in Delhi?",
        answer:
          "Awish Clinic in Sarita Vihar, Delhi is a trusted destination for white beard treatment. Our experienced doctors Dr. Vijay Kumar and Dr. Pooja Varshney (both MBBS, MD) deliver permanent, painless and scarless results. We are open 7 days a week from 10 AM to 8 PM. Call +91 82876 40479 to book your appointment.",
      },
    ],
  },
  {
    id: "weight-management",
    title: "Weight Management",
    intro: "Answers about weight loss and body contouring programmes at Awish Clinic, Delhi.",
    items: [
      {
        question: "Does Awish Clinic offer weight loss treatment?",
        answer:
          "Yes, Awish Clinic in Sarita Vihar, Delhi offers comprehensive weight management programmes that include medical assessment, customised diet plans, lifestyle counselling and body contouring options like liposuction. Our doctors create personalised plans based on your health profile, BMI and weight loss goals. Call +91 82876 40479 to start your weight management journey.",
      },
      {
        question: "What is the cost of liposuction in Delhi?",
        answer:
          "Liposuction cost at Awish Clinic in Delhi depends on the treatment area, amount of fat to be removed and the technique used. Dr. Vijay Kumar (MBBS, MD) performs liposuction with advanced tumescent and VASER techniques for safe, effective fat removal. Book a consultation at our Sarita Vihar clinic by calling +91 82876 40479 for a personalised quote.",
      },
    ],
  },
  {
    id: "hymenoplasty",
    title: "Hymenoplasty",
    intro: "Confidential answers about hymenoplasty at Awish Clinic, Delhi.",
    items: [
      {
        question: "Is hymenoplasty available at Awish Clinic?",
        answer:
          "Yes, Awish Clinic in Sarita Vihar, Delhi offers hymenoplasty as a confidential, same-day procedure. The surgery takes approximately 45 minutes to 1 hour and is performed by experienced surgeons in a private, discreet setting. All consultations are completely confidential. Call +91 82876 40479 to schedule a private appointment.",
      },
      {
        question: "Does hymenoplasty affect future pregnancy?",
        answer:
          "No, hymenoplasty does not affect pregnancy or fertility in any way. The procedure only involves the hymen and has no impact on reproductive health. At Awish Clinic, our doctors ensure complete safety and provide thorough pre- and post-operative guidance in a confidential setting.",
      },
      {
        question: "What is the recovery time after hymenoplasty?",
        answer:
          "Recovery after hymenoplasty at Awish Clinic is quick. Most patients can return to normal activities within 2 to 3 days. Complete healing takes about 4 to 6 weeks. Our doctors provide detailed aftercare instructions and follow-up support. The entire process is handled with full confidentiality at our Sarita Vihar clinic.",
      },
    ],
  },
];

export const faqAssistantPrompt =
  "Still not satisfied, want to talk to an assistant?";
