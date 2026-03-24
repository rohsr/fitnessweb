import { useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import ScrollReveal from '@/components/ScrollReveal';

const stats = [
  { label: 'Sessions This Week', value: '4', sub: '/ 6 planned', positive: true },
  { label: 'Current Streak', value: '12', sub: 'days', positive: true },
  { label: 'Week', value: '7', sub: 'of 16', positive: true },
  { label: 'Bodyweight', value: '82.4', sub: 'kg · ↓ 1.2 this week', positive: true },
];

const todayWorkout = [
  { exercise: 'Barbell Back Squat', sets: '4', reps: '6', load: '120kg' },
  { exercise: 'Romanian Deadlift', sets: '3', reps: '10', load: '90kg' },
  { exercise: 'Leg Press', sets: '3', reps: '12', load: '200kg' },
  { exercise: 'Walking Lunge', sets: '3', reps: '16', load: 'Bodyweight' },
  { exercise: 'Leg Curl (Machine)', sets: '3', reps: '12', load: '50kg' },
];

const weekProgress = [
  { day: 'Mon', done: true },
  { day: 'Tue', done: true },
  { day: 'Wed', done: false },
  { day: 'Thu', done: true },
  { day: 'Fri', done: true },
  { day: 'Sat', done: false },
  { day: 'Sun', done: false },
];

const macros = [
  { label: 'Protein', target: 190, current: 162, color: 'bg-foreground/70' },
  { label: 'Carbs', target: 280, current: 210, color: 'bg-foreground/40' },
  { label: 'Fats', target: 70, current: 58, color: 'bg-foreground/25' },
];

const recentActivity = [
  { action: 'Logged workout', detail: 'Upper Push A · 5 exercises', time: '2 days ago' },
  { action: 'Bodyweight check-in', detail: '82.4kg · −1.2kg', time: '3 days ago' },
  { action: 'Message from coach', detail: '"Solid week — keep the protein high."', time: '4 days ago' },
  { action: 'Logged workout', detail: 'Lower Body B · 5 exercises', time: '5 days ago' },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="border-b border-border/30">
        <div className="flex flex-row items-center justify-between px-8 py-5 max-w-7xl mx-auto">
          <Link
            href="/"
            className="text-2xl tracking-tight text-foreground select-none cursor-pointer no-underline"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            ASCENDX<sup className="text-xs">®</sup>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {['Overview', 'Workouts', 'Nutrition', 'Progress', 'Coach'].map((item) => (
              <span
                key={item}
                className={`text-sm cursor-pointer transition-colors ${
                  item === 'Overview' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                {user.name}
              </div>
              <div className="text-xs text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                {user.program}
              </div>
            </div>
            <div className="w-9 h-9 rounded-full liquid-glass border border-border/50 flex items-center justify-center">
              <span className="text-sm text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {user.name.charAt(0)}
              </span>
            </div>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 py-10 max-w-7xl mx-auto space-y-10">

        {/* Welcome */}
        <ScrollReveal direction="up">
          <div>
            <span
              className="text-xs tracking-[0.25em] uppercase text-muted-foreground"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Week {user.week} of 16
            </span>
            <h1
              className="mt-2 text-4xl sm:text-5xl font-normal text-foreground"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Good morning,{' '}
              <em className="not-italic text-muted-foreground">{user.name}.</em>
            </h1>
          </div>
        </ScrollReveal>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} direction="up" delay={i * 70} threshold={0.05}>
              <div className="liquid-glass rounded-2xl p-6 border border-border/40">
                <div
                  className="text-xs uppercase tracking-wide text-muted-foreground mb-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.label}
                </div>
                <div
                  className="text-4xl font-normal text-foreground leading-none"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs text-muted-foreground mt-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.sub}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Week Progress */}
        <ScrollReveal direction="up" threshold={0.05}>
          <div className="liquid-glass rounded-2xl p-6 border border-border/40">
            <div
              className="text-xs uppercase tracking-wide text-muted-foreground mb-5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              This Week
            </div>
            <div className="flex gap-3">
              {weekProgress.map(({ day, done }) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className={`w-full h-1.5 rounded-full ${done ? 'bg-foreground/70' : 'bg-border/60'}`}
                  />
                  <span
                    className={`text-xs ${done ? 'text-foreground' : 'text-muted-foreground/50'}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Today's Workout */}
          <ScrollReveal direction="left" threshold={0.05}>
            <div className="liquid-glass rounded-2xl p-8 border border-border/40 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div
                    className="text-xs uppercase tracking-wide text-muted-foreground mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Today's Session
                  </div>
                  <div
                    className="text-xl font-normal text-foreground"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    Lower Body A
                  </div>
                </div>
                <button
                  className="liquid-glass rounded-full px-4 py-2 text-xs text-foreground transition-transform hover:scale-[1.03] cursor-pointer border border-border/40"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Start →
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {['Exercise', 'Sets', 'Reps', 'Load'].map((h) => (
                    <div
                      key={h}
                      className="text-[10px] uppercase tracking-wide text-muted-foreground/60"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {h}
                    </div>
                  ))}
                </div>
                {todayWorkout.map((ex) => (
                  <div
                    key={ex.exercise}
                    className="grid grid-cols-4 gap-2 py-3 border-t border-border/20"
                  >
                    <div
                      className="text-sm text-foreground/90 col-span-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {ex.exercise}
                    </div>
                    <div className="text-sm text-muted-foreground text-center" style={{ fontFamily: "'Inter', sans-serif" }}>{ex.sets}</div>
                    <div className="text-sm text-muted-foreground text-center" style={{ fontFamily: "'Inter', sans-serif" }}>{ex.reps}</div>
                    <div className="text-sm text-muted-foreground text-right" style={{ fontFamily: "'Inter', sans-serif" }}>{ex.load}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right column */}
          <div className="space-y-6">

            {/* Nutrition */}
            <ScrollReveal direction="right" delay={80} threshold={0.05}>
              <div className="liquid-glass rounded-2xl p-8 border border-border/40">
                <div
                  className="text-xs uppercase tracking-wide text-muted-foreground mb-5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Today's Nutrition
                </div>
                <div className="space-y-4">
                  {macros.map((m) => (
                    <div key={m.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className="text-sm text-foreground/80"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {m.label}
                        </span>
                        <span
                          className="text-xs text-muted-foreground"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {m.current}g / {m.target}g
                        </span>
                      </div>
                      <div className="h-1 bg-border/40 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${m.color} transition-all duration-1000`}
                          style={{ width: `${(m.current / m.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-5 pt-5 border-t border-border/20 text-xs text-muted-foreground"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Target calories: 2,420 · Logged: 1,980
                </div>
              </div>
            </ScrollReveal>

            {/* Recent Activity */}
            <ScrollReveal direction="right" delay={160} threshold={0.05}>
              <div className="liquid-glass rounded-2xl p-8 border border-border/40">
                <div
                  className="text-xs uppercase tracking-wide text-muted-foreground mb-5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Recent Activity
                </div>
                <div className="space-y-4">
                  {recentActivity.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 py-3 border-t border-border/20 first:border-0 first:pt-0"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground/30 mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm text-foreground/90"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {a.action}
                        </div>
                        <div
                          className="text-xs text-muted-foreground mt-0.5 truncate"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {a.detail}
                        </div>
                      </div>
                      <div
                        className="text-xs text-muted-foreground/60 shrink-0"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {a.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  );
}
