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
}: PassengerConfirmationCardProps) {
  return (
    <div className="passengerConfirmationCardBox">
      <div className="passengerConfirmationCardTitle">{title}</div>
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
  );
}
