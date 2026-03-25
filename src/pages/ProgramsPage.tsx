
import ScrollReveal from '@/components/ScrollReveal';
import { Link } from 'wouter';

const programs = [
  {
    tag: 'FOUNDATION',
    title: 'Strength & Power',
    description:
      'Build a foundation of raw strength with structured progressive overload, compound movements, and periodized programming designed to add real muscle.',
    features: ['Progressive overload system', 'Compound-first protocol', '5-day split', 'Mobility & recovery'],
    duration: '12 weeks',
    level: 'Intermediate',
  },
  {
    tag: 'SIGNATURE',
    title: 'Body Transformation',
    description:
      'Our most complete program. Combines precision nutrition, resistance training, and metabolic conditioning for dramatic body composition change.',
    features: ['Custom macros + meal plan', 'Resistance & conditioning', '6-day split', 'Weekly check-ins'],
    duration: '16 weeks',
    level: 'All levels',
  },
  {
    tag: 'ELITE',
    title: 'Endurance & Conditioning',
    description:
      'Train for peak cardiovascular performance and athletic endurance without sacrificing muscle. Built for people who want to be elite movers.',
    features: ['VO2 max training blocks', 'Zone 2 & threshold work', '5-day split', 'Sport-specific drills'],
    duration: '10 weeks',
    level: 'Advanced',
  },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-background">


      {/* Hero */}
      <section className="px-6 pt-24 pb-20 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <span
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Training Systems
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100}>
          <h1
            className="mt-4 text-5xl sm:text-6xl md:text-7xl font-normal leading-[0.95] tracking-tight max-w-4xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Programs built for{' '}
            <em className="not-italic text-muted-foreground">real results.</em>
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <p
            className="mt-6 text-muted-foreground text-lg max-w-xl leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Every program is structured around science-backed principles, not trends. Choose the system that matches your goal.
          </p>
        </ScrollReveal>
      </section>

      {/* Programs Grid */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program, i) => (
            <ScrollReveal key={program.title} direction="up" delay={i * 120} threshold={0.1}>
              <div className="liquid-glass rounded-2xl p-8 h-full flex flex-col border border-border/40 hover:border-border/70 transition-colors duration-300">
                <span
                  className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {program.tag}
                </span>
                <h2
                  className="text-3xl font-normal mb-4 text-foreground"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {program.title}
                </h2>
                <p
                  className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {program.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {program.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <span className="w-1 h-1 rounded-full bg-foreground/40 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div
                  className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/30 pt-5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>{program.duration}</span>
                  <span>{program.level}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={0} threshold={0.3}>
          <div className="mt-20 text-center">
            <p
              className="text-muted-foreground text-base mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Not sure which program is right for you?
            </p>
            <Link href="/contact">
              <button
                className="liquid-glass rounded-full px-12 py-4 text-sm text-foreground transition-transform duration-200 hover:scale-[1.03] cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Get a Free Consultation
              </button>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
