import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-6xl font-bold tracking-tighter text-white/90">404</p>
      <p className="text-white/60 mt-2 mb-8">This page could not be found.</p>
      <Link
        href="/"
        className="text-white hover:opacity-80 transition-opacity underline underline-offset-4"
      >
        回首頁
      </Link>
    </div>
  );
}
