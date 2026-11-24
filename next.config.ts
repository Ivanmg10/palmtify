import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["r2.theaudiodb.com", "www.theaudiodb.com", "cdn-images.dzcdn.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.theaudiodb.com",
      },
      {
        protocol: "https",
        hostname: "cdn-images.dzcdn.net",
      },
    ],
  },
};

export default nextConfig;
