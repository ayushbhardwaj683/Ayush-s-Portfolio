import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Opt in for static hosting; keep the existing Next.js server workflow intact.
  ...(process.env.SITES_EXPORT === "1" ? { output: "export" as const } : {}),
};

export default nextConfig;
