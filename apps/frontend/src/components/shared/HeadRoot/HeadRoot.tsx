'use client';

import Head from 'next/head';

interface HeadRootProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  manifest?: string;
  noIndex?: boolean;
}

export function HeadRoot({
  title = 'Default Title',
  description = 'Default description',
  image = 'https://example.com/og-image.png',
  url = 'https://example.com',
  manifest = '/manifest.json',
  noIndex = false
}: HeadRootProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='theme-color' content='#322659' />

      {/* Open Graph */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content='website' />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      {/* SEO */}
      {noIndex && <meta name='robots' content='noindex, nofollow' />}

      {/* Favicon / Manifest */}
      <link rel='icon' href='/favicon.ico' />
      <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
      <link rel='manifest' href={manifest} />
    </Head>
  );
}
