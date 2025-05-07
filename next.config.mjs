import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  }
};

export default withPWA(nextConfig);