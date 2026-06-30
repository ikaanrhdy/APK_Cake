import type { AdminRole } from "@/data/adminData";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  name: string | null;
  role: AdminRole | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthStore extends AuthState {
  login: (data: { userId: string; name: string; role: AdminRole }) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userId: null,
      name: null,
      role: null,
      isLoading: false,
      error: null,

      login: ({ userId, name, role }) =>
        set({
          isAuthenticated: true,
          userId,
          name,
          role,
          error: null,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          userId: null,
          name: null,
          role: null,
        }),

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: "admin-auth", // key di localStorage
    },
  ),
);

export default useAuthStore;
