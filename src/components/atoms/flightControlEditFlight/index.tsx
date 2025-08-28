import "./flightControlEditFlight.css";
import { IoIosCloseCircle } from "react-icons/io";

export type FlightControlEditFlightProps = {
  title: string;
  onClick: () => void;
};

export default function FlightControlEditFlight({
  title,
  onClick,
}: FlightControlEditFlightProps) {
  return (
    <div className="flightControlEditFlightBox">
      <div className="flightControlEditFlightTitle">{title}</div>
      <IoIosCloseCircle
        size={50}
        className="flightControlEditFlightIcon"
        onClick={onClick}
      />
    </div>
  );
}
