"use client";

import { Testimonial } from "@/data/services";

interface ServiceTestimonialsProps {
  testimonials?: Testimonial[];
  serviceName: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Rahul Sharma",
    text: "The consultation at Awish Clinic was direct, honest, and extremely professional. The doctor listened to my concerns carefully and recommended a plan that gave me natural-looking results.",
    location: "New Delhi",
  },
  {
    name: "Priya Murthy",
    text: "It felt extremely premium without feeling intimidating or distant. The medical team made the whole treatment process easier than I ever expected. A wonderful clinic experience.",
    location: "Delhi NCR",
  },
  {
    name: "Vikram Malhotra",
    text: "Clear instructions, professional care, and a much better clinical standard than any of the stock corporate chains I checked earlier. Honest pricing and outstanding follow-ups.",
    location: "Gurugram",
  },
];

export default function ServiceTestimonials({
  testimonials,
  serviceName,
}: ServiceTestimonialsProps) {
  const activeTestimonials = testimonials && testimonials.length > 0
    ? testimonials
    : defaultTestimonials;

  return (
    <section className="section-shell bg-[rgba(255,255,255,0.45)]">
      <div className="container-shell">
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <span className="eyebrow border-[rgba(30,36,34,0.08)] bg-white text-[var(--accent)] font-bold">
            Patient Trust
          </span>
          <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight font-serif text-[var(--foreground)]">
            What patients say about <br />
            our {serviceName} care.
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--muted)] max-w-xl">
            Real feedback from patients who went through consultations and personalized treatment plans at our clinics.
          </p>
        </div>

        {/* Testimonials Responsive Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeTestimonials.map((t, index) => {
            // Split name into initials
            const initials = t.name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("");

            // Stagger animations up to 3 cards
            const staggerClass = index === 0 
              ? "stagger-1" 
              : index === 1 
                ? "stagger-2" 
                : "stagger-3";

            return (
              <div
                key={t.name + index}
                className={`fade-up-reveal ${staggerClass} surface-card rounded-[24px] p-6 border border-[rgba(30,36,34,0.08)] shadow-[0_22px_50px_rgba(18,24,28,0.04)] hover-lift-premium`}
              >
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4 text-[var(--accent)]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 shrink-0"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm leading-7 text-[var(--muted)] font-sans italic">
                  &quot;{t.text}&quot;
                </p>

                {/* Profile detail */}
                <div className="mt-6 flex items-center gap-3 border-t border-[rgba(30,36,34,0.06)] pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-xs font-bold text-[var(--brand)]">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{t.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] shrink-0" />
                      Verified Patient {t.location ? `• ${t.location}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
