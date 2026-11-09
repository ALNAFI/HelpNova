import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      // Keep CSS Modules on the default pipeline; Tailwind only for global CSS.
      "*.css": {
        condition: {
          not: { path: /\.module\.css$/ },
        },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
