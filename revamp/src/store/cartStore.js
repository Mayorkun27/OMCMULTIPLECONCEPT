import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const productExists = state.cart.find((item) => item.id === product.id);
          if (productExists) {
            toast.success(`${product.name} quantity updated`);
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            toast.success(`${product.name} added to cart`);
            return { cart: [...state.cart, { ...product, quantity: 1 }] };
          }
        }),
      removeFromCart: (productId) =>
        set((state) => {
          const product = state.cart.find((item) => item.id === productId);
          toast.error(`${product.name} removed from cart`);
          return {
            cart: state.cart.filter((item) => item.id !== productId),
          };
        }),
      clearCart: () =>
        set(() => {
          toast.error('Cart cleared');
          return { cart: [] };
        }),
      increaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),
      decreaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
    })
  )
);

export default useCartStore;
