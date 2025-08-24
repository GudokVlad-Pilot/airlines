import FlightCard, { FlightCardProps } from "@/components/atoms/flightCard";
import "./flightCardsColumn.css";
import { colors } from "@/components/styles/colors";

type Props = {
  accentColor?: string;
  origin: string;
  destination: string;
  flightCards: FlightCardProps[];
};

export default function FlightCardColumn({
  flightCards,
  origin,
  destination,
  accentColor,
}: Props) {
  if (!flightCards || flightCards.length === 0) return null;

  return (
    <div className="flightCardsColumnBox">
      <div
        className="flightCardsColumnRoute"
        style={{ color: accentColor || colors.primaryLight }}
      >
        {origin} &nbsp; - &nbsp; {destination}
      </div>
      <div className="flightCardsColumnCards">
        {flightCards.map((flightCard, index) => (
          <FlightCard key={index} {...flightCard} />
        ))}
      </div>
    </div>
  );
}
