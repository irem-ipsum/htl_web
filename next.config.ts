import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Once a browser has visited over https, it refuses to use plain
          // http for this site for a year, even if someone types http://.
          // Browsers ignore this header on http and on localhost, so local
          // development is unaffected.
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
        ],
      },
    ];
  },
};

export default nextConfig;
