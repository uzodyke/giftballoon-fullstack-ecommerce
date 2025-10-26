import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    const orderId = params.id;

    if (!orderId) {
      return new Response(
        JSON.stringify({ error: 'Order ID required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createServerClient();

    // Fetch order with related data
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        customers (
          name,
          email,
          phone
        ),
        order_items (
          *,
          products (
            name,
            image_url
          )
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Transform data for frontend
    const orderData = {
      id: order.id,
      created_at: order.created_at,
      total_amount: order.total_amount,
      payment_status: order.payment_status,
      status: order.status,
      shipping_address: order.shipping_address,
      notes: order.notes,
      customer: order.customers,
      order_items: order.order_items
    };

    return new Response(
      JSON.stringify(orderData),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching order:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};