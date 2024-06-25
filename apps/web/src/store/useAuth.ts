import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IAuth {
  user: { name: string; email: string };
  isAuthenticated: boolean;
  token: string;
}

export const useAuth = create<IAuth>()(
  devtools(
    immer(
      persist(
        (set) => ({
          user: { name: '', email: '' },
          isAuthenticated: false,
          token: '',
        }),
        {
          name: 'token',
          partialize: (state) => ({ token: state.token }),
        }
      )
    )
  )
);
