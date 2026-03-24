'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import Nav from '@/components/Nav';

export default function HeroPage() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(headlineRef.current, { opacity: 0, y: 36, duration: 1.1 })
        .from(subtextRef.current, { opacity: 0, y: 24, duration: 0.9 }, '-=0.6')
        .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.8 }, '-=0.5');
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      <Nav transparent />

      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40">
        <h1
          ref={headlineRef}
          className="text-5xl sm:text-7xl md:text-8xl font-normal max-w-7xl"
          style={{
            fontFamily: 'var(--font-display)',
            lineHeight: '0.95',
            letterSpacing: '-2.46px',
          }}
        >
          <em className="not-italic text-muted-foreground">Discipline</em> builds what{' '}
          <em className="not-italic text-muted-foreground">motivation cannot.</em>
        </h1>

        <p
          ref={subtextRef}
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Personalized workouts, structured diet plans, and real progress tracking — built for
          people who are serious about transforming their body and staying consistent.
        </p>

        <Link href="/contact" ref={ctaRef} className="mt-12 inline-block">
          <button
            className="liquid-glass rounded-full px-14 py-5 text-base text-foreground transition-transform duration-200 hover:scale-[1.03] cursor-pointer"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Start Your Transformation
          </button>
        </Link>
      </section>
    </main>
  );
}
