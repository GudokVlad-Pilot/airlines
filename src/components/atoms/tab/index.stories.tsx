import Tab from ".";

export default {
  title: "atoms/Tab",
  component: Tab,
};

export const Default = {
  args: {
    title: "One Way",
  },
};

export const NotActive = {
  args: {
    title: "Return",
    notSelected: true,
  },
};
