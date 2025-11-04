import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import api from '../api';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      fetchCart: async () => {
        try {
          const cart = await api.call('/cart');
          set({ cart });
        } catch (error) {
          toast.error('Failed to fetch cart');
        }
      },
      addToCart: async (product) => {
        const { cart } = get();
        const productExists = cart.find((item) => item.id === product.id);

        try {
          if (productExists) {
            const updatedProduct = { ...productExists, quantity: productExists.quantity + 1 };
            await api.call(`/cart/${product.id}`, 'PUT', { quantity: updatedProduct.quantity });
            set({ cart: cart.map((item) => (item.id === product.id ? updatedProduct : item)) });
            toast.success(`${product.name} quantity updated`);
          } else {
            await api.call('/cart', 'POST', { product_id: product.id, quantity: 1 });
            set({ cart: [...cart, { ...product, quantity: 1 }] });
            toast.success(`${product.name} added to cart`);
          }
        } catch (error) {
          toast.error(`Failed to add ${product.name} to cart`);
        }
      },
      removeFromCart: async (productId) => {
        const { cart } = get();
        const product = cart.find((item) => item.id === productId);
        try {
          await api.call(`/cart/${productId}`, 'DELETE');
          set({ cart: cart.filter((item) => item.id !== productId) });
          toast.error(`${product.name} removed from cart`);
        } catch (error) {
          toast.error(`Failed to remove ${product.name} from cart`);
        }
      },
      clearCart: async () => {
        try {
          await api.call('/cart', 'DELETE');
          set({ cart: [] });
          toast.error('Cart cleared');
        } catch (error) {
          toast.error('Failed to clear cart');
        }
      },
      increaseQuantity: async (productId) => {
        const { cart } = get();
        const product = cart.find((item) => item.id === productId);
        if (!product) return;

        const updatedProduct = { ...product, quantity: product.quantity + 1 };

        try {
          await api.call(`/cart/${productId}`, 'PUT', { quantity: updatedProduct.quantity });
          set({ cart: cart.map((item) => (item.id === productId ? updatedProduct : item)) });
        } catch (error) {
          toast.error(`Failed to increase quantity of ${product.name}`);
        }
      },
      decreaseQuantity: async (productId) => {
        const { cart } = get();
        const product = cart.find((item) => item.id === productId);
        if (!product) return;

        const updatedProduct = { ...product, quantity: product.quantity - 1 };

        try {
          if (updatedProduct.quantity > 0) {
            await api.call(`/cart/${productId}`, 'PUT', { quantity: updatedProduct.quantity });
            set({ cart: cart.map((item) => (item.id === productId ? updatedProduct : item)) });
          } else {
            await api.call(`/cart/${productId}`, 'DELETE');
            set({ cart: cart.filter((item) => item.id !== productId) });
          }
        } catch (error) {
          toast.error(`Failed to decrease quantity of ${product.name}`);
        }
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
