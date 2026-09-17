import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/axios';
import User from '@/types/User';

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   role: 'pre' | 'ons' | 'admin';
// };

type AuthStore = {
  user: User | null;
  token: string | null;
  connection: boolean;
  updateConnection: (value: boolean) => void;
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;

  hasRole: (role: string) => boolean;
  can: (permission: string) => boolean;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      connection: true,
      login: (user, token) => set({ user, token }),
      logout: async () => {
        try {
          const res = await api.post('/logout');
          console.log(res);
          set({ user: null, token: null });
          localStorage.removeItem('auth-storage');
          window.location.href = `/`;
        } catch (e) {
          console.error('Logout failed', e);
        }
      },
      fetchUser: async () => {
        try {
          const res = await api.get('/me');
          console.log(res);
          if(res.data.status === "inactive"){
            localStorage.removeItem('auth-storage');
            set({ user: null, token: null });
          } else {
            set({ user: res.data });
          }
        } catch (e: any) {
          console.error('Failed to fetch user:', e);
          if(e?.status === 401 || e?.status === 403){
            set({ user: null, token: null });
            localStorage.removeItem('auth-storage');
          }
        }
      },
      updateConnection: (value: boolean) => {
        set({ connection: value });
      },
      hasRole: (role) => {
          return get().user?.roles?.name === role;
      },

      can: (permission) => {
          return get().user?.permissions?.includes(permission) ?? false;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, connection: state.connection }),
    }
  )
);
