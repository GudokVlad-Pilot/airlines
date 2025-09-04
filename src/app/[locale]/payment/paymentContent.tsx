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
const { getOrder, updateOrderPaid, applyOrderFullDiscount } =
  adapters.firebase();

export default function PaymentContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("ref");
  const flightId = searchParams.get("flightId");
  const params = useParams();
  const router = useRouter();
  const { pages, dictionary, setPages, setDictionary } = useStore();

  const [language, setLanguage] = useState<"en" | "ru" | "fi">("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarMounted, setIsSidebarMounted] = useState(false);
  const [orderData, setOrderData] = useState<{
    total: number;
    paid: boolean;
  } | null>(null);
  const [updating, setUpdating] = useState(false);

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

  // Fetch order data
  useEffect(() => {
    if (!orderId || !flightId) return;

    setLoading(true);
    getOrder(flightId, orderId)
      .then((data) => {
        if (data) setOrderData({ total: data.total, paid: !!data.paid });
      })
      .catch((err) => setError("Failed to fetch order"))
      .finally(() => setLoading(false));
  }, [orderId, flightId]);

  // Fetch CMS content
  useEffect(() => {
    Promise.all([getPages(), getDictionary()])
      .then(([pages, dictionary]) => {
        setPages(pages);
        setDictionary(dictionary);
      })
      .catch((err) => setError("Failed to load content"));
  }, []);

  const markAsPaid = async () => {
    if (!orderId || !flightId || !orderData || orderData.paid) return;
    setUpdating(true);
    const success = await updateOrderPaid(flightId, orderId);
    if (success) {
      setOrderData((prev) => (prev ? { ...prev, paid: true } : prev));
    } else {
      alert("Failed to mark order as paid");
    }
    setUpdating(false);
  };

  const applyDiscount = async () => {
    if (!orderId || !flightId || !orderData || orderData.paid) return;
    setUpdating(true);
    const success = await applyOrderFullDiscount(flightId, orderId);
    if (success) {
      setOrderData((prev) => (prev ? { ...prev, total: 0 } : prev));
    } else {
      alert("Failed to apply order discount");
    }
    setUpdating(false);
  };

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
      {/* Navbar */}
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
            languages,
          }}
          onLogoClick={() => router.push(`/${language}`)}
          onProfileClick={() => alert(profilePlaceholder[language])}
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
                title: p.title?.[language] || "No Title",
                onClick: () => router.push(`/${language}/${p.slug}`),
              }))}
            />
          </div>
        </div>
      )}

      {/* Payment content */}
      <div className="paymentContent">
        <p>Order ID: {orderId}</p>
        {orderData ? (
          <>
            <p>Total: {orderData.total}</p>
            <p>Paid: {orderData.paid ? "✅ Yes" : "❌ No"}</p>

            {orderData.total !== 0 && (
              <button
                onClick={applyDiscount}
                disabled={updating}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  cursor: updating ? "not-allowed" : "pointer",
                }}
              >
                {updating ? "Applying discount" : "Apply Discount"}
              </button>
            )}

            {!orderData.paid && (
              <button
                onClick={markAsPaid}
                disabled={updating}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  cursor: updating ? "not-allowed" : "pointer",
                }}
              >
                {updating ? "Marking as Paid..." : "Mark as Paid"}
              </button>
            )}
          </>
        ) : (
          <p>Loading order...</p>
        )}
      </div>

      {/* Bottom bar */}
      <BottomBar
        copyright={mockBottomBar.copyright[language]}
        createdby={mockBottomBar.createdBy[language]}
      />
    </div>
  );
}
