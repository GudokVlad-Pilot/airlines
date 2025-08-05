import SmallSearchBox from ".";

export default {
  title: "atoms/SmallSearchBox",
  component: SmallSearchBox,
};

export const Default = {
  args: {
    departure: "Helsinki",
    arrival: "Moscow",
    departureDate: new Date("2024-06-04"),
    arrivalDate: new Date("2024-06-04"),
    onChangeClick: () => null,
  },
};

export const Test = {
  args: {
    departure: "Moscow",
    arrival: "Saint Petersburg",
    departureDate: new Date("2025-08-25"),
    arrivalDate: new Date("2025-08-26"),
    onChangeClick: () => null,
  },
};
