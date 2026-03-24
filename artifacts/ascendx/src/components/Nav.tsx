'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Programs', path: '/programs' },
  { label: 'Transformation', path: '/transformation' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

interface NavProps {
  transparent?: boolean;
}

export default function Nav({ transparent = false }: NavProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className={`relative z-10 ${!transparent ? 'border-b border-border/30' : ''}`}>
      <nav className="flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-3xl tracking-tight text-foreground select-none no-underline"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ASCENDX<sup className="text-xs">®</sup>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, path }) => {
            const isActive = pathname === path;
            return (
              <li key={label}>
                <Link
                  href={path}
                  className={`text-sm transition-colors no-underline ${
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {user ? (
          <Link href="/dashboard">
            <button
              className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground transition-transform duration-200 hover:scale-[1.03] cursor-pointer"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Dashboard
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button
              className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground transition-transform duration-200 hover:scale-[1.03] cursor-pointer"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Login
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
}
