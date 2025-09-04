import ExtrasCard from ".";

export default {
  title: "atoms/ExtrasCard",
  component: ExtrasCard,
};

export const Default = {
  args: {
    title: "Loungue",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend turpis molestie nunc elementum, eu ullamcorper sem dapibus. Integer tristique enim nec risus vehicula, finibus porta nisl finibus.",
    price: "+200$",
    onClick: () => console.log("I am Example"),
  },
};

export const Selected = {
  args: {
    isSelected: true,
    title: "Loungue",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend turpis molestie nunc elementum, eu ullamcorper sem dapibus. Integer tristique enim nec risus vehicula, finibus porta nisl finibus.",
    price: "+200$",
    onClick: () => console.log("I am Example"),
  },
};
