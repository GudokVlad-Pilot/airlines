"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adapters } from "@/adapters/adapter";
import { Page } from "@/adapters/types";

const { getPages } = adapters.cms();

export default function Home() {
  const params = useParams();
  const router = useRouter();

  const [pages, setPages] = useState<Page[]>([]);
  const [language, setLanguage] = useState<"en" | "ru" | "fi">("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Update language state based on route param (if valid)
    const locale = params?.locale;
    if (locale === "en" || locale === "ru" || locale === "fi") {
      setLanguage(locale);
    }
  }, [params]);

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
        onChange={(e) => {
          const newLang = e.target.value as "en" | "ru" | "fi";
          setLanguage(newLang);
          router.push(`/${newLang}`); // Optionally update the route to match new language
        }}
        style={{ marginBottom: 20 }}
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
        <option value="fi">Suomi</option>
      </select>

      {/* Render pages in selected language */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {pages.map((page) => (
          <li key={page.slug} style={{ margin: "10px 0" }}>
            <button onClick={() => router.push(`/${language}/${page.slug}`)}>
              {page.title[language]}
            </button>
          </li>
        ))}
      </ul>

      {/* Static navigation buttons */}
      {/* <button onClick={() => router.push(`/${language}/flights`)}>
        Перейти на страницу 1
      </button>
      <br />
      <button onClick={() => router.push(`/${language}/news`)}>
        Перейти на страницу 2
      </button>
      <TestComponent text={"Hello"} /> */}
    </div>
  );
}
