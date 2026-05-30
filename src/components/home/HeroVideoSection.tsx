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
    <section className="relative overflow-hidden bg-[#0a0d0e] text-white min-h-[85vh] lg:min-h-[92vh] flex items-center">
      {/* Background Video Shell */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Desktop video */}
        <video
          className="hidden h-full w-full object-cover lg:block scale-[1.01] transition-transform duration-1000"
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
          className="block h-full w-full object-cover lg:hidden scale-[1.01]"
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

        {/* Premium multi-layered cinematic gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(10,13,14,0.4)_0%,rgba(10,13,14,0.85)_100%)] z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,13,14,0.3)_0%,rgba(10,13,14,0.1)_30%,rgba(10,13,14,0.9)_100%)] z-10" />
        {/* Radial ambient glow anchor */}
        <div className="absolute top-1/3 left-10 w-[40rem] h-[40rem] bg-[radial-gradient(circle,rgba(33,77,72,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none z-10" />
      </div>

      {/* Main Content Layout */}
      <div className="container-shell relative z-20 w-full py-20 lg:py-28 flex flex-col justify-end min-h-[85vh] lg:min-h-[92vh]">
        <div className="max-w-3xl transform transition-all duration-700 hover:translate-y-[-2px]">
          {/* Glass Accent Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-white/90 backdrop-blur-md shadow-inner animate-[fadeIn_1s_ease-out]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Delhi&apos;s modern skin, hair & aesthetic clinic
          </div>

          {/* Majestic Hero Typography */}
          <h1 className="mt-6 font-[var(--font-display)] text-3xl sm:text-5xl lg:text-[4.2rem] font-bold leading-[1.08] text-white tracking-[-0.02em]">
            India&apos;s leading dermatology and aesthetic care,{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent drop-shadow-sm font-semibold">
              presented with trust and clarity.
            </span>
          </h1>

          {/* Balanced Subtext */}
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 lg:text-lg lg:leading-9 font-medium drop-shadow">
            Surgical, skin, hair and weight care for Delhi patients who want premium presentation, practical pricing and a clinic experience that feels personal.
          </p>

          {/* Redesigned Glass Booking Container (Desktop) */}
          <div className="mt-10 hidden lg:block max-w-2xl">
            <div className="rounded-[2rem] border border-white/10 bg-[rgba(15,31,28,0.72)] p-3.5 shadow-[0_32px_80px_rgba(4,10,14,0.5)] backdrop-blur-xl hover:border-emerald-500/20 transition-all duration-300">
              <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <div className="flex-1 grid grid-cols-2 gap-3 px-3">
                  <div className="relative">
                    <input
                      className="h-12 w-full border-b border-white/10 bg-transparent px-1 text-sm font-semibold text-white outline-none focus:border-emerald-400 placeholder:text-white/40 transition-colors"
                      placeholder="Your Name"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <input
                      className="h-12 w-full border-b border-white/10 bg-transparent px-1 text-sm font-semibold text-white outline-none focus:border-emerald-400 placeholder:text-white/40 transition-colors"
                      placeholder="Mobile No"
                      type="tel"
                      name="mobile"
                      value={mobile}
                      onChange={(event) => setMobile(event.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] px-7 h-12 text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_28px_rgba(138,79,57,0.35)] hover:bg-[#96563e] hover:shadow-[0_16px_32px_rgba(138,79,57,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  Book Appointment
                </button>
              </form>
            </div>
          </div>

          {/* Redesigned CTA Button (Mobile) */}
          <div className="mt-8 lg:hidden flex gap-4">
            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_28px_rgba(138,79,57,0.35)] hover:bg-[#96563e] active:scale-[0.98] transition-all duration-300"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
