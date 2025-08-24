import SmallSearchBox from ".";

export default {
  title: "atoms/SmallSearchBox",
  component: SmallSearchBox,
};

export const Default = {
  args: {
    departure: "Helsinki",
    arrival: "Moscow",
    departureDate: "2024-06-04",
    arrivalDate: "2024-06-04",
    onChangeClick: () => null,
  },
};

export const Test = {
  args: {
    departure: "Moscow",
    arrival: "Saint Petersburg",
    departureDate: "2024-06-04",
    arrivalDate: "2024-06-04",
    onChangeClick: () => null,
  },
};
