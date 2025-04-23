/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pngplay.com",
      },
      {
        protocol: "https",
        hostname: "www.pngmart.com",
      },
      {
        protocol: "https",
        hostname: "microless.com",
      },
      {
        protocol: "https",
        hostname: "admin.regalfurniturebd.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
