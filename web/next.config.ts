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
         {
            protocol: 'https',
            hostname: 'arpan404.socioy.com',
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
   webpack: config => {
      config.cache = false;
      return config;
   },
};

export default nextConfig;
