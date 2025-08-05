import { colors } from "@/components/styles/colors";
import "./bigSearchBox.css";

type Props = {
  title: string;
  backgroundColor?: string;
};

export default function BigSearchBox({ title, backgroundColor }: Props) {
  return (
    <div
      className="bigSearchBoxBox"
      style={{ backgroundColor: backgroundColor || colors.primary }}
    >
      {title}
    </div>
  );
}
