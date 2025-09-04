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
import PaymentInfo from "@/components/molecules/paymentLayout";

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

  const codeToCheck = "BirthdaySpecia1";
  const [code, setCode] = useState("");
  const [codeBoxDisabled, setCodeButtonDisabled] = useState(false);
  const [codeButtonLoading, setCodeButtonLoading] = useState(false);
  const [paymentBoxDisabled, setPaymentButtonDisabled] = useState(false);
  const [paymentButtonLoading, setPaymentButtonLoading] = useState(false);

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
    const success = await updateOrderPaid(flightId, orderId);
    if (success) {
      setOrderData((prev) => (prev ? { ...prev, paid: true } : prev));
      setPaymentButtonDisabled(true);
    } else {
      alert("Failed to mark order as paid");
    }
    setPaymentButtonLoading(false);
  };

  const applyDiscount = async () => {
    if (!orderId || !flightId || !orderData || orderData.paid) return;
    const success = await applyOrderFullDiscount(flightId, orderId);
    if (success) {
      setOrderData((prev) => (prev ? { ...prev, total: 0 } : prev));
      setCodeButtonDisabled(true);
    } else {
      alert("Failed to apply order discount");
    }
    setCodeButtonLoading(false);
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
        {orderData && orderId && flightId ? (
          <PaymentInfo
            isPaid={orderData.paid}
            confimationMessage={getPhrase(
              "PaymentBoxConfirmationMessage",
              language
            )}
            confimationThanks={getPhrase(
              "PaymentBoxConfirmationThanks",
              language
            )}
            paymentBox={{
              title: getPhrase("PaymentBoxTitle", language),
              codePlaceholder: getPhrase(
                "PaymentCodePlaceholderTitle",
                language
              ),
              codeValue: code,
              onCodeValueChange: setCode,
              codeButtonTitle: getPhrase("PaymentBoxCodeButtonTitle", language),
              onCodeButtonClick: () => {
                setCodeButtonLoading(true);
                if (code === codeToCheck) {
                  applyDiscount();
                } else {
                  alert("Invalid code");
                  setCodeButtonLoading(false);
                }
              },
              isCodeButtonDisabled: orderData.total == 0 || codeBoxDisabled,
              isCodeButtonLoading: codeButtonLoading,
            }}
            orderPlaceholder={getPhrase("PaymentOrderPlaceholder", language)}
            orderId={orderId}
            totalPlaceholder={getPhrase(
              "FlightInfoConfirmationInfoPricePlaceHolder",
              language
            )}
            total={`${orderData.total}€` || ""}
            paymentButtonText={getPhrase("PaymentButtonText", language)}
            onPaymentButtonClick={() => {
              setPaymentButtonLoading(true);
              markAsPaid();
            }}
            isPaymentButtonDisabled={orderData.total !== 0 || orderData.paid}
            isPaymentButtonLoading={paymentButtonLoading}
          />
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
              fontFamily: "Manrope",
              fontSize: "24px",
              fontWeight: "600",
              color: colors.primary,
            }}
          >
            {getPhrase("PaymentLoadingOrder", language)}
          </div>
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
