/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aalattar.pockethost.io",
        pathname: "/api/files/**",
      },
    ],
  },
};

export default nextConfig;
