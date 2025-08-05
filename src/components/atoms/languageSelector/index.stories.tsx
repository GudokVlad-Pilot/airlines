import LanguageSelector from ".";

export default {
  title: "atoms/LanguageSelector",
  component: LanguageSelector,
};

const languages = [
  { code: "en", label: "Eng", flagCode: "gb" },
  { code: "ru", label: "Rus", flagCode: "ru" },
  { code: "fi", label: "Fin", flagCode: "fi" },
];

export const Default = {
  args: {
    selectedLanguage: "en",
    onChange: () => null,
    languages: languages,
  },
};
