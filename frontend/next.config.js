/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is the default bundler in Next 16; an empty config is enough
  // to opt in explicitly (replaces the old `webpack(config)` hook).
  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
