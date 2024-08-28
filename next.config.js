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
    webpack: (config, { isServer }) => {
    //   if (!isServer) config.resolve.fallback.fs = false;
    //   return config;
    // },
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          // fixes proxy-agent dependencies
          net: false,
          dns: false,
          tls: false,
          assert: false,
          // fixes next-i18next dependencies
          path: false,
          fs: false,
          // fixes mapbox dependencies
          events: false,
          child_process: false,
          // fixes sentry dependencies
      
          
        }
      };
    }
    config.module.exprContextCritical = false; // Workaround to suppress next-i18next warning, see https://github.com/isaachinman/next-i18next/issues/1545

    return config;
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
