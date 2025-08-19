import SearchBoxMain from ".";

export default {
  title: "molecules/SearchBoxMain",
  component: SearchBoxMain,
};

export const Default = {
  args: {
    title: "Search",
    bigSearchBox: {
      title: "Where do you want to fly?",
    },
    tabs: [
      {
        title: "Flights",
        onClick: () => console.log("Flights tab clicked"),
      },
      {
        title: "Hotels",
        notSelected: true,
        onClick: () => console.log("Hotels tab clicked"),
      },
    ],
  },
};
