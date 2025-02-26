/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      "aws-crt": false,
    }
    return config
  }
}

module.exports = nextConfig 