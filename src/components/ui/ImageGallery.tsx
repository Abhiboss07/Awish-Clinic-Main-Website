"use client";

import Image from "next/image";
import { useState } from "react";

export interface GalleryImage {
  src: string;
  alt: string;
  before?: string;
  after?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  className?: string;
}

function BeforeAfterCard({ image }: { image: GalleryImage }) {
  const [sliderPos, setSliderPos] = useState(50);

  if (!image.before || !image.after) return null;

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-xl select-none"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setSliderPos(Math.min(Math.max(x, 5), 95));
      }}
      onTouchMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x =
          ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        setSliderPos(Math.min(Math.max(x, 5), 95));
      }}
    >
      {/* After image (full) */}
      <Image
        src={image.after}
        alt={`${image.alt} - After`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <Image
          src={image.before}
          alt={`${image.alt} - Before`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M5 3L2 8L5 13M11 3L14 8L11 13"
              stroke="#334155"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
        Before
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
        After
      </span>
    </div>
  );
}

export default function ImageGallery({
  images,
  columns = 3,
  className = "",
}: ImageGalleryProps) {
  const colsClass: Record<number, string> = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const hasBeforeAfter = images.some((img) => img.before && img.after);

  return (
    <div className={`grid ${colsClass[columns]} gap-4 ${className}`}>
      {images.map((image, i) =>
        hasBeforeAfter && image.before && image.after ? (
          <BeforeAfterCard key={i} image={image} />
        ) : (
          <div
            key={i}
            className="relative aspect-[4/3] overflow-hidden rounded-xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )
      )}
    </div>
  );
}
