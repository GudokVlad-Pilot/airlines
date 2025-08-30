import FlightCard, { FlightCardProps } from "@/components/atoms/flightCard";
import "./flightTopContent.css";
import { colors } from "@/components/styles/colors";
import ChangeFlightButton from "@/components/atoms/changeFlightButton";

type Props = {
  accentColor?: string;
  origin: string;
  destination: string;
  changeButtonTitle: string;
  onChangeButtonClick: () => void;
  flightCard: FlightCardProps;
};

export default function FlightTopContent({
  flightCard,
  origin,
  destination,
  changeButtonTitle,
  onChangeButtonClick,
  accentColor,
}: Props) {
  return (
    <div className="flightTopContentBox">
      <div
        className="flightTopContentRoute"
        style={{ color: accentColor || colors.primaryLight }}
      >
        {origin} &nbsp; - &nbsp; {destination}
      </div>
      <div className="flightTopContentRow">
        <div className="flightTopContentCard">
          <FlightCard isSelected isStatic {...flightCard} />
        </div>
        <ChangeFlightButton
          title={changeButtonTitle}
          onClick={onChangeButtonClick}
        />
      </div>
    </div>
  );
}
