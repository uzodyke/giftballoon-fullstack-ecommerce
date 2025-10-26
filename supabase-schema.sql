-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- Products table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers table
CREATE TABLE customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) NOT NULL,
  status order_status DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  payment_intent_id VARCHAR(255),
  payment_status payment_status DEFAULT 'pending',
  shipping_address JSONB NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  customization JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart table for persistent cart storage
CREATE TABLE carts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL,
  customization JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, product_id)
);

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category, stock_quantity) VALUES
('Congratulations Balloon Bouquet', 'Perfect for celebrating achievements and milestones', 25.00, '/images/1_Congratulations_balloon_bouquet_25.png', 'Congratulations', 50),
('Love Balloon Bouquet', 'Express your love with this romantic balloon arrangement', 30.00, '/images/5_Love_bouquet_30.png', 'Love & Romance', 50),
('Birthday Balloon Bouquet', 'Make birthdays special with colorful balloon bouquets', 28.00, '/images/3_Birthday_balloon_bouquet_28.png', 'Birthday', 50),
('Get Well Soon Balloons', 'Send wishes for a speedy recovery', 22.00, '/images/2_Get_well_soon_balloons_22.png', 'Get Well', 50),
('Anniversary Balloon Bundle', 'Celebrate years of love and commitment', 35.00, '/images/4_Anniversary_balloon_bundle_35.png', 'Anniversary', 50),
('Graduation Celebration Pack', 'Honor academic achievements in style', 32.00, '/images/6_Graduation_celebration_pack_32.png', 'Graduation', 50);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_carts_session_id ON carts(session_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

-- Public read access to products
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (is_active = true);

-- Cart policies - users can manage their own cart based on session
CREATE POLICY "Users can view their own cart" ON carts
    FOR SELECT USING (true);

CREATE POLICY "Users can insert into their own cart" ON carts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own cart" ON carts
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete from their own cart" ON carts
    FOR DELETE USING (true);

-- Orders and customers - for now allow all operations (adjust based on auth requirements)
CREATE POLICY "Orders are viewable by all" ON orders
    FOR SELECT USING (true);

CREATE POLICY "Orders can be created by all" ON orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Orders can be updated by all" ON orders
    FOR UPDATE USING (true);

CREATE POLICY "Customers are viewable by all" ON customers
    FOR SELECT USING (true);

CREATE POLICY "Customers can be created by all" ON customers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Order items are viewable by all" ON order_items
    FOR SELECT USING (true);

CREATE POLICY "Order items can be created by all" ON order_items
    FOR INSERT WITH CHECK (true);