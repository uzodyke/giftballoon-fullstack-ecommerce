import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { createServerClient } from '../../lib/supabase';

export const prerender = false;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      amount,
      currency = 'gbp',
      order_details
    } = body;

    // Validate required fields
    if (!amount || !order_details) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Create customer and order in Supabase
    const supabase = createServerClient();

    // First, create or get customer
    const customerData = {
      email: order_details.customer?.email || '',
      name: order_details.customer?.name || 'Guest',
      phone: order_details.customer?.phone || null
    };

    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .upsert(customerData, { onConflict: 'email' })
      .select()
      .single();

    if (customerError) {
      throw new Error(`Failed to create customer: ${customerError.message}`);
    }

    // Create order
    const orderData = {
      customer_id: customer.id,
      total_amount: amount / 100, // Convert from pence to pounds
      shipping_address: order_details.delivery?.address || {
        line1: '',
        city: '',
        postal_code: '',
        country: 'GB'
      },
      notes: order_details.delivery?.instructions || null
    };

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // Create order items
    const orderItems = order_details.cart?.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.price,
      customization: item.customization || null
    })) || [];

    if (orderItems.length > 0) {
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        throw new Error(`Failed to create order items: ${itemsError.message}`);
      }
    }

    // Create Stripe payment intent with automatic payment methods
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        order_id: order.id,
        customer_email: order_details.customer?.email || 'guest@example.com'
      },
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always'
      },
    });

    // Update order with payment intent ID
    await supabase
      .from('orders')
      .update({ payment_intent_id: paymentIntent.id })
      .eq('id', order.id);

    return new Response(
      JSON.stringify({
        client_secret: paymentIntent.client_secret,
        order_id: order.id
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