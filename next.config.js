const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot']
  },
  // Performance optimizations
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp']
  }
}

module.exports = withBundleAnalyzer(nextConfig)
