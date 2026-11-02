import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export so the site can be hosted on GitHub Pages (yazcity.com).
  output: "export",
  // "/about" is exported as about/index.html, which GitHub Pages serves at /about/.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // GitHub Pages has no image-optimisation server; images in /public are already
    // optimised WebP files, so serve them as-is.
    unoptimized: true,
  },
  // Tree-shake heavy barrel packages so only what we import ships.
  experimental: {
    optimizePackageImports: ["@react-three/drei", "motion"],
  },
};

export default nextConfig;
