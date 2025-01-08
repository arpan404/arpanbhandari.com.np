import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   /* config options here */
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'api.microlink.io',
         },
         {
            protocol: 'http',
            hostname: 'localhost',
         },
         {
            protocol: 'https',
            hostname: 'via.placeholder.com',
         },
      ],
   },
   experimental: {
      turbo: {
         resolveAlias: {
            canvas: './empty-module.ts',
         },
      },
   },
};

export default nextConfig;
