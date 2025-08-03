import NavBar from ".";

export default {
  title: "molecules/NavBar",
  component: NavBar,
};

export const Default = {
  args: {
    placeholder: "NavBar",
  },
};

export const Custom = {
  args: {
    placeholder: "Custom",
    backgroundColor: "#FFF000",
    basicColor: "red",
  },
};
