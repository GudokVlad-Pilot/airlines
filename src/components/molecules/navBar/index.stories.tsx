import NavBar from ".";

export default {
  title: "molecules/NavBar",
  component: NavBar,
};

const languages = [
  { code: "en", label: "Eng", flagCode: "gb" },
  { code: "ru", label: "Rus", flagCode: "ru" },
  { code: "fi", label: "Fin", flagCode: "fi" },
];

export const Default = {
  args: {
    language: {
      selectedLanguage: "en",
      onChange: () => null,
      languages: languages,
    },
  },
};

export const Custom = {
  args: {
    backgroundColor: "#FFF000",
    basicColor: "red",
    language: {
      selectedLanguage: "en",
      onChange: () => null,
      languages: languages,
    },
  },
};
