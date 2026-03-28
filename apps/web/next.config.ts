import type { NextConfig } from 'next';

const directusUrl = process.env.DIRECTUS_URL;
const directusHostname = directusUrl ? new URL(directusUrl).hostname : '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: '../..',
  },
  output: 'standalone',
  images: {
    remotePatterns: directusHostname
      ? [
          {
            protocol: 'https',
            hostname: directusHostname,
          },
        ]
      : [],
    unoptimized: true,
  },
};

export default nextConfig;
