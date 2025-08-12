import "./navBar.css";
import { colors } from "../../styles/colors";
import LanguageSelector, {
  LanguageSelectorProps,
} from "@/components/atoms/languageSelector";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type Props = {
  backgroundColor?: string;
  basicColor?: string;
  language: LanguageSelectorProps;
  onLogoClick?: () => void;
  onProfileClick?: () => void;
  onMenuClick?: () => void;
};

export default function NavBar({
  backgroundColor,
  basicColor,
  language,
  onLogoClick,
  onProfileClick,
  onMenuClick,
}: Props) {
  return (
    <div
      className="navBarBox"
      style={{ backgroundColor: backgroundColor || colors.primary }}
    >
      <CardMedia
        className="navBarImage"
        component="img"
        image={"/assets/images/airlines_logo.png"}
        onClick={onLogoClick}
      />

      <div className="navBarRight">
        <LanguageSelector
          selectedLanguage={language.selectedLanguage}
          onChange={language.onChange}
          languages={language.languages}
        />

        <IconButton
          className="navBarIcon"
          aria-label="profile"
          onClick={onProfileClick}
        >
          <AccountCircleIcon style={{ color: basicColor || colors.basic }} />
        </IconButton>

        <IconButton
          className="navBarIcon"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon style={{ color: basicColor || colors.basic }} />
        </IconButton>
      </div>
    </div>
  );
}
