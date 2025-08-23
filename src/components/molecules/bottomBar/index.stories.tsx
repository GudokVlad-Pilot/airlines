import BottomBar from ".";

export default {
  title: "molecules/BottomBar",
  component: BottomBar,
};

export const Default = {
  args: {
    copyright: "© Copyright 2025 Fox Airlines. All rights reserved.",
    createdby: "Created by",
  },
};

export const Custom = {
  args: {
    placeholder: "Custom",
    backgroundColor: "red",
    basicColor: "#FFF000",
  },
};
