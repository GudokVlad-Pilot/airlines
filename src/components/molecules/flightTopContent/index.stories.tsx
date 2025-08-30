import FlightTopContent from ".";

export default {
  title: "molecules/FlightTopContent",
  component: FlightTopContent,
};

const card = {
  time: "16:00 - 18:30",
  flightTime: "2h 30m",
  connections: "Direct",
  price: "240$",
  onClick: () => console.log("I am Example"),
};

export const Default = {
  args: {
    origin: "FromFromFrom",
    destination: "ToToTo",
    changeButtonTitle: "Change",
    changeButtonClick: () => null,
    flightCard: card,
  },
};

export const NoCards = {
  args: {
    origin: "FromFromFrom",
    destination: "ToToTo",
    changeButtonTitle: "Change",
    changeButtonClick: () => null,
  },
};
