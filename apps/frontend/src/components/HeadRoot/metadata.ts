import type { Metadata } from "next";

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  noIndex?: boolean;
  manifest?: string;
  icons?: {
    icon?: string;
    apple?: string;
    shortcut?: string;
  };
}

export function generateMetadata({
  title = "Default Title",
  description = "Default description",
  url = "https://example.com",
  image = "https://example.com/og-image.png",
  noIndex = false,
  manifest = "/manifest.json",
  icons = {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
}: GenerateMetadataOptions): Metadata {
  const metadata: Metadata = {
    title,
    description,
    robots: noIndex ? "noindex, nofollow" : undefined,
    manifest,
    icons,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };

  return metadata;
}