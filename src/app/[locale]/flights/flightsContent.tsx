"use client";

import LoaderWithText from "@/components/molecules/loaderWithText";
import NavBar from "@/components/molecules/navBar";
import SideBar from "@/components/molecules/sideBar";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  languages,
  loaderTextByLanguage,
  mockBottomBar,
  mockDays,
} from "../globalConsts";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/adapters/zustand/store";
import { adapters } from "@/adapters/adapter";
import { Airport, Route } from "@/adapters/types";
import "./flights.css";
import BottomBar from "@/components/molecules/bottomBar";
import FlightCardColumn from "@/components/molecules/flightCardsColumn";
import { colors } from "@/components/styles/colors";
import SmallSearchBox from "@/components/atoms/smallSearchBox";
import FlightControlPanel, {
  FlightControlState,
} from "@/components/molecules/flightControlPanel";
import { FlightCardProps } from "@/components/atoms/flightCard";
import SearchBoxMain from "@/components/molecules/searchBoxMain";
import { Dayjs } from "dayjs";

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

  /* Change flight consts*/
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [originValue, setOrigin] = useState<string>(""); // IATA
  const [destinationValue, setDestination] = useState<string>(""); // IATA
  const [startDateValue, setStartDateValue] = useState<Dayjs | null>(null);
  const [endDateValue, setEndDateValue] = useState<Dayjs | null>(null);
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
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedFlight, setSelectedFlight] = useState<FlightCardProps | null>(
    null
  );
  const [flightControlPanelState, setflightControlPanelState] =
    useState<FlightControlState>("select");

  const [searchLoader, setSearchLoader] = useState<boolean>(false);
  const [isConfirmationLoading, setIsConfimationLoading] =
    useState<boolean>(false);

  const openSidebar = () => {
    setIsSidebarMounted(true);
    requestAnimationFrame(() => setIsSidebarVisible(true));
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
    setTimeout(() => setIsSidebarMounted(false), 300);
  };

  const buildFlightCards = (
    routesForPair: Route[],
    language: "en" | "ru" | "fi",
    getPhrase: (title: string, lang: "en" | "ru" | "fi") => string,
    selectedCardIndex: number | null,
    setSelectedCardIndex: (idx: number) => void,
    setSelectedRoute: (id: string) => void
  ): FlightCardProps[] => {
    return routesForPair
      .slice()
      .sort(
        (a, b) =>
          new Date(a.departureTime).getTime() -
          new Date(b.departureTime).getTime()
      )
      .map((route, idx) => {
        const dep = new Date(route.departureTime);
        const arr = new Date(route.arrivalTime);

        const depDay = new Date(
          dep.getFullYear(),
          dep.getMonth(),
          dep.getDate()
        );
        const arrDay = new Date(
          arr.getFullYear(),
          arr.getMonth(),
          arr.getDate()
        );
        const dayDiff = Math.round(
          (arrDay.getTime() - depDay.getTime()) / (1000 * 60 * 60 * 24)
        );

        const arrivalTimeStr = `${arr.toLocaleTimeString(language, {
          hour: "2-digit",
          minute: "2-digit",
        })}${dayDiff > 0 ? ` (+${dayDiff} ${mockDays.days[language]})` : ""}`;

        return {
          time: `${dep.toLocaleTimeString(language, {
            hour: "2-digit",
            minute: "2-digit",
          })} - ${arrivalTimeStr}`,
          flightTime: (() => {
            const diffMs = arr.getTime() - dep.getTime();
            const hours = Math.floor(diffMs / 1000 / 60 / 60);
            const minutes = Math.floor((diffMs / 1000 / 60) % 60);
            return minutes > 0
              ? `${hours}${mockDays.hours[language]} ${minutes}${mockDays.minutes[language]}`
              : `${hours}${mockDays.hours[language]}`;
          })(),
          connections: getPhrase("DirectFlights", language),
          price: `${route.price} €`,
          isSelected: selectedCardIndex === idx,
          onClick: () => {
            setflightControlPanelState("confirm");
            setSelectedCardIndex(idx);
            setSelectedRoute(route._id);
            setSelectedFlight({
              time: `${dep.toLocaleTimeString(language, {
                hour: "2-digit",
                minute: "2-digit",
              })} - ${arrivalTimeStr}`,
              flightTime: (() => {
                const diffMs = arr.getTime() - dep.getTime();
                const hours = Math.floor(diffMs / 1000 / 60 / 60);
                const minutes = Math.floor((diffMs / 1000 / 60) % 60);
                return minutes > 0
                  ? `${hours}${mockDays.hours[language]} ${minutes}${mockDays.minutes[language]}`
                  : `${hours}${mockDays.hours[language]}`;
              })(),
              connections: getPhrase("DirectFlights", language),
              price: `${route.price} €`,
              isSelected: true,
              onClick: () => {},
            });
          },
        };
      });
  };

  const getPhrase = (title: string, lang: "en" | "ru" | "fi") => {
    const item = dictionary.find((d) => d.title === title);
    return item ? item.phrase[lang] : "";
  };

  /* Change flight functions */

  const onSearchClick = () => {
    setSearchLoader(true);
    if (!originValue || !destinationValue || !startDateValue) {
      alert(getPhrase("SearchBoxAlert", language));
      setSearchLoader(false);
      return;
    }

    const startDateStr = startDateValue.format("YYYY-MM-DD");
    const endDateStr = endDateValue ? endDateValue.format("YYYY-MM-DD") : null;

    let url = `/${language}/flights?from=${originValue}&to=${destinationValue}&start=${startDateStr}`;
    if (endDateStr) url += `&end=${endDateStr}`;
    setSelectedFlight(null);
    setSelectedCardIndex(null);
    setflightControlPanelState("select");
    setIsChanging(false);
    router.push(url);
    setSearchLoader(false);
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
    Promise.all([getPages(), getDictionary(), getRoutes()])
      .then(([pages, dictionary, routes]) => {
        setPages(pages);
        setDictionary(dictionary);
        setRoutes(routes);

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

      <div className={`changeLayout ${isChanging ? "changing" : ""}`}>
        <div className="searchBoxWithBackground">
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
              startPlaceholder: getPhrase(
                "SearchBoxStartPlaceholder",
                language
              ),
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
              isLoading: searchLoader,
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
        </div>
      </div>

      <div className="flightsContent">
        {from && to && (
          <div className="smallSearchBoxWithoutBackground">
            <SmallSearchBox
              departure={`${
                routes.find((r) => r.origin.iata === from)?.origin.city[
                  language
                ] || ""
              } (${from.toUpperCase()})`}
              arrival={`${
                routes.find((r) => r.destination.iata === to)?.destination.city[
                  language
                ] || ""
              } (${to.toUpperCase()})`}
              dates={
                start && end
                  ? `${new Date(start).toLocaleDateString(language)} - ${new Date(end).toLocaleDateString(language)}`
                  : start
                    ? new Date(start).toLocaleDateString(language)
                    : ""
              }
              onChangeClick={() => {
                setflightControlPanelState("change");
                setIsChanging(true);
              }}
            />
          </div>
        )}

        {filteredRoutes.length > 0 ? (
          filteredRoutes
            .filter(
              (r, idx, arr) =>
                idx === 0 ||
                r.origin.iata !== arr[idx - 1].origin.iata ||
                r.destination.iata !== arr[idx - 1].destination.iata
            )
            .map((r) => {
              const routesForPair = filteredRoutes.filter(
                (route) =>
                  route.origin.iata === r.origin.iata &&
                  route.destination.iata === r.destination.iata
              );

              return (
                <FlightCardColumn
                  key={`${r.origin.iata}-${r.destination.iata}`}
                  origin={`${r.origin.city[language]} (${r.origin.iata})`}
                  destination={`${r.destination.city[language]} (${r.destination.iata})`}
                  flightCards={buildFlightCards(
                    routesForPair,
                    language,
                    getPhrase,
                    selectedCardIndex,
                    setSelectedCardIndex,
                    setSelectedRoute
                  )}
                />
              );
            })
        ) : (
          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
              fontFamily: "Manrope",
              fontSize: "24px",
              fontWeight: "600",
              color: colors.primary,
            }} // TODO: move to css file
          >
            {getPhrase("NoFlightsFound", language)}
          </div>
        )}
      </div>

      <div className="flightControlPanel">
        <FlightControlPanel
          state={flightControlPanelState}
          flightControlSelectFlight={{
            title: getPhrase("FlightControlSelect", language),
          }}
          flightControlEditFlight={{
            title: getPhrase("FlightControlEdit", language),
            onClick: () => {
              setIsChanging(false);
              setflightControlPanelState(selectedFlight ? "confirm" : "select");
            },
          }}
          flightControlConfirmFlight={{
            title: getPhrase("FlightControlConfirm", language),
            time: selectedFlight?.time || "",
            flightTime: selectedFlight?.flightTime || "",
            connections: selectedFlight?.connections || "",
            buttonTitle: getPhrase("FlightControlConfirmButton", language),
            onClick: () => {
              setIsConfimationLoading(true);
              router.push(
                `/${language}/flights/${selectedRoute}?${searchParams}`
              );
            },
            isLoading: isConfirmationLoading,
          }}
        />
      </div>
      <BottomBar
        copyright={mockBottomBar.copyright[language]}
        createdby={mockBottomBar.createdBy[language]}
      />
    </div>
  );
}
