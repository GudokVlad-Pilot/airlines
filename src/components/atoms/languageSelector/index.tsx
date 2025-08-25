import "./languageSelector.css";

type LanguageOption = {
  code: string;
  label: string;
  flagCode?: string;
};

export type LanguageSelectorProps = {
  selectedLanguage: string;
  onChange: (newLang: string) => void;
  languages: LanguageOption[];
};

export default function LanguageSelector({
  selectedLanguage,
  onChange,
  languages,
}: LanguageSelectorProps) {
  return (
    <select
      className="languageSelectorBox"
      value={selectedLanguage}
      onChange={(e) => onChange(e.target.value)}
    >
      {languages.map(({ code, label }) => (
        <option key={code} value={code} className="languageSelectorOption">
          {label.toLocaleUpperCase()}
        </option>
      ))}
    </select>
  );
}
