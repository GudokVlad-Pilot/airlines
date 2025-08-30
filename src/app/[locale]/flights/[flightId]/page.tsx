"use client";
import { adapters } from "@/adapters/adapter";
import { useStore } from "@/adapters/zustand/store";
import LoaderWithText from "@/components/molecules/loaderWithText";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  languages,
  loaderTextByLanguage,
  mockBottomBar,
} from "../../globalConsts";
import SideBar from "@/components/molecules/sideBar";
import NavBar from "@/components/molecules/navBar";
import "./flightId.css";
import { colors } from "@/components/styles/colors";
import BottomBar from "@/components/molecules/bottomBar";
import FlightCard, { FlightCardProps } from "@/components/atoms/flightCard";

const { getPages, getFlight, getDictionary } = adapters.cms();

export default function FlightIdPage() {
  const { pages, dictionary, flight, setPages, setDictionary, setFlight } =
    useStore();
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale?.toString() ?? "en";
  const flightId = params?.flightId?.toString();

  const [language, setLanguage] = useState<"en" | "ru" | "fi">("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarMounted, setIsSidebarMounted] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<FlightCardProps | null>(
    null
  );

  const openSidebar = () => {
    setIsSidebarMounted(true);
    requestAnimationFrame(() => setIsSidebarVisible(true));
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
    setTimeout(() => setIsSidebarMounted(false), 300);
  };

  useEffect(() => {
    const locale = params?.locale;
    if (locale === "en" || locale === "ru" || locale === "fi") {
      setLanguage(locale);
    }
  }, [params]);

  useEffect(() => {
    if (!flightId) {
      setError("No flightId provided in URL");
      setLoading(false);
      return;
    }

    Promise.all([getPages(), getDictionary(), getFlight(flightId.toString())])
      .then(([pages, dictionary, flight]) => {
        setPages(pages);
        setDictionary(dictionary);
        setFlight(flight);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load content");
        setLoading(false);
        console.error(err);
      });
  }, [flightId]);

  if (loading) return <LoaderWithText text={loaderTextByLanguage[language]} />;
  if (error)
    return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;

  return (
    <div className="flightIdBox" style={{ backgroundColor: colors.background }}>
      <div className={`navBar ${isSidebarVisible ? "narrowed" : ""}`}>
        <NavBar
          language={{
            selectedLanguage: language,
            onChange: (newLang: string) => {
              if (newLang === "en" || newLang === "ru" || newLang === "fi") {
                setLanguage(newLang);
                router.push(`/${newLang}/flights/${flightId}`);
              }
            },
            languages: languages,
          }}
          onLogoClick={() => router.push(`/${language}`)}
          onProfileClick={() => alert("Profile is not ready")}
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
      {flight && (
        <div className="flightContent">
          <div className="flightCardStatic">
            <FlightCard
              isStatic
              isSelected
              time={""}
              flightTime={""}
              connections={""}
              price={""}
            />
          </div>
          <div>Flight ID: {flightId}</div>
          <div>Flight: {flight?.origin.city.en}</div>
          <div>Locale: {locale}</div>
        </div>
      )}
      <div className="bottomPart">
        <BottomBar
          copyright={mockBottomBar.copyright[language]}
          createdby={mockBottomBar.createdBy[language]}
        />
      </div>
    </div>
  );
}
