import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There is a stray package-lock.json above this directory; without an explicit
  // root Turbopack walks up and warns about it on every build.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
