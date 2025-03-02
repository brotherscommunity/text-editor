/** @type {import('next').NextConfig} */
const nextConfig = {
  // env: {
  //   NEXTAUTH_URL: "https://brothersinternationalcommmunity.online",
  // },
  images: {
    domains: ["storage.googleapis.com", "via.placeholder.com"],
  },
  output: "standalone",
  reactStrictMode: true,
};

export default nextConfig;
