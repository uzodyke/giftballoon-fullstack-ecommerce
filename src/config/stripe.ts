export const stripeConfig = {
  // Stripe Publishable Keys (safe to expose in frontend)
  publishableKey: {
    test: process.env.STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_your_test_key_here',
    live: process.env.STRIPE_PUBLISHABLE_KEY_LIVE || 'pk_live_51SKpFv3aMX7zUeKo8mV5qhPkf5J0BNO2n3clWZHrghRZYfs2DVibiKAObQpPhDckSM2EwjvZBZIY4keWr4z0lMI700lEg3qheC'
  },

  // Stripe Secret Keys (NEVER expose in frontend - use in API routes only)
  secretKey: {
    test: process.env.STRIPE_SECRET_KEY_TEST || 'sk_test_your_test_key_here',
    live: process.env.STRIPE_SECRET_KEY_LIVE || 'sk_live_YOUR_LIVE_SECRET_KEY'
  },

  // Current environment - use test for development, live for production
  environment: (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'test' : 'live') as 'test' | 'live',

  // Get current publishable key
  getPublishableKey(): string {
    return this.publishableKey[this.environment];
  },

  // Get current secret key (for server-side only)
  getSecretKey(): string {
    return this.secretKey[this.environment];
  },

  // Payment method configuration
  paymentMethods: [
    'card',
    'apple_pay',
    'google_pay'
  ],

  // Currency and locale settings
  currency: 'gbp',
  locale: 'en-GB',

  // Appearance customization for Stripe Elements
  appearance: {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#ff6b9d',
      colorBackground: '#ffffff',
      colorText: '#374151',
      colorDanger: '#ef4444',
      fontFamily: 'Poppins, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px'
    },
    rules: {
      '.Input': {
        border: '2px solid #e5e7eb',
        padding: '12px',
        fontSize: '16px'
      },
      '.Input:focus': {
        borderColor: '#ff6b9d',
        boxShadow: '0 0 0 2px rgba(255, 107, 157, 0.1)'
      }
    }
  }
};

// Delivery fee calculation
export const calculateDeliveryFee = (subtotal: number): number => {
  return subtotal >= 50 ? 0 : 5.99;
};

// Order total calculation
export const calculateOrderTotal = (subtotal: number): { subtotal: number, deliveryFee: number, total: number } => {
  const deliveryFee = calculateDeliveryFee(subtotal);
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee
  };
};