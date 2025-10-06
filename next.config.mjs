

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.spectartravel.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;