'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import ScrollReveal from '@/components/ScrollReveal';

const values = [
  { title: 'Discipline Over Motivation', description: "Motivation is unreliable. Discipline is a skill. We build systems that keep you moving forward on the days when you don't want to." },
  { title: 'Data, Not Guesswork', description: 'Every program is calibrated to real metrics — body composition, strength benchmarks, and progress photography. If we can measure it, we can improve it.' },
  { title: 'Long-Term by Design', description: "We don't chase quick transformations that don't last. Our protocols are designed to build a body and a lifestyle that you maintain for decades." },
];

const team = [
  { name: 'Elias Varro', role: 'Head Coach & Founder', bio: 'CSCS-certified with 12 years coaching elite athletes and everyday people. Competed nationally in powerlifting before founding ASCENDX.' },
  { name: 'Nadia Chen', role: 'Nutrition Director', bio: 'Registered dietitian specializing in body composition. Masters in Sports Nutrition from Loughborough University.' },
  { name: 'Dom Okafor', role: 'Conditioning Specialist', bio: 'Former professional rugby player. Specializes in metabolic conditioning, movement quality, and athletic performance.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <section className="px-6 pt-24 pb-20 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>Our Story</span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl font-normal leading-[0.95] tracking-tight max-w-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            Built on{' '}<em className="not-italic text-muted-foreground">discipline.</em>
          </h1>
        </ScrollReveal>
      </section>

      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left" threshold={0.1}>
            <div className="liquid-glass rounded-2xl border border-border/40 aspect-[4/5] flex items-center justify-center">
              <span className="text-[8rem] font-normal text-foreground/5 select-none" style={{ fontFamily: 'var(--font-display)' }}>AX</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={100} threshold={0.1}>
            <div className="space-y-6">
              <p className="text-foreground/90 text-lg leading-relaxed" style={{ fontFamily: 'var(--font-display)' }}>
                ASCENDX was founded with one belief: most people don't lack motivation — they lack structure.
              </p>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                After years of watching people cycle through programs that weren't designed for them, our founder Elias Varro built a system rooted in individualization, accountability, and progressive science.
              </p>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                Today, ASCENDX works with clients across four continents — from first-time gym-goers to competitive athletes — with one shared commitment: to earn every result.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <h2 className="text-4xl sm:text-5xl font-normal mb-16 text-foreground" style={{ fontFamily: 'var(--font-display)' }}>What we stand for.</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <ScrollReveal key={value.title} direction="up" delay={i * 100} threshold={0.1}>
              <div className="liquid-glass rounded-2xl p-8 border border-border/40">
                <div className="text-3xl font-normal text-foreground mb-3 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>{value.title}</div>
                <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{value.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <h2 className="text-4xl sm:text-5xl font-normal mb-16 text-foreground" style={{ fontFamily: 'var(--font-display)' }}>The team.</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} direction="up" delay={i * 120} threshold={0.1}>
              <div className="liquid-glass rounded-2xl p-8 border border-border/40">
                <div className="w-12 h-12 rounded-full liquid-glass border border-border/50 mb-6 flex items-center justify-center">
                  <span className="text-lg font-normal text-muted-foreground" style={{ fontFamily: 'var(--font-display)' }}>{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-normal text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>{member.name}</h3>
                <div className="text-xs text-muted-foreground tracking-wide uppercase mb-4" style={{ fontFamily: 'var(--font-body)' }}>{member.role}</div>
                <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{member.bio}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal direction="up" threshold={0.4}>
        <div className="px-6 pb-32 max-w-7xl mx-auto text-center">
          <Link href="/contact">
            <button className="liquid-glass rounded-full px-14 py-5 text-base text-foreground transition-transform duration-200 hover:scale-[1.03] cursor-pointer" style={{ fontFamily: 'var(--font-body)' }}>
              Work With Us
            </button>
          </Link>
        </div>
      </ScrollReveal>
    </main>
  );
}
