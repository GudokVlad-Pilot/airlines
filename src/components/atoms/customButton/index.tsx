import "./customButton.css";

export type CustomButtonProps = {
  title: string;
  onClick: () => void;
  isDisabled?: boolean;

  // Background colors
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  activeBackgroundColor?: string;
  disabledBackgroundColor?: string;

  // Text colors
  textColor?: string;
  hoverTextColor?: string;
  activeTextColor?: string;
  disabledTextColor?: string;
};

export default function CustomButton({
  title,
  onClick,
  isDisabled,
  backgroundColor,
  hoverBackgroundColor,
  activeBackgroundColor,
  disabledBackgroundColor,
  textColor,
  hoverTextColor,
  activeTextColor,
  disabledTextColor,
}: CustomButtonProps) {
  return (
    <button
      className="customButtonBox"
      onClick={onClick}
      disabled={isDisabled}
      style={
        {
          "--btn-bg": backgroundColor,
          "--btn-bg-hover": hoverBackgroundColor,
          "--btn-bg-active": activeBackgroundColor,
          "--btn-bg-disabled": disabledBackgroundColor,
          "--btn-color": textColor,
          "--btn-color-hover": hoverTextColor,
          "--btn-color-active": activeTextColor,
          "--btn-color-disabled": disabledTextColor,
        } as React.CSSProperties
      }
    >
      {title}
    </button>
  );
}
