import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import "./smallSearchBox.css";
import { colors } from "@/components/styles/colors";

type Props = {
  backgroundColor?: string;
  basicColor?: string;
  accentColor?: string;
  departure: string;
  arrival: string;
  departureDate: string;
  arrivalDate: string;
  onChangeClick: () => void;
};

export default function SmallSearchBox({
  accentColor,
  basicColor,
  backgroundColor,
  departure,
  arrival,
  departureDate,
  arrivalDate,
  onChangeClick,
}: Props) {
  return (
    <div
      className="smallSearchBoxBox"
      style={{ backgroundColor: backgroundColor || colors.secondary }}
    >
      <div className="leftGroup" style={{ color: basicColor || colors.basic }}>
        <div className="airportText">{departure}</div>
        <ArrowForwardIcon className="arrowIcon" />
        <div className="airportText">{arrival}</div>
      </div>
      <div className="rightGroup">
        <div className="departureDate">{departureDate}</div>
        <div className="dash">-</div>
        <div className="arrivalDate">{arrivalDate}</div>
        <button className="changeButton" onClick={onChangeClick}>
          <DriveFileRenameOutlineIcon className="changeIcon" />
        </button>
      </div>
    </div>
  );
}
