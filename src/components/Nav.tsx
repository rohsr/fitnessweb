'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/30 py-2' : 'bg-transparent py-4'
      }`}
    >
      <nav className="flex flex-row items-center justify-between px-8 max-w-7xl mx-auto">
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
