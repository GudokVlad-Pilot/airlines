import "./flightControlSelectFlight.css";

export type FlightControlSelectFlightProps = {
  title: string;
};

export default function FlightControlSelectFlight({
  title,
}: FlightControlSelectFlightProps) {
  return (
    <div className="flightControlSelectFlightBox">
      <div className="flightControlSelectFlightTitle">{title}</div>
    </div>
  );
}
