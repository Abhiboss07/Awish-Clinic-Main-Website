"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

interface LandingImageProps {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  objectPosition?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export default function LandingImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  priority = false,
  loading = "lazy",
  objectPosition = "center",
  fallbackTitle,
  fallbackSubtitle,
}: LandingImageProps) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        className={`flex h-full w-full items-end overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.22),_transparent_40%),linear-gradient(135deg,_#0f172a,_#1f2937_50%,_#0f766e)] ${className}`}
      >
        <div className="flex h-full w-full flex-col justify-end p-5 text-white">
          <div className="mb-4 flex gap-2">
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
              Awish Clinic
            </span>
            <span className="rounded-full border border-white/20 bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-100">
              Delhi Care
            </span>
          </div>
          <p className="max-w-sm text-lg font-semibold leading-tight">
            {fallbackTitle ?? alt}
          </p>
          {fallbackSubtitle && (
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">
              {fallbackSubtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={priority ? "high" : "auto"}
        onError={() => setErrored(true)}
        className={`h-full w-full object-cover ${imageClassName}`}
        style={{ objectPosition }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0)_30%,rgba(15,23,42,0.38)_100%)]" />
    </div>
  );
}
