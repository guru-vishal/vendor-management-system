import api from './api';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const authService = {
  loginWithGoogle: () => {
    localStorage.removeItem('token');
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await api.get('/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

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
      const token = localStorage.getItem('token');
      if (!token) return;

      await api.post('/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('token');
    } catch (error) {
      throw new Error('Logout failed: ' + error.message);
    }
  }
};