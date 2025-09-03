import "./extrasInfo.css";
import CustomButton from "@/components/atoms/customButton";
import ExtrasCardsBox, { ExtrasCardsBoxProps } from "../extrasCardsBox";

type Props = {
  extrasCardsBoxes: ExtrasCardsBoxProps[];
  title: string;
  isOpened?: boolean;
  onClick: () => void;
  nextButtonText: string;
  onNextButtonClick: () => void;
  isNextDisabled: boolean;
  // continueWithoutExtrasText: string;
  // onContinueWithoutExtrasButtonClick: () => void;
};

export default function ExtrasInfo({
  extrasCardsBoxes,
  title,
  isOpened,
  onClick,
  nextButtonText,
  onNextButtonClick,
  isNextDisabled,
}: Props) {
  return (
    <div
      className={`extrasInfoBox ${isOpened ? "opened" : ""}`}
      onClick={() => {
        if (!isOpened) onClick();
      }}
    >
      <div className="extrasInfoHeader">
        <div className="extrasInfoTitle">{title}</div>
      </div>

      {isOpened && (
        <div className="extrasInfoContent">
          <div className="extrasInfoData">
            {extrasCardsBoxes.map((f, index) => (
              <ExtrasCardsBox key={index} {...f} />
            ))}
          </div>
          <div className="extrasInfoButtons">
            {/* <CustomButton
              title={continueWithoutExtrasText}
              onClick={onContinueWithoutExtrasButtonClick}
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
