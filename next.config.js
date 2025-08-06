/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/quotify' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/quotify/' : '',
}

module.exports = nextConfig