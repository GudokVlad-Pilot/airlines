import { IoIosTime } from "react-icons/io";
import "./flightControlConfirmFlight.css";
import { IoAirplane } from "react-icons/io5";
import CustomButton from "../customButton";

export type FlightControlConfirmFlightProps = {
  title: string;
  time: string;
  flightTime: string;
  connections: string;
  buttonTitle: string;
  onClick: () => void;
};

export default function FlightControlConfirmFlight({
  title,
  time,
  flightTime,
  connections,
  buttonTitle,
  onClick,
}: FlightControlConfirmFlightProps) {
  return (
    <div className="flightControlConfirmFlightBox">
      <div className="flightControlConfirmFlightTitle">{title}</div>
      <div className="flightControlConfirmFlightInfo">
        <div className="flightControlConfirmFlightTime">{time}</div>
        <div className="flightControlConfirmFlightLabel">
          <IoIosTime
            size={20}
            className="flightControlConfirmFlightLabelIcon"
          />
          {flightTime}
        </div>
        <div className="flightControlConfirmFlightLabel">
          <IoAirplane
            size={20}
            className="flightControlConfirmFlightLabelIcon"
          />
          {connections}
        </div>
      </div>
      <div className="flightControlConfirmFlightButton">
        <CustomButton title={buttonTitle} onClick={onClick} />
      </div>
    </div>
  );
}
