/** @type {import('next').NextConfig} */
const nextConfig = {
  // dev 時不設 output: 'export'，避免 /_next/static 等被 catch-all 當成頁面而報 missing param 與 MODULE_NOT_FOUND
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  basePath: process.env.NODE_ENV === 'production' ? '/academy-central' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/academy-central/' : '',
  trailingSlash: true,
};

module.exports = nextConfig;
