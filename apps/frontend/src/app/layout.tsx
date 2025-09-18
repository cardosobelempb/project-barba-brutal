import ProviderRoot from "@/providers";

import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
//
// });

export const metadata: Metadata = {
  title: "Batba Brutal",
  description: "Barbearia mais brutal da cidade!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={` antialiased`}>
        <ProviderRoot>{children}</ProviderRoot>
      </body>
    </html>
  );
}
