import useAuthStore from '../store/authStore';
import axios from 'axios';

const api = {
  async call(endpoint, method = 'GET', body = null) {
    const token = useAuthStore.getState().token;

    const axiosConfig = {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      axiosConfig.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      let response;
      switch (method.toUpperCase()) {
        case 'GET':
          response = await axios.get(endpoint, axiosConfig);
          break;
        case 'POST':
          response = await axios.post(endpoint, body, axiosConfig);
          break;
        case 'PUT':
          response = await axios.put(endpoint, body, axiosConfig);
          break;
        case 'DELETE':
          response = await axios.delete(endpoint, axiosConfig);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
      return response.data;
    } catch (error) {
      console.error('API call error:', error);
      throw error.response?.data?.message || 'API call failed';
    }
  },
};

export default api;
