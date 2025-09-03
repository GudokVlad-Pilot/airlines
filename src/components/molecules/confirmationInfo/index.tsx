import "./confirmationInfo.css";
import CustomButton from "@/components/atoms/customButton";
import ExtrasCardsBox, { ExtrasCardsBoxProps } from "../extrasCardsBox";

type Props = {
  //   extrasCardsBoxes: ExtrasCardsBoxProps[];
  title: string;
  isOpened?: boolean;
  onClick: () => void;
  nextButtonText: string;
  onNextButtonClick: () => void;
  isNextDisabled: boolean;
  continueEditingText: string;
  onContinueEditingButtonClick: () => void;
};

export default function ConfirmationInfo({
  //   extrasCardsBoxes,
  title,
  isOpened,
  onClick,
  nextButtonText,
  onNextButtonClick,
  isNextDisabled,
  continueEditingText,
  onContinueEditingButtonClick,
}: Props) {
  return (
    <div
      className={`confirmationInfoBox ${isOpened ? "opened" : ""}`}
      onClick={() => {
        if (!isOpened) onClick();
      }}
    >
      <div className="confirmationInfoHeader">
        <div className="confirmationInfoTitle">{title}</div>
      </div>

      {isOpened && (
        <div className="confirmationInfoContent">
          {/* <div className="confirmationInfoData">
            {extrasCardsBoxes.map((f, index) => (
              <ExtrasCardsBox key={index} {...f} />
            ))}
          </div> */}
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
