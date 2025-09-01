/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'mc.surb.com.br',
    }]
  }
};

export default nextConfig;
