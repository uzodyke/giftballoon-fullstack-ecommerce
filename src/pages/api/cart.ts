import type { APIRoute } from 'astro';
import { createServerClient } from '../../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const sessionId = request.headers.get('X-Session-ID');

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Session ID required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createServerClient();

    const { data: cartItems, error } = await supabase
      .from('carts')
      .select(`
        *,
        products (
          name,
          price,
          image_url
        )
      `)
      .eq('session_id', sessionId);

    if (error) {
      throw error;
    }

    // Transform data to match frontend expectations
    const items = cartItems?.map(item => ({
      product_id: item.product_id,
      name: item.products?.name || '',
      price: item.products?.price || 0,
      image_url: item.products?.image_url || '',
      quantity: item.quantity,
      customization: item.customization || {}
    })) || [];

    return new Response(
      JSON.stringify({ items }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching cart:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch cart' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const sessionId = request.headers.get('X-Session-ID');
    const body = await request.json();

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Session ID required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { product_id, quantity, customization } = body;

    if (!product_id || !quantity) {
      return new Response(
        JSON.stringify({ error: 'Product ID and quantity required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createServerClient();

    // Check if item already exists in cart
    const { data: existing } = await supabase
      .from('carts')
      .select('*')
      .eq('session_id', sessionId)
      .eq('product_id', product_id)
      .single();

    if (existing) {
      // Update existing item
      const { error } = await supabase
        .from('carts')
        .update({
          quantity: existing.quantity + quantity,
          customization,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      // Insert new item
      const { error } = await supabase
        .from('carts')
        .insert({
          session_id: sessionId,
          product_id,
          quantity,
          customization
        });

      if (error) throw error;
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error adding to cart:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to add to cart' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const sessionId = request.headers.get('X-Session-ID');

    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Session ID required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createServerClient();

    const { error } = await supabase
      .from('carts')
      .delete()
      .eq('session_id', sessionId);

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error clearing cart:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to clear cart' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};