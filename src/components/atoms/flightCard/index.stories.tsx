import FlightCard from ".";

export default {
  title: "atoms/FlightCard",
  component: FlightCard,
};

export const Default = {
  args: {
    time: "16:00 - 18:30",
    flightTime: "2h 30m",
    connections: "Direct",
    price: "240$",
    onClick: () => console.log("I am Example"),
  },
};
