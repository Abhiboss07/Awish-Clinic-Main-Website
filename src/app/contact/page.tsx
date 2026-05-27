"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ImagePageHero from "@/components/layout/ImagePageHero";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ClinicLocations from "@/components/ui/ClinicLocations";
import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/services";

const inputClass =
  "w-full rounded-[1.15rem] border border-[rgba(30,36,34,0.12)] bg-white px-4 py-3.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[rgba(33,77,72,0.12)]";

const touchpoints = [
  "Book a private consultation with our dermatologists — get clear next steps within 24 hours.",
  "Fast WhatsApp-first communication for patients across Delhi NCR, Gurugram and Jaipur.",
  "Walk-in and appointment availability 7 days a week at our Sarita Vihar clinic.",
];

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageContent />
    </Suspense>
  );
}

function ContactPageContent() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: searchParams.get("name") || "",
    phone: searchParams.get("phone") || "",
    email: "",
    service: "",
    clinic: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitFeedback(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "contact",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          message: [
            formData.clinic ? `Preferred clinic: ${formData.clinic}` : "",
            formData.message,
          ].filter(Boolean).join("\n"),
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Could not save your enquiry.");
      }

      setSubmitFeedback("Your enquiry has been submitted. We will get back to you shortly.");
      setFormData({ name: "", phone: "", email: "", service: "", clinic: "", message: "" });
    } catch (error) {
      setSubmitFeedback(
        error instanceof Error ? error.message : "Could not save your enquiry."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="page-shell flex-1">
        <ImagePageHero
          eyebrow="Contact Awish Clinic"
          title="Book your consultation — we respond within 24 hours."
          description="Share your skin, hair or aesthetic concern and our team will guide you to the right specialist. Available across Delhi NCR, Gurugram and Jaipur with WhatsApp, phone and walk-in options."
          image="/images/contact/contact-consultation.png"
          imageAlt="Contact consultation at Awish Clinic"
          showOverlay={false}
          highlights={touchpoints.map((item, index) => ({
            eyebrow: index === 2 ? "Why people reach out" : "Patient support",
            title: item,
          }))}
        />

        <section id="enquiry-form" className="section-shell scroll-mt-8">
          <div className="container-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="surface-card rounded-[2rem] p-7">
              <span className="eyebrow">Send a message</span>
              <h2 className="mt-5 text-4xl font-semibold">Tell us what you would like help with.</h2>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                Use the form below and we will continue the conversation on WhatsApp for quick coordination.
              </p>

              <form onSubmit={handleEnquirySubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                      Full name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                      Service of interest
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.slug} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="clinic" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                    Preferred clinic
                  </label>
                  <select
                    id="clinic"
                    value={formData.clinic}
                    onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Select a clinic location</option>
                    {siteConfig.locations.map((location) => (
                      <option key={location.label} value={location.label}>
                        {location.label}{location.primary ? " (Primary)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                    Your concern
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us what you would like to discuss."
                  />
                </div>

                {submitFeedback && (
                  <div className="rounded-[1.3rem] border border-[rgba(30,36,34,0.08)] bg-[var(--surface-strong)] px-4 py-4 text-sm leading-7 text-[var(--muted)]">
                    {submitFeedback}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full px-7 py-4 text-base disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </div>

            <div className="flex flex-col h-full gap-6">
              <div className="surface-card rounded-[1.8rem] p-6">
                <span className="eyebrow">Clinic timings</span>
                <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                  <div className="flex items-center justify-between gap-4">
                    <span>Monday - Friday</span>
                    <span className="font-semibold text-[var(--foreground)]">{siteConfig.hours.weekdays}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Saturday</span>
                    <span className="font-semibold text-[var(--foreground)]">{siteConfig.hours.saturday}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Sunday</span>
                    <span className="font-semibold text-[var(--foreground)]">{siteConfig.hours.sunday}</span>
                  </div>
                </div>
                <div className="mt-6 rounded-[1.4rem] bg-[var(--surface-strong)] p-4 text-sm leading-7 text-[var(--muted)]">
                  Reach us from Sarita Vihar, East Patel Nagar, Gurugram or Jaipur — same phone and WhatsApp number for all locations.
                </div>
              </div>

              <div className="image-panel overflow-hidden flex-1 min-h-[350px] lg:min-h-0">
                <iframe
                  src={siteConfig.address.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Awish Clinic Location"
                  className="w-full h-full min-h-[350px] lg:min-h-0"
                />
              </div>
            </div>
          </div>
        </section>

        <ClinicLocations />
      </main>
      <Footer simple={true} />
      <WhatsAppButton />
    </>
  );
}
