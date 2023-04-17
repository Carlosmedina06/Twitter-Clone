/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pbs.twimg.com', 'www.jsonkeeper.com', 'rb.gy'],
  },
}

module.exports = nextConfig
