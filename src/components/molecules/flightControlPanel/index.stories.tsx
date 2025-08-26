import FlightControlPanel from ".";

export default {
  title: "molecules/FlightControlPanel",
  component: FlightControlPanel,
};

export const Default = {
  args: {
    state: "select",
    flightControlSelectFlight: { title: "title" },
    flightControlEditFlight: {
      title: "title",
      onClick: () => alert("Flight canceled!"),
    },
  },
};
