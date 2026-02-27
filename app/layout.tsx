import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

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
      <body className="min-h-screen antialiased bg-black text-white">
        <header className="sticky top-0 z-10 border-b border-white/10 bg-black/90 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity">
              Academy Central
            </Link>
            <nav className="text-sm text-white/70">
              <Link href="/" className="hover:text-white transition-colors">首頁</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-6 py-12">{children}</main>
      </body>
    </html>
  );
}
