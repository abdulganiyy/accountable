/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mono-public-bucket.s3.eu-west-2.amazonaws.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "okra-images.s3.eu-west-3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
