"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import Button from "@/components/ui/Button";
import BrandLogo from "@/components/layout/BrandLogo";

interface ServiceHeaderProps {
  /** CTA button text, defaults to "Book Free Consultation" */
  ctaText?: string;
  /** CTA action: link href or whatsapp */
  ctaHref?: string;
}

export default function ServiceHeader({
  ctaText = "Book Free Consultation",
  ctaHref,
}: ServiceHeaderProps) {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hi, I'd like to book a free consultation at Awish Clinic."
  )}`;

  const href = ctaHref || whatsappUrl;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo size="sm" subtitle="Delhi-focused care" />
        </Link>

        {/* Right side: Phone + CTA */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteConfig.phone}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-teal-600 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
              />
            </svg>
            {siteConfig.phone}
          </a>
          <Button
            href={href}
            target={ctaHref ? undefined : "_blank"}
            size="sm"
            variant="whatsapp"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </header>
  );
}
