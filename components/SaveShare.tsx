import React from "react";
import { Heart, Share } from "lucide-react";

const SaveShare: React.FC = () => {
  const handleShare = async () => {
    const url: string = window.location.href; // Get current page URL
    const title: string = document.title || "Check this out!";

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for unsupported browsers
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };

  return (
    <div className="flex items-center space-x-6">
      {/* Save Section */}
      <div className="flex items-center cursor-pointer">
        <Heart className="w-6 h-6" />
        <span className="hidden sm:inline-block ml-2">Save</span>
      </div>

      {/* Share Section */}
      <div className="flex items-center cursor-pointer" onClick={handleShare}>
        <Share className="w-6 h-6" />
        <span className="hidden sm:inline-block ml-2">Share</span>
      </div>
    </div>
  );
};

export default SaveShare;
