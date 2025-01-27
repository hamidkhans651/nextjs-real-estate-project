import React from "react";
import { Heart, Share } from "lucide-react";

const SaveShare = () => {
  return (
    <div className="flex items-center space-x-6">
      {/* Save Section */}
      <div className="flex items-center">
        <Heart className="w-6 h-6 text-gray-700" />
        <span className="hidden sm:inline-block text-gray-700 ml-2">Save</span>
      </div>

      {/* Share Section */}
      <div className="flex items-center">
        <Share className="w-6 h-6 text-gray-700" />
        <span className="hidden sm:inline-block text-gray-700 ml-2">Share</span>
      </div>
    </div>
  );
};

export default SaveShare;
