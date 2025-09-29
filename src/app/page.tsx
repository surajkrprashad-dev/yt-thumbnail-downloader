// // app/page.tsx
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "YouTube Thumbnail Grabber - Download HD Thumbnails for Free",
//   description:
//     "Free YouTube thumbnail downloader. Extract high-quality thumbnails from any YouTube video in multiple resolutions.",
//   keywords:
//     "youtube thumbnail, thumbnail download, youtube thumbnail grabber, hd thumbnails",
// };

import Image from "next/image";
import DownloadButton from "../components/DownloadButton";
import ThumbnailSection from "@/components/ThumbnailSection";

// Inside your thumbnails.map(...)

// Utility function to extract video ID
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?#]+)/,
    /youtube\.com\/watch\?.*v=([^&?#]+)/,
    /youtu\.be\/([^&?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

// Generate thumbnail URLs
function generateThumbnails(videoId: string) {
  return [
    {
      url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      quality: "Max Resolution",
      dimensions: "1280x720",
    },
    {
      url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      quality: "High Definition",
      dimensions: "640x480",
    },
    {
      url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      quality: "High Quality",
      dimensions: "480x360",
    },
    {
      url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      quality: "Medium Quality",
      dimensions: "320x180",
    },
    {
      url: `https://img.youtube.com/vi/${videoId}/default.jpg`,
      quality: "Standard Quality",
      dimensions: "120x90",
    },
  ];
}

interface HomePageProps {
  searchParams: { url?: string };
}

interface Thumbnail {
  url: string;
  quality: string;
  dimensions: string;
}

export default function Home({ searchParams }: HomePageProps) {
  const url = searchParams.url;
  let thumbnails: Thumbnail[] = [];
  let videoId: string | null = null;
  let error: string | null = null;

  // Process the URL if provided
  if (url) {
    videoId = extractVideoId(url);
    if (videoId) {
      thumbnails = generateThumbnails(videoId);
    } else {
      error = "Invalid YouTube URL. Please check the URL and try again.";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              YouTube Thumbnail Downloader
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Download high-quality thumbnails from any YouTube video instantly.
              Free, fast, and no registration required.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Input Section */}

         {/* Thumbnail Section (Client Component) */}
        <ThumbnailSection />

        {/* Features Section */}
        <section className="bg-white py-12 border-t mt-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Why Choose Our Thumbnail Downloader?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Lightning Fast
                </h3>
                <p className="text-gray-600">
                  Get thumbnails instantly without any delays.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  100% Free
                </h3>
                <p className="text-gray-600">
                  Completely free with no hidden costs.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Privacy Safe
                </h3>
                <p className="text-gray-600">
                  We dont store your data or require registration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  How do I use the YouTube Thumbnail Downloader?
                </h3>
                <p className="text-gray-600">
                  {`Simply paste the YouTube video URL in the input field and
                  click "Grab Thumbnails". The tool will automatically extract
                  all available thumbnail qualities for download.`}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  What thumbnail qualities are available?
                </h3>
                <p className="text-gray-600">
                  You can download thumbnails in multiple resolutions including
                  Max Resolution (maxresdefault), High Definition (sddefault),
                  Medium Quality, and Standard Definition.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Is this service really free?
                </h3>
                <p className="text-gray-600">
                  Yes, completely free! No hidden fees, no registration
                  required, and no limitations on downloads.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} YouTube Thumbnail Downloader. All
            rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This tool is not affiliated with YouTube or Google.
          </p>
        </div>
      </footer>
    </div>
  );
}
