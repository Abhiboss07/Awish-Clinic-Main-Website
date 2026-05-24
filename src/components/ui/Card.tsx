import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  image?: string;
  href?: string;
  className?: string;
}

export default function Card({
  title,
  description,
  image,
  href,
  className = "",
}: CardProps) {
  const card = (
    <div
      className={`group overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm transition-shadow duration-300 hover:shadow-lg ${className}`}
    >
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-3">
          {description}
        </p>
        {href && (
          <span className="mt-3 inline-flex items-center text-sm font-medium text-blue-600">
            Learn more
            <svg
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }

  return card;
}
