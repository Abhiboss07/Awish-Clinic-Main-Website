"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import BrandLogo from "@/components/layout/BrandLogo";
import { getServicesByCategory } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Clinic", href: "/clinic" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const serviceGroups = useMemo(
    () => [
      {
        title: "Surgical / Aesthetic",
        services: getServicesByCategory("surgical"),
      },
      {
        title: "Skin & Hair",
        services: getServicesByCategory("skin-hair"),
      },
      {
        title: "Weight Management",
        services: getServicesByCategory("weight"),
      },
    ],
    []
  );

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="border-b border-[rgba(30,36,34,0.08)] bg-[rgba(255,255,255,0.72)] text-xs text-[var(--muted)] backdrop-blur">
        <div className="max-w-[92rem] mx-auto px-6 sm:px-8 lg:px-12 w-full flex flex-wrap items-center justify-between gap-2 py-2">
          <p>{siteConfig.positioning.primary}</p>
          <p className="font-semibold text-[var(--brand)]">Available in Delhi NCR, Gurugram and Jaipur</p>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[rgba(30,36,34,0.08)] bg-[rgba(248,244,237,0.88)] backdrop-blur-xl">
        <div className="max-w-[92rem] mx-auto px-6 sm:px-8 lg:px-12 w-full flex items-center justify-between py-4">
          <Link href="/" className="flex min-w-0 items-center gap-3 lg:mr-6 lg:shrink-0">
            <BrandLogo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--foreground)] hover:bg-white"
                  >
                    {link.label}
                    <svg
                      className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {servicesOpen && (
                    <div className="absolute right-0 top-full w-[44rem] pt-3">
                      <div className="rounded-[2rem] border border-[rgba(30,36,34,0.08)] bg-[rgba(255,255,255,0.96)] p-6 shadow-[0_32px_80px_rgba(18,24,28,0.12)]">
                        <div className="grid gap-6 md:grid-cols-3">
                          {serviceGroups.map((group) => (
                            <div key={group.title}>
                              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                                {group.title}
                              </p>
                              <div className="space-y-1">
                                {group.services.map((service) => (
                                  <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    className="block rounded-2xl px-3 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-strong)]"
                                    onClick={() => setServicesOpen(false)}
                                  >
                                    <span className="block">{service.name}</span>
                                    <span className="mt-1 block text-xs text-[var(--muted)]">
                                      {service.priceIndicator}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--foreground)] hover:bg-white"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href="/contact#enquiry-form" size="md">
              Book Consultation
            </Button>
          </div>

          <button
            type="button"
            className="rounded-2xl border border-[rgba(30,36,34,0.32)] bg-[var(--brand)] p-3 text-white shadow-[0_8px_20px_rgba(33,77,72,0.22)] lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed right-0 top-0 z-50 h-full w-[22rem] max-w-[86vw] overflow-y-auto border-l border-[rgba(30,36,34,0.08)] bg-[rgba(255,255,255,0.97)] p-5 shadow-[0_24px_80px_rgba(18,24,28,0.14)] lg:hidden">
            <div className="flex items-center justify-between">
            <div>
                <BrandLogo size="sm" subtitle="Delhi clinic website" />
            </div>
              <button
                type="button"
                className="rounded-2xl border border-[rgba(30,36,34,0.12)] bg-[var(--surface)] p-3"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 space-y-2">
              {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block rounded-2xl border border-[rgba(30,36,34,0.08)] bg-[var(--surface)] px-4 py-4 text-sm font-semibold text-[var(--foreground)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
            </div>

            <div className="mt-8">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Services
              </p>
              <div className="space-y-4">
                {serviceGroups.map((group) => (
                  <div key={group.title} className="rounded-[1.5rem] border border-[rgba(30,36,34,0.08)] bg-[var(--surface)] p-4">
                    <p className="mb-2 text-sm font-semibold text-[var(--foreground)]">{group.title}</p>
                    <div className="space-y-1">
                      {group.services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="block rounded-xl px-3 py-2 text-sm text-[var(--muted)] hover:bg-white"
                          onClick={() => setMobileOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Button href="/contact#enquiry-form" className="w-full">
                Book Consultation
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
