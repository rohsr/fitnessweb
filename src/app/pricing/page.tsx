'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

import ScrollReveal from '@/components/ScrollReveal';

type Plan = {
  title: string;
  subtitle: string;
  bestFor: string;
  price: string;
  featuresTitle: string;
  features: string[];
  limitations?: string[];
  valueAdd?: string[];
  note?: string;
  ctaText: string;
  popular?: boolean;
  checkoutPlan: string;
};

const plans: Plan[] = [
  {
    title: 'Basic Tier',
    subtitle: 'Self-Guided Starter',
    bestFor: 'Beginners / budget users',
    price: '$25',
    featuresTitle: 'What you get',
    features: [
      'Pre-built workout plans (home/gym split)',
      'Basic diet guidelines (PDF or app-based)',
      'Monthly progress tracking (manual check-in)',
      'Access to recorded content (videos/tutorials)',
      'Email support (48–72 hr response)',
    ],
    ctaText: 'Get Started',
    checkoutPlan: 'basic',
  },
  {
    title: 'Intermediate Tier',
    subtitle: 'Guided Transformation',
    bestFor: 'Serious users who want results',
    price: '$49',
    featuresTitle: 'What you get',
    features: [
      'Customized workout plan (updated monthly)',
      'Personalized diet plan (based on goals)',
      'Weekly check-ins (WhatsApp / app)',
      'Form correction via video feedback',
      'Habit tracking (steps, water, sleep)',
      'Limited chat support (24–48 hr response)',
    ],
    ctaText: 'Get Started',
    checkoutPlan: 'intermediate',
  },
  {
    title: 'Premium Tier',
    subtitle: 'Elite Coaching',
    bestFor: 'High commitment / fast transformation',
    price: '$99',
    featuresTitle: 'What you get',
    features: [
      'Fully customized training + nutrition (weekly updates)',
      'Daily check-ins & direct WhatsApp access',
      'Live 1-on-1 coaching calls (weekly/biweekly)',
      'Real-time diet adjustments',
      'Supplement guidance',
      'Injury prevention & mobility routines',
      'Priority response (<12 hrs)',
    ],
    popular: true,
    ctaText: 'Get Started',
    checkoutPlan: 'premium',
  },
];

export default function PricingPage() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Background Video Layer */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="w-full h-full object-cover"
        >
          <source src="/pricing.mp4" type="video/mp4" />
        </video>
        {/* Black cover overlay */}
        <div className="absolute inset-0 bg-black/85 pointer-events-none"></div>
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col">

        <section className="px-6 pt-24 pb-16 max-w-7xl mx-auto flex flex-col items-center text-center">
          <ScrollReveal direction="up">
            <h1
              className="text-5xl md:text-6xl tracking-tight text-white font-semibold mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Choose your plan
            </h1>
          </ScrollReveal>
        </section>

        <section className="px-6 pb-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.title} direction="up" delay={i * 100} threshold={0.1}>
                <div
                  className={`relative rounded-3xl p-8 h-full flex flex-col border transition-all duration-300 ${plan.popular
                    ? 'border-sky-500/30 bg-zinc-900/80 shadow-2xl shadow-sky-900/10'
                    : 'border-border/10 bg-zinc-900/40 hover:border-border/30'
                    }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {plan.popular && (
                    <div className="absolute top-6 right-6 px-3 py-1 rounded-full border border-border/20 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground bg-zinc-800/80">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex flex-col items-start">
                      <h2
                        className="text-lg font-medium text-foreground tracking-tight"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {plan.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-[13px] text-muted-foreground/80 mb-6 font-medium">
                    For {plan.bestFor.toLowerCase()}
                  </p>

                  <div className="mb-8 flex flex-wrap items-baseline gap-1">
                    <span className="text-[2.5rem] font-semibold text-foreground tracking-tight leading-none">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground text-sm font-medium">/ mo</span>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold opacity-90 mb-5">{plan.featuresTitle}</p>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[13px] text-muted-foreground leading-snug font-medium">
                          <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5 stroke-[3]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>



                    <div className="mt-8">
                      <Link href={`/checkout?plan=${plan.checkoutPlan}`} className="block w-full">
                        <button
                          className={`w-full py-3.5 rounded-2xl text-[15px] font-semibold transition-all duration-300 ${plan.popular
                            ? 'bg-[#00A3FF] text-white hover:bg-[#00A3FF]/90 shadow-lg shadow-sky-500/20'
                            : 'bg-zinc-800/80 text-foreground border border-border/20 hover:bg-zinc-800'
                            }`}
                        >
                          {plan.ctaText}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
