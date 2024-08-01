/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET: "MtH9vdyhNYHbS/2OHD9Ig9If25P4c6RAj5K76+T6Gf8=",
    NEXTAUTH_URL: "http:localhost:3000",
    MONGO_URI: "mongodb+srv://mazzasimq1:vFjQU2EwpPEbRwGf@cluster0.aigbuff.mongodb.net/vas",
    BACKEND_URL: "http://localhost:5000"
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
