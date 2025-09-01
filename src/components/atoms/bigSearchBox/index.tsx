import { colors } from "@/components/styles/colors";
import { FaArrowRightLong } from "react-icons/fa6";
import "./bigSearchBox.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { Airport } from "@/adapters/types";
import CircularProgress from "@mui/material/CircularProgress";

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
  locale?: "en" | "ru" | "fi";
  airports: Airport[];
  destinations?: Airport[];
  isLoading?: boolean;
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
  airports,
  destinations,
  isLoading,
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
            options={airports}
            getOptionLabel={(option) =>
              `${option.city[locale || "en"]} (${option.iata})`
            }
            value={airports.find((a) => a.iata === origin) || null}
            onChange={(e, newValue) =>
              onOriginChange?.(newValue ? newValue.iata : "")
            }
            renderOption={(props, option) => {
              const { key, ...rest } = props; // remove key from spread
              return (
                <li key={key} {...rest}>
                  {option.city[locale || "en"]},{" "}
                  {option.country[locale || "en"]} ({option.iata})
                </li>
              );
            }}
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
                  "& .MuiSvgIcon-root": {
                    color: accentColor || colors.primaryLight,
                  },
                }}
              />
            )}
          />

          {/* DESTINATION AUTOCOMPLETE */}
          <Autocomplete
            options={
              destinations && destinations.length > 0 ? destinations : airports
            } // ✅ use filtered list
            getOptionLabel={(option) =>
              `${option.city[locale || "en"]} (${option.iata})`
            }
            value={
              (destinations &&
                destinations.find((a) => a.iata === destination)) ||
              airports.find((a) => a.iata === destination) ||
              null
            }
            onChange={(e, newValue) =>
              onDestinationChange?.(newValue ? newValue.iata : "")
            }
            renderOption={(props, option) => {
              const { key, ...rest } = props;
              return (
                <li key={key} {...rest}>
                  {option.city[locale || "en"]},{" "}
                  {option.country[locale || "en"]} ({option.iata})
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="searchInput"
                label={destinationPlaceholder}
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
                  "& .MuiSvgIcon-root": {
                    color: accentColor || colors.primaryLight,
                  },
                }}
              />
            )}
          />

          {/* START DATE PICKER */}
          <DatePicker
            disablePast
            label={startPlaceholder}
            value={startDate}
            onChange={onStartDateChange}
            slotProps={{
              textField: {
                InputProps: {
                  endAdornment: null, // 🚀 removes the calendar icon
                },
                sx: {
                  width: 200, // TODO: fix lenght
                  mr: 2,
                  ml: 2,
                  "& .MuiPickersInputBase-root": {
                    height: 50,
                    color: basicColor || colors.basic,
                    borderRadius: 20,
                  },
                  "& .MuiPickersOutlinedInput-notchedOutline": {
                    borderColor: accentColor || colors.primaryLight,
                  },
                  "&:hover .MuiPickersOutlinedInput-notchedOutline": {
                    borderColor: accentColor || colors.primaryLight,
                  },
                  "& .MuiInputLabel-root": {
                    color: accentColor || colors.primaryLight,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: accentColor || colors.primaryLight,
                  },
                  "& .MuiSvgIcon-root": {
                    color: accentColor || colors.primaryLight,
                  },
                },
              },
            }}
          />

          {/* RETURN DATE PICKER */}
          {isReturn && (
            <DatePicker
              disablePast
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
          {isLoading ? (
            <CircularProgress
              className="searchButtonLoader"
              size={20}
              // style={{ color: textColor || colors.basic }}
              style={{ color: colors.basic }}
            />
          ) : (
            <FaArrowRightLong size={20} />
          )}
        </button>
      </div>
    </LocalizationProvider>
  );
}
