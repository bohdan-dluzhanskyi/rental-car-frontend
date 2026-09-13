import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        pathname: '/**', // Дозволяє будь-які шляхи всередині цього домену
      },
    ],
  },  reactCompiler: true,
};

export default nextConfig;
