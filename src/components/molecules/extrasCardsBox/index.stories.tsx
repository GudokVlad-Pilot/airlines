import ExtrasCardsBox from ".";

export default {
  title: "molecules/ExtrasCardsBox",
  component: ExtrasCardsBox,
};

const cards = [
  {
    title: "Loungue",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend turpis molestie nunc elementum, eu ullamcorper sem dapibus. Integer tristique enim nec risus vehicula, finibus porta nisl finibus.",
    price: "+50$",
    onClick: () => console.log("I am Example"),
  },
  {
    title: "Transfer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend turpis molestie nunc elementum, eu ullamcorper sem dapibus. Integer tristique enim nec risus vehicula, finibus porta nisl finibus.",
    price: "+60$",
    onClick: () => console.log("I am Example"),
  },
  {
    title: "Accomodation",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend turpis molestie nunc elementum, eu ullamcorper sem dapibus. Integer tristique enim nec risus vehicula, finibus porta nisl finibus.",
    price: "+200$",
    onClick: () => console.log("I am Example"),
  },
];

export const Default = {
  args: {
    title: "Passanger 1",
    extrasCards: cards,
  },
};
