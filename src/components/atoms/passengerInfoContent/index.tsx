import "./passengerInfoContent.css";

export type PassengerInfoContentProps = {
  title: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  firstNameTitle: string;
  lastNameTitle: string;
  phoneTitle: string;
  emailTitle: string;
  firstNameValue: string;
  lastNameValue: string;
  emailValue: string;
  phoneValue: string;
  onFirstNameValueChange: (value: string) => void;
  onLastNameValueChange: (value: string) => void;
  onEmailValueChange: (value: string) => void;
  onPhoneValueChange: (value: string) => void;
};

export default function PassengerInfoContent({
  title,
  firstNamePlaceholder,
  lastNamePlaceholder,
  emailPlaceholder,
  phonePlaceholder,
  firstNameTitle,
  lastNameTitle,
  emailTitle,
  phoneTitle,
  firstNameValue,
  lastNameValue,
  emailValue,
  phoneValue,
  onFirstNameValueChange,
  onLastNameValueChange,
  onEmailValueChange,
  onPhoneValueChange,
}: PassengerInfoContentProps) {
  return (
    <div className="passengerInfoContentBox">
      <div className="passengerInfoContentTitle">{title}</div>
      <div className="passengerInfoContentName">
        <div className="passangerInfoContentInputBox">
          <div className="passangerInfoContentInputTitle">{firstNameTitle}</div>
          <input
            className="passangerInfoContentNameInput"
            type="text"
            placeholder={firstNamePlaceholder}
            value={firstNameValue}
            onChange={(e) => onFirstNameValueChange(e.target.value)}
          />
        </div>
        <div className="passangerInfoContentInputBox">
          <div className="passangerInfoContentInputTitle">{lastNameTitle}</div>
          <input
            className="passangerInfoContentNameInput"
            type="text"
            placeholder={lastNamePlaceholder}
            value={lastNameValue}
            onChange={(e) => onLastNameValueChange(e.target.value)}
          />
        </div>
      </div>
      <div className="passengerInfoContentEmail">
        <div className="passangerInfoContentInputBox">
          <div className="passangerInfoContentInputTitle">{emailTitle}</div>
          <input
            className="passangerInfoContentEmailInput"
            type="text"
            placeholder={emailPlaceholder}
            value={emailValue}
            onChange={(e) => onEmailValueChange(e.target.value)}
          />
        </div>
      </div>
      <div className="passengerInfoContentPhone">
        <div className="passangerInfoContentInputBox">
          <div className="passangerInfoContentInputTitle">{phoneTitle}</div>
          <input
            className="passangerInfoContentPhoneInput"
            type="tel"
            placeholder={phonePlaceholder}
            pattern="^\+[0-9]*$"
            value={phoneValue}
            onChange={(e) => onPhoneValueChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
