import { Link, useLocation } from 'wouter';
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
  const [location] = useLocation();
  const { user } = useAuth();

  return (
    <header className={`relative z-10 ${!transparent ? 'border-b border-border/30' : ''}`}>
      <nav className="flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-3xl tracking-tight text-foreground select-none cursor-pointer no-underline"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          ASCENDX<sup className="text-xs">®</sup>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, path }) => {
            const isActive = location === path;
            return (
              <li key={label}>
                <Link
                  href={path}
                  className={`text-sm transition-colors cursor-pointer no-underline ${
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
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
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Dashboard
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button
              className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground transition-transform duration-200 hover:scale-[1.03] cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Login
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
}
