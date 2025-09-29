// components/ThumbnailSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import DownloadButton from "./DownloadButton";

interface Thumbnail {
  url: string;
  quality: string;
  dimensions: string;
}

export default function ThumbnailSection() {
  const [url, setUrl] = useState("");
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Utility function to extract video ID
  const extractVideoId = (url: string): string | null => {
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
  };

  // Generate thumbnail URLs
  const generateThumbnails = (videoId: string): Thumbnail[] => {
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!url.trim()) {
      setError("Please enter a YouTube URL");
      setIsLoading(false);
      return;
    }

    const extractedVideoId = extractVideoId(url);
    
    if (extractedVideoId) {
      setVideoId(extractedVideoId);
      setThumbnails(generateThumbnails(extractedVideoId));
    } else {
      setError("Invalid YouTube URL. Please check the URL and try again.");
      setThumbnails([]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              YouTube Video URL
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="url"
                id="url"
                name="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="text-gray-800 placeholder-gray-400 flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Loading..." : "Grab Thumbnails"}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Paste the full URL of any YouTube video to extract its thumbnails
            </p>
          </div>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Thumbnails Display */}
      {thumbnails.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thumbnails.map((thumbnail, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video bg-gray-100">
                  <Image
                    src={thumbnail.url}
                    alt={`YouTube thumbnail ${thumbnail.quality}`}
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                    priority={false}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-900">
                      {thumbnail.quality}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {thumbnail.dimensions}
                    </span>
                  </div>
                  <DownloadButton
                    url={thumbnail.url}
                    filename={`youtube-thumbnail-${videoId}-${thumbnail.quality}.jpg`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              How to Download:
            </h3>
            <p className="text-blue-800 text-sm">
              Click the &quot;Download&quot; button below any thumbnail to save it to
              your device. For best quality, we recommend downloading the
              &quot;Max Resolution&quot; thumbnail when available.
            </p>
          </div>
        </div>
      )}

      {/* Initial State Message */}
      {!url && thumbnails.length === 0 && !error && (
        <div className="text-center">
          <p className="text-gray-600 mb-8">
            Enter a YouTube URL above and click &quot;Grab Thumbnails&quot; to see
            available thumbnails
          </p>
        </div>
      )}
    </div>
  );
}