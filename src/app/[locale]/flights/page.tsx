"use client";

import { useStore } from "@/adapters/zustand/store";

export default function FlightsPage() {
  const { count, inc, reset } = useStore();

  return (
    <div>
      <h1>Flights</h1>
      <p>Welcome to the flights page!</p>
      <span>{count}</span>
      <div>
        <button onClick={inc}>one up</button>
        <button onClick={reset}>reset</button>
      </div>
    </div>
  );
}
