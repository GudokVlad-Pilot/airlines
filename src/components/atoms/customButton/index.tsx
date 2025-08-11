import "./customButton.css";

export type CustomButtonProps = {
  title: string;
  onClick: () => void;
  isDisabled?: boolean;
};

export default function CustomButton({
  title,
  onClick,
  isDisabled,
}: CustomButtonProps) {
  return (
    <button className="customButtonBox" onClick={onClick} disabled={isDisabled}>
      <div className="customButtonText">{title}</div>
    </button>
  );
}
