/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimise for Vercel deployment
  output: 'standalone',
  // Compress responses
  compress: true,
  // Production source maps off for smaller bundle
  productionBrowserSourceMaps: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.autoblogging.ai',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
  },
}

module.exports = nextConfig
