import CircularProgress from "@mui/material/CircularProgress";
import "./customButton.css";
import { colors } from "@/components/styles/colors";

export type CustomButtonProps = {
  title: string;
  onClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;

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
  isLoading,
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
      onClick={() => {
        if (!isLoading && !isDisabled) onClick();
      }}
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
      {isLoading ? (
        <CircularProgress
          className="customButtonLoader"
          style={{ color: textColor || colors.basic }}
          size={20}
        />
      ) : (
        title
      )}
    </button>
  );
}
