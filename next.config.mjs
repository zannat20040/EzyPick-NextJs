/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Use http for localhost
        hostname: "localhost",
        port: "8055", // Add the port if used
      },
      {
        protocol: "https",
        hostname: "cellularplanet.shop",
      },
      {
        protocol: "https",
        hostname: "www.pngmart.com",
      },
      {
        protocol: "https",
        hostname: "toppng.com",
      },
      {
        protocol: "https",
        hostname: "www.pngarts.com",
      },
      {
        protocol: "https",
        hostname: "www.pc-tablet.co.in",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "i.dell.com",
      },
      {
        protocol: "https",
        hostname: "www.si.com",
      },
      {
        protocol: "https",
        hostname: "atlas-content-cdn.pixelsquid.com",
      },
      {
        protocol: "https",
        hostname: "polywatch.com.my",
      },
      {
        protocol: "https",
        hostname: "www.perfumehousebd.com",
      },
      {
        protocol: "https",
        hostname: "assets2.clearly.co.nz",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "freepngimg.com",
      },
      {
        protocol: "https",
        hostname: "pngimg.com",
      },
      {
        protocol: "https",
        hostname: "wallpapers.com",
      },
      {
        protocol: "https",
        hostname: "media.self.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
      },
      {
        protocol: "https",
        hostname: "www.notebookcheck.net",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "cdn.runrepeat.com",
      },
      {
        protocol: "https",
        hostname: "fdn2.gsmarena.com",
      },
      {
        protocol: "https",
        hostname: "store.storeimages.cdn-apple.com",
      },
      {
        protocol: "https",
        hostname: "images.macrumors.com",
      },
    ],
  },
};

export default nextConfig;
