import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import "./smallSearchBox.css";

type Props = {
  departure: string;
  arrival: string;
  departureDate: Date;
  arrivalDate: Date;
};

function formatDate(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-based
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export default function SmallSearchBox({
  departure,
  arrival,
  departureDate,
  arrivalDate,
}: Props) {
  return (
    <div className="box">
      <div className="leftGroup">
        <div className="airportText">{departure}</div>
        <ArrowForwardIcon />
        <div className="airportText">{arrival}</div>
      </div>
      <div className="rightGroup">
        <div className="departureDate">{formatDate(departureDate)}</div>
        <div className="dash">-</div>
        <div className="arrivalDate">{formatDate(arrivalDate)}</div>
        <DriveFileRenameOutlineIcon />
      </div>
    </div>
  );
}
