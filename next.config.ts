import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ssl.cdn-redfin.com',
        pathname: '/photo/**', // Matches all paths under /photo
      },
    ],
  },
};



export default nextConfig;


