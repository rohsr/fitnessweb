'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import ScrollReveal from '@/components/ScrollReveal';

const goals = ['Lose body fat', 'Build muscle', 'Improve athletic performance', 'Body recomposition', 'General health & fitness'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', goal: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <section className="px-6 pt-24 pb-20 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>Get Started</span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl font-normal leading-[0.95] tracking-tight max-w-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            Your transformation{' '}<em className="not-italic text-muted-foreground">starts here.</em>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <p className="mt-6 text-muted-foreground text-lg max-w-xl leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Tell us about your goal and we'll set up a free 30-minute consultation to match you with the right program.
          </p>
        </ScrollReveal>
      </section>

      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <ScrollReveal direction="left" threshold={0.1}>
            <div className="space-y-6">
              {[
                { title: 'Free Consultation', body: 'A 30-minute call with one of our coaches. We\'ll review your history, understand your goals, and tell you exactly which program fits.' },
                { title: 'Response time', body: 'We respond to every inquiry within 24 hours, Monday through Saturday. No automated responses — a real coach reads your message.' },
                { title: 'Email directly', body: 'hello@ascendx.com' },
              ].map((item) => (
                <div key={item.title} className="liquid-glass rounded-2xl p-8 border border-border/40">
                  <h3 className="text-2xl font-normal text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={100} threshold={0.1}>
            {submitted ? (
              <div className="liquid-glass rounded-2xl p-12 border border-border/40 text-center">
                <div className="text-4xl font-normal text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>Message received.</div>
                <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>We'll be in touch within 24 hours. The work starts now.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="liquid-glass rounded-2xl p-8 border border-border/40 space-y-6">
                {[{ name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' }, { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' }].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2" style={{ fontFamily: 'var(--font-body)' }}>{field.label}</label>
                    <input type={field.type} name={field.name} required value={form[field.name as keyof typeof form]} onChange={handleChange} placeholder={field.placeholder}
                      className="w-full bg-transparent border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors" style={{ fontFamily: 'var(--font-body)' }} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2" style={{ fontFamily: 'var(--font-body)' }}>Primary Goal</label>
                  <select name="goal" required value={form.goal} onChange={handleChange}
                    className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors appearance-none" style={{ fontFamily: 'var(--font-body)' }}>
                    <option value="" disabled>Select your goal</option>
                    {goals.map((g) => <option key={g} value={g} className="bg-background">{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2" style={{ fontFamily: 'var(--font-body)' }}>Tell us more (optional)</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Your current situation, timeline, any injuries or limitations..."
                    className="w-full bg-transparent border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors resize-none" style={{ fontFamily: 'var(--font-body)' }} />
                </div>
                <button type="submit" className="w-full liquid-glass rounded-full py-4 text-sm text-foreground transition-transform duration-200 hover:scale-[1.01] cursor-pointer" style={{ fontFamily: 'var(--font-body)' }}>
                  Submit & Book Consultation
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
