import { colors } from "@/components/styles/colors";
import "./bigSearchBox.css";

export type BigSearchBoxProps = {
  title: string;
  isReturn?: boolean;
  backgroundColor?: string;
};

export default function BigSearchBox({
  title,
  isReturn,
  backgroundColor,
}: BigSearchBoxProps) {
  return (
    <div
      className="bigSearchBoxBox"
      style={{ backgroundColor: backgroundColor || colors.secondary }}
    >
      {title}
    </div>
  );
}
