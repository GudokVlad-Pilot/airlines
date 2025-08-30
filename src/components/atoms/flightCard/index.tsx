import { colors } from "@/components/styles/colors";
import { IoAirplane } from "react-icons/io5";
import { IoIosTime } from "react-icons/io";
import "./flightCard.css";

export type FlightCardProps = {
  isStatic?: boolean;
  isSelected?: boolean;
  time: string;
  flightTime: string;
  connections: string;
  backgroundColor?: string;
  basicColor?: string;
  accentColor?: string;
  primaryColor?: string;
  price: string;
  onClick?: () => void;
};

export default function FlightCard({
  isStatic,
  isSelected,
  backgroundColor,
  basicColor,
  accentColor,
  primaryColor,
  time,
  flightTime,
  connections,
  price,
  onClick,
}: FlightCardProps) {
  return (
    <div
      className={`flightCardBox ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor || colors.secondary,
        cursor: isStatic ? "default" : "pointer",
      }}
    >
      <div
        className="flightCardInfo"
        style={{ color: basicColor || colors.basic }}
      >
        <div className="flightCardTime">{time}</div>
        <div className="flightCardLabel">
          <IoIosTime
            size={20}
            className="flightCardLabelIcon"
            color={primaryColor || colors.primary}
          />
          {flightTime}
        </div>
        <div className="flightCardLabel">
          <IoAirplane
            size={20}
            className="flightCardLabelIcon"
            color={primaryColor || colors.primary}
          />
          {connections}
        </div>
      </div>
      <div
        className="flightCardPrice"
        style={{ color: accentColor || colors.primaryLight }} // TODO: check it later
      >
        {price}
      </div>
    </div>
  );
}
