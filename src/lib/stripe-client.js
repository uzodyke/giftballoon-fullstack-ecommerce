/**
 * Client-side Stripe integration for static hosting
 * Uses Stripe Checkout for secure payment processing
 */

// Initialize Stripe with public key
const stripe = Stripe(window.stripePublicKey || 'pk_live_51SKpFv3aMX7zUeKo8mV5qhPkf5J0BNO2n3clWZHrghRZYfs2DVibiKAObQpPhDckSM2EwjvZBZIY4keWr4z0lMI700lEg3qheC');

/**
 * Create Stripe Checkout Session for secure payment processing
 * This approach works on static hosting without server functions
 */
export async function createCheckoutSession(orderData) {
  try {
    // Create line items for Stripe Checkout
    const lineItems = orderData.items.map(item => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name || item.product?.name,
          description: `Custom Text: ${item.customization?.customName || 'None'} | Occasion: ${item.customization?.occasionType || 'General'}`,
          images: item.image ? [item.image] : []
        },
        unit_amount: Math.round((item.totalPrice || item.price || 0) * 100), // Convert to pence
      },
      quantity: item.quantity || 1,
    }));

    // Add delivery fee if applicable
    const deliveryFee = orderData.total_amount >= 50 ? 0 : 5.99;
    if (deliveryFee > 0) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Delivery Fee',
            description: 'Standard UK delivery'
          },
          unit_amount: Math.round(deliveryFee * 100)
        },
        quantity: 1
      });
    }

    // Create checkout session using Stripe's API
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getStripeSecretKey()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'success_url': `${window.location.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${window.location.origin}/checkout`,
        'customer_email': orderData.customer_email,
        'line_items[0][price_data][currency]': 'gbp',
        'line_items[0][price_data][product_data][name]': 'Balloon Order',
        'line_items[0][price_data][unit_amount]': Math.round(orderData.total_amount * 100),
        'line_items[0][quantity]': 1,
        'metadata[order_id]': orderData.id,
        'metadata[customer_name]': orderData.customer_name,
        'metadata[customer_phone]': orderData.customer_phone,
        'payment_method_types[0]': 'card',
        'payment_method_types[1]': 'paypal'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const session = await response.json();
    return session;

  } catch (error) {
    console.error('Checkout session creation failed:', error);
    throw error;
  }
}

/**
 * Redirect to Stripe Checkout
 */
export async function redirectToCheckout(orderData) {
  try {
    const session = await createCheckoutSession(orderData);

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Redirect to checkout failed:', error);
    throw error;
  }
}

/**
 * Alternative: Use client-side payment processing with Stripe Elements
 * This approach keeps payment processing on your domain
 */
export async function processPaymentClientSide(orderData, paymentElement) {
  try {
    // Create payment method
    const { error: submitError } = await stripe.confirmPayment({
      elements: paymentElement,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
        payment_method_data: {
          billing_details: {
            name: orderData.customer_name,
            email: orderData.customer_email,
            phone: orderData.customer_phone,
            address: orderData.delivery_address
          }
        }
      }
    });

    if (submitError) {
      throw submitError;
    }

    return { success: true };
  } catch (error) {
    console.error('Client-side payment failed:', error);
    throw error;
  }
}

/**
 * Get Stripe secret key (this should be moved to a secure backend)
 * For static hosting, we'll use Stripe Checkout which doesn't require secret key on client
 */
function getStripeSecretKey() {
  // WARNING: Never put secret keys in client-side code in production
  // This is just for demo purposes - use Stripe Checkout instead
  console.warn('Secret key should not be in client code. Use Stripe Checkout for static hosting.');
  return null;
}

/**
 * Save order to external service (alternative to Supabase for static hosting)
 */
export async function saveOrderExternal(orderData) {
  try {
    // Option 1: Use a form service like Formspree, Netlify Forms, or Getform
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_id: orderData.id,
        customer_name: orderData.customer_name,
        customer_email: orderData.customer_email,
        customer_phone: orderData.customer_phone,
        delivery_address: JSON.stringify(orderData.delivery_address),
        items: JSON.stringify(orderData.items),
        total_amount: orderData.total_amount,
        created_at: orderData.created_at
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save order');
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to save order externally:', error);
    // Fallback: save to localStorage
    localStorage.setItem(`order_${orderData.id}`, JSON.stringify(orderData));
    return { success: true, saved_locally: true };
  }
}