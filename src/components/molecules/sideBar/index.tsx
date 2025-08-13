import { colors } from "../../styles/colors";
import "./sideBar.css";

type SideBarPage = {
  title: string;
  onClick?: () => void;
};

type Props = {
  backgroundColor?: string;
  basicColor?: string;
  pages: SideBarPage[];
};

export default function SideBar({ backgroundColor, basicColor, pages }: Props) {
  return (
    <div
      className="sideBarBox"
      style={{
        backgroundColor: backgroundColor || colors.primary,
        color: basicColor || colors.basic,
      }}
    >
      {pages.map((page, index) => (
        <div key={index} className="sideBarItem" onClick={page.onClick}>
          {page.title}
        </div>
      ))}
    </div>
  );
}
