/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    /* remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ], */
    domains: ["res.cloudinary.com","t3.ftcdn.net"],
  },
};

module.exports = nextConfig;
