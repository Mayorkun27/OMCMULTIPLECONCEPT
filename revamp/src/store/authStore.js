import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import axios from 'axios';
import api from '../api';
import useCartStore from './cartStore'; // Import the cart store

const useAuthStore = create(
  persist(
    (set, get) => ({ // Add get to access state
      token: null,
      user: null,
      isLoggingOut: false, // Flag to prevent repeated logout calls
      login: async (email, password) => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, { email, password });
          const data = response.data;
          if (response.status === 200) {
            set({ token: data.token, user: data.user });
            toast.success('Login successful');
            return true && data.user.role;
          } else {
            toast.error(data.message || 'Login failed');
            return false;
          }
        } catch (error) {
          console.error('An error occurred during login', error);
          toast.error(error?.response?.data?.message || 'An error occurred during login');
          return false;
        }
      },
      logout: async () => {
        if (get().isLoggingOut) {
          return; // Prevent re-entrant calls
        }
        set({ isLoggingOut: true });

        try {
          useCartStore.getState().clearCartLocally();

          const response = await api.call("/logout", "POST")
          if (response.status === 200) {
            // toast.success("Logged out successfully");
            return true;
          } else {
            // toast.error(response.data.message || 'Logout failed');
            return false;
          }
        } catch (error) {
          console.error('An error occurred trying to logout');
          return false;
        } finally {
          // Finally, clear local auth state and reset the flag
          set({ token: null, user: null, isLoggingOut: false });
          // toast.success('Logged out successfully');
        }
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useAuthStore;
