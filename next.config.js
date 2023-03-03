/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["backend.jms.janzcorp.com"],
  },
  async rewrites() {
    return [
      {
        source: "/shop_by_brand/:brandId",
        destination: "/shop_by_brand/:brandId",
      },
    ];
  },
};

module.exports = nextConfig;
