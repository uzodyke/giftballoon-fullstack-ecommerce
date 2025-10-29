import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    // Get all environment variables safely
    const nodeEnv = process.env.NODE_ENV || 'unknown';
    const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
    const stripePublishable = process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
    const vercelEnv = process.env.VERCEL_ENV || 'not set';

    // Get all environment keys safely
    let allEnvKeys = [];
    try {
      allEnvKeys = Object.keys(process.env).filter(key => key.includes('STRIPE'));
    } catch (e) {
      allEnvKeys = ['error-reading-env'];
    }

    const envDebug = {
      NODE_ENV: nodeEnv,
      hasStripeSecret: !!stripeSecret,
      hasStripePublishable: !!stripePublishable,
      stripeSecretPrefix: stripeSecret ? stripeSecret.substring(0, 8) + '...' : 'not found',
      stripePublishablePrefix: stripePublishable ? stripePublishable.substring(0, 8) + '...' : 'not found',
      allEnvKeys: allEnvKeys,
      vercelEnv: vercelEnv,
      timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify(envDebug, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return new Response(JSON.stringify({
      error: 'Debug failed',
      details: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }, null, 2), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};