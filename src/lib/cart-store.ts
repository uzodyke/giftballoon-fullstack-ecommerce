// Global cart state management
interface CartItem {
  id: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  customization: {
    text?: string;
    color?: string;
    occasion?: string;
    deliveryDate?: string;
    specialInstructions?: string;
  };
  image: string;
}

class CartStore {
  private items: CartItem[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('giftballoon_cart');
      if (stored) {
        try {
          this.items = JSON.parse(stored);
        } catch (e) {
          console.warn('Failed to parse stored cart data');
        }
      }
    }
  }

  private notify() {
    this.listeners.forEach(listener => listener());
    this.saveToStorage();
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('giftballoon_cart', JSON.stringify(this.items));
    }
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  addItem(item: Omit<CartItem, 'id'>) {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    this.items.push({ ...item, id });
    this.notify();
  }

  removeItem(id: string) {
    this.items = this.items.filter(item => item.id !== id);
    this.notify();
  }

  updateQuantity(id: string, quantity: number) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(id);
      } else {
        item.quantity = quantity;
        this.notify();
      }
    }
  }

  clear() {
    this.items = [];
    this.notify();
  }

  getItems() {
    return [...this.items];
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}

// Global cart instance
export const cartStore = new CartStore();

// Helper functions for easy access
export function addToCart(productId: number, name: string, price: number, image: string, customization: CartItem['customization'], quantity: number = 1) {
  cartStore.addItem({
    productId,
    name,
    price,
    quantity,
    customization,
    image
  });
}

export function removeFromCart(id: string) {
  cartStore.removeItem(id);
}

export function updateCartQuantity(id: string, quantity: number) {
  cartStore.updateQuantity(id, quantity);
}

export function clearCart() {
  cartStore.clear();
}

export function getCartItems() {
  return cartStore.getItems();
}

export function getCartTotal() {
  return cartStore.getTotalPrice();
}

export function getCartItemCount() {
  return cartStore.getTotalItems();
}