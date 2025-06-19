// store/useCartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  code: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  productCode?: string;
  warranty?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) => {
        const existing = get().cartItems.find((i) => i.id === item.id);
        if (existing) {
          set({
            cartItems: get().cartItems.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ cartItems: [...get().cartItems, item] });
        }
      },
      removeFromCart: (id) =>
        set({ cartItems: get().cartItems.filter((i) => i.id !== id) }),
      updateQuantity: (id, quantity) =>
        set({
          cartItems: get().cartItems.map((i) =>
            i.id === id
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        }),
      clearCart: () => set({ cartItems: [] }),
    }),
    { name: "cart-store" }
  )
  
);

export default useCartStore;
