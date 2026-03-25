import { useState } from 'react';

import ScrollReveal from '@/components/ScrollReveal';

const goals = [
  'Lose body fat',
  'Build muscle',
  'Improve athletic performance',
  'Body recomposition',
  'General health & fitness',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    goal: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background">


      <section className="px-6 pt-24 pb-20 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <span
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get Started
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <h1
            className="mt-4 text-5xl sm:text-6xl md:text-7xl font-normal leading-[0.95] tracking-tight max-w-4xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Your transformation{' '}
            <em className="not-italic text-muted-foreground">starts here.</em>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <p
            className="mt-6 text-muted-foreground text-lg max-w-xl leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Tell us about your goal and we'll set up a free 30-minute consultation to match you with the right program.
          </p>
        </ScrollReveal>
      </section>

      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Info */}
          <ScrollReveal direction="left" threshold={0.1}>
            <div className="space-y-8">
              <div className="liquid-glass rounded-2xl p-8 border border-border/40">
                <h3
                  className="text-2xl font-normal text-foreground mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Free Consultation
                </h3>
                <p
                  className="text-muted-foreground text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  A 30-minute call with one of our coaches. We'll review your history, understand your goals, and tell you exactly which program fits.
                </p>
              </div>
              <div className="liquid-glass rounded-2xl p-8 border border-border/40">
                <h3
                  className="text-2xl font-normal text-foreground mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Response time
                </h3>
                <p
                  className="text-muted-foreground text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  We respond to every inquiry within 24 hours, Monday through Saturday. No automated responses — a real coach reads your message.
                </p>
              </div>
              <div className="liquid-glass rounded-2xl p-8 border border-border/40">
                <h3
                  className="text-2xl font-normal text-foreground mb-3"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Email directly
                </h3>
                <p
                  className="text-muted-foreground text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  hello@ascendx.com
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="right" delay={100} threshold={0.1}>
            {submitted ? (
              <div className="liquid-glass rounded-2xl p-12 border border-border/40 text-center">
                <div
                  className="text-4xl font-normal text-foreground mb-4"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  Message received.
                </div>
                <p
                  className="text-muted-foreground text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  We'll be in touch within 24 hours. The work starts now.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="liquid-glass rounded-2xl p-8 border border-border/40 space-y-6"
              >
                <div>
                  <label
                    className="block text-xs tracking-wide uppercase text-muted-foreground mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-transparent border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs tracking-wide uppercase text-muted-foreground mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs tracking-wide uppercase text-muted-foreground mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Primary Goal
                  </label>
                  <select
                    name="goal"
                    required
                    value={form.goal}
                    onChange={handleChange}
                    className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors appearance-none"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <option value="" disabled>Select your goal</option>
                    {goals.map((g) => (
                      <option key={g} value={g} className="bg-background">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="block text-xs tracking-wide uppercase text-muted-foreground mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Tell us more (optional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Your current situation, timeline, any injuries or limitations..."
                    className="w-full bg-transparent border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors resize-none"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full liquid-glass rounded-full py-4 text-sm text-foreground transition-transform duration-200 hover:scale-[1.01] cursor-pointer"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
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
