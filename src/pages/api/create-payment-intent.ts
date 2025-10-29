import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { createServerClient } from '../../lib/supabase';

export const prerender = false;

// Use Stripe secret key - from environment variable
const stripeKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY_LIVE;
const isDevelopment = process.env.NODE_ENV === 'development';

const stripe = new Stripe(stripeKey, {
  apiVersion: '2024-10-28.acacia',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('Create payment intent API called');
    console.log('Environment:', {
      isDevelopment,
      hasStripeKey: !!stripeKey,
      stripeKeyPrefix: stripeKey?.substring(0, 10) + '...'
    });

    const body = await request.json();
    const {
      amount,
      currency = 'gbp',
      order_details
    } = body;

    console.log('Payment intent request:', { amount, currency, order_details });

    // Validate required fields
    if (!amount) {
      return new Response(
        JSON.stringify({ error: 'Missing amount' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Generate a simple order ID for now
    const orderId = 'GB-' + Date.now();

    // Validate Stripe key exists
    if (!stripeKey || stripeKey.includes('Placeholder')) {
      throw new Error('Stripe secret key not configured');
    }

    // Create Stripe payment intent with automatic payment methods
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        order_id: orderId,
        customer_email: order_details?.customer?.email || 'guest@giftedballoon.com'
      },
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always'
      },
    });

    console.log('Payment intent created:', paymentIntent.id);

    return new Response(
      JSON.stringify({
        client_secret: paymentIntent.client_secret,
        order_id: orderId
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Payment intent creation failed:', error);

    return new Response(
      JSON.stringify({
        error: 'Payment intent creation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};