import "./navBar.css";
import { colors } from "../../styles/colors";

type Props = {
  placeholder: string;
  backgroundColor?: string;
  basicColor?: string;
};

export default function NavBar({
  placeholder,
  backgroundColor,
  basicColor,
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
        {placeholder}
      </div>
    </div>
  );
}
