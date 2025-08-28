import FlightControlPanel from ".";

export default {
  title: "molecules/FlightControlPanel",
  component: FlightControlPanel,
};

export const Default = {
  args: {
    state: "select",
    flightControlSelectFlight: { title: "Choose you flight" },
    flightControlEditFlight: {
      title: "Changing the search",
      onClick: () => alert("Flight canceled!"),
    },
    flightControlConfirmFlight: {
      title: "Flight Information",
      time: "16:00 - 17:30",
      flightTime: "1h 30m",
      connections: "Direct",
      buttonTitle: "Confirm",
      onClick: () => alert("Flight confirmed!"),
    },
  },
};
