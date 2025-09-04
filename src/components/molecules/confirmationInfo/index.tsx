import "./confirmationInfo.css";
import CustomButton from "@/components/atoms/customButton";
import PassengerConfirmationCard, {
  PassengerConfirmationCardProps,
} from "@/components/atoms/passengerConfirmationCard";

type Props = {
  passengerConfirmationCards: PassengerConfirmationCardProps[];
  title: string;
  isOpened?: boolean;
  onClick: () => void;
  nextButtonText: string;
  onNextButtonClick: () => void;
  isNextDisabled: boolean;
  continueEditingText: string;
  onContinueEditingButtonClick: () => void;
  pricePlaceholder: string;
  price: string;
  isClickable?: boolean;
};

export default function ConfirmationInfo({
  passengerConfirmationCards,
  title,
  isOpened,
  onClick,
  nextButtonText,
  onNextButtonClick,
  isNextDisabled,
  continueEditingText,
  onContinueEditingButtonClick,
  pricePlaceholder,
  price,
  isClickable,
}: Props) {
  return (
    <div
      className={`confirmationInfoBox ${isOpened ? "opened" : ""}`}
      style={{ cursor: isClickable ? "pointer" : "default" }}
      onClick={() => {
        if (!isOpened && isClickable) onClick();
      }}
    >
      <div className="confirmationInfoHeader">
        <div className="confirmationInfoTitle">{title}</div>
      </div>

      {isOpened && (
        <div className="confirmationInfoContent">
          <div className="confirmationInfoData">
            {passengerConfirmationCards.map((f, index) => (
              <PassengerConfirmationCard key={index} {...f} />
            ))}
          </div>
          <div className="confirmationInfoPrice">
            {pricePlaceholder}: {price}
          </div>
          <div className="confirmationInfoButtons">
            <CustomButton
              title={continueEditingText}
              onClick={onContinueEditingButtonClick}
            />
            <CustomButton
              title={nextButtonText}
              onClick={onNextButtonClick}
              isDisabled={isNextDisabled}
            />
          </div>
        </div>
      )}
    </div>
  );
}
