import PassengerInfoContent, {
  PassengerInfoContentProps,
} from "@/components/atoms/passengerInfoContent";
import "./foodInfo.css";
import CustomButton from "@/components/atoms/customButton";

type Props = {
  passengers: PassengerInfoContentProps[];
  title: string;
  isOpened?: boolean;
  onClick: () => void;
  continueWithoutMealText: string;
  nextButtonText: string;
  oncontinueWithoutMealButtonClick: () => void;
  onNextButtonClick: () => void;
  isNextDisabled: boolean;
};

export default function FoodInfo({
  title,
  isOpened,
  onClick,
  passengers,
  continueWithoutMealText,
  nextButtonText,
  oncontinueWithoutMealButtonClick,
  onNextButtonClick,
  isNextDisabled,
}: Props) {
  return (
    <div
      className={`foodInfoBox ${isOpened ? "opened" : ""}`}
      onClick={() => {
        if (!isOpened) onClick();
      }}
    >
      <div className="foodInfoHeader">
        <div className="foodInfoTitle">{title}</div>
      </div>

      {isOpened && (
        <div className="foodInfoContent">
          <div className="foodInfoData">
            {passengers.map((p, index) => (
              <PassengerInfoContent key={index} {...p} />
            ))}
          </div>

          <div className="foodInfoButtons">
            <CustomButton
              title={continueWithoutMealText}
              onClick={oncontinueWithoutMealButtonClick}
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
