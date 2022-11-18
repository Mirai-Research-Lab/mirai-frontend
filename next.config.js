/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
<<<<<<< HEAD
    remotePatterns: [
=======
    /* remotePatterns: [
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
<<<<<<< HEAD
    ],
    domains: ["res.cloudinary.com"],
=======
    ], */
    domains: ["res.cloudinary.com","t3.ftcdn.net"],
>>>>>>> a45894cc3638507b374a4cddebc0bd3b99b9aee9
  },
};

module.exports = nextConfig;
