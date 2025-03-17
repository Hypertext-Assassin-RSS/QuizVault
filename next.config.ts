import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: "upgrade-insecure-requests" },
        ],
      },
    ];
  },
};

export default nextConfig;
