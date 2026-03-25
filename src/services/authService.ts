import { AdminUser } from '../types';

const ADMIN_USERNAME = 'youssef';
const ADMIN_PASSWORD = '112007';
const AUTH_KEY = 'eagle_store_auth';

export const authService = {
  login: async (username: string, password: string): Promise<AdminUser | null> => {
    // Simplified for reliability in this environment
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const user: AdminUser = { username, isLoggedIn: true };
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  getCurrentUser: (): AdminUser | null => {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  },
};
