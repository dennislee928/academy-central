/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/academy-central' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/academy-central/' : '',
  trailingSlash: true,
};

module.exports = nextConfig;
