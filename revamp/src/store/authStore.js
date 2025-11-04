import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import axios from 'axios';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: async (email, password) => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, { email, password });
          const data = response.data;
          if (response.status === 200) {
            set({ token: data.token, user: data.user });
            toast.success('Login successful');
            return true;
          } else {
            toast.error(data.message || 'Login failed');
            return false;
          }
        } catch (error) {
          toast.error('An error occurred during login');
          return false;
        }
      },
      logout: () => {
        set({ token: null, user: null });
        toast.success('Logged out successfully');
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useAuthStore;
