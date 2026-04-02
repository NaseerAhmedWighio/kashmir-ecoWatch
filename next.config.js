/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Disable static page generation for pages that use dynamic imports with ssr: false
  output: 'standalone',
}

module.exports = nextConfig
