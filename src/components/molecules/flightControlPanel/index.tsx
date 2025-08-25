import { FlightControlSelectFlightProps } from "@/components/atoms/flightControlSelectFlight";

type Props = {
  FlightControlSelectFlight: FlightControlSelectFlightProps;
};

export default function FlightControlPanel({
  FlightControlSelectFlight,
}: Props) {
  return (
    <div className="FlightControlPanelBox">
      {FlightControlSelectFlight.title}
    </div>
  );
}
