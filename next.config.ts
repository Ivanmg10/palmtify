import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["r2.theaudiodb.com", "www.theaudiodb.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.theaudiodb.com",
      },
    ],
  },
};

export default nextConfig;
