import PassengerInfoContent, {
  PassengerInfoContentProps,
} from "@/components/atoms/passengerInfoContent";
import "./passengerInfo.css";
import CustomButton from "@/components/atoms/customButton";

type Props = {
  passengers: PassengerInfoContentProps[];
  title: string;
  isOpened?: boolean;
  onClick: () => void;
  addPassangerButtonText: string;
  nextButtonText: string;
  onAddPassangerButtonClick: () => void;
  onNextButtonClick: () => void;
  isNextDisabled: boolean;
};

export default function PassengerInfo({
  title,
  isOpened,
  onClick,
  passengers,
  addPassangerButtonText,
  nextButtonText,
  onAddPassangerButtonClick,
  onNextButtonClick,
  isNextDisabled,
}: Props) {
  return (
    <div
      className={`passengerInfoBox ${isOpened ? "opened" : ""}`}
      onClick={() => {
        if (!isOpened) onClick();
      }}
    >
      <div className="passengerInfoHeader">
        <div className="passengerInfoTitle">{title}</div>
      </div>

      {isOpened && (
        <div className="passengerInfoContent">
          <div className="passengerInfoData">
            {passengers.map((p, index) => (
              <PassengerInfoContent key={index} {...p} />
            ))}
          </div>

          <div className="passengerInfoButtons">
            <CustomButton
              title={addPassangerButtonText}
              onClick={onAddPassangerButtonClick}
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
