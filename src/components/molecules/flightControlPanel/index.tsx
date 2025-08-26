import FlightControlSelectFlight, {
  FlightControlSelectFlightProps,
} from "@/components/atoms/flightControlSelectFlight";
import "./flightControlPanel.css";
import FlightControlEditFlight, {
  FlightControlEditFlightProps,
} from "@/components/atoms/flightControlEditFlight";

type FlightControlState = "select" | "change" | "confirm";

type Props = {
  state: FlightControlState;
  flightControlSelectFlight: FlightControlSelectFlightProps;
  flightControlEditFlight: FlightControlEditFlightProps;
};

export default function FlightControlPanel({
  state,
  flightControlSelectFlight,
  flightControlEditFlight,
}: Props) {
  const renderContent = () => {
    switch (state) {
      case "select":
        return (
          <FlightControlSelectFlight title={flightControlSelectFlight.title} />
        );
      case "change":
        return (
          <FlightControlEditFlight
            title={flightControlEditFlight.title}
            onClick={flightControlEditFlight.onClick}
          />
        );
      case "confirm":
        return <div>confirm</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flightControlPanelBox">
      <div className="flightControlPanelContent">{renderContent()}</div>
    </div>
  );
}
