"use client";

import LoaderWithText from "@/components/molecules/loaderWithText";
import NavBar from "@/components/molecules/navBar";
import SideBar from "@/components/molecules/sideBar";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  languages,
  loaderTextByLanguage,
  mockBottomBar,
  profilePlaceholder,
} from "../globalConsts";
import { useEffect, useState } from "react";
import { useStore } from "@/adapters/zustand/store";
import { adapters } from "@/adapters/adapter";
import BottomBar from "@/components/molecules/bottomBar";
import { colors } from "@/components/styles/colors";
import "./payment.css";

const { getPages, getDictionary } = adapters.cms();

export default function PaymentContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("ref");
  const params = useParams();
  const router = useRouter();
  const { pages, dictionary, setPages, setDictionary } = useStore();

  const [language, setLanguage] = useState<"en" | "ru" | "fi">("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarMounted, setIsSidebarMounted] = useState(false);

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
  }, []);

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
        backgroundColor: colors.background,
      }}
    >
      <div className={`navBar ${isSidebarVisible ? "narrowed" : ""}`}>
        <NavBar
          language={{
            selectedLanguage: language,
            onChange: (newLang: string) => {
              if (newLang === "en" || newLang === "ru" || newLang === "fi") {
                setLanguage(newLang);
                router.push(`/${newLang}/payment?${searchParams}`);
              }
            },
            languages: languages,
          }}
          onLogoClick={() => router.push(`/${language}`)}
          onProfileClick={() => alert(profilePlaceholder[language])}
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

      <div className="paymentContent">{orderId}</div>
      <BottomBar
        copyright={mockBottomBar.copyright[language]}
        createdby={mockBottomBar.createdBy[language]}
      />
    </div>
  );
}
