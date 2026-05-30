import type { AudienceTone } from "@/data/services";
import { getToneTheme } from "./landingHelpers";

interface LandingSectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: AudienceTone;
  align?: "left" | "center";
  className?: string;
}

export default function LandingSectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "professional",
  align = "center",
  className = "",
}: LandingSectionHeadingProps) {
  const theme = getToneTheme(tone);
  const isCenter = align === "center";

  return (
    <div className={`${isCenter ? "mx-auto text-center" : "text-left"} ${className}`}>
      {eyebrow && (
        <p
          className={`inline-flex items-center rounded-full border px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${
            theme.border
          } ${theme.surface} ${theme.muted}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${theme.text}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-3xl text-base leading-7 sm:text-lg ${
            isCenter ? "mx-auto" : ""
          } ${theme.muted}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
