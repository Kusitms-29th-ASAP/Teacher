import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Image from "next/image";
import { styled as styledComponents } from "styled-components";
import dayjs from "dayjs";

export interface CalendarProps {
  value: string;
  onChange: (value: string) => void;
  color?: "black";
}

const Calendar = ({ value, onChange, color }: CalendarProps) => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setDate(newDate);
    if (newDate) {
      onChange(newDate.format("YYYY-MM-DD"));
    } else {
      setDate(null);
      onChange("");
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledDemoContainer components={["DatePicker"]}>
          <CustomInputContainer>
            <StyledMobileDatePicker
              format="YYYY-MM-DD"
              value={date}
              onChange={handleDateChange}
            />
          </CustomInputContainer>
        </StyledDemoContainer>
      </LocalizationProvider>
    </>
  );
};

export default Calendar;

const StyledDemoContainer = styled(DemoContainer)`
  width: 100%;
  height: 44px;
  position: relative;
`;

const CustomInputContainer = styledComponents.div`
  position: relative;
  width: 100%;
  height: 44px;
  overflow: hidden;
  cursor: pointer;
`;

const StyledMobileDatePicker = styled(MobileDatePicker)`
  width: 100%;
  height: 44px;
  position: absolute;
  top: 0;
  left: 0;
  &:focus {
    outline: none;
  }
  & .MuiInputBase-root {
    height: 44px;
    outline: none;
    &:focus {
      outline: none;
    }
  }
  & .MuiInputBase-input {
    outline: none;
    &:focus {
      outline: none;
    }
  }
`;
const IconImage = styled(Image)`
  position: absolute;
  top: 12px;
  right: 15px;
`;
