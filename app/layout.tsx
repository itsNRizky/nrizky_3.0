import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nrizky.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NRizky - Software Engineer",
    template: "%s | NRizky",
  },
  description:
    "Software Engineer specializing in frontend development, performance optimization, and building great user experiences.",
  keywords: [
    "Software Engineer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
  ],
  authors: [{ name: "NRizky" }],
  creator: "NRizky",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "NRizky",
    title: "NRizky - Software Engineer",
    description:
      "Software Engineer specializing in frontend development, performance optimization, and building great user experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NRizky - Software Engineer",
    description:
      "Software Engineer specializing in frontend development, performance optimization, and building great user experiences.",
    creator: "@nrizky",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${fraunces.variable} bg-background text-text-primary font-[family-name:var(--font-dm-sans)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
