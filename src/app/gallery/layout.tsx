import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View our clinic, treatment rooms and patient care environment at Awish Clinic Delhi. See our modern facilities in Sarita Vihar, New Delhi.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
