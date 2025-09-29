// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouTube Thumbnail Grabber - Download HD Thumbnails for Free",
  description:
    "Free YouTube thumbnail downloader. Extract high-quality thumbnails from any YouTube video in multiple resolutions. No registration required.",
  keywords:
    "youtube thumbnail, thumbnail download, youtube thumbnail grabber, youtube thumbnail downloader, hd thumbnails",
  authors: [{ name: "YouTube Thumbnail Grabber" }],
  alternates: {
    canonical: "https://yourdomain.com/", // ✅ canonical URL
  },
  openGraph: {
    title: "YouTube Thumbnail Grabber - Download HD Thumbnails",
    description:
      "Free YouTube thumbnail downloader. Extract high-quality thumbnails from any YouTube video.",
    url: "https://yourdomain.com/",
    siteName: "YouTube Thumbnail Grabber",
    type: "website",
    locale: "en_US",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* ✅ Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "YouTube Thumbnail Grabber",
              url: "https://yourdomain.com/",
              description:
                "Free tool to grab YouTube thumbnails in HD quality.",
              applicationCategory: "Utility",
              operatingSystem: "All",
            }),
          }}
        />
      </body>
    </html>
  );
}
