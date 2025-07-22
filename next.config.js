/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.cache = false
    return config
  },
  
  
  distDir: 'out', 
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg'],
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
