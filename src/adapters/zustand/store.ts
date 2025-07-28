import { create } from "zustand";
import { persist } from "zustand/middleware";

const EXPIRATION_TIME = 1000 * 30; // 30 seconds

type Store = {
  count: number;
  inc: () => void;
  reset: () => void;
  lastUpdated: number;
  checkExpiration: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      count: 1,
      lastUpdated: Date.now(),
      inc: () => set(() => ({ count: get().count + 1, lastUpdated: Date.now() })),
      reset: () => set(() => ({ count: 1, lastUpdated: Date.now() })),
      checkExpiration: () => {
        const now = Date.now();
        if (now - get().lastUpdated > EXPIRATION_TIME) {
          set({ count: 1, lastUpdated: now });
        }
      },
    }),
    {
      name: "test-store",
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const now = Date.now();
        if (now - state.lastUpdated > EXPIRATION_TIME) {
          state.count = 1;
          state.lastUpdated = now;
        }
      },
    }
  )
);
