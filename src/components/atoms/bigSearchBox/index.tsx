import { colors } from "@/components/styles/colors";
import { GoArrowRight } from "react-icons/go";
import "./bigSearchBox.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
  onOriginChange?: (value: string) => void;
  destination?: string;
  onDestinationChange?: (value: string) => void;
  startDate?: Dayjs | null;
  onStartDateChange?: (date: Dayjs | null) => void;
  endDate?: Dayjs | null;
  onEndDateChange?: (date: Dayjs | null) => void;
  onClick?: () => void;
  locale?: string;
  cityOptions: string[];
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
  cityOptions,
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
          {/* ORIGIN AUTOCOMPLETE */}
          <Autocomplete
            freeSolo
            options={cityOptions}
            value={origin || ""}
            onInputChange={(event, newValue) => onOriginChange?.(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                className="searchInput"
                label={originPlaceholder}
                sx={{
                  width: 200,
                  mr: 2,
                  ml: 2,
                  "& .MuiInputBase-root": {
                    height: 50,
                    color: basicColor || colors.basic,
                    borderRadius: 20,
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
            )}
          />

          {/* DESTINATION AUTOCOMPLETE */}
          <Autocomplete
            freeSolo
            options={cityOptions}
            value={destination || ""}
            onInputChange={(event, newValue) => onDestinationChange?.(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                className="searchInput"
                label={destinationPlaceholder}
                sx={{
                  width: 200,
                  mr: 2,
                  "& .MuiInputBase-root": {
                    height: 50,
                    color: basicColor || colors.basic,
                    borderRadius: 20,
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
            )}
          />

          {/* START DATE PICKER */}
          <DatePicker
            label={startPlaceholder}
            value={startDate}
            onChange={onStartDateChange}
            slotProps={{
              textField: {
                sx: {
                  width: 135,
                  mr: 2,
                  "& .MuiInputBase-root": {
                    height: 50,
                    color: basicColor || colors.basic,
                    borderRadius: 20,
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
                },
              },
            }}
          />

          {/* RETURN DATE PICKER */}
          {isReturn && (
            <DatePicker
              label={endPlaceholder}
              value={endDate}
              onChange={onEndDateChange}
              slotProps={{
                textField: {
                  sx: {
                    width: 135,
                    mr: 2,
                    "& .MuiInputBase-root": {
                      height: 50,
                      color: basicColor || colors.basic,
                      borderRadius: 20,
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
                  },
                },
              }}
            />
          )}
        </div>

        {/* SEARCH BUTTON */}
        <button className="searchButton" onClick={onClick}>
          <GoArrowRight />
        </button>
      </div>
    </LocalizationProvider>
  );
}
