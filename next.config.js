/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Disable Turbopack until GeoJSON support is stable
  // turbopack configuration handled by webpack below
  webpack: (config) => {
    config.module.rules.push({
      test: /\.geojson$/,
      type: 'json',
    });
    return config;
  },
}

module.exports = nextConfig
