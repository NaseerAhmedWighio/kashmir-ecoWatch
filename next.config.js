/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 8,
  },

  turbopack: {},
};

module.exports = nextConfig;
