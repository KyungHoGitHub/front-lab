// src/store/useUserStore.ts
import { create } from 'zustand';
import { persist } from "zustand/middleware";

interface User {
    userId: string;
    username: string;
    role: string;
}

interface UserStore {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    fetchUser: (userIdx: string) => Promise<void>;
}


export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            isLoading: false,
            error: null,

            setUser: (user) => set({ user }),

            clearUser: () => set({ user: null }),

            fetchUser: async (userIdx: string) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await fetch(`/api/user/${userIdx}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch user');
                    }

                    const data = await response.json();
                    if (data.success) {
                        set({ user: data.data, isLoading: false });
                    } else {
                        throw new Error(data.message || 'Failed to fetch user');
                    }
                } catch (error: any) {
                    set({ error: error.message, isLoading: false });
                }
            },
        }),
        {
            name: 'user-storage', // localStorage key
            partialize: (state) => ({ user: state.user }), // persist할 항목 선택
        }
    )
);