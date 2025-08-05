"use client";

import { useStore } from "@/adapters/zustand/store";

export default function NewsPage() {
  const { count, inc, reset } = useStore();
  return (
    <div>
      <h1>News</h1>
      <p>Welcome to the news page!</p>
      <span>{count}</span>
      <div>
        <button onClick={inc}>one up</button>
        <button onClick={reset}>reset</button>
      </div>
    </div>
  );
}
