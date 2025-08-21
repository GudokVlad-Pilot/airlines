import { colors } from "@/components/styles/colors";
import "./tab.css";

export type TabProps = {
  title: string;
  color?: string;
  backgroundColor?: string;
  onClick?: () => void;
  notSelected?: boolean;
};

export default function Tab({
  title,
  backgroundColor,
  color,
  onClick,
  notSelected,
}: TabProps) {
  return (
    <div
      className={`tabBox ${notSelected ? "active" : ""}`}
      style={{
        background: notSelected
          ? `linear-gradient(45deg, black 10%, ${colors.secondary} 90%)`
          : backgroundColor || colors.secondary,
        cursor: notSelected ? "not-allowed" : "pointer", // TODO: remove for 2nd phase
      }}
      onClick={onClick}
    >
      <div className="tabName" style={{ color: color || colors.basic }}>
        {title}
      </div>
    </div>
  );
}
