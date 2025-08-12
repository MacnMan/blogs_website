  // // import type { NextConfig } from "next";

  // // const nextConfig: NextConfig = {
  // //   /* config options here */
  // //     images: {
  // //     domains: ['cdn.sanity.io'],
  // //   },
  // // };

  // // export default nextConfig;

  // import type { NextConfig } from "next";

  // const nextConfig: NextConfig = {
  //   images: {
  //     remotePatterns: [
  //       {
  //         protocol: 'https',
  //         hostname: 'cdn.sanity.io',
  //       },
  //     ],
  //   },
  // };

  // export default nextConfig;


  // next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This makes your Next.js site run under /blogs
  basePath: "/blogs",
  assetPrefix: "/blogs/",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },

  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_API_VERSION: process.env.SANITY_API_VERSION,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  },
};

export default nextConfig;
