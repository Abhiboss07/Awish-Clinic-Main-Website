"use client";

import { useState } from "react";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Render FAQ schema JSON-LD for SEO */
  withSchema?: boolean;
  className?: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Accordion({
  items,
  withSchema = false,
  className = "",
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const schema = withSchema
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <div className={`divide-y divide-slate-200 ${className}`}>
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="py-4">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left cursor-pointer"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                <span className="text-base font-medium text-slate-800 pr-4">
                  {item.question}
                </span>
                <ChevronIcon open={isOpen} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-slate-500 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
