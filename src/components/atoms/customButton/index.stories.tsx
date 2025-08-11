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
