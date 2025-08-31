import PassengerInfoContent, {
  PassengerInfoContentProps,
} from "@/components/atoms/passengerInfoContent";
import "./passengerInfo.css";
import CustomButton from "@/components/atoms/customButton";

type Props = {
  passengerInfoData: PassengerInfoContentProps;
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
  passengerInfoData,
  addPassangerButtonText,
  nextButtonText,
  onAddPassangerButtonClick,
  onNextButtonClick,
  isNextDisabled,
}: Props) {
  return (
    <div
      className={`passengerInfoBox ${isOpened ? "opened" : ""}`}
      onClick={onClick}
    >
      <div className="passengerInfoHeader">
        <div className="passengerInfoTitle">{title}</div>
      </div>

      {isOpened && (
        <div className="passengerInfoContent">
          <div className="passengerInfoData">
            <PassengerInfoContent {...passengerInfoData} />
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
