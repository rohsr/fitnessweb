'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

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
    <main className="min-h-screen w-full flex relative overflow-hidden bg-background">
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Gym Background" 
          className="object-cover w-full h-full opacity-60 mix-blend-luminosity"
        />
        {/* Subtle overlay to ensure the form stands out */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full flex">
        {/* Left Side: Login Form */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-12">
          
          {/* Logo Heading */}
          <div className="absolute top-8 left-8 sm:left-12 lg:left-24">
            <Link href="/" className="flex items-center gap-3 text-2xl tracking-tight text-foreground select-none no-underline" style={{ fontFamily: 'var(--font-display)' }}>
              ASCENDX<sup className="text-xs">®</sup>
            </Link>
          </div>

          <motion.div
            className="w-full max-w-md mx-auto lg:mx-0 liquid-glass rounded-3xl p-8 sm:p-10 border border-border/40 shadow-2xl"
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mb-8 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-normal text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Member Login
              </h1>
              <p className="text-muted-foreground text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                Please enter your details to sign in.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold tracking-wide text-muted-foreground mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  Email
                </label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="your@email.com"
                  className="w-full bg-background/40 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/30 focus:bg-background/60 transition-colors" 
                  style={{ fontFamily: 'var(--font-body)' }} 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wide text-muted-foreground mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  Password
                </label>
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  autoComplete="current-password"
                  className="w-full bg-background/40 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/30 focus:bg-background/60 transition-colors" 
                  style={{ fontFamily: 'var(--font-body)' }} 
                />
              </div>

              <div className="flex justify-end mb-2">
                <span className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-body)' }}>
                  Forgot password?
                </span>
              </div>

              {error && <p className="text-red-400 text-xs text-center" style={{ fontFamily: 'var(--font-body)' }}>{error}</p>}
              
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-foreground text-background font-medium rounded-xl py-3.5 text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2 shadow-lg hover:bg-foreground/90 transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </motion.button>
              
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-border/40"></div>
                <span className="flex-shrink-0 mx-4 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>Or continue with</span>
                <div className="flex-grow border-t border-border/40"></div>
              </div>

              <div className="flex gap-3">
                <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-background/30 hover:bg-background/50 border border-border/40 rounded-xl py-3 transition-colors cursor-pointer">
                  <FcGoogle className="text-xl" />
                  <span className="text-xs font-medium text-foreground" style={{ fontFamily: 'var(--font-body)' }}>Google</span>
                </button>
                <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-background/30 hover:bg-background/50 border border-border/40 rounded-xl py-3 transition-colors cursor-pointer">
                  <FaApple className="text-xl text-foreground" />
                  <span className="text-xs font-medium text-foreground" style={{ fontFamily: 'var(--font-body)' }}>Apple</span>
                </button>
              </div>

            </form>

            <p className="text-center text-sm text-muted-foreground mt-8" style={{ fontFamily: 'var(--font-body)' }}>
              Are you new?{' '}
              <Link href="/signup" className="text-foreground font-semibold hover:underline decoration-foreground/50 underline-offset-4 transition-all">
                Create an Account
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Right Side: Empty to showcase the background image */}
        <div className="hidden lg:block w-[45%]"></div>
      </div>
    </main>
  );
}
