import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ this will prevent ESLint errors/warnings from blocking your build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
