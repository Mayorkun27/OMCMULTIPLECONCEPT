import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import api from '../api';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addingProductId: null,
      updatingProductId: null,
      fetchCart: async () => {
        try {
          const response = await api.call('/cart');
          set({ cart: response.data.data.data });
        } catch (error) {
          console.error('Failed to fetch cart:', error);
          toast.error(error?.response.data.message || error?.message || 'Failed to fetch cart');
        }
      },
      addToCart: async (product) => {
        const { cart } = get();
        const productExists = cart.find((item) => item.product_id === product.id);
        set({ addingProductId: product.id });
        try {
          if (productExists) {
            const updatedProduct = { ...productExists, quantity: productExists.quantity + 1 };
            await api.call(`/cart/${productExists.id}`, 'PUT', { quantity: updatedProduct.quantity });
            set({ cart: cart.map((item) => (item.id === productExists.id ? updatedProduct : item)) });
            toast.success(`${product.name} quantity updated`);
          } else {
            const response = await api.call('/cart', 'POST', { product_id: product.id, quantity: 1 });
            set({ cart: [...cart, response.data.data] }); // Add the new cart item from response
            toast.success(`${product.name} added to cart`);
          }
        } catch (error) {
          console.error(`Failed to add ${product.name} to cart:`, error);
          toast.error(`Failed to add ${product.name} to cart`);
        } finally {
          set({ addingProductId: null });
        }
      },
      removeFromCart: async (productId) => {
        const { cart } = get();
        const product = cart.find((item) => item.id === productId);
        try {
          await api.call(`/cart/${productId}`, 'DELETE');
          set({ cart: cart.filter((item) => item.id !== productId) });
          toast.error(`${product.product.name} removed from cart`);
        } catch (error) {
          console.error(`Failed to remove ${product.product.name} from cart:`, error);
          toast.error(`Failed to remove ${product.product.name} from cart`);
        }
      },
      clearCart: async () => {
        try {
          await api.call('/cart', 'DELETE');
          set({ cart: [] });
          toast.error('Cart cleared');
        } catch (error) {
          console.error('Failed to clear cart:', error);
          toast.error('Failed to clear cart');
        }
      },
      increaseQuantity: async (productId) => {
        set({ updatingProductId: productId });
        const { cart } = get();
        const product = cart.find((item) => item.id === productId);
        if (!product) {
            set({ updatingProductId: null });
            return;
        }

        const updatedProduct = { ...product, quantity: product.quantity + 1 };

        try {
          await api.call(`/cart/${productId}`, 'PUT', { quantity: updatedProduct.quantity });
          set({ cart: cart.map((item) => (item.id === productId ? updatedProduct : item)) });
        } catch (error) {
          console.error(`Failed to increase quantity of ${product.product.name}:`, error);
          toast.error(`Failed to increase quantity of ${product.product.name}`);
        } finally {
            set({ updatingProductId: null });
        }
      },
      decreaseQuantity: async (productId) => {
        set({ updatingProductId: productId });
        const { cart } = get();
        const product = cart.find((item) => item.id === productId);
        if (!product) {
            set({ updatingProductId: null });
            return;
        }

        const updatedProduct = { ...product, quantity: product.quantity - 1 };

        try {
          if (updatedProduct.quantity > 0) {
            await api.call(`/cart/${productId}`, 'PUT', { quantity: updatedProduct.quantity });
            set({ cart: cart.map((item) => (item.id === productId ? updatedProduct : item)) });
          }
          else {
            await api.call(`/cart/${productId}`, 'DELETE');
            set({ cart: cart.filter((item) => item.id !== productId) });
          }
        } catch (error) {
          console.error(`Failed to decrease quantity of ${product.product.name}:`, error);
          toast.error(`Failed to decrease quantity of ${product.product.name}`);
        } finally {
            set({ updatingProductId: null });
        }
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
