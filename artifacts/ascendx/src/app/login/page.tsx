'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const success = login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="px-8 py-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link href="/" className="text-2xl tracking-tight text-foreground select-none no-underline" style={{ fontFamily: 'var(--font-display)' }}>
          ASCENDX<sup className="text-xs">®</sup>
        </Link>
        <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline" style={{ fontFamily: 'var(--font-body)' }}>
          New client? Apply →
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-normal text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>Welcome back.</h1>
            <p className="text-muted-foreground text-sm" style={{ fontFamily: 'var(--font-body)' }}>Sign in to access your training dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="liquid-glass rounded-2xl p-8 border border-border/40 space-y-5">
            <div>
              <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2" style={{ fontFamily: 'var(--font-body)' }}>Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                className="w-full bg-transparent border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/30 transition-colors" style={{ fontFamily: 'var(--font-body)' }} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs tracking-wide uppercase text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>Password</label>
                <span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-body)' }}>Forgot password?</span>
              </div>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password"
                className="w-full bg-transparent border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/30 transition-colors" style={{ fontFamily: 'var(--font-body)' }} />
            </div>
            {error && <p className="text-red-400 text-xs text-center" style={{ fontFamily: 'var(--font-body)' }}>{error}</p>}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full liquid-glass rounded-full py-4 text-sm text-foreground cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
            <p className="text-center text-xs text-muted-foreground pt-2" style={{ fontFamily: 'var(--font-body)' }}>
              Demo: enter any email and password to sign in.
            </p>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
