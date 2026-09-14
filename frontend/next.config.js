/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is the default bundler in Next 16; an empty config is enough
  // to opt in explicitly (replaces the old `webpack(config)` hook).
  turbopack: {},

  // The OG card reads its font files at request time; make sure they are
  // traced into the serverless bundle for /api/og.
  outputFileTracingIncludes: {
    '/api/og': ['./src/fonts/**/*'],
  },

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
