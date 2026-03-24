import type { NextConfig } from 'next';

const replitDomain = process.env.REPLIT_DEV_DOMAIN
  ? `https://${process.env.REPLIT_DEV_DOMAIN}`
  : undefined;

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  ...(replitDomain && {
    allowedDevOrigins: [replitDomain],
  }),
};

export default nextConfig;
