import type { Metadata } from "next";
import type { Service } from "@/data/services";
import { siteConfig } from "@/data/siteConfig";

function resolveImageUrl(src: string) {
  return src.startsWith("http") ? src : `${siteConfig.url}${src}`;
}

export function generateServiceMetadata(service: Service): Metadata {
  const canonicalUrl = `https://${service.subdomain}.awishclinic.com`;
  const imageUrl = resolveImageUrl(service.heroImage);

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateMainSiteServiceMetadata(service: Service): Metadata {
  const canonicalUrl = `${siteConfig.url}/services/${service.slug}`;
  const imageUrl = resolveImageUrl(service.heroImage);

  return {
    title: `${service.name} | ${siteConfig.name}`,
    description: service.metaDescription,
    keywords: service.keywords,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
