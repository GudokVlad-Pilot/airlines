import BottomBar from ".";

export default {
  title: "molecules/BottomBar",
  component: BottomBar,
};

export const Default = {
  args: {
    placeholder: "bottomBar",
  },
};

export const Custom = {
  args: {
    placeholder: "Custom",
    backgroundColor: "red",
    basicColor: "#FFF000",
  },
};
