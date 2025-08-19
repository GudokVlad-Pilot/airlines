import BigSearchBox from ".";

export default {
  title: "atoms/BigSearchBox",
  component: BigSearchBox,
};

export const Default = {
  args: {
    originPlaceholder: "Origin",
    destinationPlaceholder: "Destination",
    startPlaceholder: "Departure Date",
    endPlaceholder: "Arrival Date",
    isReturn: true,
    origin: "",
    onOriginChange: () => null,
    destination: "",
    onDestinationChange: () => null,
    startDate: null,
    onStartDateChange: () => null,
    endDate: null,
    onEndDateChange: () => null,
    locale: null,
  },
};

export const OneWay = {
  args: {
    originPlaceholder: "Origin",
    destinationPlaceholder: "Destination",
    startPlaceholder: "Departure Date",
    endPlaceholder: "Arrival Date",
    isReturn: false,
    origin: "",
    onOriginChange: () => null,
    destination: "",
    onDestinationChange: () => null,
    startDate: null,
    onStartDateChange: () => null,
    endDate: null,
    onEndDateChange: () => null,
  },
};

export const Custom = {
  args: {
    originPlaceholder: "Origin",
    destinationPlaceholder: "Destination",
    startPlaceholder: "Departure Date",
    endPlaceholder: "Arrival Date",
    isReturn: true,
    origin: "",
    onOriginChange: () => null,
    destination: "",
    onDestinationChange: () => null,
    startDate: null,
    onStartDateChange: () => null,
    endDate: null,
    onEndDateChange: () => null,
    backgroundColor: "#FF00FF",
    accentColor: "#00FF00",
    basicColor: "#000FFF",
  },
};
