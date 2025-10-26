import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { createServerClient } from '../../lib/supabase';

export const prerender = false;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (!sig || !endpointSecret) {
      throw new Error('Missing stripe signature or webhook secret');
    }

    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      status: 400
    });
  }

  // Handle the event
  const supabase = createServerClient();

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Update order status in Supabase
      if (paymentIntent.metadata.order_id) {
        try {
          const { error } = await supabase
            .from('orders')
            .update({
              payment_status: 'paid',
              status: 'processing',
              updated_at: new Date().toISOString()
            })
            .eq('id', paymentIntent.metadata.order_id);

          if (error) {
            console.error('Failed to update order payment status:', error);
          } else {
            console.log('Order payment status updated successfully:', paymentIntent.metadata.order_id);
          }
        } catch (error) {
          console.error('Database error:', error);
        }
      }
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;

      // Update order status to failed
      if (failedPayment.metadata.order_id) {
        try {
          const { error } = await supabase
            .from('orders')
            .update({
              payment_status: 'failed',
              updated_at: new Date().toISOString()
            })
            .eq('id', failedPayment.metadata.order_id);

          if (error) {
            console.error('Failed to update failed order status:', error);
          } else {
            console.log('Order payment failure updated:', failedPayment.metadata.order_id);
          }
        } catch (error) {
          console.error('Database error:', error);
        }
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response('Success', { status: 200 });
};