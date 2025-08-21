export const languages = [
  { code: "en", label: "Eng", flagCode: "gb" },
  { code: "ru", label: "Rus", flagCode: "ru" },
  { code: "fi", label: "Fin", flagCode: "fi" },
];

export const loaderTextByLanguage: Record<"en" | "ru" | "fi", string> = {
  en: "Loading places foxes can take you to...",
  ru: "Загрузка...", // TODO: define phrases
  fi: "Ladataan...",
};
