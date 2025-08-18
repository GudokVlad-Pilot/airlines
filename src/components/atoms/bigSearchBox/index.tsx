import { colors } from "@/components/styles/colors";
import { GoArrowRight } from "react-icons/go";
import "./bigSearchBox.css";

export type BigSearchBoxProps = {
  isReturn?: boolean;
  backgroundColor?: string;
  basicColor?: string;
  accentColor?: string;
  originPlaceholder: string;
  destinationPlaceholder: string;
  startPlaceholder: string;
  endPlaceholder: string;
  origin?: string;
  onOriginChange?: () => void;
  destination?: string;
  onDestinationChange?: () => void;
  startDate?: string;
  onStartDateChange?: () => void;
  endDate?: string;
  onEndDateChange?: () => void;
};

export default function BigSearchBox({
  isReturn,
  backgroundColor,
  originPlaceholder,
  destinationPlaceholder,
  startPlaceholder,
  endPlaceholder,
  origin,
  onOriginChange,
  destination,
  onDestinationChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: BigSearchBoxProps) {
  return (
    <div
      className="bigSearchBoxBox"
      style={{ backgroundColor: backgroundColor || colors.secondary }}
    >
      <div className="bigSearchBoxInputs">
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={onOriginChange}
          className="searchInput"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={onDestinationChange}
          className="searchInput"
        />
        <input
          type="date"
          value={startDate}
          onChange={onStartDateChange}
          className="dateInput"
        />
        {isReturn && (
          <input
            type="date"
            value={endDate}
            onChange={onEndDateChange}
            className="dateInput"
          />
        )}
      </div>
      <button className="searchButton">
        <GoArrowRight />
      </button>
    </div>
  );
}
