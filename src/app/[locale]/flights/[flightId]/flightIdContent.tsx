"use client";
import { adapters } from "@/adapters/adapter";
import { useStore } from "@/adapters/zustand/store";
import LoaderWithText from "@/components/molecules/loaderWithText";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  languages,
  loaderTextByLanguage,
  mockBottomBar,
  mockDays,
} from "../../globalConsts";
import SideBar from "@/components/molecules/sideBar";
import NavBar from "@/components/molecules/navBar";
import "./flightId.css";
import { colors } from "@/components/styles/colors";
import BottomBar from "@/components/molecules/bottomBar";
import { FlightCardProps } from "@/components/atoms/flightCard";
import { Extra, Meal, Route } from "@/adapters/types";
import FlightTopContent from "@/components/molecules/flightTopContent";
import PassengerInfo from "@/components/molecules/passengerInfo";
import { PassengerInfoContentProps } from "@/components/atoms/passengerInfoContent";
import FoodInfo from "@/components/molecules/foodInfo";
import { FoodCardsBoxProps } from "@/components/molecules/foodCardsBox";
import { FoodCardProps } from "@/components/atoms/foodCard";
import ExtrasInfo from "@/components/molecules/extrasInfo";
import { ExtrasCardProps } from "@/components/atoms/extrasCard";
import { ExtrasCardsBoxProps } from "@/components/molecules/extrasCardsBox";
import ConfirmationInfo from "@/components/molecules/confirmationInfo";

const { getPages, getFlight, getDictionary, getMeals, getExtras } =
  adapters.cms();

export default function FlightIdContent() {
  const searchParams = useSearchParams();
  const {
    pages,
    dictionary,
    flight,
    meals,
    extras,
    setPages,
    setDictionary,
    setFlight,
    setMeals,
    setExtras,
  } = useStore();
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale?.toString() ?? "en";
  const flightId = params?.flightId?.toString();

  const [language, setLanguage] = useState<"en" | "ru" | "fi">("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarMounted, setIsSidebarMounted] = useState(false);

  const [isChangeLoading, setIsChangeLoading] = useState<boolean>(false);

  const [isPassengerInfoOpened, setIsPassengerInfoOpened] = useState(true);
  const [isFoodInfoOpened, setIsFoodInfoOpened] = useState(false);
  const [isExtrasInfoOpened, setIsExtrasInfoOpened] = useState(false);
  const [isConfirmationInfoOpened, setIsConfirmationInfoOpened] =
    useState(false);

  const getPhrase = (title: string, lang: "en" | "ru" | "fi") => {
    const item = dictionary.find((d) => d.title === title);
    return item ? item.phrase[lang] : "";
  };

  const [passengers, setPassengers] = useState<PassengerInfoContentProps[]>([
    {
      title: "Passenger 1",
      firstNameTitle: "",
      lastNameTitle: "",
      emailTitle: "",
      phoneTitle: "",
      firstNameValue: "",
      lastNameValue: "",
      emailValue: "",
      phoneValue: "",
      onFirstNameValueChange: () => {},
      onLastNameValueChange: () => {},
      onEmailValueChange: () => {},
      onPhoneValueChange: () => {},
      firstNamePlaceholder: "",
      lastNamePlaceholder: "",
      emailPlaceholder: "",
      phonePlaceholder: "",
    },
  ]);

  const [mealCards, setMealCards] = useState<FoodCardProps[]>([]);
  const [foodPacks, setFoodPacks] = useState<FoodCardsBoxProps[]>([
    {
      title: "Passenger 1",
      foodCards: mealCards,
    },
  ]);
  const [additionalCards, setAdditionalCards] = useState<ExtrasCardProps[]>([]);
  const [extrasPacks, setExtrasPacks] = useState<ExtrasCardsBoxProps[]>([
    {
      title: "Passenger 1",
      extrasCards: additionalCards,
    },
  ]);

  // Update passenger fields & food packs whenever dictionary or language changes
  useEffect(() => {
    setPassengers((prev) =>
      prev.map((p, index) => ({
        ...p,
        title: `${getPhrase("FlightInfoPassengerTitle", language)} ${index + 1}`,
        firstNameTitle: getPhrase("FlightInfoFirstNameTitle", language),
        lastNameTitle: getPhrase("FlightInfoLastNameTitle", language),
        emailTitle: getPhrase("FlightInfoEmailTitle", language),
        phoneTitle: getPhrase("FlightInfoPhoneTitle", language),
        firstNamePlaceholder: getPhrase(
          "FlightInfoFirstNamePlaceholder",
          language
        ),
        lastNamePlaceholder: getPhrase(
          "FlightInfoLastNamePlaceholder",
          language
        ),
        emailPlaceholder: "example@email.com",
        phonePlaceholder: "+1234567890",
      }))
    );

    setFoodPacks((prev) =>
      prev.map((p, index) => ({
        ...p,
        title: `${getPhrase("FlightInfoPassengerTitle", language)} ${index + 1}`,
        foodCards: mealCards,
      }))
    );

    setExtrasPacks((prev) =>
      prev.map((p, index) => ({
        ...p,
        title: `${getPhrase("FlightInfoPassengerTitle", language)} ${index + 1}`,
        extrasCards: additionalCards,
      }))
    );
  }, [dictionary, language, mealCards, additionalCards]);

  // Add passenger
  const handleAddPassenger = () => {
    const index = passengers.length;
    setPassengers((prev) => [
      ...prev,
      {
        title: `${getPhrase("FlightInfoPassengerTitle", language)} ${index + 1}`,
        firstNameTitle: getPhrase("FlightInfoFirstNameTitle", language),
        lastNameTitle: getPhrase("FlightInfoLastNameTitle", language),
        emailTitle: getPhrase("FlightInfoEmailTitle", language),
        phoneTitle: getPhrase("FlightInfoPhoneTitle", language),
        firstNameValue: "",
        lastNameValue: "",
        emailValue: "",
        phoneValue: "",
        onFirstNameValueChange: () => {},
        onLastNameValueChange: () => {},
        onEmailValueChange: () => {},
        onPhoneValueChange: () => {},
        firstNamePlaceholder: getPhrase(
          "FlightInfoFirstNamePlaceholder",
          language
        ),
        lastNamePlaceholder: getPhrase(
          "FlightInfoLastNamePlaceholder",
          language
        ),
        emailPlaceholder: "example@email.com",
        phonePlaceholder: "+1234567890",
      },
    ]);

    setFoodPacks((prev) => [
      ...prev,
      {
        title: `${getPhrase("FlightInfoPassengerTitle", language)} ${index + 1}`,
        foodCards: mealCards,
      },
    ]);

    setExtrasPacks((prev) => [
      ...prev,
      {
        title: `${getPhrase("FlightInfoPassengerTitle", language)} ${index + 1}`,
        extrasCards: additionalCards,
      },
    ]);
  };

  // Reset passengers
  const resetPassengers = () => {
    setPassengers([
      {
        title: `${getPhrase("FlightInfoPassengerTitle", language)} 1`,
        firstNameTitle: getPhrase("FlightInfoFirstNameTitle", language),
        lastNameTitle: getPhrase("FlightInfoLastNameTitle", language),
        emailTitle: getPhrase("FlightInfoEmailTitle", language),
        phoneTitle: getPhrase("FlightInfoPhoneTitle", language),
        firstNameValue: "",
        lastNameValue: "",
        emailValue: "",
        phoneValue: "",
        onFirstNameValueChange: () => {},
        onLastNameValueChange: () => {},
        onEmailValueChange: () => {},
        onPhoneValueChange: () => {},
        firstNamePlaceholder: getPhrase(
          "FlightInfoFirstNamePlaceholder",
          language
        ),
        lastNamePlaceholder: getPhrase(
          "FlightInfoLastNamePlaceholder",
          language
        ),
        emailPlaceholder: "example@email.com",
        phonePlaceholder: "+1234567890",
      },
    ]);

    setFoodPacks([
      {
        title: `${getPhrase("FlightInfoPassengerTitle", language)} 1`,
        foodCards: mealCards,
      },
    ]);
    setExtrasPacks([
      {
        title: `${getPhrase("FlightInfoPassengerTitle", language)} 1`,
        extrasCards: additionalCards,
      },
    ]);
  };

  // Update passenger fields
  const handlePassengerChange = (
    index: number,
    field: keyof PassengerInfoContentProps,
    value: string
  ) => {
    setPassengers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Controlled passengers
  const controlledPassengers = passengers.map((p, index) => ({
    ...p,
    onFirstNameValueChange: (v: string) =>
      handlePassengerChange(index, "firstNameValue", v),
    onLastNameValueChange: (v: string) =>
      handlePassengerChange(index, "lastNameValue", v),
    onEmailValueChange: (v: string) =>
      handlePassengerChange(index, "emailValue", v),
    onPhoneValueChange: (v: string) =>
      handlePassengerChange(index, "phoneValue", v),
    isEmailInvalid: !/^\S+@\S+\.\S+$/.test(p.emailValue),
    isPhoneInvalid: !/^\+?[0-9]{5,15}$/.test(p.phoneValue),
  }));

  const isNextEnabled = passengers.every(
    (p) =>
      p.firstNameValue.trim() !== "" &&
      p.lastNameValue.trim() !== "" &&
      /^\S+@\S+\.\S+$/.test(p.emailValue) &&
      /^\+?[0-9]{5,15}$/.test(p.phoneValue)
  );

  // Sidebar
  const openSidebar = () => {
    setIsSidebarMounted(true);
    requestAnimationFrame(() => setIsSidebarVisible(true));
  };
  const closeSidebar = () => {
    setIsSidebarVisible(false);
    setTimeout(() => setIsSidebarMounted(false), 300);
  };

  // Sync locale → language
  useEffect(() => {
    const locale = params?.locale;
    if (locale === "en" || locale === "ru" || locale === "fi") {
      setLanguage(locale);
    }
  }, [params]);

  // Fetch data
  useEffect(() => {
    if (!flightId) {
      setError("No flightId provided in URL");
      setLoading(false);
      return;
    }
    Promise.all([
      getPages(),
      getDictionary(),
      getFlight(flightId),
      getMeals(),
      getExtras(),
    ])
      .then(([pages, dictionary, flight, meals, extras]) => {
        setPages(pages);
        setDictionary(dictionary);
        setFlight(flight);
        setMeals(meals);
        setExtras(extras);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load content");
        setLoading(false);
        console.error(err);
      });
  }, [flightId]);

  // Build mealCards after dictionary + meals + language are ready
  useEffect(() => {
    if (!dictionary.length || !meals.length || !extras.length) return;

    const mappedMeals: FoodCardProps[] = meals.map((m: Meal) => ({
      title: m.title?.[language] || "Untitled meal",
      image: `${m.image}?w=300` || "/assets/images/placeholder-4-3.png",
      ingredientsText: getPhrase(
        "FlightInfoFoodInfoIngredientsTitle",
        language
      ),
      ingredients: m.ingredients?.length
        ? m.ingredients.map((ing) => ing.title?.[language]).join(", ")
        : getPhrase("FlightInfoFoodInfoNoIngredients", language),
      isSelected: false,
    }));

    const mappedAdditionals: ExtrasCardProps[] = extras.map((x: Extra) => ({
      title: x.title?.[language] || "Untitled option",
      image: `${x.image}?w=300` || "/assets/images/placeholder-4-3.png",
      description: x.description?.[language] || "No description",
      price: x.price ? `+${x.price}€` : "+0€",
      isSelected: false,
    }));

    setMealCards(mappedMeals);
    setAdditionalCards(mappedAdditionals);

    setFoodPacks((prev) => prev.map((p) => ({ ...p, foodCards: mappedMeals })));
    setExtrasPacks((prev) =>
      prev.map((p) => ({ ...p, extrasCards: mappedAdditionals }))
    );
  }, [dictionary, language, meals, extras]);

  // Handle meal selection: one per passenger
  const handleMealSelect = (passengerIndex: number, cardIndex: number) => {
    setFoodPacks((prev) => {
      const updated = [...prev];
      updated[passengerIndex].foodCards = updated[passengerIndex].foodCards.map(
        (card, idx) => ({
          ...card,
          isSelected: idx === cardIndex,
        })
      );
      return updated;
    });
  };

  // Handle extras selection: multiple per passenger
  const handleExtraToggle = (passengerIndex: number, cardIndex: number) => {
    // setExtrasPacks((prev) => {
    //   const updated = [...prev];
    //   updated[passengerIndex].extrasCards = updated[
    //     passengerIndex
    //   ].extrasCards.map((card, idx) => ({
    //     ...card,
    //     isSelected: idx === cardIndex,
    //   }));
    //   return updated;
    // });
    const updatedExtras = [...extrasPacks];
    updatedExtras[passengerIndex] = {
      ...updatedExtras[passengerIndex],
      extrasCards: updatedExtras[passengerIndex].extrasCards.map((card, idx) =>
        idx === cardIndex ? { ...card, isSelected: !card.isSelected } : card
      ),
    };
    setExtrasPacks(updatedExtras);
  };

  // Map foodPacks to add onClick
  const foodCardsWithClick = foodPacks.map((box, passengerIndex) => ({
    ...box,
    foodCards: box.foodCards.map((card, cardIndex) => ({
      ...card,
      onClick: () => handleMealSelect(passengerIndex, cardIndex),
    })),
  }));

  // Map extrasPacks to add onClick
  const extrasCardsWithClick = extrasPacks.map((box, passengerIndex) => ({
    ...box,
    extrasCards: box.extrasCards.map((card, cardIndex) => ({
      ...card,
      onClick: () => handleExtraToggle(passengerIndex, cardIndex),
    })),
  }));

  if (loading) return <LoaderWithText text={loaderTextByLanguage[language]} />;
  if (error)
    return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;

  return (
    <div className="flightIdBox" style={{ backgroundColor: colors.background }}>
      {/* NavBar */}
      <div className={`navBar ${isSidebarVisible ? "narrowed" : ""}`}>
        <NavBar
          language={{
            selectedLanguage: language,
            onChange: (newLang: string) => {
              if (newLang === "en" || newLang === "ru" || newLang === "fi") {
                setLanguage(newLang);
                router.push(`/${newLang}/flights/${flightId}?${searchParams}`);
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

      {flight && (
        <div className="flightContent">
          {/* Top flight summary */}
          <FlightTopContent
            origin={`${flight.origin.city[language]} (${flight.origin.iata})`}
            destination={`${flight.destination.city[language]} (${flight.destination.iata})`}
            changeButtonTitle={getPhrase("FlightChangeButton", language)}
            onChangeButtonClick={() => {
              setIsChangeLoading(true);
              router.push(`/${language}/flights?${searchParams}`);
            }}
            flightCard={{
              isStatic: true,
              isSelected: true,
              ...buildSingleFlightCard(flight, language, getPhrase),
            }}
            isButtonLoading={isChangeLoading}
          />

          {/* Passenger Info */}
          <div className="passengerData">
            <PassengerInfo
              passengers={controlledPassengers}
              title={getPhrase("FlightInfoPassengerInfoTitle", language)}
              isOpened={isPassengerInfoOpened}
              onClick={() => {
                setIsPassengerInfoOpened(true);
                resetPassengers();
              }}
              addPassangerButtonText={getPhrase(
                "FlightInfoAddPassengerButtonTitle",
                language
              )}
              nextButtonText={getPhrase("FlightInfoNextButtonTitle", language)}
              onAddPassangerButtonClick={handleAddPassenger}
              onNextButtonClick={() => setIsPassengerInfoOpened(false)}
              isNextDisabled={!isNextEnabled}
            />
            <FoodInfo
              foodCardsBoxes={foodCardsWithClick}
              title={getPhrase("FlightInfoFoodInfoTitle", language)}
              onClick={() => setIsFoodInfoOpened(true)}
              isOpened={isFoodInfoOpened}
              nextButtonText={getPhrase("FlightInfoNextButtonTitle", language)}
              onNextButtonClick={() => setIsFoodInfoOpened(false)}
              isNextDisabled={false}
            />
            <ExtrasInfo
              extrasCardsBoxes={extrasCardsWithClick}
              title={getPhrase("FlightInfoExtrasInfoTitle", language)}
              onClick={() => setIsExtrasInfoOpened(true)}
              isOpened={isExtrasInfoOpened}
              nextButtonText={getPhrase("FlightInfoNextButtonTitle", language)}
              onNextButtonClick={() => setIsExtrasInfoOpened(false)}
              isNextDisabled={false}
            />
            <ConfirmationInfo
              passengerConfirmationCards={[]}
              title={getPhrase("FlightInfoConfirmationInfoTitle", language)}
              onClick={() => setIsConfirmationInfoOpened(true)}
              isOpened={isConfirmationInfoOpened}
              nextButtonText={getPhrase("FlightInfoNextButtonTitle", language)}
              onNextButtonClick={() => setIsConfirmationInfoOpened(false)}
              isNextDisabled={false}
              continueEditingText={getPhrase(
                "FlightInfoNextButtonTitle",
                language
              )}
              onContinueEditingButtonClick={() =>
                setIsConfirmationInfoOpened(false)
              }
              pricePlaceholder={getPhrase(
                "FlightInfoConfirmationInfoPricePlaceHolder",
                language
              )}
              price={""}
            />
          </div>

          {/* Debug Section */}
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              background: "#f4f4f4",
              borderRadius: "8px",
            }}
          >
            <h3>Passengers Debug</h3>
            {passengers.map((p, i) => {
              const selectedMeal =
                foodPacks[i]?.foodCards.find((c) => c.isSelected)?.title ||
                "None";

              const selectedExtras =
                extrasPacks[i]?.extrasCards
                  .filter((c) => c.isSelected)
                  .map((c) => c.title)
                  .join(", ") || "None";

              return (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <strong>{p.title}</strong>
                  <div>First Name: {p.firstNameValue}</div>
                  <div>Last Name: {p.lastNameValue}</div>
                  <div>Email: {p.emailValue}</div>
                  <div>Phone: {p.phoneValue}</div>
                  <div>Selected Meal: {selectedMeal}</div>
                  <div>Selected Extras: {selectedExtras}</div>
                </div>
              );
            })}

            {/* Total Price */}
            <h3>Total Price</h3>
            <div>
              Base Flight Price: {flight?.price} € x {passengers.length}{" "}
              passengers = {flight ? flight.price * passengers.length : 0} €
            </div>
            <div>
              Extras Price:{" "}
              {extrasPacks
                .flatMap((pack) =>
                  pack.extrasCards
                    .filter((c) => c.isSelected)
                    .map((c) => parsePrice(c.price))
                )
                .reduce((sum, val) => sum + val, 0)}{" "}
              €
            </div>
            <div style={{ fontWeight: "bold" }}>
              Grand Total:{" "}
              {flight
                ? flight.price * passengers.length +
                  extrasPacks
                    .flatMap((pack) =>
                      pack.extrasCards
                        .filter((c) => c.isSelected)
                        .map((c) => parsePrice(c.price))
                    )
                    .reduce((sum, val) => sum + val, 0)
                : 0}{" "}
              €
            </div>
          </div>

          <div>Flight ID: {flightId}</div>
          <div>Flight: {flight?.origin.city.en}</div>
          <div>Locale: {locale}</div>
        </div>
      )}

      {/* Bottom */}
      <div className="bottomPart">
        <BottomBar
          copyright={mockBottomBar.copyright[language]}
          createdby={mockBottomBar.createdBy[language]}
        />
      </div>
    </div>
  );
}

// Helper to parse price strings like "+20€" → 20
function parsePrice(priceStr: string): number {
  const match = priceStr.match(/[-+]?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

// Helper
function buildSingleFlightCard(
  route: Route,
  language: "en" | "ru" | "fi",
  getPhrase: (title: string, lang: "en" | "ru" | "fi") => string
): FlightCardProps {
  const dep = new Date(route.departureTime);
  const arr = new Date(route.arrivalTime);

  const depDay = new Date(dep.getFullYear(), dep.getMonth(), dep.getDate());
  const arrDay = new Date(arr.getFullYear(), arr.getMonth(), arr.getDate());
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
  };
}
