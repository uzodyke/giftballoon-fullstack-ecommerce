import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { stripeConfig } from '../../config/stripe';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { amount, currency = 'gbp', order_details } = body;

    // Initialize Stripe with secret key
    const stripe = new Stripe(stripeConfig.getSecretKey(), {
      apiVersion: '2024-06-20',
    });

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in pence
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        order_id: `GB-${Date.now()}`,
        customer_email: order_details?.customer?.email || '',
        order_items: JSON.stringify(order_details?.cart || []),
      },
    });

    return new Response(JSON.stringify({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Payment intent creation failed:', error);

    return new Response(JSON.stringify({
      error: 'Payment processing unavailable',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};