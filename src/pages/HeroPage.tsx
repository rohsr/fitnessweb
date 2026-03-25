
import { Link } from 'wouter';

export default function HeroPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
      </div>



      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40 py-[90px]">
        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-normal max-w-7xl animate-fade-rise"
          style={{
            fontFamily: "'Instrument Serif', serif",
            lineHeight: '0.95',
            letterSpacing: '-2.46px',
          }}
        >
          <em className="not-italic text-muted-foreground">Discipline</em> builds what{' '}
          <em className="not-italic text-muted-foreground">motivation cannot.</em>
        </h1>

        <p
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Personalized workouts, structured diet plans, and real progress tracking — built for
          people who are serious about transforming their body and staying consistent.
        </p>

        <Link href="/contact">
          <button
            className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 transition-transform duration-200 hover:scale-[1.03] cursor-pointer animate-fade-rise-delay-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Start Your Transformation
          </button>
        </Link>
      </section>
    </main>
  );
}
