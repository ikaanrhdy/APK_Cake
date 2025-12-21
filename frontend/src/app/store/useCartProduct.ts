import { create } from "zustand";
import type { productCart } from "@/types/data";

export type CartItem = productCart & {
  qty: number;
};

export type CheckoutData = {
  items: CartItem[];
  subtotal: number;
};

type CartState = {
  items: CartItem[];
  totalQty: number;
  totalPrice: number;

  addToCart: (product: productCart) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;

  // Checkout
  checkout: (selectedItems: CartItem[]) => void;
  getCheckout: () => CheckoutData | null;
  clearCheckout: () => void;
};

const SESSION_KEY = "checkout-items";

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalQty: 0,
  totalPrice: 0,

  addToCart: (product) => {
    const items = get().items;
    const exist = items.find(
      (i) => i.id === product.id && i.size === product.size
    );

    let newItems: CartItem[];
    if (exist) {
      newItems = items.map((i) =>
        i.id === product.id && i.size === product.size
          ? { ...i, qty: i.qty + 1 }
          : i
      );
    } else {
      newItems = [...items, { ...product, qty: 1 }];
    }

    set({
      items: newItems,
      totalQty: newItems.reduce((a, b) => a + b.qty, 0),
      totalPrice: newItems.reduce((a, b) => a + b.qty * b.price, 0),
    });
  },

  removeFromCart: (id) => {
    const newItems = get().items.filter((i) => i.id !== id);
    set({
      items: newItems,
      totalQty: newItems.reduce((a, b) => a + b.qty, 0),
      totalPrice: newItems.reduce((a, b) => a + b.qty * b.price, 0),
    });
  },

  increaseQty: (id) => {
    const newItems = get().items.map((i) =>
      i.id === id ? { ...i, qty: i.qty + 1 } : i
    );
    set({
      items: newItems,
      totalQty: newItems.reduce((a, b) => a + b.qty, 0),
      totalPrice: newItems.reduce((a, b) => a + b.qty * b.price, 0),
    });
  },

  decreaseQty: (id) => {
    const newItems = get()
      .items.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
      .filter((i) => i.qty > 0);
    set({
      items: newItems,
      totalQty: newItems.reduce((a, b) => a + b.qty, 0),
      totalPrice: newItems.reduce((a, b) => a + b.qty * b.price, 0),
    });
  },

  clearCart: () => set({ items: [], totalQty: 0, totalPrice: 0 }),

  // ================= CHECKOUT =================
  checkout: (selectedItems) => {
    const subtotal = selectedItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const payload: CheckoutData = { items: selectedItems, subtotal };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  },

  getCheckout: () => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  },

  clearCheckout: () => {
    sessionStorage.removeItem(SESSION_KEY);
  },
}));
