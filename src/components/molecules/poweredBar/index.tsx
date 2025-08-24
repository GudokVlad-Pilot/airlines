import { colors } from "@/components/styles/colors";
import Image from "next/image";
import "./poweredBar.css";
import CardMedia from "@mui/material/CardMedia";

type Props = {
  title: string;
  backgroundColor?: string;
  basicColor?: string;
};

export default function PoweredBar({
  title,
  backgroundColor,
  basicColor,
}: Props) {
  return (
    <div
      className="poweredBarBox"
      style={{
        backgroundColor: backgroundColor || colors.primary,
        color: basicColor || colors.basic,
      }}
    >
      <div className="poweredByBlock">
        <div className="poweredByText">{title}</div>
      </div>
      <CardMedia
        className="techStackImage"
        component="img"
        image={"/assets/images/powered_by_all.png"}
      />
    </div>
  );
}
