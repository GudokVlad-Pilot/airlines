import FlightControlEditFlight from ".";

export default {
  title: "atoms/FlightControlEditFlight",
  component: FlightControlEditFlight,
};

export const Default = {
  args: {
    title: "Changing the search",
    onClick: () => console.log("Close"),
  },
};
