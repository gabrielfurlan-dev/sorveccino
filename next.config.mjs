/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Ignore cloudflare:sockets
      config.resolve.alias['cloudflare:sockets'] = false;
      return config;
    },
  };
  
  export default nextConfig;
  