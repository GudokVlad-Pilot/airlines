import CustomButton from ".";

export default {
  title: "atoms/CustomButton",
  component: CustomButton,
};

export const Default = {
  args: {
    title: "+ button",
    onClick: () => null,
  },
};

export const Disabled = {
  args: {
    title: "- button",
    onClick: () => null,
    isDisabled: true,
  },
};

export const CustomTheme = {
  args: {
    title: "Happy New Year!",
    onClick: () => null,
    textColor: "#FFD700", // Gold text
    backgroundColor: "#001F4D", // Deep midnight blue bg
    hoverTextColor: "#FFFFFF", // White text on hover
    hoverBackgroundColor: "#27408B", // Lighter blue hover bg
    activeTextColor: "#FFFACD", // Light gold active text
    activeBackgroundColor: "#FFB300", // Bright gold active bg
    disabledTextColor: "#666666",
    disabledBackgroundColor: "#222222",
  },
};
