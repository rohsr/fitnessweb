'use client';

import Link from 'next/link';

import ScrollReveal from '@/components/ScrollReveal';

const stats = [
  { value: '500+', label: 'Transformations completed' },
  { value: '94%', label: 'Client consistency rate' },
  { value: '12kg', label: 'Average fat loss in 16 weeks' },
  { value: '8kg', label: 'Average muscle gained' },
];

const steps = [
  { number: '01', title: 'Assessment & Goal Setting', description: 'We begin with a detailed body composition analysis, movement screen, and goal alignment session. No generic plans — your program is built from your data.' },
  { number: '02', title: 'Structured Programming', description: 'Receive your custom training and nutrition plan, calibrated to your schedule, equipment, and body type. Updated every 4 weeks based on progress data.' },
  { number: '03', title: 'Weekly Accountability', description: 'Check-ins every week with performance metrics, photos, and adjustments. Staying on track is built into the system — not left to willpower.' },
  { number: '04', title: 'Sustainable Results', description: 'By the end of your program, you have not just transformed your body — you have built the habits, knowledge, and discipline to maintain it for life.' },
];

const testimonials = [
  { quote: "I've tried every program out there. ASCENDX was the first one where the structure actually matched my life. 14kg down in 14 weeks.", name: 'Marcus T.', tag: 'Body Transformation, 14 weeks' },
  { quote: "The accountability system is what makes this different. I can't slip through the cracks. Best decision I ever made for my health.", name: 'Priya S.', tag: 'Strength & Power, 12 weeks' },
  { quote: "Went from barely running 5k to completing my first half marathon. The conditioning blocks are no joke — and neither are the results.", name: 'James O.', tag: 'Endurance & Conditioning, 10 weeks' },
];

export default function TransformationPage() {
  return (
    <main className="min-h-screen bg-background">

      <section className="px-6 pt-24 pb-20 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>Real Results</span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl font-normal leading-[0.95] tracking-tight max-w-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            No shortcuts.{' '}<em className="not-italic text-muted-foreground">No exceptions.</em>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <p className="mt-6 text-muted-foreground text-lg max-w-xl leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Every transformation at ASCENDX is earned. We track every metric so you can see exactly where you started and how far you've come.
          </p>
        </ScrollReveal>
      </section>

      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} direction="up" delay={i * 80} threshold={0.1}>
              <div className="liquid-glass rounded-2xl p-8 border border-border/40 text-center">
                <div className="text-4xl sm:text-5xl font-normal text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</div>
                <div className="text-xs text-muted-foreground leading-tight" style={{ fontFamily: 'var(--font-body)' }}>{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <h2 className="text-4xl sm:text-5xl font-normal mb-16 text-foreground" style={{ fontFamily: 'var(--font-display)' }}>The process.</h2>
        </ScrollReveal>
        <div className="space-y-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} direction="left" delay={i * 80} threshold={0.1}>
              <div className="liquid-glass rounded-2xl p-8 border border-border/40 flex flex-col sm:flex-row gap-8 items-start">
                <span className="text-5xl font-normal text-muted-foreground/30 leading-none shrink-0" style={{ fontFamily: 'var(--font-display)' }}>{step.number}</span>
                <div>
                  <h3 className="text-2xl font-normal text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <h2 className="text-4xl sm:text-5xl font-normal mb-16 text-foreground" style={{ fontFamily: 'var(--font-display)' }}>From our clients.</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} direction="up" delay={i * 120} threshold={0.1}>
              <div className="liquid-glass rounded-2xl p-8 border border-border/40 flex flex-col h-full">
                <p className="text-foreground/90 leading-relaxed text-base flex-1 mb-6" style={{ fontFamily: 'var(--font-display)' }}>"{t.quote}"</p>
                <div>
                  <div className="text-sm font-medium text-foreground" style={{ fontFamily: 'var(--font-body)' }}>{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-1" style={{ fontFamily: 'var(--font-body)' }}>{t.tag}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal direction="up" threshold={0.4}>
        <div className="px-6 pb-32 max-w-7xl mx-auto text-center">
          <Link href="/contact">
            <button className="liquid-glass rounded-full px-14 py-5 text-base text-foreground transition-transform duration-200 hover:scale-[1.03] cursor-pointer" style={{ fontFamily: 'var(--font-body)' }}>
              Start Your Transformation
            </button>
          </Link>
        </div>
      </ScrollReveal>
    </main>
  );
}
