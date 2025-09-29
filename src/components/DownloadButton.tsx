// components/DownloadButton.tsx
"use client";

import React from "react";

interface DownloadButtonProps {
  url: string;
  filename: string;
}

export default function DownloadButton({ url, filename }: DownloadButtonProps) {
  const handleDownload = async () => {
    try {
      // Fetch the image as a blob
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);

      // Fallback: open in new tab if fetch fails
      window.open(url, "_blank");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
    >
      Download
    </button>
  );
}
