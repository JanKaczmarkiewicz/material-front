import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface Props {
  label: string;
  date: ParsableDate;
  onChange: (date: MaterialUiPickersDate) => void;
}

const DateAndTimePicker: React.FC<Props> = ({ date, onChange }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Data"
        format="MM/dd/yyyy"
        value={date}
        onChange={onChange}
        // KeyboardButtonProps={{
        //   "aria-label": "change date"
        // }}
      />
      <KeyboardTimePicker
        margin="normal"
        id="time-picker"
        label="Czas"
        value={date}
        onChange={onChange}
        // KeyboardButtonProps={{
        //   "aria-label": "change time"
        // }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateAndTimePicker;
