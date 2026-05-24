interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const lineAlign =
    align === "center" ? "mx-auto" : "mr-auto";

  return (
    <div className={`mb-10 ${alignClass} ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
        {title}
      </h2>
      <div
        className={`mt-3 h-1 w-16 rounded-full bg-blue-600 ${lineAlign}`}
        aria-hidden="true"
      />
      {subtitle && (
        <p className="mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
