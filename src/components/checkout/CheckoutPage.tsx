'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Check,
  ChevronRight,
  ChevronDown,
  Star,
  Shield,
  RefreshCcw,
  Flame,
  User,
  MapPin,
  CreditCard,
  Loader2,
  BadgeCheck,
  Phone,
  ArrowLeft,
} from 'lucide-react';

// ─── Stripe Setup ────────────────────────────────────────────────────────────
// Replace with your real publishable key from https://dashboard.stripe.com
const stripePromise = loadStripe('pk_test_51MockKeyReplaceWithYourActualStripePublishableKey00000000000000000000000000000000000000000000000');

// ─── Plan Data ───────────────────────────────────────────────────────────────
type PlanKey = 'basic' | 'intermediate' | 'premium';

const PLANS: Record<PlanKey, {
  name: string;
  subtitle: string;
  price: number;
  currency: string;
  billing: string;
  color: string;
  gradient: string;
  benefits: string[];
}> = {
  basic: {
    name: 'Basic Tier',
    subtitle: 'Self-Guided Starter',
    price: 25,
    currency: '$',
    billing: 'per month',
    color: 'sky',
    gradient: 'from-sky-500/20 to-cyan-500/10',
    benefits: [
      'Pre-built workout plans (home/gym split)',
      'Basic diet guidelines (PDF-based)',
      'Monthly progress tracking & check-in',
      'Access to recorded video tutorials',
      'Email support (48–72 hr response)',
    ],
  },
  intermediate: {
    name: 'Intermediate Tier',
    subtitle: 'Guided Transformation',
    price: 49,
    currency: '$',
    billing: 'per month',
    color: 'violet',
    gradient: 'from-violet-500/20 to-purple-500/10',
    benefits: [
      'Customized workout plan (updated monthly)',
      'Personalized diet plan based on your goals',
      'Weekly check-ins via WhatsApp',
      'Form correction via video feedback',
      'Habit tracking (steps, water, sleep)',
      'Chat support (24–48 hr response)',
    ],
  },
  premium: {
    name: 'Premium Tier',
    subtitle: 'Elite Coaching',
    price: 99,
    currency: '$',
    billing: 'per month',
    color: 'amber',
    gradient: 'from-amber-500/20 to-orange-500/10',
    benefits: [
      'Fully customized training + nutrition (weekly updates)',
      'Daily check-ins & direct WhatsApp access',
      'Live 1-on-1 coaching calls (weekly/biweekly)',
      'Real-time diet adjustments',
      'Supplement guidance & injury prevention',
      'Priority response (<12 hrs)',
    ],
  },
};

const VALID_COUPON = 'ASCEND10';
const COUPON_DISCOUNT = 0.1;

// ─── Types ────────────────────────────────────────────────────────────────────
interface PersonalDetails {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  gender: string;
  age: string;
  fitnessGoal: string;
}

interface AddressDetails {
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

interface Errors {
  [key: string]: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const transition = { duration: 0.3, ease: 'easeInOut' as const };

function FieldError({ msg }: { msg?: string }) {
  return msg ? (
    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
      <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
      {msg}
    </p>
  ) : null;
}

function GlassInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required,
  autoFocus,
  children,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoFocus?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div className="flex items-center gap-2">
        {children}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200 focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 ${
            error ? 'border-red-500/60 ring-1 ring-red-500/20' : 'border-white/10'
          }`}
        />
      </div>
      <FieldError msg={error} />
    </div>
  );
}

function GlassSelect({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 appearance-none ${
          error ? 'border-red-500/60 ring-1 ring-red-500/20' : 'border-white/10'
        }`}
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-zinc-900 text-white">
            {o.label}
          </option>
        ))}
      </select>
      <FieldError msg={error} />
    </div>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'What is your refund policy?',
    a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied within the first 30 days, contact us and we\'ll issue a full refund — no questions asked.',
  },
  {
    q: 'When will my trainer contact me?',
    a: 'Your assigned coach will reach out within 24 hours of a successful payment via WhatsApp or email to schedule your onboarding call.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. There are no lock-in contracts. You can cancel your subscription at any time from your dashboard and you will not be charged for the following billing cycle.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect from your next billing cycle.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-white/90 hover:bg-white/5 transition-colors cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{q}</span>
        <ChevronDown
          size={15}
          className={`text-zinc-500 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-[13px] text-zinc-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Step 1: Personal Details ─────────────────────────────────────────────────
function StepPersonal({
  data,
  onChange,
  errors,
}: {
  data: PersonalDetails;
  onChange: (key: keyof PersonalDetails, val: string) => void;
  errors: Errors;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <GlassInput
          id="fullName"
          label="Full Name"
          value={data.fullName}
          onChange={(v) => onChange('fullName', v)}
          placeholder="Alex Johnson"
          error={errors.fullName}
          required
          autoFocus
        />
      </div>
      <GlassInput
        id="email"
        label="Email"
        type="email"
        value={data.email}
        onChange={(v) => onChange('email', v)}
        placeholder="alex@example.com"
        error={errors.email}
        required
      />
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Phone<span className="text-red-400 ml-0.5">*</span>
        </label>
        <div className="flex items-center gap-2">
          <select
            value={data.countryCode}
            onChange={(e) => onChange('countryCode', e.target.value)}
            className="shrink-0 bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-sky-500/60"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            {[
              { code: '+91', flag: '🇮🇳' },
              { code: '+1', flag: '🇺🇸' },
              { code: '+44', flag: '🇬🇧' },
              { code: '+61', flag: '🇦🇺' },
              { code: '+971', flag: '🇦🇪' },
            ].map((c) => (
              <option key={c.code} value={c.code} className="bg-zinc-900">
                {c.flag} {c.code}
              </option>
            ))}
          </select>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="9876543210"
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 ${
              errors.phone ? 'border-red-500/60 ring-1 ring-red-500/20' : 'border-white/10'
            }`}
          />
        </div>
        <FieldError msg={errors.phone} />
      </div>
      <GlassSelect
        id="gender"
        label="Gender (optional)"
        value={data.gender}
        onChange={(v) => onChange('gender', v)}
        options={[
          { value: '', label: 'Prefer not to say' },
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'nonbinary', label: 'Non-binary' },
          { value: 'other', label: 'Other' },
        ]}
        error={errors.gender}
      />
      <GlassInput
        id="age"
        label="Age"
        type="number"
        value={data.age}
        onChange={(v) => onChange('age', v)}
        placeholder="25"
        error={errors.age}
        required
      />
      <div className="sm:col-span-2">
        <GlassSelect
          id="fitnessGoal"
          label="Fitness Goal"
          value={data.fitnessGoal}
          onChange={(v) => onChange('fitnessGoal', v)}
          options={[
            { value: '', label: 'Select your primary goal' },
            { value: 'fat_loss', label: 'Fat Loss' },
            { value: 'muscle_gain', label: 'Muscle Gain' },
            { value: 'general_fitness', label: 'General Fitness' },
            { value: 'strength', label: 'Strength Building' },
            { value: 'endurance', label: 'Endurance & Cardio' },
            { value: 'athletics', label: 'Athletic Performance' },
          ]}
          error={errors.fitnessGoal}
          required
        />
      </div>
    </div>
  );
}

// ─── Step 2: Address Details ──────────────────────────────────────────────────
function StepAddress({
  data,
  onChange,
  errors,
}: {
  data: AddressDetails;
  onChange: (key: keyof AddressDetails, val: string) => void;
  errors: Errors;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <GlassInput
          id="address1"
          label="Address Line 1"
          value={data.address1}
          onChange={(v) => onChange('address1', v)}
          placeholder="123 Main Street, Apt 4B"
          error={errors.address1}
          required
          autoFocus
        />
      </div>
      <div className="sm:col-span-2">
        <GlassInput
          id="address2"
          label="Address Line 2 (optional)"
          value={data.address2}
          onChange={(v) => onChange('address2', v)}
          placeholder="Landmark, building name…"
        />
      </div>
      <GlassInput
        id="city"
        label="City"
        value={data.city}
        onChange={(v) => onChange('city', v)}
        placeholder="Mumbai"
        error={errors.city}
        required
      />
      <GlassInput
        id="state"
        label="State"
        value={data.state}
        onChange={(v) => onChange('state', v)}
        placeholder="Maharashtra"
        error={errors.state}
        required
      />
      <GlassSelect
        id="country"
        label="Country"
        value={data.country}
        onChange={(v) => onChange('country', v)}
        options={[
          { value: 'India', label: '🇮🇳 India' },
          { value: 'USA', label: '🇺🇸 United States' },
          { value: 'UK', label: '🇬🇧 United Kingdom' },
          { value: 'Australia', label: '🇦🇺 Australia' },
          { value: 'UAE', label: '🇦🇪 UAE' },
          { value: 'Canada', label: '🇨🇦 Canada' },
          { value: 'Other', label: '🌍 Other' },
        ]}
        required
      />
      <GlassInput
        id="pincode"
        label="Pincode / ZIP"
        type="text"
        value={data.pincode}
        onChange={(v) => onChange('pincode', v)}
        placeholder="400001"
        error={errors.pincode}
        required
      />
    </div>
  );
}

// ─── Step 3: Payment Form (inner) ─────────────────────────────────────────────
function PaymentForm({
  plan,
  onSuccess,
}: {
  plan: PlanKey;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [nameOnCard, setNameOnCard] = useState('');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [nameError, setNameError] = useState('');

  const planData = PLANS[plan];
  const basePrice = planData.price;
  const discount = appliedCoupon ? Math.round(basePrice * COUPON_DISCOUNT) : 0;
  const finalTotal = basePrice - discount;

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === VALID_COUPON) {
      setAppliedCoupon(true);
      setCouponError('');
    } else {
      setAppliedCoupon(false);
      setCouponError('Invalid coupon code. Try "ASCEND10".');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameOnCard.trim()) {
      setNameError('Please enter the name on your card.');
      return;
    }
    setNameError('');
    setProcessing(true);
    setCardError('');

    try {
      // 1. Get clientSecret from our mock API
      const res = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, coupon: appliedCoupon ? VALID_COUPON : '' }),
      });
      const { clientSecret, mock } = await res.json();

      // 2. Confirm payment (or mock success for demo)
      if (mock) {
        // In demo mode, simulate a 1.5s processing delay then trigger success
        await new Promise((r) => setTimeout(r, 1500));
        onSuccess();
        return;
      }

      if (!stripe || !elements) return;
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: nameOnCard },
        },
      });

      if (error) {
        setCardError(error.message ?? 'Payment failed. Please try again.');
      } else {
        onSuccess();
      }
    } catch {
      setCardError('Something went wrong. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Card Element */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Card Details<span className="text-red-400 ml-0.5">*</span>
        </label>
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 transition-all focus-within:border-sky-500/60 focus-within:ring-1 focus-within:ring-sky-500/30">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '14px',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  '::placeholder': { color: '#52525b' },
                  iconColor: '#71717a',
                },
                invalid: { color: '#f87171', iconColor: '#f87171' },
              },
              hidePostalCode: true,
            }}
          />
        </div>
        {cardError && (
          <p className="mt-1 text-xs text-red-400">{cardError}</p>
        )}
      </div>

      {/* Name on Card */}
      <div className="flex flex-col gap-1">
        <label htmlFor="nameOnCard" className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Name on Card<span className="text-red-400 ml-0.5">*</span>
        </label>
        <input
          id="nameOnCard"
          type="text"
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
          placeholder="As it appears on the card"
          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30 ${
            nameError ? 'border-red-500/60 ring-1 ring-red-500/20' : 'border-white/10'
          }`}
        />
        <FieldError msg={nameError} />
      </div>

      {/* Coupon */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Coupon Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={coupon}
            onChange={(e) => { setCoupon(e.target.value.toUpperCase()); setCouponError(''); setAppliedCoupon(false); }}
            placeholder="e.g. ASCEND10"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/30"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="shrink-0 px-4 py-3 rounded-xl bg-white/8 border border-white/12 text-sm font-medium text-white hover:bg-white/12 transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>
        {couponError && <p className="text-xs text-red-400 mt-1">{couponError}</p>}
        {appliedCoupon && (
          <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
            <BadgeCheck size={12} /> Coupon applied — 10% off!
          </p>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="bg-white/4 border border-white/8 rounded-xl overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between text-sm">
          <span className="text-zinc-400">{planData.name}</span>
          <span className="text-white font-medium">${basePrice.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="px-4 py-3 flex items-center justify-between text-sm border-t border-white/8">
            <span className="text-green-400">Discount (ASCEND10)</span>
            <span className="text-green-400 font-medium">−${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="px-4 py-3 border-t border-white/8 flex items-center justify-between">
          <span className="text-white font-semibold">Total due today</span>
          <span className="text-xl font-bold text-white">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Pay Now */}
      <button
        type="submit"
        disabled={processing || !stripe}
        className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 cursor-pointer"
      >
        {processing ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Lock size={16} />
            Pay ${finalTotal.toFixed(2)} Securely
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-zinc-500">
        🔒 256-bit SSL encryption. Your card details are never stored on our servers.
      </p>
    </form>
  );
}

// ─── Testimonials & Trust Data ────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Priya M.',
    location: 'Mumbai',
    avatar: 'PM',
    rating: 5,
    text: 'Lost 12 kg in 3 months with the Premium plan. The daily check-ins kept me accountable — my coach genuinely cares about your progress.',
  },
  {
    name: 'Rohan S.',
    location: 'Bengaluru',
    avatar: 'RS',
    rating: 5,
    text: 'Went from 65 kg to 78 kg lean muscle in 5 months on the Intermediate plan. The personalized programming made all the difference.',
  },
];

// ─── Left Sidebar ─────────────────────────────────────────────────────────────
function PlanSidebar({ planKey }: { planKey: PlanKey }) {
  const plan = PLANS[planKey];

  const accentClass = {
    basic: 'text-sky-400',
    intermediate: 'text-violet-400',
    premium: 'text-amber-400',
  }[planKey];

  const borderClass = {
    basic: 'border-sky-500/25',
    intermediate: 'border-violet-500/25',
    premium: 'border-amber-500/25',
  }[planKey];

  const badgeClass = {
    basic: 'bg-sky-500/10 text-sky-300',
    intermediate: 'bg-violet-500/10 text-violet-300',
    premium: 'bg-amber-500/10 text-amber-300',
  }[planKey];

  return (
    <div className="flex flex-col gap-5">
      {/* Urgency Badge */}
      <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl w-fit">
        <Flame size={14} className="text-red-400 shrink-0" />
        <span className="text-xs font-semibold text-red-300 uppercase tracking-wider">
          Limited slots available this month
        </span>
      </div>

      {/* Plan Card */}
      <div className={`bg-zinc-900/60 backdrop-blur-md border ${borderClass} rounded-2xl p-6 relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} pointer-events-none`} />
        <div className="relative">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h2 className={`text-xl font-semibold ${accentClass}`} style={{ fontFamily: 'var(--font-display)' }}>
                {plan.name}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">{plan.subtitle}</p>
            </div>
            <div className={`px-2.5 py-1 rounded-lg text-xs font-bold ${badgeClass}`}>
              {planKey === 'premium' ? 'MOST POPULAR' : planKey.toUpperCase()}
            </div>
          </div>

          <div className="my-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white">{plan.currency}{plan.price}</span>
            <span className="text-zinc-400 text-sm">{plan.billing}</span>
          </div>

          <ul className="space-y-2.5">
            {plan.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[13px] text-zinc-300 leading-snug">
                <Check size={14} className="text-green-400 shrink-0 mt-0.5 stroke-[3]" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-zinc-900/40 border border-white/8 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">What happens next?</h3>
        <div className="space-y-4">
          {[
            { icon: <User size={14} />, title: 'Fill your details', desc: 'Personal info and address' },
            { icon: <CreditCard size={14} />, title: 'Make payment', desc: 'Secure, encrypted transaction' },
            { icon: <Phone size={14} />, title: 'Get contacted within 24 hrs', desc: 'Your coach will reach out via WhatsApp' },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-sky-500/15 border border-sky-500/25 flex items-center justify-center shrink-0 text-sky-400">
                {step.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{step.title}</p>
                <p className="text-xs text-zinc-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-zinc-900/40 border border-white/8 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">What our clients say</h3>
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white/4 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-xs font-bold text-sky-300">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{t.name}</p>
                  <p className="text-[10px] text-zinc-500">{t.location}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-[12px] text-zinc-400 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/4 border border-white/8 rounded-xl p-3 flex flex-col items-center gap-1.5 text-center">
          <Shield size={18} className="text-green-400" />
          <p className="text-[11px] font-medium text-zinc-300">Secure Payments</p>
          <p className="text-[10px] text-zinc-500">256-bit SSL</p>
        </div>
        <div className="bg-white/4 border border-white/8 rounded-xl p-3 flex flex-col items-center gap-1.5 text-center">
          <RefreshCcw size={18} className="text-blue-400" />
          <p className="text-[11px] font-medium text-zinc-300">Money-Back</p>
          <p className="text-[10px] text-zinc-500">30-day guarantee</p>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Frequently asked questions</h3>
        <div className="space-y-2">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Progress Indicator ────────────────────────────────────────────────────────
const STEPS = [
  { label: 'Personal Details', icon: User },
  { label: 'Address Details', icon: MapPin },
  { label: 'Payment', icon: CreditCard },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {STEPS.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const Icon = step.icon;
        return (
          <div key={step.label} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  done
                    ? 'bg-green-500 border-green-500'
                    : active
                    ? 'bg-sky-500 border-sky-500'
                    : 'bg-white/5 border-white/15'
                }`}
              >
                {done ? (
                  <Check size={15} className="text-white stroke-[3]" />
                ) : (
                  <Icon size={14} className={active ? 'text-white' : 'text-zinc-500'} />
                )}
              </div>
              <span
                className={`text-[10px] font-medium uppercase tracking-wider ${
                  active ? 'text-sky-400' : done ? 'text-green-400' : 'text-zinc-600'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 mb-5 transition-colors duration-300 ${
                  i < current ? 'bg-green-500/50' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Success State ────────────────────────────────────────────────────────────
function SuccessState({ plan }: { plan: PlanKey }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center text-center py-10 px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-green-500/15 border-2 border-green-500/40 flex items-center justify-center mb-6"
      >
        <Check size={36} className="text-green-400 stroke-[2.5]" />
      </motion.div>
      <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        Payment Successful!
      </h2>
      <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
        Your <span className="text-white font-medium">{PLANS[plan].name}</span> subscription is now active.{' '}
        <span className="text-sky-300">Your coach will contact you within 24 hours</span> to schedule your onboarding call.
      </p>
      <div className="mt-6 p-4 bg-green-500/8 border border-green-500/20 rounded-xl text-[13px] text-green-300 leading-relaxed">
        📬 Check your email for a confirmation receipt. Add our number to your WhatsApp contacts — your coach will reach out soon!
      </div>
      <Link href="/dashboard" className="mt-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition-colors cursor-pointer"
        >
          Go to Dashboard →
        </motion.button>
      </Link>
    </motion.div>
  );
}

// ─── Main Form Wrapper ────────────────────────────────────────────────────────
function MultiStepForm({ planKey }: { planKey: PlanKey }) {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [personalErrors, setPersonalErrors] = useState<Errors>({});
  const [addressErrors, setAddressErrors] = useState<Errors>({});

  const [personal, setPersonal] = useState<PersonalDetails>({
    fullName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    gender: '',
    age: '',
    fitnessGoal: '',
  });

  const [address, setAddress] = useState<AddressDetails>({
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
  });

  const updatePersonal = useCallback((key: keyof PersonalDetails, val: string) => {
    setPersonal((p) => ({ ...p, [key]: val }));
    setPersonalErrors((e) => ({ ...e, [key]: '' }));
  }, []);

  const updateAddress = useCallback((key: keyof AddressDetails, val: string) => {
    setAddress((a) => ({ ...a, [key]: val }));
    setAddressErrors((e) => ({ ...e, [key]: '' }));
  }, []);

  const validatePersonal = (): boolean => {
    const errs: Errors = {};
    if (!personal.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!personal.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Enter a valid email address.';
    if (!personal.phone.trim() || personal.phone.length < 7) errs.phone = 'Enter a valid phone number.';
    if (!personal.age || Number(personal.age) < 13 || Number(personal.age) > 100) errs.age = 'Enter a valid age (13–100).';
    if (!personal.fitnessGoal) errs.fitnessGoal = 'Please select a fitness goal.';
    setPersonalErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateAddress = (): boolean => {
    const errs: Errors = {};
    if (!address.address1.trim()) errs.address1 = 'Address is required.';
    if (!address.city.trim()) errs.city = 'City is required.';
    if (!address.state.trim()) errs.state = 'State is required.';
    if (!address.pincode.trim()) errs.pincode = 'Pincode is required.';
    setAddressErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validatePersonal()) return;
    if (step === 1 && !validateAddress()) return;
    setStep((s) => s + 1);
  };

  if (success) return <SuccessState plan={planKey} />;

  return (
    <div>
      <StepIndicator current={step} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
        >
          {step === 0 && (
            <StepPersonal data={personal} onChange={updatePersonal} errors={personalErrors} />
          )}
          {step === 1 && (
            <StepAddress data={address} onChange={updateAddress} errors={addressErrors} />
          )}
          {step === 2 && (
            <PaymentForm plan={planKey} onSuccess={() => setSuccess(true)} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-7">
        {step > 0 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={15} />
            Back
          </button>
        ) : (
          <div />
        )}
        {step < 2 && (
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition-colors cursor-pointer shadow-lg shadow-sky-500/20"
          >
            Continue
            <ChevronRight size={16} />
          </motion.button>
        )}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function CheckoutPage({ plan = 'basic' }: { plan?: string }) {
  const planKey: PlanKey = (['basic', 'intermediate', 'premium'].includes(plan)
    ? plan
    : 'basic') as PlanKey;

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-zinc-950" style={{ fontFamily: 'var(--font-body)' }}>
        {/* Background grid */}
        <div
          className="fixed inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/8">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl tracking-tight text-white no-underline select-none"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ASCENDX<sup className="text-xs">®</sup>
            </Link>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Lock size={14} className="text-green-400" />
              <span className="font-medium text-zinc-300">Secure Checkout</span>
              <span className="text-zinc-600 hidden sm:inline">· 256-bit SSL</span>
            </div>
          </div>
        </header>

        {/* Urgency Banner */}
        <div className="bg-gradient-to-r from-sky-600/20 via-sky-500/15 to-violet-600/20 border-b border-sky-500/15">
          <p className="text-center text-[12px] py-2.5 text-sky-200 font-medium tracking-wide">
            🚀 Start your transformation today — limited coach slots available. Lock in your spot now.
          </p>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-start"
          >
            {/* LEFT: Plan Summary */}
            <div className="lg:sticky lg:top-[76px]">
              <PlanSidebar planKey={planKey} />
            </div>

            {/* RIGHT: Form */}
            <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/30">
              <div className="mb-7">
                <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  Complete your enrollment
                </h1>
                <p className="text-sm text-zinc-400 mt-1">
                  Fill in your details below to get started with your coaching journey.
                </p>
              </div>
              <MultiStepForm planKey={planKey} />
            </div>
          </motion.div>
        </main>
      </div>
    </Elements>
  );
}
