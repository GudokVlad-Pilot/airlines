import "./passengerConfirmationCardsBox.css";
import PassengerConfirmationCard, {
  PassengerConfirmationCardProps,
} from "@/components/atoms/passengerConfirmationCard";

export type PassengerConfirmationCardsBoxProps = {
  passengerConfirmationCards: PassengerConfirmationCardProps[];
};

export default function PassengerConfirmationCardsBox({
  passengerConfirmationCards,
}: PassengerConfirmationCardsBoxProps) {
  return (
    <div className="passengerConfirmationCardsBoxBox">
      <div className="passengerConfirmationCardsContainer">
        {passengerConfirmationCards.map((card, index) => (
          <PassengerConfirmationCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
