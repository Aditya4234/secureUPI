/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      root: './',
    },
  },
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactCompiler: true,
};

export default nextConfig;
