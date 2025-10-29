import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const envDebug = {
      NODE_ENV: process.env.NODE_ENV,
      hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
      hasStripePublishable: !!process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY,
      stripeSecretPrefix: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0, 8) + '...' : 'not found',
      stripePublishablePrefix: process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY ? process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY.substring(0, 8) + '...' : 'not found',
      allEnvKeys: Object.keys(process.env).filter(key => key.includes('STRIPE')),
      vercelEnv: process.env.VERCEL_ENV || 'not set'
    };

    return new Response(JSON.stringify(envDebug, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Debug failed', details: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};