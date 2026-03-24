'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import ScrollReveal from '@/components/ScrollReveal';

const stats = [
  { label: 'Sessions This Week', value: '4', sub: '/ 6 planned' },
  { label: 'Current Streak', value: '12', sub: 'days' },
  { label: 'Week', value: '7', sub: 'of 16' },
  { label: 'Bodyweight', value: '82.4', sub: 'kg · ↓ 1.2 this week' },
];

const todayWorkout = [
  { exercise: 'Barbell Back Squat', sets: '4', reps: '6', load: '120kg' },
  { exercise: 'Romanian Deadlift', sets: '3', reps: '10', load: '90kg' },
  { exercise: 'Leg Press', sets: '3', reps: '12', load: '200kg' },
  { exercise: 'Walking Lunge', sets: '3', reps: '16', load: 'BW' },
  { exercise: 'Leg Curl (Machine)', sets: '3', reps: '12', load: '50kg' },
];

const weekProgress = [
  { day: 'Mon', done: true }, { day: 'Tue', done: true }, { day: 'Wed', done: false },
  { day: 'Thu', done: true }, { day: 'Fri', done: true }, { day: 'Sat', done: false }, { day: 'Sun', done: false },
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
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/30">
        <div className="flex flex-row items-center justify-between px-8 py-5 max-w-7xl mx-auto">
          <Link href="/" className="text-2xl tracking-tight text-foreground select-none no-underline" style={{ fontFamily: 'var(--font-display)' }}>
            ASCENDX<sup className="text-xs">®</sup>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {['Overview', 'Workouts', 'Nutrition', 'Progress', 'Coach'].map((item) => (
              <span key={item} className={`text-sm cursor-pointer transition-colors ${item === 'Overview' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`} style={{ fontFamily: 'var(--font-body)' }}>{item}</span>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm text-foreground" style={{ fontFamily: 'var(--font-body)' }}>{user.name}</div>
              <div className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>{user.program}</div>
            </div>
            <div className="w-9 h-9 rounded-full liquid-glass border border-border/50 flex items-center justify-center">
              <span className="text-sm text-foreground" style={{ fontFamily: 'var(--font-display)' }}>{user.name.charAt(0)}</span>
            </div>
            <button onClick={() => { logout(); router.push('/'); }} className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-body)' }}>Sign out</button>
          </div>
        </div>
      </header>

      <div className="px-6 py-10 max-w-7xl mx-auto space-y-10">
        <ScrollReveal direction="up">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>Week {user.week} of 16</span>
            <h1 className="mt-2 text-4xl sm:text-5xl font-normal text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Good morning,{' '}<em className="not-italic text-muted-foreground">{user.name}.</em>
            </h1>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} direction="up" delay={i * 70} threshold={0.05}>
              <div className="liquid-glass rounded-2xl p-6 border border-border/40">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-3" style={{ fontFamily: 'var(--font-body)' }}>{stat.label}</div>
                <div className="text-4xl font-normal text-foreground leading-none" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1" style={{ fontFamily: 'var(--font-body)' }}>{stat.sub}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" threshold={0.05}>
          <div className="liquid-glass rounded-2xl p-6 border border-border/40">
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-5" style={{ fontFamily: 'var(--font-body)' }}>This Week</div>
            <div className="flex gap-3">
              {weekProgress.map(({ day, done }) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-2">
                  <div className={`w-full h-1.5 rounded-full ${done ? 'bg-foreground/70' : 'bg-border/60'}`} />
                  <span className={`text-xs ${done ? 'text-foreground' : 'text-muted-foreground/50'}`} style={{ fontFamily: 'var(--font-body)' }}>{day}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal direction="left" threshold={0.05}>
            <div className="liquid-glass rounded-2xl p-8 border border-border/40 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-body)' }}>Today's Session</div>
                  <div className="text-xl font-normal text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Lower Body A</div>
                </div>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="liquid-glass rounded-full px-4 py-2 text-xs text-foreground cursor-pointer border border-border/40" style={{ fontFamily: 'var(--font-body)' }}>
                  Start →
                </motion.button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {['Exercise', 'Sets', 'Reps', 'Load'].map((h) => (
                    <div key={h} className="text-[10px] uppercase tracking-wide text-muted-foreground/60" style={{ fontFamily: 'var(--font-body)' }}>{h}</div>
                  ))}
                </div>
                {todayWorkout.map((ex) => (
                  <div key={ex.exercise} className="grid grid-cols-4 gap-2 py-3 border-t border-border/20">
                    <div className="text-sm text-foreground/90" style={{ fontFamily: 'var(--font-body)' }}>{ex.exercise}</div>
                    <div className="text-sm text-muted-foreground text-center" style={{ fontFamily: 'var(--font-body)' }}>{ex.sets}</div>
                    <div className="text-sm text-muted-foreground text-center" style={{ fontFamily: 'var(--font-body)' }}>{ex.reps}</div>
                    <div className="text-sm text-muted-foreground text-right" style={{ fontFamily: 'var(--font-body)' }}>{ex.load}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal direction="right" delay={80} threshold={0.05}>
              <div className="liquid-glass rounded-2xl p-8 border border-border/40">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-5" style={{ fontFamily: 'var(--font-body)' }}>Today's Nutrition</div>
                <div className="space-y-4">
                  {macros.map((m) => (
                    <div key={m.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-foreground/80" style={{ fontFamily: 'var(--font-body)' }}>{m.label}</span>
                        <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>{m.current}g / {m.target}g</span>
                      </div>
                      <div className="h-1 bg-border/40 rounded-full overflow-hidden">
                        <motion.div className={`h-full rounded-full ${m.color}`} initial={{ width: 0 }} animate={{ width: `${(m.current / m.target) * 100}%` }} transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-border/20 text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                  Target calories: 2,420 · Logged: 1,980
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={160} threshold={0.05}>
              <div className="liquid-glass rounded-2xl p-8 border border-border/40">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-5" style={{ fontFamily: 'var(--font-body)' }}>Recent Activity</div>
                <div className="space-y-4">
                  {recentActivity.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 py-3 border-t border-border/20 first:border-0 first:pt-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground/30 mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-foreground/90" style={{ fontFamily: 'var(--font-body)' }}>{a.action}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 truncate" style={{ fontFamily: 'var(--font-body)' }}>{a.detail}</div>
                      </div>
                      <div className="text-xs text-muted-foreground/60 shrink-0" style={{ fontFamily: 'var(--font-body)' }}>{a.time}</div>
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
