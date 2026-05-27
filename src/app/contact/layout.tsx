import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Awish Clinic in Sarita Vihar, Delhi for skin, hair and cosmetic consultations. Book via WhatsApp, phone or walk-in. Available across Delhi NCR, Gurugram and Jaipur.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
