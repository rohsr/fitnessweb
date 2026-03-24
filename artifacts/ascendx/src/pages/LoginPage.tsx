import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [, navigate] = useLocation();
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
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Minimal header */}
      <header className="px-8 py-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link
          href="/"
          className="text-2xl tracking-tight text-foreground select-none cursor-pointer no-underline"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          ASCENDX<sup className="text-xs">®</sup>
        </Link>
        <Link
          href="/contact"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          New client? Apply →
        </Link>
      </header>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md animate-fade-rise">
          {/* Heading */}
          <div className="mb-10 text-center">
            <h1
              className="text-4xl sm:text-5xl font-normal text-foreground mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Welcome back.
            </h1>
            <p
              className="text-muted-foreground text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Sign in to access your training dashboard.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="liquid-glass rounded-2xl p-8 border border-border/40 space-y-5"
          >
            <div>
              <label
                className="block text-xs tracking-wide uppercase text-muted-foreground mb-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/30 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className="text-xs tracking-wide uppercase text-muted-foreground"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Password
                </label>
                <span
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Forgot password?
                </span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/30 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            {error && (
              <p
                className="text-red-400 text-xs text-center"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full liquid-glass rounded-full py-4 text-sm text-foreground transition-all duration-200 hover:scale-[1.01] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mt-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p
              className="text-center text-xs text-muted-foreground pt-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Demo: enter any email and password to sign in.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
