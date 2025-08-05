"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adapters } from "@/adapters/adapter";
import { Page } from "@/adapters/types";
import NavBar from "@/components/molecules/navBar";
import BottomBar from "@/components/molecules/bottomBar";
import "./landingPage.css";
import VideoBackground from "@/components/templates/video-background";
import BigSearchBox from "@/components/atoms/bigSearchBox";
import { colors } from "@/components/styles/colors";
import NavCardsRow from "@/components/molecules/navCardsRow";
import { languages } from "./globalConsts";
import { useStore } from "@/adapters/zustand/store";

const { getPages } = adapters.cms();

export default function Home() {
  const params = useParams();
  const router = useRouter();
  const { pages, setPages } = useStore();

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
    if (pages.length > 0) {
      setLoading(false);
      return;
    }

    getPages()
      .then((pages) => {
        setPages(pages); // Zustand
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

  const navCards = pages.map((page) => ({
    title: page.title?.[language] || "No Title",
    description: page.description?.[language] || "No Description",
    image: page.image
      ? `${page.image}?w=100`
      : "/assets/images/placeholder-4-3.png",
    onClick: () => router.push(`/${language}/${page.slug}`),
  }));

  console.log(navCards);

  return (
    <div className="landingBox" style={{ backgroundColor: colors.background }}>
      <div className="navBar">
        <NavBar
          placeholder={"NavBar"}
          language={{
            selectedLanguage: language,
            onChange: (newLang: string) => {
              if (newLang === "en" || newLang === "ru" || newLang === "fi") {
                setLanguage(newLang);
                router.push(`/${newLang}`);
              }
            },
            languages: languages,
          }}
        />
      </div>
      <VideoBackground />
      <div className="contentBox">
        <BigSearchBox title={"Search Placeholder"} />
        <NavCardsRow navCards={navCards} />
      </div>
      <div className="bottomPart">
        <div
          style={{
            backgroundColor: "blue",
            color: "white",
            textAlign: "center",
            justifyContent: "center",
            height: "400px",
          }}
        >
          Sponsors
        </div>
        <div
          style={{
            textAlign: "center",
            height: "300px",
          }}
        >
          Terms
        </div>
        <BottomBar placeholder="BottomBar" />
      </div>
    </div>
  );
}

{
  /* <h1>Главная страница</h1>

      <label htmlFor="language-select">Выберите язык: </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => {
          const newLang = e.target.value as "en" | "ru" | "fi";
          setLanguage(newLang);
          router.push(`/${newLang}`);
        }}
        style={{ marginBottom: 20 }}
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
        <option value="fi">Suomi</option>
      </select>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {pages.map((page) => (
          <li key={page.slug} style={{ margin: "10px 0" }}>
            <button onClick={() => router.push(`/${language}/${page.slug}`)}>
              {page.title[language]}
            </button>
          </li>
        ))}
      </ul> */
}
