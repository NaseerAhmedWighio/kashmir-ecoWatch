/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Enable Turbopack with empty config (uses defaults)
  turbopack: {},
  webpack: (config) => {
    config.module.rules.push({
      test: /\.geojson$/,
      type: 'json',
    });
    return config;
  },
}

module.exports = nextConfig
