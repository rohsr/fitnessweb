'use client';

import React from 'react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

// ─── Icons (inline SVG helpers) ─────────────────────────────────────────────
const Icon = {
  Home: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" /><path d="M9 21V12h6v9" />
    </svg>
  ),
  Dumbbell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M6.5 6.5h11M6.5 17.5h11M4 9h2v6H4zM18 9h2v6h-2zM2 11h2v2H2zM20 11h2v2h-2z" />
    </svg>
  ),
  Apple: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 3c-1.5 0-3 1.5-3 3 0 0 1.5 1 3 1s3-1 3-1c0-1.5-1.5-3-3-3z" /><path d="M7 9c-2.5 0-4 2-4 5s2 7 4 7c1 0 2-1 3-1h4c1 0 2 1 3 1 2 0 4-4 4-7s-1.5-5-4-5c-1 0-2 1-3 1h-4C9 10 8 9 7 9z" />
    </svg>
  ),
  Chart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 20h18M3 20V10l5-4 4 3 5-6 4 3v14" />
    </svg>
  ),
  User: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  Water: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2C6 9 4 13 4 16a8 8 0 0016 0c0-3-2-7-8-14z" />
    </svg>
  ),
  Fire: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2c0 0-5 5-5 11a5 5 0 0010 0c0-2-1-4-2-5 0 2-1 4-3 4-2 0-3-2-2-4 0 0 2-1 2-6z" />
    </svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    </svg>
  ),
  Target: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  LogOut: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M5 12l5 5L19 7" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  Steps: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M19 15V9M15 18V6M11 21V3M7 18V6M3 15V9" />
    </svg>
  ),
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const todayWorkout = [
  { exercise: 'Barbell Back Squat', sets: '4', reps: '6', load: '120kg', done: true },
  { exercise: 'Romanian Deadlift', sets: '3', reps: '10', load: '90kg', done: true },
  { exercise: 'Leg Press', sets: '3', reps: '12', load: '200kg', done: false },
  { exercise: 'Walking Lunge', sets: '3', reps: '16', load: 'BW', done: false },
  { exercise: 'Leg Curl', sets: '3', reps: '12', load: '50kg', done: false },
];

const weekDays = [
  { day: 'Mon', label: 'Upper A', done: true },
  { day: 'Tue', label: 'Rest', done: true },
  { day: 'Wed', label: 'Lower A', done: true },
  { day: 'Thu', label: 'Upper B', done: true },
  { day: 'Fri', label: 'Rest', done: false, today: true },
  { day: 'Sat', label: 'Lower B', done: false },
  { day: 'Sun', label: 'Rest', done: false },
];

const macros = [
  { label: 'Protein', target: 190, current: 162, color: '#3b82f6' },
  { label: 'Carbs', target: 280, current: 210, color: '#8b5cf6' },
  { label: 'Fats', target: 70, current: 58, color: '#f59e0b' },
];

const meals = [
  { name: 'Breakfast', items: 'Oats, Eggs, Banana', cal: 520, time: '7:30 AM' },
  { name: 'Lunch', items: 'Chicken Rice Bowl, Salad', cal: 680, time: '1:00 PM' },
  { name: 'Snack', items: 'Protein Shake, Almonds', cal: 280, time: '4:00 PM' },
  { name: 'Dinner', items: 'Salmon, Broccoli, Sweet Potato', cal: 500, time: '8:00 PM' },
];

const upcomingSchedule = [
  { day: 'Sat', date: '29', session: 'Lower Body B', duration: '55 min' },
  { day: 'Mon', date: '31', session: 'Upper Push A', duration: '50 min' },
  { day: 'Wed', date: '2', session: 'Lower Body A', duration: '55 min' },
  { day: 'Thu', date: '3', session: 'Upper Pull B', duration: '50 min' },
];

const personalBests = [
  { lift: 'Squat', weight: '125 kg', date: 'Mar 18' },
  { lift: 'Deadlift', weight: '150 kg', date: 'Mar 10' },
  { lift: 'Bench', weight: '90 kg', date: 'Mar 20' },
  { lift: 'OHP', weight: '65 kg', date: 'Mar 5' },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

// Radial progress ring
function RingProgress({ value, max, size = 80, stroke = 5, color = '#3b82f6', label, sub }: {
  value: number; max: number; size?: number; stroke?: number; color?: string; label: string; sub: string;
}) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const progress = Math.min(value / max, 1);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
            strokeLinecap="round" strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ * (1 - progress) }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold text-white leading-none">{value}</span>
          <span className="text-[9px] text-white/40 mt-0.5">{sub}</span>
        </div>
      </div>
      <span className="text-[10px] tracking-wide uppercase text-white/50">{label}</span>
    </div>
  );
}

// Water glass component
function WaterGlass({ filled }: { filled: boolean }) {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="relative w-7 h-9 rounded-b-lg border border-white/20 overflow-hidden cursor-pointer"
      style={{ background: 'rgba(255,255,255,0.05)' }}
    >
      <AnimatePresence>
        {filled && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute inset-0 rounded-b-lg"
            style={{ background: 'linear-gradient(to top, #3b82f6, #60a5fa)' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Card wrapper
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-white/50">{icon}</span>
      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">{title}</span>
    </div>
  );
}

// ─── Tab Views ────────────────────────────────────────────────────────────────

function HomeTab({ user }: { user: NonNullable<ReturnType<typeof useAuth>['user']> }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-4">
      {/* Greeting */}
      <div>
        <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-1" style={{ fontFamily: 'var(--font-body)' }}>
          Week {user.week} of 16
        </p>
        <h1 className="text-3xl font-normal text-white leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
          {greeting},<br /><em className="not-italic text-white/60">{user.name}.</em>
        </h1>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Streak', value: '12', sub: 'days 🔥' },
          { label: 'This Week', value: '4/6', sub: 'sessions' },
          { label: 'Weight', value: '82.4', sub: 'kg ↓1.2' },
        ].map((s, i) => (
          <div key={s.label}>
            <Card>
              <div className="text-[9px] uppercase tracking-wider text-white/40 mb-1" style={{ fontFamily: 'var(--font-body)' }}>{s.label}</div>
              <div className="text-xl font-normal text-white leading-none" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</div>
              <div className="text-[9px] text-white/40 mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>{s.sub}</div>
            </Card>
          </div>
        ))}
      </div>

      {/* Goals Rings */}
      <div>
        <Card>
          <SectionTitle icon={<Icon.Target />} title="Today's Goals" />
          <div className="flex justify-around">
            <RingProgress value={4} max={6} color="#3b82f6" label="Workouts" sub="/ 6" />
            <RingProgress value={1740} max={2420} color="#8b5cf6" label="Calories" sub="kcal" size={80} />
            <RingProgress value={7200} max={10000} color="#10b981" label="Steps" sub="/ 10k" />
          </div>
        </Card>
      </div>

      {/* Today's workout preview */}
      <div>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <SectionTitle icon={<Icon.Dumbbell />} title="Today's Session" />
              <div className="text-base font-normal text-white -mt-2" style={{ fontFamily: 'var(--font-display)' }}>Lower Body A</div>
            </div>
            <motion.span
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full px-3 py-1.5 cursor-pointer"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Start →
            </motion.span>
          </div>
          <div className="space-y-2">
            {todayWorkout.slice(0, 3).map((ex) => (
              <div key={ex.exercise} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${ex.done ? 'bg-green-500 border-green-500' : 'border-white/20'}`}>
                  {ex.done && <Icon.Check />}
                </div>
                <span className={`text-xs flex-1 ${ex.done ? 'text-white/40 line-through' : 'text-white/80'}`} style={{ fontFamily: 'var(--font-body)' }}>{ex.exercise}</span>
                <span className="text-[10px] text-white/30" style={{ fontFamily: 'var(--font-body)' }}>{ex.sets}×{ex.reps}</span>
              </div>
            ))}
            <p className="text-[10px] text-white/30 pt-1" style={{ fontFamily: 'var(--font-body)' }}>+{todayWorkout.length - 3} more exercises</p>
          </div>
        </Card>
      </div>

      {/* Schedule strip */}
      <div>
        <Card>
          <SectionTitle icon={<Icon.Target />} title="This Week" />
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {weekDays.map(({ day, label, done, today }) => (
              <div
                key={day}
                className={`flex-shrink-0 flex flex-col items-center gap-1.5 rounded-xl px-3 py-2.5 border ${today ? 'border-blue-500/50 bg-blue-500/10' : done ? 'border-white/10 bg-white/[0.03]' : 'border-white/5 bg-transparent'}`}
              >
                <span className={`text-[9px] font-semibold tracking-wider uppercase ${today ? 'text-blue-400' : done ? 'text-white/50' : 'text-white/20'}`} style={{ fontFamily: 'var(--font-body)' }}>{day}</span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${done ? 'bg-green-500/80 border-green-500' : today ? 'border-blue-400/50' : 'border-white/10'}`}>
                  {done && <Icon.Check />}
                </div>
                <span className={`text-[9px] text-center leading-tight ${today ? 'text-blue-300' : 'text-white/30'}`} style={{ fontFamily: 'var(--font-body)' }}>{label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function WorkoutsTab() {
  const [completedSets, setCompletedSets] = useState<Record<string, boolean>>({});
  const toggleSet = (key: string) => setCompletedSets(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-4">
      <div>
        <Card>
          <div className="flex items-center justify-between mb-1">
            <div>
              <SectionTitle icon={<Icon.Dumbbell />} title="Today's Session" />
              <h2 className="text-xl font-normal text-white -mt-2" style={{ fontFamily: 'var(--font-display)' }}>Lower Body A</h2>
            </div>
            <span className="text-[10px] text-white/40 border border-white/10 rounded-full px-3 py-1.5" style={{ fontFamily: 'var(--font-body)' }}>55 min</span>
          </div>
          <div className="mt-4 space-y-1">
            {todayWorkout.map((ex) => (
              <div key={ex.exercise} className="flex items-center gap-3 py-3 border-t border-white/5">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => toggleSet(ex.exercise)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${completedSets[ex.exercise] ? 'bg-green-500 border-green-500' : 'border-white/20 bg-transparent'}`}
                >
                  {completedSets[ex.exercise] && <Icon.Check />}
                </motion.button>
                <span className={`text-sm flex-1 transition-colors ${completedSets[ex.exercise] ? 'text-white/30 line-through' : 'text-white/90'}`} style={{ fontFamily: 'var(--font-body)' }}>
                  {ex.exercise}
                </span>
                <span className="text-xs text-white/40" style={{ fontFamily: 'var(--font-body)' }}>{ex.sets}×{ex.reps}</span>
                <span className="text-xs text-white/30 w-12 text-right" style={{ fontFamily: 'var(--font-body)' }}>{ex.load}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Upcoming */}
      <div>
        <Card>
          <SectionTitle icon={<Icon.Target />} title="Upcoming Sessions" />
          <div className="space-y-3">
            {upcomingSchedule.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[9px] text-white/40 uppercase" style={{ fontFamily: 'var(--font-body)' }}>{s.day}</span>
                  <span className="text-sm font-semibold text-white leading-none" style={{ fontFamily: 'var(--font-display)' }}>{s.date}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white/80" style={{ fontFamily: 'var(--font-body)' }}>{s.session}</div>
                  <div className="text-[10px] text-white/30" style={{ fontFamily: 'var(--font-body)' }}>{s.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Personal Bests */}
      <div>
        <Card>
          <SectionTitle icon={<Icon.Fire />} title="Personal Bests" />
          <div className="grid grid-cols-2 gap-3">
            {personalBests.map((pb) => (
              <div key={pb.lift} className="rounded-xl bg-white/5 border border-white/8 p-3">
                <div className="text-[9px] uppercase tracking-wider text-white/40 mb-1" style={{ fontFamily: 'var(--font-body)' }}>{pb.lift}</div>
                <div className="text-lg font-normal text-white leading-none" style={{ fontFamily: 'var(--font-display)' }}>{pb.weight}</div>
                <div className="text-[9px] text-white/30 mt-1" style={{ fontFamily: 'var(--font-body)' }}>{pb.date}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function NutritionTab({ user }: { user: NonNullable<ReturnType<typeof useAuth>['user']> }) {
  const [waterCount, setWaterCount] = useState(5);

  return (
    <div className="space-y-4">
      {/* Calorie ring + macros */}
      <div>
        <Card>
          <SectionTitle icon={<Icon.Apple />} title="Today's Nutrition" />
          <div className="flex items-center gap-5 mb-5">
            <RingProgress value={1740} max={user.dailyCalories} color="#f59e0b" label="Calories" sub="kcal" size={88} stroke={6} />
            <div className="flex-1 space-y-3">
              {macros.map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-white/60" style={{ fontFamily: 'var(--font-body)' }}>{m.label}</span>
                    <span className="text-[10px] text-white/30" style={{ fontFamily: 'var(--font-body)' }}>{m.current}g / {m.target}g</span>
                  </div>
                  <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.round((m.current / m.target) * 100)}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: m.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-white/30 pt-3 border-t border-white/10 text-center" style={{ fontFamily: 'var(--font-body)' }}>
            {user.dailyCalories - 1740} kcal remaining · Target: {user.dailyCalories} kcal
          </div>
        </Card>
      </div>

      {/* Meal log */}
      <div>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <SectionTitle icon={<Icon.Apple />} title="Meal Log" />
            <button className="flex items-center gap-1 text-[10px] text-blue-400 border border-blue-500/30 rounded-full px-2.5 py-1 bg-blue-500/10" style={{ fontFamily: 'var(--font-body)' }}>
              <Icon.Plus /> Add
            </button>
          </div>
          <div className="space-y-3">
            {meals.map((meal) => (
              <div key={meal.name} className="flex items-center gap-3 py-2.5 border-t border-white/5 first:border-0 first:pt-0">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <span className="text-xs">🍽</span>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white/80 font-medium" style={{ fontFamily: 'var(--font-body)' }}>{meal.name}</div>
                  <div className="text-[10px] text-white/30 truncate" style={{ fontFamily: 'var(--font-body)' }}>{meal.items}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/60" style={{ fontFamily: 'var(--font-body)' }}>{meal.cal} kcal</div>
                  <div className="text-[9px] text-white/25" style={{ fontFamily: 'var(--font-body)' }}>{meal.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Water tracker */}
      <div>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <SectionTitle icon={<Icon.Water />} title="Hydration" />
            <span className="text-xs text-blue-400" style={{ fontFamily: 'var(--font-body)' }}>{waterCount}/8 glasses</span>
          </div>
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} onClick={() => setWaterCount(waterCount === i + 1 ? i : i + 1)}>
                <WaterGlass filled={i < waterCount} />
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(waterCount / 8) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-blue-500"
            />
          </div>
          <p className="text-[10px] text-white/30 mt-2 text-center" style={{ fontFamily: 'var(--font-body)' }}>
            {waterCount >= 8 ? '🎉 Daily goal reached!' : `${8 - waterCount} more glasses to hit daily goal`}
          </p>
        </Card>
      </div>
    </div>
  );
}

function ProgressTab() {
  const weightData = [83.6, 83.2, 82.8, 82.6, 82.5, 82.4, 82.4];
  const maxW = Math.max(...weightData);
  const minW = Math.min(...weightData);
  const range = maxW - minW || 1;
  const chartH = 60;
  const points = weightData.map((w, i) => `${(i / (weightData.length - 1)) * 100}%,${((maxW - w) / range) * chartH}px`).join(' ');

  return (
    <div className="space-y-4">
      {/* Body stats */}
      <div>
        <Card>
          <SectionTitle icon={<Icon.Chart />} title="Body Stats" />
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Weight', value: '82.4 kg', delta: '−1.2 this week' },
              { label: 'Height', value: '178 cm', delta: 'Constant' },
              { label: 'BMI', value: '26.0', delta: 'Normal range' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/5 p-3 border border-white/8">
                <div className="text-[9px] uppercase tracking-wider text-white/40 mb-1" style={{ fontFamily: 'var(--font-body)' }}>{s.label}</div>
                <div className="text-base font-normal text-white leading-none" style={{ fontFamily: 'var(--font-display)' }}>{s.value}</div>
                <div className="text-[9px] text-green-400 mt-1" style={{ fontFamily: 'var(--font-body)' }}>{s.delta}</div>
              </div>
            ))}
          </div>

          {/* Sparkline */}
          <div className="mt-2">
            <div className="flex justify-between text-[9px] text-white/30 mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
              <span>Weight this week</span><span>kg</span>
            </div>
            <div className="relative" style={{ height: chartH }}>
              <svg className="w-full" style={{ height: chartH }} viewBox={`0 0 100 ${chartH}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="wgrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline
                  fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  points={weightData.map((w, i) => `${(i / (weightData.length - 1)) * 100} ${((maxW - w) / range) * chartH}`).join(' ')}
                />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                  <span key={d} className="text-[8px] text-white/20" style={{ fontFamily: 'var(--font-body)' }}>{d}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Streak & Achievements */}
      <div>
        <Card>
          <SectionTitle icon={<Icon.Fire />} title="Streaks & Achievements" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex flex-col items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <div className="text-3xl font-normal text-white leading-none" style={{ fontFamily: 'var(--font-display)' }}>12</div>
              <div className="text-xs text-white/40 mt-1" style={{ fontFamily: 'var(--font-body)' }}>Day streak — keep it up!</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { emoji: '🏆', label: 'First PR', earned: true },
              { emoji: '💪', label: '7-Day Streak', earned: true },
              { emoji: '🥗', label: 'Diet Week', earned: true },
              { emoji: '🎯', label: '30-Day Club', earned: false },
              { emoji: '⚡', label: 'Speed Run', earned: false },
              { emoji: '🌟', label: 'Perfect Week', earned: false },
            ].map((a) => (
              <div key={a.label} className={`rounded-xl p-2.5 border flex flex-col items-center gap-1 ${a.earned ? 'border-yellow-500/30 bg-yellow-500/8' : 'border-white/5 bg-white/[0.02] opacity-40'}`}>
                <span className="text-lg">{a.emoji}</span>
                <span className="text-[9px] text-center text-white/50 leading-tight" style={{ fontFamily: 'var(--font-body)' }}>{a.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sleep tracker */}
      <div>
        <Card>
          <SectionTitle icon={<Icon.Moon />} title="Sleep Tracker" />
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <span className="text-2xl">🌙</span>
            </div>
            <div>
              <div className="text-2xl font-normal text-white leading-none" style={{ fontFamily: 'var(--font-display)' }}>7h 20m</div>
              <div className="text-xs text-white/40" style={{ fontFamily: 'var(--font-body)' }}>Last night · Good quality</div>
            </div>
          </div>
          <div className="flex gap-1.5">
            {[6.5, 7, 5.8, 8, 7.5, 7.2, 7.3].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-sm overflow-hidden" style={{ height: 40 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(h / 9) * 100}%` }}
                    transition={{ duration: 0.4 }}
                    className="w-full rounded-t-sm mt-auto"
                    style={{ background: h >= 7 ? '#8b5cf6' : h >= 6 ? '#a78bfa' : '#c4b5fd', marginTop: 'auto' }}
                  />
                </div>
                <span className="text-[8px] text-white/25" style={{ fontFamily: 'var(--font-body)' }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ProfileTab({ user, logout }: { user: NonNullable<ReturnType<typeof useAuth>['user']>; logout: () => void }) {
  const router = useRouter();
  const handleLogout = () => { logout(); router.push('/'); };

  return (
    <div className="space-y-4">
      {/* Avatar + name */}
      <div>
        <Card>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center shrink-0">
              <span className="text-3xl font-normal text-white" style={{ fontFamily: 'var(--font-display)' }}>{user.name.charAt(0)}</span>
            </div>
            <div>
              <div className="text-xl font-normal text-white" style={{ fontFamily: 'var(--font-display)' }}>{user.name}</div>
              <div className="text-xs text-white/40 mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>{user.email}</div>
              <div className="inline-flex items-center gap-1 text-[9px] text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5 mt-1.5" style={{ fontFamily: 'var(--font-body)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> {user.plan}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Program', value: user.program },
              { label: 'Goal', value: user.goal },
              { label: 'Weight', value: `${user.weight} kg` },
              { label: 'Height', value: `${user.height} cm` },
              { label: 'Member Since', value: user.joinDate },
              { label: 'Week', value: `${user.week} of 16` },
            ].map((f) => (
              <div key={f.label} className="rounded-xl bg-white/4 border border-white/8 p-3">
                <div className="text-[9px] uppercase tracking-wider text-white/30 mb-1" style={{ fontFamily: 'var(--font-body)' }}>{f.label}</div>
                <div className="text-sm text-white/80" style={{ fontFamily: 'var(--font-body)' }}>{f.value}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick settings */}
      <div>
        <Card>
          <SectionTitle icon={<Icon.Bell />} title="Preferences" />
          <div className="space-y-1">
            {[
              { label: 'Workout Reminders', desc: 'Daily at 7:00 AM', icon: '⏰' },
              { label: 'Water Reminder', desc: 'Every 2 hours', icon: '💧' },
              { label: 'Sleep Tracker', desc: 'Suggest bedtime 10:30 PM', icon: '🌙' },
              { label: 'Progress Photos', desc: 'Weekly on Sunday', icon: '📸' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 py-3 border-t border-white/5 first:border-0 first:pt-0">
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <div className="text-sm text-white/80" style={{ fontFamily: 'var(--font-body)' }}>{item.label}</div>
                  <div className="text-[10px] text-white/30" style={{ fontFamily: 'var(--font-body)' }}>{item.desc}</div>
                </div>
                <div className="w-8 h-4 rounded-full bg-blue-500/80 relative cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-white absolute right-0.5 top-0.5" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Logout */}
      <div>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium cursor-pointer hover:bg-red-500/20 transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <Icon.LogOut />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
type Tab = 'home' | 'workouts' | 'nutrition' | 'progress' | 'profile';

const tabs: { id: Tab; label: string; icon: () => React.ReactElement }[] = [
  { id: 'home', label: 'Home', icon: Icon.Home },
  { id: 'workouts', label: 'Workouts', icon: Icon.Dumbbell },
  { id: 'nutrition', label: 'Nutrition', icon: Icon.Apple },
  { id: 'progress', label: 'Progress', icon: Icon.Chart },
  { id: 'profile', label: 'Profile', icon: Icon.User },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [dashTheme, setDashTheme] = useState<'dark' | 'light'>('dark');
  const toggleTheme = () => setDashTheme(t => t === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  const handleLogout = () => { logout(); router.push('/'); };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home': return <HomeTab user={user} />;
      case 'workouts': return <WorkoutsTab />;
      case 'nutrition': return <NutritionTab user={user} />;
      case 'progress': return <ProgressTab />;
      case 'profile': return <ProfileTab user={user} logout={logout} />;
    }
  };

  const tabTitles: Record<Tab, string> = {
    home: 'Dashboard', workouts: 'Workouts', nutrition: 'Nutrition', progress: 'Progress', profile: 'Profile',
  };

  return (
    <div className="min-h-screen bg-background flex" data-dash-theme={dashTheme}>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r bg-white/[0.02] backdrop-blur-sm dash-sidebar">
        <div className="px-6 pt-7 pb-5 border-b border-white/8">
          <div className="flex items-center justify-between mb-1">
            <a href="/" className="text-xl tracking-tight text-white select-none no-underline" style={{ fontFamily: 'var(--font-display)' }}>
              ASCENDX<sup className="text-[10px]">®</sup>
            </a>
            <button
              onClick={toggleTheme}
              title={dashTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer text-white/50 hover:text-white/80 hover:bg-white/8"
            >
              {dashTheme === 'dark' ? <Icon.Sun /> : <Icon.Moon />}
            </button>
          </div>
          <div className="flex items-center gap-2.5 mt-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-normal text-white" style={{ fontFamily: 'var(--font-display)' }}>{user.name.charAt(0)}</span>
            </div>
            <div>
              <div className="text-sm text-white leading-none" style={{ fontFamily: 'var(--font-body)' }}>{user.name}</div>
              <div className="text-[10px] text-white/40 mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>{user.program}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3">
          {tabs.map(({ id, label, icon: TabIcon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm transition-all cursor-pointer text-left ${activeTab === id
                ? 'bg-white/10 text-white'
                : 'text-white/40 hover:bg-white/5 hover:text-white/70'
                }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <TabIcon />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-3 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <Icon.LogOut />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-5 pt-safe-top pt-4 pb-3 border-b border-white/8 bg-white/[0.02] backdrop-blur-sm sticky top-0 z-30 dash-header">
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-white/40 leading-none mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>ASCENDX®</div>
            <div className="text-base font-normal text-white leading-none" style={{ fontFamily: 'var(--font-display)' }}>{tabTitles[activeTab]}</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              title={dashTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer text-white/50 hover:text-white/80 border border-white/10 bg-white/5"
            >
              {dashTheme === 'dark' ? <Icon.Sun /> : <Icon.Moon />}
            </button>
            <button className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Icon.Bell />
            </button>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center">
              <span className="text-sm font-normal text-white" style={{ fontFamily: 'var(--font-display)' }}>{user.name.charAt(0)}</span>
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-5 border-b border-white/8">
          <h2 className="text-xl font-normal text-white" style={{ fontFamily: 'var(--font-display)' }}>{tabTitles[activeTab]}</h2>
          <div className="text-xs text-white/30" style={{ fontFamily: 'var(--font-body)' }}>
            Week {user.week} of 16 · {user.program}
          </div>
        </header>

        {/* Scrollable Tab Content */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-5 pb-28 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.12 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-background/90 backdrop-blur-xl dash-bottom-nav">
        <div className="flex items-stretch" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
          {tabs.map(({ id, label, icon: TabIcon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors cursor-pointer ${activeTab === id ? 'text-blue-400' : 'text-white/30'}`}
            >
              <motion.div animate={{ scale: activeTab === id ? 1.15 : 1 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                <TabIcon />
              </motion.div>
              <span className="text-[9px] font-medium tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>{label}</span>
              {activeTab === id && (
                <motion.div layoutId="tab-indicator" className="absolute top-0 w-6 h-0.5 bg-blue-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
