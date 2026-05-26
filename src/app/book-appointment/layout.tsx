import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Book a dermatology or cosmetic surgery consultation at Awish Clinic, Sarita Vihar, Delhi. Choose your preferred date, time and service. Confirmation via WhatsApp within 24 hours.",
};

export default function BookAppointmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
