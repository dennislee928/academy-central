/** @type {import('next').NextConfig} */
const nextConfig = {
  // 僅在 production build 使用靜態匯出，dev 時不啟用，避免 /_next/static 等請求被 catch-all 當成頁面而報 missing param
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  basePath: process.env.NODE_ENV === 'production' ? '/academy-central' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/academy-central/' : '',
  trailingSlash: true,
};

module.exports = nextConfig;
