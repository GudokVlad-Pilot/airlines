import "./passengerInfoContent.css";

export type Props = {
  title: string;
  firstNameTitle: string;
  lastNameTitle: string;
  phoneTitle: string;
  emailTitle: string;
};

export default function PassengerInfoContent({
  title,
  firstNameTitle,
  lastNameTitle,
  emailTitle,
  phoneTitle,
}: Props) {
  return (
    <div className="passengerInfoContentBox">
      <div className="passengerInfoContentTitle">{title}</div>
      <div className="passengerInfoContentName">
        <div className="passangerInfoContentInputBox">
          <div className="passangerInfoContentInputTitle">{firstNameTitle}</div>
          <input
            className="passangerInfoContentNameInput"
            type="text"
            placeholder="John"
          />
        </div>
        <div className="passangerInfoContentInputBox">
          <div className="passangerInfoContentInputTitle">{lastNameTitle}</div>
          <input
            className="passangerInfoContentNameInput"
            type="text"
            placeholder="Smith"
          />
        </div>
      </div>
      <div className="passengerInfoContentEmail">
        <div className="passangerInfoContentInputBox">
          <div className="passangerInfoContentInputTitle">{emailTitle}</div>
          <input
            className="passangerInfoContentEmailInput"
            type="text"
            placeholder="example@email.com"
          />
        </div>
      </div>
      <div className="passengerInfoContentPhone">
        <div className="passangerInfoContentInputBox">
          <div className="passangerInfoContentInputTitle">{phoneTitle}</div>
          <input
            className="passangerInfoContentPhoneInput"
            type="tel"
            placeholder="+1234567890"
            pattern="^\+[0-9]*$"
          />
        </div>
      </div>
    </div>
  );
}
