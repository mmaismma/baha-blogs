/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/sample-blog', // TODO: remove this
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['raw.githubusercontent.com'],
  },
  experimental: {
    webpackMemoryOptimizations: true,
  },
}

export default nextConfig
