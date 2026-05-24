"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
  focusPoints?: string[];
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  title = "See authentic treatment outcomes",
  description = "Compare treatment results using real patient cases. Images shown are representative and vary by individual treatment plans.",
  focusPoints = [],
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle dragging math
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Check if we have active before/after assets or are in an empty placeholder state
  const hasImages = beforeImage && afterImage;

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Title & Info Block (Above Slider) */}
      <div className="flex flex-col space-y-3">
        <span className="eyebrow w-fit border-[rgba(30,36,34,0.08)] bg-white text-[var(--accent)] font-bold">
          Real Patient Transformations
        </span>
        <h3 className="text-2xl md:text-3xl font-semibold leading-tight font-serif text-[var(--foreground)]">
          {title}
        </h3>
        <p className="text-sm leading-6 text-[var(--muted)] max-w-xl">
          {description}
        </p>

        {/* Dynamic Focus Points */}
        {!!focusPoints.length && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {focusPoints.map((point) => (
              <span
                key={point}
                className="rounded-full bg-[var(--brand-soft)] text-[var(--brand)] px-3.5 py-1.5 text-xs font-bold"
              >
                {point}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Slider Container / Placeholder empty state */}
      {!hasImages ? (
        // EMPTY STATE: High-end clinical placeholder cards for editors
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-[4/3] rounded-[32px] border-2 border-dashed border-[rgba(30,36,34,0.14)] bg-[#fdfaf5] flex flex-col items-center justify-center p-6 text-center shadow-sm">
            <span className="h-12 w-12 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center font-bold text-sm">
              Pre
            </span>
            <p className="mt-4 text-sm font-bold text-[var(--foreground)] uppercase tracking-widest">{beforeLabel}</p>
            <p className="mt-2 text-xs text-[var(--muted)] max-w-xs">
              Before Treatment Image (Placeholder for Content Editors. Upload high-res photography).
            </p>
          </div>

          <div className="relative aspect-[4/3] rounded-[32px] border-2 border-dashed border-[rgba(33,77,72,0.16)] bg-[#f4faf7] flex flex-col items-center justify-center p-6 text-center shadow-sm">
            <span className="h-12 w-12 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center font-bold text-sm">
              Post
            </span>
            <p className="mt-4 text-sm font-bold text-[var(--brand)] uppercase tracking-widest">{afterLabel}</p>
            <p className="mt-2 text-xs text-[var(--muted)] max-w-xs">
              After Treatment Outcome (Placeholder for Content Editors. Upload matching photography).
            </p>
          </div>
        </div>
      ) : (
        // INTERACTIVE COMPARISON SLIDER
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] border border-[rgba(30,36,34,0.08)] bg-[var(--surface-strong)] shadow-[0_20px_50px_rgba(30,36,34,0.08)] select-none touch-none"
        >
          {/* After Image (Always sits in base layer, fully visible) */}
          <div className="absolute inset-0 z-0">
            <Image
              src={afterImage}
              alt="Treatment after outcome"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center brightness-[1.04] saturate-[1.06] contrast-[1.02]"
            />
            {/* Labeled overlay indicator */}
            <span className="absolute bottom-5 right-5 z-20 rounded-full bg-[var(--brand)] border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 shadow-lg">
              {afterLabel}
            </span>
          </div>

          {/* Before Image (Sits on top layer, clipped using width of sliderPosition) */}
          <div
            className="absolute inset-y-0 left-0 z-10 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="absolute inset-y-0 left-0 aspect-[4/3] w-full h-full min-w-full">
              {/* Width must match container precisely, so we keep image sized 100% */}
              <div className="relative w-full h-full min-w-[100vw] lg:min-w-[50vw]">
                <Image
                  src={beforeImage}
                  alt="Treatment before concern"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center brightness-[0.82] saturate-[0.86] contrast-[0.92]"
                />
              </div>
            </div>
            {/* Labeled overlay indicator */}
            <span className="absolute bottom-5 left-5 z-20 rounded-full bg-[var(--accent)] border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 shadow-lg">
              {beforeLabel}
            </span>
          </div>

          {/* Slider Drag Handler (Vertical Line & Centered Circular Button) */}
          <div
            onPointerDown={handlePointerDown}
            className="absolute inset-y-0 z-30 w-1 -translate-x-1/2 cursor-ew-resize bg-white/70 shadow-lg"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/20 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-[1.06] active:scale-[0.96]">
              {/* Dual arrows using clean inline SVG */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-5 w-5 text-white filter drop-shadow">
                <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Subtle Caption / Caution Details */}
      <p className="text-xs leading-6 text-[var(--muted)] bg-[rgba(30,36,34,0.04)] px-4 py-3 rounded-2xl border border-[rgba(30,36,34,0.06)]">
        Disclaimer: This interactive comparison slider serves as a clinical visual reference for treatment suitability. Actual results vary by individual patient skin, hair conditions, and customized treatment plans.
      </p>
    </div>
  );
}
