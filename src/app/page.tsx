"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adapters } from "../adapters/adapter"; // adjust path as needed
import { Page } from "../adapters/types"; // adjust path as needed
import TestComponent from "@/components/atoms/testcomponent";

const { getPages } = adapters.cms();

export default function Home() {
  const router = useRouter();

  const [pages, setPages] = useState<Page[]>([]);
  const [language, setLanguage] = useState<"en" | "ru" | "fi">("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPages()
      .then((pages) => {
        setPages(pages);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load pages");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;
  if (error)
    return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Главная страница</h1>

      {/* Language Selector */}
      <label htmlFor="language-select">Выберите язык: </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "ru" | "fi")}
        style={{ marginBottom: 20 }}
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
        <option value="fi">Suomi</option>
      </select>

      {/* Render pages in selected language */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {pages.map((page) => (
          <li key={page.slug.current} style={{ margin: "10px 0" }}>
            <button onClick={() => router.push(`/${page.slug.current}`)}>
              {page.title[language]}
            </button>
          </li>
        ))}
      </ul>

      {/* Static navigation buttons */}
      <button onClick={() => router.push("/flights")}>
        Перейти на страницу 1
      </button>
      <br />
      <button onClick={() => router.push("/news")}>
        Перейти на страницу 2
      </button>
      <TestComponent text={"Hello"} />
    </div>
  );
}
