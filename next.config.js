/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Handle GeoJSON files
    config.module.rules.push({
      test: /\.geojson$/,
      type: 'json',
    });
    
    return config;
  },
}

module.exports = nextConfig
