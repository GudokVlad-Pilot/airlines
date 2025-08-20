import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Airport, Dictionary, Page } from "@/adapters/types"; // adjust path if needed

const EXPIRATION_TIME = 1000 * 30; // 30 seconds

type Store = {
  count: number;
  pages: Page[];
  dictionary: Dictionary[];
  airports: Airport[];
  inc: () => void;
  reset: () => void;
  setPages: (pages: Page[]) => void;
  setDictionary: (dictionary: Dictionary[]) => void;
  setAirports: (airports: Airport[]) => void;
  checkExpiration: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      count: 1,
      pages: [],
      dictionary: [],
      airports: [],
      inc: () => set({ count: get().count + 1 }),
      reset: () => set({ count: 1 }),
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
      checkExpiration: () => {
        const now = Date.now();
        const stored = localStorage.getItem("test-store");
        if (!stored) return;

        try {
          const parsed = JSON.parse(stored);
          const storedAt = parsed?.state?.__storedAt;
          if (storedAt && now - storedAt > EXPIRATION_TIME) {
            set({ count: 1 }); // only reset count
            localStorage.setItem(
              "test-store",
              JSON.stringify({
                state: { count: 1, pages: [] },
                version: 0,
              }),
            );
          }
        } catch (e) {
          console.warn("Failed to parse store expiration");
        }
      },
    }),
    {
      name: "test-store",
      version: 0,
      // add __storedAt manually if needed
      partialize: (state) => ({
        count: state.count,
        pages: state.pages,
      }),
    },
  ),
);
