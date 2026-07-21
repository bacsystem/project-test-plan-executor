import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Multi-Zones requires this to be a real, static basePath — cross-zone
  // links must use plain <a> tags, not next/link's <Link>, per Next.js's
  // own Multi-Zones documentation. Do not "fix" this into a <Link>.
  basePath: "/inventory",
  reactStrictMode: false,
  transpilePackages: ["@mui/material-nextjs"],
  images: {
    formats: ["image/webp", "image/avif"],
    qualities: [90],
  },
};

export default withNextIntl(nextConfig);
