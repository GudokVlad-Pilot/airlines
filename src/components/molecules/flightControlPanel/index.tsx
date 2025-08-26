import FlightControlSelectFlight, {
  FlightControlSelectFlightProps,
} from "@/components/atoms/flightControlSelectFlight";
import "./flightControlPanel.css";
import FlightControlEditFlight, {
  FlightControlEditFlightProps,
} from "@/components/atoms/flightControlEditFlight";
import FlightControlConfirmFlight, {
  FlightControlConfirmFlightProps,
} from "@/components/atoms/flightControlConfirmFlight";

type FlightControlState = "select" | "change" | "confirm";

type Props = {
  state: FlightControlState;
  flightControlSelectFlight: FlightControlSelectFlightProps;
  flightControlEditFlight: FlightControlEditFlightProps;
  flightControlConfirmFlight: FlightControlConfirmFlightProps;
};

export default function FlightControlPanel({
  state,
  flightControlSelectFlight,
  flightControlEditFlight,
  flightControlConfirmFlight,
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
        return (
          <FlightControlConfirmFlight
            title={flightControlConfirmFlight.title}
            onClick={flightControlConfirmFlight.onClick}
            time={flightControlConfirmFlight.time}
            flightTime={flightControlConfirmFlight.flightTime}
            connections={flightControlConfirmFlight.connections}
            buttonTitle={flightControlConfirmFlight.buttonTitle}
          />
        );
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
