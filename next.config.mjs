/** @type {import("next").NextConfig} */
const nextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      // Tailwind runs on plain CSS only. CSS Modules (*.module.css) keep the default handling,
      // so their class names are exported to the components that import them.
      "*.css": {
        condition: { not: { path: /.module.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
