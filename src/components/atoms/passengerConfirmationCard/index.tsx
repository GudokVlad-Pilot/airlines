import "./passengerConfirmationCard.css";

export type PassengerConfirmationCardProps = {
  title: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  route: string;
  departureTimePlaceholder: string;
  departureTime: string;
  arrivalTimePlaceholder: string;
  arrivalTime: string;
  mealPlaceholder: string;
  meal: string;
  extrasPlaceholder: string;
  extras: string;
};

export default function PassengerConfirmationCard({
  title,
  firstNamePlaceholder,
  lastNamePlaceholder,
  emailPlaceholder,
  phonePlaceholder,
  firstName,
  lastName,
  email,
  phone,
  route,
  departureTimePlaceholder,
  departureTime,
  arrivalTimePlaceholder,
  arrivalTime,
  mealPlaceholder,
  meal,
  extrasPlaceholder,
  extras,
}: PassengerConfirmationCardProps) {
  return (
    <div className="passengerConfirmationCardBox">
      <div className="passengerConfirmationCardSmallBox">
        <div className="passengerConfirmationCardBigText">{title}</div>
        <div className="passengerConfirmationCardText">
          {firstNamePlaceholder}: {firstName}
        </div>
        <div className="passengerConfirmationCardText">
          {lastNamePlaceholder}: {lastName}
        </div>
        <div className="passengerConfirmationCardText">
          {emailPlaceholder}: {email}
        </div>
        <div className="passengerConfirmationCardText">
          {phonePlaceholder}: {phone}
        </div>
      </div>
      <div className="passengerConfirmationCardSmallBox">
        <div className="passengerConfirmationCardBigText">{route}</div>
        <div className="passengerConfirmationCardText">
          {departureTimePlaceholder}:
        </div>
        <div className="passengerConfirmationCardBigText">{departureTime}</div>
        <div className="passengerConfirmationCardText">
          {arrivalTimePlaceholder}:
        </div>
        <div className="passengerConfirmationCardBigText">{arrivalTime}</div>
        <div className="passengerConfirmationCardText">{mealPlaceholder}:</div>
        <div className="passengerConfirmationCardBigText">{meal}</div>
        <div className="passengerConfirmationCardText">
          {extrasPlaceholder}:
        </div>
        <div className="passengerConfirmationCardBigText">{extras}</div>
      </div>
    </div>
  );
}
