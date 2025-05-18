/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true, // ← desactiva el paso de lint en prod
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};