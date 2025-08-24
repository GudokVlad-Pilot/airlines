import FlightCardColumn from ".";

export default {
  title: "molecules/FlightCardColumn",
  component: FlightCardColumn,
};

const cards = [
  {
    time: "16:00 - 18:30",
    flightTime: "2h 30m",
    connections: "Direct",
    price: "240$",
    onClick: () => console.log("I am Example"),
  },
  {
    time: "16:00 - 18:30",
    flightTime: "2h 30m",
    connections: "Direct",
    price: "240$",
    onClick: () => console.log("I am Example"),
  },
  {
    time: "16:00 - 18:30",
    flightTime: "2h 30m",
    connections: "Direct",
    price: "240$",
    onClick: () => console.log("I am Example"),
  },
  {
    time: "16:00 - 18:30",
    flightTime: "2h 30m",
    connections: "Direct",
    price: "240$",
    onClick: () => console.log("I am Example"),
  },
  {
    time: "16:00 - 18:30",
    flightTime: "2h 30m",
    connections: "Direct",
    price: "240$",
    onClick: () => console.log("I am Example"),
  },
  {
    time: "16:00 - 18:30",
    flightTime: "2h 30m",
    connections: "Direct",
    price: "240$",
    onClick: () => console.log("I am Example"),
  },
];

export const Default = {
  args: {
    origin: "FromFromFrom",
    destination: "ToToTo",
    flightCards: cards,
  },
};

export const NoCards = {
  args: {
    origin: "FromFromFrom",
    destination: "ToToTo",
  },
};
