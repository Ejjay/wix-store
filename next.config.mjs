import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  }
});

export default nextConfig;