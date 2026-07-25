import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: [],
  basePath: "/portfolio",
  assetPrefix: "/portfolio/",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://mightbechr1s.github.io/portfolio",
  },
};

export default nextConfig;
