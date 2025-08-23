import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Airport, Dictionary, Page, Route } from "@/adapters/types"; // adjust path if needed

const EXPIRATION_TIME = 1000 * 30; // 30 seconds

type Store = {
  count: number;
  pages: Page[];
  dictionary: Dictionary[];
  airports: Airport[];
  routes: Route[];
  inc: () => void;
  reset: () => void;
  setPages: (pages: Page[]) => void;
  setDictionary: (dictionary: Dictionary[]) => void;
  setAirports: (airports: Airport[]) => void;
  setRoutes: (routes: Route[]) => void;
  checkExpiration: () => void;
  lastUpdated: number;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      count: 1,
      lastUpdated: Date.now(),
      pages: [],
      dictionary: [],
      airports: [],
      routes: [],
      inc: () => set({ count: get().count + 1, lastUpdated: Date.now() }),
      reset: () => set({ count: 1, lastUpdated: Date.now() }),
      setPages: (pages) => {
        console.log("I am fetched pages");
        set({ pages });
      },
      setDictionary: (dictionary) => {
        console.log("I am fetched dictionary");
        set({ dictionary });
      },
      setAirports: (airports) => {
        console.log("I am fetched airports");
        set({ airports });
      },
      setRoutes: (routes) => {
        console.log("I am fetched routes");
        set({ routes });
      },
      checkExpiration: () => {
        const now = Date.now();
        if (now - get().lastUpdated > EXPIRATION_TIME) {
          set({ count: 1, lastUpdated: now });
        }
      },
    }),
    {
      name: "test-store",
      version: 0,
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const now = Date.now();
        if (now - state.lastUpdated > EXPIRATION_TIME) {
          state.count = 1;
          state.lastUpdated = now;
        }
      },
    },
  ),
);
