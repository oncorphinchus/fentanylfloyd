/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      enabled: false
    }
  },
  webpack: (config) => {
    config.resolve.fallback = {
      "aws-crt": false,
    }
    return config
  }
}

module.exports = nextConfig 