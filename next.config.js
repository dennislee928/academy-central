/** @type {import('next').NextConfig} */
// 若部署在根路徑（如 Vercel 預設），請在環境變數設 BASE_PATH= 留空，否則 client JS 會 404，widget 只會顯示 placeholder
const productionBasePath =
  process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : '/academy-central';
const nextConfig = {
  /** 跳過型別檢查：@dennislee928/nothingx-react-components 內部分 widget 的 .tsx 與 strict 型別不相容。 */
  typescript: { ignoreBuildErrors: true },
  transpilePackages: ['@dennislee928/nothingx-react-components'],
  // dev 時不設 output: 'export'，避免 /_next/static 等被 catch-all 當成頁面而報 missing param 與 MODULE_NOT_FOUND
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  basePath: process.env.NODE_ENV === 'production' ? productionBasePath : '',
  assetPrefix:
    process.env.NODE_ENV === 'production' && productionBasePath
      ? `${productionBasePath.replace(/\/$/, '')}/`
      : '',
  trailingSlash: true,
};

module.exports = nextConfig;
