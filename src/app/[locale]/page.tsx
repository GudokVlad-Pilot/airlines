"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { adapters } from "@/adapters/adapter";
import NavBar from "@/components/molecules/navBar";
import BottomBar from "@/components/molecules/bottomBar";
import "./landingPage.css";
import VideoBackground from "@/components/templates/video-background";
import { colors } from "@/components/styles/colors";
import NavCardsRow from "@/components/molecules/navCardsRow";
import {
  languages,
  loaderTextByLanguage,
  mockBottomBar,
  profilePlaceholder,
} from "./globalConsts";
import { useStore } from "@/adapters/zustand/store";
import LoaderWithText from "@/components/molecules/loaderWithText";
import SideBar from "@/components/molecules/sideBar";
import SearchBoxMain from "@/components/molecules/searchBoxMain";
import { Dayjs } from "dayjs";
import PoweredBar from "@/components/molecules/poweredBar";
import { Airport } from "@/adapters/types";

const { getPages, getDictionary, getRoutes } = adapters.cms();

export default function Home() {
  const params = useParams();
  const router = useRouter();
  const { pages, dictionary, routes, setPages, setDictionary, setRoutes } =
    useStore();

  const searchTabPlaceholder: Record<"en" | "ru" | "fi", string> = {
    en: "Return flights unavailable at the moment.",
    ru: "Обратные рейсы в данный момент недоступны.",
    fi: "Paluulentoja ei ole saatavilla tällä hetkellä.",
  };

  const [language, setLanguage] = useState<"en" | "ru" | "fi">("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarMounted, setIsSidebarMounted] = useState(false);

  const [originValue, setOrigin] = useState<string>(""); // IATA
  const [destinationValue, setDestination] = useState<string>(""); // IATA
  const [startDateValue, setStartDateValue] = useState<Dayjs | null>(null);
  const [endDateValue, setEndDateValue] = useState<Dayjs | null>(null);

  const [searchLoading, setSearchLoading] = useState<boolean>(false);

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

  const onSearchClick = () => {
    setSearchLoading(true);
    if (!originValue || !destinationValue || !startDateValue) {
      alert(getPhrase("SearchBoxAlert", language));
      setSearchLoading(false);
      return;
    }

    const startDateStr = startDateValue.format("YYYY-MM-DD");
    const endDateStr = endDateValue ? endDateValue.format("YYYY-MM-DD") : null;

    let url = `/${language}/flights?from=${originValue}&to=${destinationValue}&start=${startDateStr}`;
    if (endDateStr) url += `&end=${endDateStr}`;
    router.push(url);
  };

  // ✅ Origins filtered by selected destination
  const availableOrigins: Airport[] = useMemo(() => {
    const seen = new Set<string>();
    let origins = routes.map((r) => r.origin);

    if (destinationValue) {
      origins = routes
        .filter((r) => r.destination.iata === destinationValue)
        .map((r) => r.origin);
    }

    return origins.filter((origin) => {
      if (seen.has(origin.iata)) return false;
      seen.add(origin.iata);
      return true;
    });
  }, [routes, destinationValue]);

  // ✅ Destinations filtered by selected origin
  const filteredDestinations: Airport[] = useMemo(() => {
    const seen = new Set<string>();
    let destinations = routes.map((r) => r.destination);

    if (originValue) {
      destinations = routes
        .filter((r) => r.origin.iata === originValue)
        .map((r) => r.destination);
    }

    return destinations.filter((dest) => {
      if (seen.has(dest.iata)) return false;
      seen.add(dest.iata);
      return true;
    });
  }, [originValue, routes]);

  useEffect(() => {
    const locale = params?.locale;
    if (locale === "en" || locale === "ru" || locale === "fi") {
      setLanguage(locale);
    }
  }, [params]);

  useEffect(() => {
    if (pages.length && dictionary.length && routes.length) {
      setLoading(false);
      return;
    }

    Promise.all([getPages(), getDictionary(), getRoutes()])
      .then(([pages, dictionary, routes]) => {
        setPages(pages);
        setDictionary(dictionary);
        setRoutes(routes);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load content");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <LoaderWithText text={loaderTextByLanguage[language]} />;
  if (error)
    return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;

  const navCards = pages.map((page) => ({
    title: page.title?.[language] || "No Title",
    description: page.description?.[language] || "No Description",
    image: page.image
      ? `${page.image}?w=300`
      : "/assets/images/placeholder-4-3.png",
    onClick: () => router.push(`/${language}/${page.slug}`),
  }));

  return (
    <div className="landingBox" style={{ backgroundColor: colors.background }}>
      <div className={`navBar ${isSidebarVisible ? "narrowed" : ""}`}>
        <NavBar
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
          onLogoClick={() => router.push(`/${language}`)}
          onProfileClick={() => alert(profilePlaceholder[language])}
          onMenuClick={() => {
            isSidebarMounted ? closeSidebar() : openSidebar();
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

      <VideoBackground />
      <div className="contentBox">
        <SearchBoxMain
          bigSearchBox={{
            isReturn: false,
            originPlaceholder: getPhrase(
              "SearchBoxOriginPlaceholder",
              language
            ),
            destinationPlaceholder: getPhrase(
              "SearchBoxDestinationPlaceholder",
              language
            ),
            startPlaceholder: getPhrase("SearchBoxStartPlaceholder", language),
            endPlaceholder: getPhrase("SearchBoxEndPlaceholder", language),
            origin: originValue || "",
            onOriginChange: (val) => {
              setOrigin(val);

              // Only validate/reset destination if a real origin is selected
              if (val) {
                const availableDestinations = routes
                  .filter((r) => r.origin.iata === val)
                  .map((r) => r.destination.iata);

                if (!availableDestinations.includes(destinationValue)) {
                  setDestination(""); // reset only if invalid
                }
              }
            },
            destination: destinationValue || "",
            onDestinationChange: (val) => {
              setDestination(val);

              // ✅ check if current origin is still valid under the new destination
              const availableOrigins = routes
                .filter((r) => r.destination.iata === val)
                .map((r) => r.origin.iata);

              if (!availableOrigins.includes(originValue)) {
                setOrigin(""); // reset only if invalid
              }
            },
            startDate: startDateValue,
            onStartDateChange: (date) => setStartDateValue(date),
            endDate: endDateValue,
            onEndDateChange: (date) => setEndDateValue(date),
            onClick: onSearchClick,
            locale: language,
            airports: availableOrigins, // ✅ origins filtered by destination
            destinations: filteredDestinations, // ✅ destinations filtered by origin
            isLoading: searchLoading,
          }}
          tabs={[
            {
              title: getPhrase("OneWayTab", language),
              notSelected: false,
              onClick: () => console.log("Flights tab clicked"),
            },
            {
              title: getPhrase("ReturnTripTab", language),
              notSelected: true,
              onClick: () => alert(searchTabPlaceholder[language]),
            },
          ]}
        />
        <NavCardsRow navCards={navCards} />
      </div>
      <div className="bottomPart">
        <PoweredBar title={getPhrase("PoweredBarPoweredBy", language)} />
        <BottomBar
          copyright={mockBottomBar.copyright[language]}
          createdby={mockBottomBar.createdBy[language]}
        />
      </div>
    </div>
  );
}
