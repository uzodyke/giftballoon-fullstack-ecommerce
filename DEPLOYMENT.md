# 🚀 Full-Stack E-commerce Deployment Guide

## Quick Start URLs

After setting up the database, use these URLs for the full-stack version:

- **Shop**: `/shop-fullstack`
- **Checkout**: `/checkout-fullstack`
- **Order Confirmation**: `/order-confirmation-fullstack`

## 📋 Prerequisites

1. **Supabase Account** (free tier works)
2. **Vercel Account** (free tier works)
3. **Stripe Account** (test/live keys)

## 🗄️ Database Setup (Supabase)

1. Create a new Supabase project
2. Go to SQL Editor in your Supabase dashboard
3. Copy and paste the entire content of `supabase-schema.sql`
4. Click "Run" to create all tables and sample data

## 🔧 Environment Variables

Create `.env` file with these variables:

```env
# Supabase Configuration
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Application Settings
PUBLIC_SITE_URL=https://yourdomain.vercel.app
```

### Where to find Supabase keys:
- Go to Project Settings → API
- `PUBLIC_SUPABASE_URL`: Project URL
- `PUBLIC_SUPABASE_ANON_KEY`: anon/public key
- `SUPABASE_SERVICE_ROLE_KEY`: service_role key (keep secret!)

### Where to find Stripe keys:
- Go to Stripe Dashboard → Developers → API Keys
- `PUBLIC_STRIPE_PUBLISHABLE_KEY`: Publishable key (starts with pk_)
- `STRIPE_SECRET_KEY`: Secret key (starts with sk_)

## 🚀 Vercel Deployment

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Option 2: GitHub Integration
1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables in Vercel
In your Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add all the variables from your `.env` file
3. Set them for Production, Preview, and Development

## 🔗 Stripe Webhook Setup

1. In Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.vercel.app/api/stripe-webhook`
3. Select these events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

## ✅ Testing the System

### 1. Test Database Connection
Visit `/shop-fullstack` - should show products from Supabase

### 2. Test Cart Functionality
- Add items to cart
- Items should persist in database
- Check Supabase dashboard → Table Editor → carts

### 3. Test Image Zoom
- Click any product image
- Should open full-screen zoom modal

### 4. Test Payment Flow
Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Any future date for expiry
- Any 3-digit CVC

### 5. Verify Order Creation
- Complete test purchase
- Check Supabase tables: customers, orders, order_items
- Order confirmation page should show order details

## 🏗️ Database Schema

The system creates these tables:
- `products` - Product catalog
- `customers` - Customer information
- `orders` - Order records
- `order_items` - Items in each order
- `carts` - Persistent cart storage

## 🔒 Security Features

- ✅ Row Level Security (RLS) enabled
- ✅ Server-side payment processing
- ✅ Webhook signature verification
- ✅ Environment variable protection
- ✅ CORS headers configured

## 🎨 Features Included

### Frontend Features
- ✅ Product catalog from database
- ✅ Image zoom functionality
- ✅ Persistent cart with database sync
- ✅ Responsive design
- ✅ Loading states and error handling

### Backend Features
- ✅ Stripe payment processing
- ✅ Order management system
- ✅ Customer management
- ✅ Webhook payment confirmation
- ✅ Database-driven product catalog

### E-commerce Features
- ✅ Real-time cart synchronization
- ✅ Order tracking
- ✅ Payment status updates
- ✅ Customer data management
- ✅ Product customization support

## 🐛 Troubleshooting

### Database Issues
- Check Supabase RLS policies are enabled
- Verify environment variables are correct
- Check API logs in Vercel dashboard

### Payment Issues
- Verify Stripe keys are correct (test vs live)
- Check webhook endpoint is reachable
- Confirm webhook secret matches

### Cart Issues
- Check browser console for errors
- Verify session ID generation
- Check network tab for API calls

## 📞 Support

Need help? The system includes comprehensive error logging and fallbacks to localStorage for offline capability.

All API endpoints include proper error handling and return meaningful error messages for debugging.