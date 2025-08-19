import { colors } from "@/components/styles/colors";
import { GoArrowRight } from "react-icons/go";
import "./bigSearchBox.css";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

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
  startDate?: Dayjs | null;
  onStartDateChange?: () => void;
  endDate?: Dayjs | null;
  onEndDateChange?: () => void;
  onClick?: () => void;
  locale?: string;
};

export default function BigSearchBox({
  isReturn,
  backgroundColor,
  basicColor,
  accentColor,
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
  onClick,
  locale,
}: BigSearchBoxProps) {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={locale || "en"}
    >
      <div
        className="bigSearchBoxBox"
        style={{ backgroundColor: backgroundColor || colors.secondary }}
      >
        <div className="bigSearchBoxInputs">
          <TextField
            className="searchInput"
            label={originPlaceholder}
            value={origin}
            onChange={onOriginChange}
            sx={{
              width: 200,
              "& .MuiInputBase-root": {
                height: 50,
                color: basicColor || colors.basic,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: accentColor || colors.primaryLight,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: accentColor || colors.primaryLight,
              },
              "& .MuiInputLabel-root": {
                color: accentColor || colors.primaryLight,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: accentColor || colors.primaryLight,
              },
            }}
          />
          <TextField
            className="searchInput"
            label={destinationPlaceholder}
            value={destination}
            onChange={onDestinationChange}
            sx={{
              width: 200,
              "& .MuiInputBase-root": {
                height: 50,
                color: basicColor || colors.basic,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: accentColor || colors.primaryLight,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: accentColor || colors.primaryLight,
              },
              "& .MuiInputLabel-root": {
                color: accentColor || colors.primaryLight,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: accentColor || colors.primaryLight,
              },
            }}
          />
          <DatePicker
            label={startPlaceholder}
            value={startDate}
            onChange={onStartDateChange}
            slotProps={{
              textField: {
                sx: {
                  width: 200,
                  "& .MuiInputBase-root": {
                    height: 50,
                    color: basicColor || colors.basic,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: accentColor || colors.primaryLight, // border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: accentColor || colors.primaryLight, // keep same on hover
                  },
                  "& .MuiInputLabel-root": {
                    color: accentColor || colors.primaryLight, // label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: accentColor || colors.primaryLight, // label color when focused
                  },
                },
              },
            }}
          />
          {isReturn && (
            <DatePicker
              label={endPlaceholder}
              value={endDate}
              onChange={onEndDateChange}
            />
          )}
        </div>
        <button className="searchButton" onClick={onClick}>
          <GoArrowRight />
        </button>
      </div>
    </LocalizationProvider>
  );
}
