import { NextRequest, NextResponse } from 'next/server';

const PLAN_PRICES: Record<string, number> = {
  basic: 2500,        // $25.00 in cents
  intermediate: 4900, // $49.00 in cents
  premium: 9900,      // $99.00 in cents
};

export async function POST(req: NextRequest) {
  try {
    const { plan, coupon } = await req.json();
    const baseAmount = PLAN_PRICES[plan?.toLowerCase()] ?? 2500;

    // Mock discount logic
    const discount = coupon?.toUpperCase() === 'ASCEND10' ? Math.round(baseAmount * 0.1) : 0;
    const amount = baseAmount - discount;

    // Return a MOCK client secret — replace with real Stripe SDK call in production:
    // const paymentIntent = await stripe.paymentIntents.create({ amount, currency: 'usd' });
    // return NextResponse.json({ clientSecret: paymentIntent.client_secret });

    const mockClientSecret = `pi_mock_${Date.now()}_secret_mock_${Math.random().toString(36).slice(2)}`;

    return NextResponse.json({
      clientSecret: mockClientSecret,
      amount,
      discount,
      mock: true,
    });
  } catch (err) {
    console.error('PaymentIntent error:', err);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
