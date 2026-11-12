/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  experimental: { serverComponentsExternalPackages: ["mongodb"] },
};
export default nextConfig;
