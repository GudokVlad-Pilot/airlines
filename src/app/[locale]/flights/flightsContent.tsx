"use client";

import LoaderWithText from "@/components/molecules/loaderWithText";
import NavBar from "@/components/molecules/navBar";
import SideBar from "@/components/molecules/sideBar";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  languages,
  loaderTextByLanguage,
  mockBottomBar,
} from "../globalConsts";
import { useEffect, useState } from "react";
import { useStore } from "@/adapters/zustand/store";
import { adapters } from "@/adapters/adapter";
import { Route } from "@/adapters/types"; // 👈 the type we created earlier
import "./flights.css";
import BottomBar from "@/components/molecules/bottomBar";

const { getPages, getDictionary, getRoutes } = adapters.cms();

export default function FlightsContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";

  const params = useParams();
  const router = useRouter();
  const { pages, dictionary, routes, setPages, setDictionary, setRoutes } =
    useStore();

  const [language, setLanguage] = useState<"en" | "ru" | "fi">("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarMounted, setIsSidebarMounted] = useState(false);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);

  const openSidebar = () => {
    setIsSidebarMounted(true);
    requestAnimationFrame(() => setIsSidebarVisible(true));
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
    setTimeout(() => setIsSidebarMounted(false), 300);
  };

  const getPhrase = (title: string, lang: "en" | "ru" | "fi") => {
    const item = dictionary.find((d) => d.title === title);
    return item ? item.phrase[lang] : "";
  };

  useEffect(() => {
    const locale = params?.locale;
    if (locale === "en" || locale === "ru" || locale === "fi") {
      setLanguage(locale);
    }
  }, [params]);

  useEffect(() => {
    Promise.all([getPages(), getDictionary(), getRoutes()])
      .then(([pages, dictionary, routes]) => {
        setPages(pages);
        setDictionary(dictionary);
        setRoutes(routes);

        // ✅ filter routes by params
        let results = routes as Route[];

        if (from) {
          results = results.filter(
            (r) => r.origin.iata.toLowerCase() === from.toLowerCase()
          );
        }
        if (to) {
          results = results.filter(
            (r) => r.destination.iata.toLowerCase() === to.toLowerCase()
          );
        }
        if (start) {
          const startDate = new Date(start);
          results = results.filter(
            (r) =>
              new Date(r.departureTime).toDateString() ===
              startDate.toDateString()
          );
        }
        if (end) {
          const endDate = new Date(end);
          results = results.filter(
            (r) =>
              new Date(r.arrivalTime).toDateString() === endDate.toDateString()
          );
        }

        setFilteredRoutes(results);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load content");
        setLoading(false);
        console.error(err);
      });
  }, [from, to, start, end]);

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

        <h2>Available routes:</h2>
        {filteredRoutes.length === 0 && <p>No flights found</p>}
        {filteredRoutes.map((r) => (
          <div
            key={`${r.origin.iata}-${r.destination.iata}-${r.departureTime}-${r.arrivalTime}`}
            className="flightCard"
          >
            <p>
              {r.origin.city[language]} ({r.origin.iata}) →{" "}
              {r.destination.city[language]} ({r.destination.iata})
            </p>
            <p>
              Departure: {new Date(r.departureTime).toLocaleString(language)}
            </p>
            <p>Arrival: {new Date(r.arrivalTime).toLocaleString(language)}</p>
            <p>Price: {r.price} €</p>
          </div>
        ))}
      </div>
      <BottomBar
        copyright={mockBottomBar.Copyright[language]}
        createdby={mockBottomBar.CreatedBy[language]}
      />
    </div>
  );
}
