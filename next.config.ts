import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   reactStrictMode: true,
    images: {
      domains: ["r2.theaudiodb.com"], // <-- añade aquí el dominio externo
    },
};

export default nextConfig;
