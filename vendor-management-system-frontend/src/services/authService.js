import api from './api';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const authService = {
  loginWithGoogle: () => {
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/user', {withCredentials: true});
      return response.data.user;
    } catch (error) {
        // throw new Error('Failed to get current user: ' + error.message);
        console.error('AuthService: Failed to get current user:', error);
        console.warn('AuthService: No user logged in');
        return null;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      throw new Error('Logout failed: ' + error.message);
    }
  }
};