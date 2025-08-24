export const languages = [
  { code: "en", label: "Eng", flagCode: "gb" },
  { code: "ru", label: "Rus", flagCode: "ru" },
  { code: "fi", label: "Fin", flagCode: "fi" },
];

export const loaderTextByLanguage: Record<"en" | "ru" | "fi", string> = {
  en: "Loading places foxes can take you to...",
  ru: "Подгружаем список мест, куда вас могут доставить лисички...",
  fi: "Ladataan paikkoja, joihin ketut voivat viedä sinut...",
};

export const mockBottomBar = {
  copyright: {
    en: "© Copyright 2025 Fox Airlines. All rights reserved.",
    ru: "© Авторское право 2025 Fox Airlines. Все права защищены.",
    fi: "© Copyright 2025 Fox Airlines. Kaikki oikeudet pidätetään.",
  },
  createdBy: {
    en: "Created by",
    ru: "Создано",
    fi: "Luonut",
  },
};

export const mockDays = {
  hours: { en: "h", ru: "ч", fi: "t" },
  minutes: { en: "m", ru: "м", fi: "m" },
  days: { en: "D", ru: "Д", fi: "P" },
};
