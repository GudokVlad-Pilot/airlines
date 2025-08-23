"use client";

import LoaderWithText from "@/components/molecules/loaderWithText";
import NavBar from "@/components/molecules/navBar";
import SideBar from "@/components/molecules/sideBar";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { languages, loaderTextByLanguage } from "../globalConsts";
import { useEffect, useState } from "react";
import { useStore } from "@/adapters/zustand/store";
import { adapters } from "@/adapters/adapter";
import "./flights.css";

const { getPages, getDictionary } = adapters.cms();

export default function FlightsPage() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";

  const params = useParams();
  const router = useRouter();
  const { pages, dictionary, setPages, setDictionary } = useStore();

  const [language, setLanguage] = useState<"en" | "ru" | "fi">("en"); //verify with params
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarMounted, setIsSidebarMounted] = useState(false);

  const openSidebar = () => {
    setIsSidebarMounted(true);
    requestAnimationFrame(() => setIsSidebarVisible(true)); // trigger animation
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
    setTimeout(() => setIsSidebarMounted(false), 300); // matches CSS duration
  };

  const getPhrase = (title: string, lang: "en" | "ru" | "fi") => {
    const item = dictionary.find((d) => d.title === title);
    return item ? item.phrase[lang] : "";
  };

  useEffect(() => {
    // Update language state based on route param (if valid)
    const locale = params?.locale;
    if (locale === "en" || locale === "ru" || locale === "fi") {
      setLanguage(locale);
    }
  }, [params]);

  useEffect(() => {
    console.log(loaderTextByLanguage[language]);
    if (pages.length > 0 && dictionary.length > 0) {
      setLoading(false);
      return;
    }

    Promise.all([getPages(), getDictionary()])
      .then(([pages, dictionary]) => {
        setPages(pages);
        setDictionary(dictionary);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load content");
        setLoading(false);
        console.error(err);
      });
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
    getDictionary()
      .then((dictionary) => {
        setDictionary(dictionary); // Zustand
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load dictionary");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <LoaderWithText text={loaderTextByLanguage[language]} />;
  if (error)
    return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div className={`navBar ${isSidebarVisible ? "narrowed" : ""}`}>
        <NavBar
          language={{
            selectedLanguage: language,
            onChange: (newLang: string) => {
              if (newLang === "en" || newLang === "ru" || newLang === "fi") {
                setLanguage(newLang);
                router.push(`/${newLang}/flights?${searchParams}`);
              }
            },
            languages: languages,
          }}
          onLogoClick={() => router.push(`/${language}`)}
          onProfileClick={() => alert("Profile is not ready")}
          onMenuClick={() => {
            if (isSidebarMounted) {
              closeSidebar();
            } else {
              openSidebar();
            }
          }}
        />
      </div>
      {isSidebarMounted && (
        <div className="sideBarOverlay" onClick={closeSidebar}>
          <div
            className={`sideBar ${isSidebarVisible ? "visible" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <SideBar
              pages={pages.map((p) => ({
                title: p.title?.[language] || "No Title",
                onClick: () => router.push(`/${language}/${p.slug}`),
              }))}
            />
          </div>
        </div>
      )}
      <div className="flightsContent">
        <h1>Flights</h1>
        <p>From: {from}</p>
        <p>To: {to}</p>
        <p>Start date: {start}</p>
        {end && <p>End date: {end}</p>}
      </div>
    </div>
  );
}
