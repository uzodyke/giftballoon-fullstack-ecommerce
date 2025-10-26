-- Supabase Database Setup for Gifted Balloon E-commerce
-- Run this SQL in your Supabase SQL editor

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
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

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_payment_intent ON orders(stripe_payment_intent_id);

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow inserts for all users" ON orders;
DROP POLICY IF EXISTS "Allow updates for service role" ON orders;
DROP POLICY IF EXISTS "Allow selects for service role" ON orders;

-- Create policies for secure access
CREATE POLICY "Allow inserts for all users" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow updates for service role" ON orders
  FOR UPDATE USING (true);

CREATE POLICY "Allow selects for service role" ON orders
  FOR SELECT USING (true);

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert a test order for verification (optional)
-- INSERT INTO orders (
--   customer_name,
--   customer_email,
--   delivery_address,
--   items,
--   total_amount,
--   special_instructions
-- ) VALUES (
--   'Test Customer',
--   'test@example.com',
--   '{"line1": "123 Test Street", "city": "London", "postal_code": "SW1A 1AA", "country": "GB"}',
--   '[{"product_id": 1, "product_name": "Heart Stuffed Balloon", "price": 30.85, "quantity": 1, "customization": {"text": "Happy Birthday", "color": "Red"}}]',
--   30.85,
--   'Test order for setup verification'
-- );

-- Check if table was created successfully
SELECT 'Orders table created successfully!' as status;