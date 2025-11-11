import useAuthStore from '../store/authStore';
import axios from 'axios';
import { toast } from 'sonner'; // Import toast for user notifications

// Create an axios instance with base URL and default headers
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach the token dynamically
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // If no token, ensure Authorization header is not sent
      delete config.headers.Authorization;
    }

    // Handle FormData: Axios automatically sets 'Content-Type' to 'multipart/form-data'
    // if data is FormData and 'Content-Type' is not explicitly set to 'application/json'.
    // So, if the request data is FormData, we should remove the default 'application/json' header.
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { isLoggingOut, logout } = useAuthStore.getState();
    if (error.response && error.response.status === 401 && !isLoggingOut) {
      // If 401 Unauthorized and not already logging out, log out the user
      logout();
      toast.error('Session expired. Please log in to continue.', {
        duration: 5000, // 5 seconds
        action: {
          label: 'Login',
          onClick: () => {
            window.location.href = '/login'; // Redirect to login page
          },
        },
      });
    }
    return Promise.reject(error);
  }
);

const api = {
  async call(endpoint, method = 'GET', body = null) {
    try {
      let response;
      switch (method.toUpperCase()) {
        case 'GET':
          response = await apiClient.get(endpoint);
          break;
        case 'POST':
          response = await apiClient.post(endpoint, body);
          break;
        case 'PUT':
          response = await apiClient.put(endpoint, body);
          break;
        case 'PATCH':
          response = await apiClient.patch(endpoint, body);
          break;
        case 'DELETE':
          response = await apiClient.delete(endpoint);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
      return response;
    } catch (error) {
      // The interceptor already handled the 401 and re-threw the error.
      // This catch block will handle other errors or re-throw the 401 error
      // for specific component-level handling if needed.
      console.error('API call error:', error);
      throw error.response?.data?.message || error?.message || 'API call failed';
    }
  },
};

export default api;