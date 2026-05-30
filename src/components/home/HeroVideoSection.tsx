"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";

export default function HeroVideoSection() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (name.trim()) params.set("name", name.trim());
    if (mobile.trim()) params.set("phone", mobile.trim());
    router.push(`/contact${params.toString() ? `?${params.toString()}` : ""}#enquiry-form`);
  };

  return (
    <section className="relative overflow-hidden bg-[#111a1d] text-white">
      {/* Desktop video */}
      <video
        className="hidden h-[92vh] min-h-[600px] w-full object-cover lg:block"
        autoPlay
        loop
        muted
        poster="/videos/awish-clinic-concept-v2-poster.jpg"
        preload="auto"
        playsInline
      >
        <source src="/videos/awish-clinic-concept-v2.mp4" type="video/mp4" />
      </video>

      {/* Mobile video */}
      <video
        className="block h-[70vh] min-h-[480px] w-full object-cover lg:hidden"
        autoPlay
        loop
        muted
        poster="/videos/awish-clinic-concept-v2-mobile-poster.jpg"
        preload="auto"
        playsInline
      >
        <source src="/videos/awish-clinic-concept-v2-mobile.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(3,10,14,0.12)_0%,rgba(4,10,14,0.3)_40%,rgba(6,12,16,0.78)_100%)]" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-end">
        <div className="w-full pb-10 lg:pb-14">
          <div className="container-shell">
            {/* Badge */}
            <span className="inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/82 backdrop-blur">
              Delhi&apos;s modern skin, hair & aesthetic clinic
            </span>

            {/* Heading */}
            <h1 className="mt-5 max-w-3xl font-[var(--font-display)] text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
              India&apos;s leading dermatology and aesthetic care, presented with trust and clarity.
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 lg:text-lg lg:leading-8">
              Surgical, skin, hair and weight care for Delhi patients who want premium presentation, practical pricing and a clinic experience that feels personal.
            </p>

            {/* Desktop form */}
            <div className="mt-8 hidden lg:block">
              <form
                onSubmit={handleSubmit}
                className="inline-flex w-full max-w-2xl items-center gap-2 rounded-full border border-white/14 bg-white/92 p-2 shadow-[0_28px_80px_rgba(4,10,14,0.24)]"
              >
                <div className="flex flex-1 items-center gap-2 px-4">
                  <input
                    className="h-11 w-full border-none bg-transparent px-1 text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                    placeholder="Your Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <div className="h-6 w-px shrink-0 bg-[rgba(30,36,34,0.18)]" />
                  <input
                    className="h-11 w-full border-none bg-transparent px-1 text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                    placeholder="Mobile No"
                    type="tel"
                    name="mobile"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--accent)] px-8 py-4 text-sm font-semibold whitespace-nowrap text-white shadow-[0_20px_40px_rgba(138,79,57,0.28)] transition hover:bg-[#724230]"
                >
                  Book Appointment
                </button>
              </form>
            </div>

            {/* Mobile CTA */}
            <div className="mt-7 lg:hidden">
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(138,79,57,0.28)] transition hover:bg-[#724230]"
              >
                Book Appointment
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
