import type { Metadata } from 'next';
import './globals.css';

const basePath = process.env.NODE_ENV === 'production' ? '/academy-central' : '';

export const metadata: Metadata = {
  title: 'Academy Central',
  description: 'Academy Central 前端部落格',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen antialiased">
        <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
            <a href={basePath ? `${basePath}/` : '/'} className="font-semibold text-lg">
              Academy Central
            </a>
            <nav className="text-sm text-gray-600 dark:text-gray-400">
              <a href={basePath ? `${basePath}/` : '/'}>首頁</a>
            </nav>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
