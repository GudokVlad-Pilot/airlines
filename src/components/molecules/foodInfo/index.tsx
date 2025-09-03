import "./foodInfo.css";
import CustomButton from "@/components/atoms/customButton";
import FoodCardsBox, { FoodCardsBoxProps } from "../foodCardsBox";

type Props = {
  foodCardsBoxes: FoodCardsBoxProps[];
  title: string;
  isOpened?: boolean;
  onClick: () => void;
  nextButtonText: string;
  onNextButtonClick: () => void;
  isNextDisabled: boolean;
  isClickable?: boolean;
};

export default function FoodInfo({
  foodCardsBoxes,
  title,
  isOpened,
  onClick,
  nextButtonText,
  onNextButtonClick,
  isNextDisabled,
  isClickable,
}: Props) {
  return (
    <div
      className={`foodInfoBox ${isOpened ? "opened" : ""}`}
      style={{ cursor: isClickable ? "pointer" : "default" }}
      onClick={() => {
        if (!isOpened && isClickable) onClick();
      }}
    >
      <div className="foodInfoHeader">
        <div className="foodInfoTitle">{title}</div>
      </div>

      {isOpened && (
        <div className="foodInfoContent">
          <div className="foodInfoData">
            {foodCardsBoxes.map((f, index) => (
              <FoodCardsBox key={index} {...f} />
            ))}
          </div>
          <div className="foodInfoButtons">
            {/* <CustomButton
              title={continueWithoutMealText}
              onClick={oncontinueWithoutMealButtonClick}
            /> */}
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
