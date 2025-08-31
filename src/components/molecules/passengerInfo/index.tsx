import "./passengerInfo.css";

type Props = {
  title: string;
  isOpened?: boolean;
  onClick: () => void;
};

export default function PassengerInfo({ title, isOpened, onClick }: Props) {
  return (
    <div
      className={`passengerInfoBox ${isOpened ? "opened" : ""}`}
      onClick={onClick}
    >
      <div className="passengerInfoTitle">{title}</div>

      {isOpened && (
        <div className="passengerInfoContent">
          <div className="passengerInfoData">Content</div>
          <div className="passangerInfoButtons">Buttons</div>
        </div>
      )}
    </div>
  );
}
