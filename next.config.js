/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'a0.muscache.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'cdn-icons-png.flaticon.com',
    ],
  },
};

module.exports = nextConfig;
