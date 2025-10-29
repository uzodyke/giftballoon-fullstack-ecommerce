import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { createServerClient } from '../../lib/supabase';

export const prerender = false;

// Use the corresponding secret key for the publishable key pk_live_51SKpFv3aMX7zUeKo8mV5qhPkf5J0BNO2n3clWZHrghRZYfs2DVibiKAObQpPhDckSM2EwjvZBZIY4keWr4z0lMI700lEg3qheC
// Note: This is a placeholder - you need to replace with your actual secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE || 'sk_live_51SKpFv3aMX7zUeKo8YOUR_SECRET_KEY_HERE', {
  apiVersion: '2024-10-28.acacia',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('Create payment intent API called');

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