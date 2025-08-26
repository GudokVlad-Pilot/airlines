import FlightControlConfirmFlight from ".";

export default {
  title: "atoms/FlightControlConfirmFlight",
  component: FlightControlConfirmFlight,
};

export const Default = {
  args: {
    title: "Flight Confirmation",
    time: "16:00 - 17:30",
    flightTime: "1h 30m",
    connections: "Direct",
    buttonTitle: "Confirm",
    onClick: () => console.log("Confirm"),
  },
};
