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
import { Route } from "@/adapters/types";
import "./flights.css";
import BottomBar from "@/components/molecules/bottomBar";
import FlightCardColumn from "@/components/molecules/flightCardsColumn";
import { colors } from "@/components/styles/colors";
import SmallSearchBox from "@/components/atoms/smallSearchBox";

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
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        backgroundColor: colors.background, // TODO: set customisation for 2nd phase
      }}
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
        {filteredRoutes.length > 0 &&
          filteredRoutes.map((r, idx, arr) => {
            // Only show one column per unique origin-destination pair
            if (
              idx === 0 ||
              r.origin.iata !== arr[idx - 1].origin.iata ||
              r.destination.iata !== arr[idx - 1].destination.iata
            ) {
              const routesForPair = arr.filter(
                (route) =>
                  route.origin.iata === r.origin.iata &&
                  route.destination.iata === r.destination.iata
              );

              return (
                <div key={`${r.origin.iata}-${r.destination.iata}`}>
                  <SmallSearchBox
                    departure={`${r.origin.city[language]} (${r.origin.iata})`}
                    arrival={`${r.destination.city[language]} (${r.destination.iata})`}
                    departureDate={new Date(r.departureTime).toLocaleDateString(
                      language
                    )}
                    arrivalDate={new Date(r.arrivalTime).toLocaleDateString(
                      language
                    )}
                    onChangeClick={() => alert("Change is progress")}
                  />
                  <FlightCardColumn
                    origin={`${r.origin.city[language]} (${r.origin.iata})`}
                    destination={`${r.destination.city[language]} (${r.destination.iata})`}
                    flightCards={routesForPair.map((route) => ({
                      time: `${new Date(route.departureTime).toLocaleTimeString(
                        language,
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )} - ${new Date(route.arrivalTime).toLocaleTimeString(
                        language,
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}`,
                      flightTime: (() => {
                        const diffMs =
                          new Date(route.arrivalTime).getTime() -
                          new Date(route.departureTime).getTime();
                        const hours = Math.floor(diffMs / 1000 / 60 / 60);
                        const minutes = Math.floor((diffMs / 1000 / 60) % 60);
                        return minutes > 0
                          ? `${hours}h ${minutes}m`
                          : `${hours}h`;
                      })(),
                      connections: "Direct",
                      price: `${route.price} €`,
                      onClick: () =>
                        router.push(`/${language}/flights/${route._id}`),
                    }))}
                  />
                </div>
              );
            }
            return null;
          })}
      </div>
      <BottomBar
        copyright={mockBottomBar.Copyright[language]}
        createdby={mockBottomBar.CreatedBy[language]}
      />
    </div>
  );
}
