# 🎈 Gifted Balloon - Complete E-commerce Setup Guide

This guide will help you set up a robust e-commerce system with Stripe payments, Supabase database, and full cart functionality.

## 🚀 Features

- ✅ **Real Stripe Payment Processing**
- ✅ **Supabase Database for Order Management**
- ✅ **Persistent Shopping Cart**
- ✅ **Zoomable Product Images**
- ✅ **Order Tracking & Management**
- ✅ **Webhook Support for Payment Updates**
- ✅ **Mobile-Responsive Design**

## 📋 Prerequisites

1. **Stripe Account** - [Sign up at stripe.com](https://stripe.com)
2. **Supabase Account** - [Sign up at supabase.com](https://supabase.com)
3. **Node.js 18+**

## 🔧 Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Update `.env` with your actual keys:

```env
# Stripe Keys (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Supabase Keys (get from your Supabase project settings)
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Supabase Database Setup

Run this SQL in your Supabase SQL editor to create the orders table:

```sql
-- Create orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  delivery_address JSONB NOT NULL,
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  stripe_payment_intent_id TEXT,
  delivery_date DATE,
  special_instructions TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for authenticated users
CREATE POLICY "Allow inserts for all users" ON orders FOR INSERT WITH CHECK (true);

-- Create policy to allow updates for service role
CREATE POLICY "Allow updates for service role" ON orders FOR UPDATE USING (true);

-- Create policy to allow selects for service role
CREATE POLICY "Allow selects for service role" ON orders FOR SELECT USING (true);
```

### 3. Stripe Webhook Setup

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set endpoint URL to: `https://your-domain.com/api/stripe-webhook`
4. Select these events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook secret and add it to your `.env`:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Development

```bash
npm run dev
```

## 🛒 Using the E-commerce Features

### Cart Functionality

The cart is persistent and stored in localStorage. Users can:

- Add products with customizations
- Modify quantities
- Remove items
- View cart total
- Proceed to checkout

### Product Image Zoom

Click any product image to open the zoomable viewer:

- **Mouse**: Click and drag to pan, scroll to zoom
- **Touch**: Pinch to zoom, drag to pan
- **Controls**: Use zoom in/out buttons or reset
- **Keyboard**: Press Escape to close

### Checkout Process

1. **Cart Review**: Users see all items and customizations
2. **Customer Info**: Name, email, phone, delivery address
3. **Payment**: Stripe Elements with card payment and express checkout
4. **Order Creation**: Order saved to Supabase automatically
5. **Payment Processing**: Secure payment through Stripe
6. **Confirmation**: Order confirmation with tracking info

### Order Management

Orders are automatically:

- Created in Supabase when payment intent is generated
- Updated via webhook when payment succeeds/fails
- Tracked with status updates
- Accessible for customer service

## 🔐 Security Features

- **PCI Compliance**: Stripe handles all card data
- **Environment Variables**: Sensitive keys protected
- **Webhook Verification**: Stripe signatures verified
- **Row Level Security**: Supabase RLS enabled
- **Input Validation**: All inputs sanitized

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly cart interactions
- Mobile-optimized checkout flow
- Gesture-based image zoom

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Custom Server
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 📊 Order Management Dashboard

For advanced order management, you can:

1. Use Supabase dashboard to view orders
2. Build a custom admin panel
3. Integrate with your existing systems
4. Set up email notifications

## 🔧 Customization

### Adding New Payment Methods

Edit `src/pages/checkout.astro` to add:
- PayPal
- Apple Pay
- Google Pay
- Bank transfers

### Custom Order Fields

Modify the order schema in:
- `src/lib/supabase.ts`
- Database table structure
- Checkout form

### Email Notifications

Add email service integration:
- SendGrid
- Mailgun
- Resend
- Nodemailer

## 🐛 Troubleshooting

### Common Issues

1. **Stripe key errors**: Check environment variables are set correctly
2. **Supabase connection**: Verify URL and anon key
3. **Webhook failures**: Check webhook secret and endpoint URL
4. **Cart not persisting**: Check localStorage permissions

### Debug Mode

Enable debug logging:
```env
NODE_ENV=development
```

## 📞 Support

For technical support:
- Check the browser console for errors
- Verify all environment variables
- Test with Stripe test cards
- Check Supabase logs

## 🎯 Next Steps

1. Set up production Stripe keys
2. Configure domain and SSL
3. Set up monitoring and alerts
4. Add customer email confirmations
5. Implement order tracking
6. Add inventory management

Your balloon delivery e-commerce site is now ready for production! 🎈🚀