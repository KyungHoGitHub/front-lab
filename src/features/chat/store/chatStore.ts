import {create} from "zustand";

export const useChatStore = create((set) => ({
    testSelectedUser: null,
    setTestSelectedUser: (user) => set({ testSelectedUser: user }),
}));
