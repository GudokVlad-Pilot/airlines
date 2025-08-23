"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adapters } from "@/adapters/adapter";
import NavBar from "@/components/molecules/navBar";
import BottomBar from "@/components/molecules/bottomBar";
import "./landingPage.css";
import VideoBackground from "@/components/templates/video-background";
import { colors } from "@/components/styles/colors";
import NavCardsRow from "@/components/molecules/navCardsRow";
import { languages, loaderTextByLanguage } from "./globalConsts";
import { useStore } from "@/adapters/zustand/store";
import LoaderWithText from "@/components/molecules/loaderWithText";
import SideBar from "@/components/molecules/sideBar";
import SearchBoxMain from "@/components/molecules/searchBoxMain";
import { Dayjs } from "dayjs";

const { getPages, getDictionary, getAirports } = adapters.cms();

export default function Home() {
  const params = useParams();
  const router = useRouter();
  const { pages, dictionary, airports, setPages, setDictionary, setAirports } =
    useStore();

  const searchTabPlaceholder: Record<"en" | "ru" | "fi", string> = {
    en: "Return flights unavailable at the moment.",
    ru: "Обратные рейсы в данный момент недоступны.",
    fi: "Paluulentoja ei ole saatavilla tällä hetkellä.",
  };

  const [language, setLanguage] = useState<"en" | "ru" | "fi">("en"); //verify with params
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarMounted, setIsSidebarMounted] = useState(false);

  const [originValue, setOrigin] = useState<string>(""); // store IATA code
  const [destinationValue, setDestination] = useState<string>(""); // store IATA code
  const [startDateValue, setStartDateValue] = useState<Dayjs | null>(null);
  const [endDateValue, setEndDateValue] = useState<Dayjs | null>(null);

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

  const onSearchClick = () => {
    // Check required fields
    if (!originValue || !destinationValue || !startDateValue) {
      alert(getPhrase("SearchBoxAlert", language));
      return; // stop execution if fields are missing
    }

    const startDateStr = startDateValue.format("YYYY-MM-DD");
    const endDateStr = endDateValue ? endDateValue.format("YYYY-MM-DD") : null;

    let url = `/${language}/flights?from=${originValue}&to=${destinationValue}&start=${startDateStr}`;

    if (endDateStr) {
      url += `&end=${endDateStr}`;
    }

    console.log(
      "Searching flights from",
      originValue,
      "to",
      destinationValue,
      "start",
      startDateStr,
      endDateStr ? "end " + endDateStr : ""
    );

    router.push(url);
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
    if (pages.length > 0 && dictionary.length > 0 && airports.length) {
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
    getAirports()
      .then((airports) => {
        setAirports(airports); // Zustand
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load pages");
        setLoading(false);
        console.error(err);
      });
    // getPages()
    //   .then((pages) => {
    //     setPages(pages); // Zustand
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setError("Failed to load pages");
    //     setLoading(false);
    //     console.error(err);
    //   });
    // getDictionary()
    //   .then((dictionary) => {
    //     setDictionary(dictionary); // Zustand
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setError("Failed to load dictionary");
    //     setLoading(false);
    //     console.error(err);
    //   });
  }, []);

  if (loading) return <LoaderWithText text={loaderTextByLanguage[language]} />;
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

      <VideoBackground />
      <div className="contentBox">
        {/* <BigSearchBox title={"Search Placeholder"} /> */}
        <SearchBoxMain
          bigSearchBox={{
            isReturn: false, // hardcoded for now
            // backgroundColor: undefined,
            // basicColor: undefined,
            // accentColor: undefined,
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
            onOriginChange: setOrigin,
            destination: destinationValue || "",
            onDestinationChange: setDestination,
            startDate: startDateValue,
            onStartDateChange: (date) => setStartDateValue(date),
            endDate: endDateValue,
            onEndDateChange: (date) => setEndDateValue(date),
            onClick: onSearchClick,
            locale: language,
            airports: airports,
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
