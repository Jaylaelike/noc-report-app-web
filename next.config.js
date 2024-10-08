/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */


/** @type {import("next").NextConfig} */

const config = {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    crossOrigin: "anonymous",
    output: "standalone",
    async headers() {
      return [
        {
          // Routes this applies to
          source: "/api/(.*)",
          // destination: "/api/:path*",
          // Headers
          headers: [
            // Allow for specific domains to have access or * for all
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
              // DOES NOT WORK
              // value: process.env.ALLOWED_ORIGIN,
            },
            // Allows for specific methods accepted
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
            // Allows for specific headers accepted (These are a few standard ones)
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization",
            },
          ],
        },
      ];
    }
  

  };
  

export default config;
