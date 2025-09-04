"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NotFoundLayout from "@/components/molecules/notFoundLayout";
import NavBar from "@/components/molecules/navBar";
import BottomBar from "@/components/molecules/bottomBar";
import SideBar from "@/components/molecules/sideBar";
import {
  languages,
  loaderTextByLanguage,
  mockBottomBar,
  pagePlaceholder,
  profilePlaceholder,
} from "./[locale]/globalConsts";
import { useStore } from "@/adapters/zustand/store";
import { adapters } from "@/adapters/adapter";
import LoaderWithText from "@/components/molecules/loaderWithText";

import "./notFoundPage.css";

const { getPages, getDictionary } = adapters.cms();

// Supported locales
const supportedLocales = ["en", "fi", "ru"] as const;

// Mock dictionary
const mockDictionary = {
  NotFoundTitle: { en: "404", ru: "404", fi: "404" },
  NotFoundDescription: {
    en: "Sorry, we couldn’t find the page you were looking for.",
    ru: "Извините, мы не можем найти страницу, которую вы искали.",
    fi: "Anteeksi, me emme löytäneet etsimäsi sivua.",
  },
  NotFoundButtonTitle: {
    en: "Back to Home",
    ru: "На главную",
    fi: "Etusivulle",
  },
};

export default function GlobalNotFound() {
  const { pages, dictionary, setPages, setDictionary } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  const [locale, setLocale] = useState<(typeof supportedLocales)[number]>("en");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarMounted, setIsSidebarMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openSidebar = () => {
    setIsSidebarMounted(true);
    requestAnimationFrame(() => setIsSidebarVisible(true));
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
    setTimeout(() => setIsSidebarMounted(false), 300);
  };

  useEffect(() => {
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

    if (!pathname) return;
    const firstSegment = pathname.split("/")[1];
    if (supportedLocales.includes(firstSegment as any)) {
      setLocale(firstSegment as (typeof supportedLocales)[number]);
    } else {
      setLocale("en");
    }
  }, [pathname]);

  if (loading) return <LoaderWithText text={loaderTextByLanguage[locale]} />;
  if (error)
    return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar */}
      <div className={`navBar ${isSidebarVisible ? "narrowed" : ""}`}>
        <NavBar
          language={{
            selectedLanguage: locale,
            onChange: (newLang) => {
              if (!supportedLocales.includes(newLang as any)) return;

              // Split current path into segments
              const segments = pathname.split("/").filter(Boolean); // removes empty strings

              if (segments.length === 0) {
                router.push(`/${newLang}`);
                return;
              }

              // Replace first segment (locale) with the new one
              segments[0] = newLang;

              // Reconstruct path
              const newPath = "/" + segments.join("/");

              router.push(newPath);
            },
            languages: [...languages],
          }}
          onLogoClick={() => router.push(`/${locale}`)}
          onProfileClick={() => alert(profilePlaceholder[locale])}
          onMenuClick={() =>
            isSidebarMounted ? closeSidebar() : openSidebar()
          }
        />
      </div>

      {/* Sidebar */}
      {isSidebarMounted && (
        <div className="sideBarOverlay" onClick={closeSidebar}>
          <div
            className={`sideBar ${isSidebarVisible ? "visible" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <SideBar
              pages={pages.map((p) => ({
                title: p.title?.[locale] || "No Title",
                // onClick: () => router.push(`/${locale}/${p.slug}`),
                //TODO: return functionality
                onClick: () => alert(pagePlaceholder[locale]),
              }))}
            />
          </div>
        </div>
      )}

      {/* NotFoundLayout fills remaining space */}
      <div style={{ flex: 1, display: "flex" }}>
        <NotFoundLayout
          title={mockDictionary.NotFoundTitle[locale]}
          description={mockDictionary.NotFoundDescription[locale]}
          customButton={{
            title: mockDictionary.NotFoundButtonTitle[locale],
            onClick: () => router.push(`/${locale}`),
          }}
        />
      </div>

      {/* BottomBar fixed height */}
      <BottomBar
        copyright={mockBottomBar.copyright[locale]}
        createdby={mockBottomBar.createdBy[locale]}
      />
    </div>
  );
}
