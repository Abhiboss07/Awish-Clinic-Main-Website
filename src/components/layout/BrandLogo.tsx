import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";

interface BrandLogoProps {
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  subtitle?: string;
}

const sizeMap = {
  sm: {
    mark: "h-10 w-10",
    name: "text-xl",
    subtitle: "text-[10px] tracking-[0.2em]",
  },
  md: {
    mark: "h-12 w-12",
    name: "text-2xl",
    subtitle: "text-xs tracking-[0.22em]",
  },
  lg: {
    mark: "h-14 w-14",
    name: "text-3xl",
    subtitle: "text-xs tracking-[0.22em]",
  },
} as const;

export default function BrandLogo({
  theme = "light",
  size = "md",
  subtitle = "Affordable care. Premium feel.",
}: BrandLogoProps) {
  const classes = sizeMap[size];
  const isDark = theme === "dark";

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={`relative shrink-0 overflow-hidden rounded-full ${classes.mark} ${
          isDark
            ? "border border-white/12 bg-white shadow-[0_18px_40px_rgba(6,14,18,0.22)]"
            : "border border-[rgba(30,36,34,0.08)] bg-white shadow-[0_18px_40px_rgba(18,24,28,0.08)]"
        }`}
      >
        <Image
          src="/brand/apple-touch-icon.png"
          alt={`${siteConfig.name} logo`}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <p
          className={`truncate font-[var(--font-display)] font-semibold leading-none ${
            classes.name
          } ${isDark ? "text-white" : "text-[var(--foreground)]"}`}
        >
          {siteConfig.name}
        </p>
        <p
          className={`mt-1 hidden truncate font-semibold uppercase sm:block ${
            classes.subtitle
          } ${isDark ? "text-white/55" : "text-[var(--muted)]"}`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
