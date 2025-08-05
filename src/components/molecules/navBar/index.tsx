import "./navBar.css";
import { colors } from "../../styles/colors";
import LanguageSelector, {
  LanguageSelectorProps,
} from "@/components/atoms/languageSelector";

type Props = {
  placeholder: string;
  backgroundColor?: string;
  basicColor?: string;
  language: LanguageSelectorProps;
};

export default function NavBar({
  placeholder,
  backgroundColor,
  basicColor,
  language,
}: Props) {
  return (
    <div
      className="navBarBox"
      style={{ backgroundColor: backgroundColor || colors.primary }}
    >
      <div
        className="placeholderText"
        style={{ color: basicColor || colors.basic }}
      >
        <div>{placeholder}</div>
        <div>
          <LanguageSelector
            selectedLanguage={language.selectedLanguage}
            onChange={language.onChange}
            languages={language.languages}
          />
        </div>
      </div>
    </div>
  );
}
