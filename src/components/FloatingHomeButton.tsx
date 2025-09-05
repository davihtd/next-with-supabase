'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

export default function FloatingHomeButton() {
  const pathname = usePathname();
  // don't render on home
  if (!pathname || pathname === '/') return null;

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Button asChild className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors p-0">
        <Link href="/" aria-label="Ir al inicio">
          <Home className="w-6 h-6 text-blue-600" />
        </Link>
      </Button>
    </div>
  );
}
