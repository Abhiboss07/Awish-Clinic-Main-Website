import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/components/layout/BrandLogo";
import { getServicesByCategory } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";

const groups = [
  { title: "Surgical", items: getServicesByCategory("surgical").slice(0, 4) },
  { title: "Skin & Hair", items: getServicesByCategory("skin-hair").slice(0, 4) },
  { title: "Weight", items: getServicesByCategory("weight") },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Clinic Environment", href: "/clinic" },
  { label: "About Us", href: "/about" },
  { label: "Meet the team", href: "/team" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Book consultation", href: "/book-appointment" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "Facebook", href: siteConfig.social.facebook },
  { label: "YouTube", href: siteConfig.social.youtube },
];

const getSocialIcon = (label: string) => {
  const sizeClass = "w-4 h-4 transition-transform duration-300 group-hover:scale-110";
  switch (label.toLowerCase()) {
    case "instagram":
      return (
        <svg className={sizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={sizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={sizeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      );
    default:
      return <span className="text-xs font-semibold">{label.slice(0, 2)}</span>;
  }
};

interface FooterProps {
  simple?: boolean;
}

export default function Footer({ simple = false }: FooterProps) {
  const year = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <footer className="relative mt-auto overflow-hidden bg-[linear-gradient(180deg,#102120_0%,#091213_100%)] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute left-[-10%] top-12 h-72 w-72 rounded-full bg-[rgba(33,77,72,0.24)] blur-3xl" />
      <div className="absolute bottom-[-8rem] right-[-6rem] h-80 w-80 rounded-full bg-[rgba(138,79,57,0.18)] blur-3xl" />

      <div className="container-shell relative py-10 sm:py-14">
        {!simple && (
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(19,43,41,0.96)_0%,rgba(12,24,26,0.96)_54%,rgba(91,52,41,0.92)_100%)] shadow-[0_34px_90px_rgba(5,12,16,0.3)] mb-10">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:p-10">
              <div>
                <p className="inline-flex rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/62">
                  Delhi-first clinic care
                </p>
                <h2 className="mt-6 max-w-2xl font-[var(--font-display)] text-4xl leading-tight text-white sm:text-5xl">
                  A polished clinic experience for people who want clear guidance, local access and fair-value care.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-8 text-white/74 sm:text-base">
                  {siteConfig.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/book-appointment"
                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#102120] transition hover:bg-[#f7efe6]"
                  >
                    Book consultation
                  </Link>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
                  >
                    Call the clinic
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-emerald-200/18 bg-emerald-400/12 px-5 py-3 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-400/18"
                  >
                    WhatsApp enquiry
                  </a>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  {[
                    { value: siteConfig.stats.patients, label: "Satisfied patients" },
                    { value: siteConfig.stats.healthSections, label: "Health sections" },
                    { value: siteConfig.stats.awardsWon, label: "Awards won" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="min-w-[10rem] rounded-[1.4rem] border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 py-4"
                    >
                      <p className="text-2xl font-semibold text-white">{stat.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/52">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1.3fr_0.7fr]">
                <div className="relative min-h-[17rem] overflow-hidden rounded-[1.8rem] border border-white/10">
                  <Image
                    src="/images/home/delhi-first-clinic-care.png"
                    alt="Consultation-led care at Awish Clinic"
                    fill
                    sizes="(min-width: 1024px) 24vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,13,15,0.06)_0%,rgba(8,13,15,0.72)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/62">
                      Consultation-led care
                    </p>
                    <p className="mt-2 max-w-xs text-lg font-semibold leading-7 text-white">
                      Modern planning, discreet discussions and realistic treatment direction.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(255,255,255,0.06)] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                      Nearby reach
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {siteConfig.locations.map((location) => (
                        <span
                          key={location.label}
                          className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs font-medium text-white/74"
                        >
                          {location.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-emerald-200/14 bg-[rgba(22,74,64,0.4)] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-100/64">
                      Awish promise
                    </p>
                    <p className="mt-3 text-lg font-semibold leading-7 text-emerald-50">
                      {siteConfig.positioning.trustLine}
                    </p>
                    <Link
                      href="/services"
                      className="mt-5 inline-flex rounded-full border border-emerald-100/16 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/16"
                    >
                      Explore all services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/44">
                About the clinic
              </span>
            </div>
            
            <BrandLogo
              theme="dark"
              size="lg"
              subtitle="Delhi aesthetic, skin & hair care"
            />

            <p className="text-sm leading-7 text-white/68">
              {siteConfig.positioning.primary}
            </p>

            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/72 transition duration-300 hover:border-emerald-400 hover:bg-emerald-500/10 hover:text-white"
                  title={social.label}
                >
                  {getSocialIcon(social.label)}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/44">
                Patient directory
              </span>
            </div>

            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/72 transition duration-300 hover:text-emerald-400"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1 flex items-center gap-1.5">
                      <span className="text-white/20 group-hover:text-emerald-400/62">→</span>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Clusters */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/44">
                Care segments
              </span>
            </div>

            <ul className="space-y-5">
              {groups.map((group) => (
                <li key={group.title} className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/74">
                    {group.title}
                  </p>
                  <div className="space-y-2 pl-2 border-l border-white/6">
                    {group.items.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group block text-sm text-white/68 transition duration-300 hover:text-emerald-400"
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-1 block">
                          {service.shortName}
                        </span>
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Reach & Contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/44">
                Reach the clinic
              </span>
            </div>

            <div className="space-y-5 text-sm text-white/72">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/44">Main Branch</p>
                <p className="mt-1.5 leading-6">
                  {siteConfig.locations[0].shortAddress}, {siteConfig.address.area}, {siteConfig.address.city}
                </p>
              </div>
              
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/44">Direct Contact</p>
                <a href={`tel:${siteConfig.phone}`} className="mt-1.5 block hover:text-emerald-400 transition duration-300">
                  {siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="block hover:text-emerald-400 transition duration-300">
                  {siteConfig.email}
                </a>
              </div>
              
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/44">Schedules</p>
                <p className="mt-1.5 leading-5">Mon-Fri: {siteConfig.hours.weekdays}</p>
                <p className="leading-5">Sat-Sun: {siteConfig.hours.saturday} / {siteConfig.hours.sunday}</p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href={siteConfig.address.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-400/20 hover:border-emerald-400"
                >
                  Directions Map
                </a>
                <Link
                  href="/contact"
                  className="rounded-full bg-emerald-500/20 border border-emerald-400/32 px-4 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500 hover:text-white"
                >
                  Reach Awish
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Specialized Tag Cloud Bar */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/36">
              Specialized Concern Care
            </span>
            <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-4xl">
              {siteConfig.concernCoverage.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/8 bg-white/4 px-3.5 py-1.5 text-xs font-medium text-white/70 transition duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/48 lg:flex-row lg:items-center lg:justify-between">
          <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <p>Cosmetic, skin, hair and weight care across Delhi NCR, Gurugram and Jaipur.</p>
        </div>
      </div>
    </footer>
  );
}
