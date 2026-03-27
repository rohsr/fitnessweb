import { Suspense } from 'react';
import CheckoutPage from '@/components/checkout/CheckoutPage';

export const metadata = {
  title: 'Checkout | ASCENDX®',
  description: 'Complete your enrollment and start your transformation journey with ASCENDX.',
};

function CheckoutLoader({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white/50 text-sm">Loading…</div>}>
      <CheckoutContent searchParams={searchParams} />
    </Suspense>
  );
}

async function CheckoutContent({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const params = await searchParams;
  const plan = params?.plan ?? 'basic';
  return <CheckoutPage plan={plan} />;
}

export default function Page({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  return <CheckoutLoader searchParams={searchParams} />;
}
