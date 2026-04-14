/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Prevents double-render that can cause canvas context issues
  images: {
    unoptimized: true, // Serves raw JPEGs for canvas usage
  },
};

export default nextConfig;
