"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ImagePageHero from "@/components/layout/ImagePageHero";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { clinicMedia } from "@/data/media";
import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/services";

const inputClass =
  "w-full rounded-[1.15rem] border border-[rgba(30,36,34,0.12)] bg-white px-4 py-3.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[rgba(33,77,72,0.12)]";

const expectationPoints = [
  "A private consultation centred on your concern and treatment goals.",
  "A realistic overview of options, downtime and suitability.",
  "Honest guidance on pricing, planning and next steps.",
];

export default function BookAppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);
  const [slotInfo, setSlotInfo] = useState<{
    loading: boolean;
    available: boolean;
    remaining: number;
    count: number;
    error?: string;
  }>({
    loading: false,
    available: true,
    remaining: 3,
    count: 0,
  });

  useEffect(() => {
    const date = formData.date;
    const time = formData.time;

    if (!date || !time) {
      setSlotInfo({
        loading: false,
        available: true,
        remaining: 3,
        count: 0,
      });
      return;
    }

    let cancelled = false;

    async function checkAvailability() {
      setSlotInfo((current) => ({ ...current, loading: true, error: undefined }));

      try {
        const response = await fetch(
          `/api/bookings/availability?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`
        );
        const payload = await response.json();

        if (cancelled) {
          return;
        }

        if (!response.ok) {
          throw new Error(payload.error || "Could not check slot availability.");
        }

        setSlotInfo({
          loading: false,
          available: payload.available,
          remaining: payload.remaining,
          count: payload.count,
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        setSlotInfo({
          loading: false,
          available: true,
          remaining: 0,
          count: 0,
          error:
            error instanceof Error
              ? error.message
              : "Could not check slot availability.",
        });
      }
    }

    void checkAvailability();

    return () => {
      cancelled = true;
    };
  }, [formData.date, formData.time]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const text = [
      "Hi, I'd like to book an appointment at Awish Clinic.",
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      formData.service ? `Service: ${formData.service}` : "",
      formData.date ? `Preferred date: ${formData.date}` : "",
      formData.time ? `Preferred time: ${formData.time}` : "",
      formData.notes ? `Notes: ${formData.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setIsSubmitting(true);
    setSubmitFeedback(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "appointment",
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          message: formData.notes,
          preferredDate: formData.date,
          preferredTime: formData.time,
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          payload.error ||
            "The appointment could not be saved. Please try another slot."
        );
      }

      const url = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      setSubmitFeedback(
        `Appointment request saved. ${
          typeof payload.remaining === "number"
            ? `${payload.remaining} slot(s) remain for this time.`
            : ""
        }`
      );
    } catch (error) {
      setSubmitFeedback(
        error instanceof Error
          ? error.message
          : "The appointment could not be saved right now."
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
          eyebrow="Book appointment"
          title="Book a consultation with our dermatologists in Delhi."
          description="Choose the skin, hair or aesthetic service you need, pick your preferred date and time, and we will confirm your appointment at our Sarita Vihar clinic via WhatsApp or call."
          image={clinicMedia.officeConsultation.src}
          imageAlt={clinicMedia.officeConsultation.alt}
          highlights={expectationPoints.map((item, index) => ({
            eyebrow: index === 2 ? "What to expect" : "Your visit",
            title: item,
          }))}
        />

        <section className="section-shell">
          <div className="container-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="surface-card rounded-[2rem] p-7">
              <span className="eyebrow">Appointment request</span>
              <h2 className="mt-5 text-4xl font-semibold">Share your preferred slot.</h2>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">
                Fill in the details below and we will confirm availability with you directly.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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

                <div>
                  <label htmlFor="service" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                    Service
                  </label>
                  <select
                    id="service"
                    required
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
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="date" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                      Preferred date
                    </label>
                    <input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                      Preferred time
                    </label>
                    <select
                      id="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">Select time</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                    </select>
                  </div>
                </div>

                {(formData.date || formData.time) && (
                  <div className="rounded-[1.3rem] border border-[rgba(30,36,34,0.08)] bg-[var(--surface-strong)] px-4 py-4 text-sm leading-7 text-[var(--muted)]">
                    {slotInfo.loading
                      ? "Checking slot availability..."
                      : slotInfo.error
                        ? slotInfo.error
                        : slotInfo.available
                          ? `${slotInfo.remaining} of 3 booking slots are currently available for this time.`
                          : "This slot already has 3 bookings. Please choose another time."}
                  </div>
                )}

                <div>
                  <label htmlFor="notes" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                    Additional notes
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder="Share any specific concern or question."
                  />
                </div>

                {submitFeedback && (
                  <div className="rounded-[1.3rem] border border-[rgba(30,36,34,0.08)] bg-[var(--surface-strong)] px-4 py-4 text-sm leading-7 text-[var(--muted)]">
                    {submitFeedback}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !slotInfo.available}
                  className="btn-primary w-full px-7 py-4 text-base disabled:opacity-60"
                >
                  {isSubmitting ? "Saving appointment..." : "Request appointment"}
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="surface-card rounded-[1.8rem] p-6">
                <span className="eyebrow">What happens next</span>
                <div className="mt-5 space-y-3">
                  {[
                    "We review your preferred service and timing.",
                    "The clinic confirms a suitable slot through WhatsApp or phone.",
                    "You arrive for a one-to-one consultation with clear next steps.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.3rem] border border-[rgba(30,36,34,0.08)] bg-white px-4 py-4 text-sm leading-7 text-[var(--muted)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

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
              </div>

              <div className="surface-card rounded-[1.8rem] p-6">
                <span className="eyebrow">Direct contact</span>
                <p className="mt-5 text-base leading-8 text-[var(--muted)]">
                  Prefer to call or message directly? Use the clinic contact details below.
                </p>
                <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                  <a href={`tel:${siteConfig.phone}`} className="block font-semibold text-[var(--foreground)] hover:text-[var(--brand)]">
                    {siteConfig.phone}
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-semibold text-[var(--foreground)] hover:text-[var(--brand)]"
                  >
                    WhatsApp the clinic
                  </a>
                  <p>{siteConfig.address.street}</p>
                  <p>
                    {siteConfig.address.area}, {siteConfig.address.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
