/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/',
  //       permanent: false,
  //     },
  //   ]
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
