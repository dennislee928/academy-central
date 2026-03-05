import type { Metadata } from 'next';
import './globals.css';
import NothingNav from '@/components/ui/NothingNav';
import NothingWidgetBar from '@/components/ui/NothingWidgetBar';
import DotGridBackground from '@/components/ui/DotGridBackground';

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
      <body className="min-h-screen antialiased bg-nothing-bg text-nothing-text font-body">
        <DotGridBackground />
        <NothingNav />
        <NothingWidgetBar />
        <main className="relative z-0 max-w-5xl mx-auto px-6 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
