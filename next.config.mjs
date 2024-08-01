/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    
  },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
}

export default nextConfig;
