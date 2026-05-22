import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import FAQChatbot from "@/components/layout/FAQChatbot";
import { siteConfig } from "@/data/siteConfig";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  manifest: "/brand/site.webmanifest",
  icons: {
    icon: [
      { url: "/brand/favicon.ico" },
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: ["/brand/favicon.ico"],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  keywords: [
    "best dermatologist in delhi",
    "skin specialist delhi ncr",
    "hair transplant delhi",
    "cosmetic surgery sarita vihar",
    "awish clinic delhi",
    "dermatology clinic near me",
    "affordable skin care delhi",
    "aesthetic clinic gurugram",
    "hair loss treatment delhi",
  ],
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <FAQChatbot />
      </body>
    </html>
  );
}
