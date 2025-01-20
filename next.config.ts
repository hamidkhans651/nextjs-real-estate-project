import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ssl.cdn-redfin.com",
        pathname: "/photo/**", // Matches all paths under /photo
      },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Increase size limit for large uploads
    },
  },
};

export default nextConfig;
