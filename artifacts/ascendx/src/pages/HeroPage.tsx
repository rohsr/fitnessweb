import Nav from '@/components/Nav';
import { Link } from 'wouter';

export default function HeroPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Fullscreen Video Background */}
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
