import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Whitelists the high-res architectural placeholders
        pathname: '/**',
      }
    ],
  },
  // Dangerously allow production builds to successfully complete even if
  // your project has TypeScript errors.
  typescript: {
    ignoreBuildErrors: true,
  },

  // @ts-ignore: Suppress the type error for the eslint property itself
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;