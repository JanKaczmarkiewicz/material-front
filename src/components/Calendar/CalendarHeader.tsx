import React from "react";
import { makeStyles, Theme, Slider } from "@material-ui/core";

interface Props {
  mouth: number;
  onMouthChange: (mouth: number) => void;
}
export const mouths = [
  { value: 0, numberEquivalent: 11, label: "Grudzień" },
  { value: 1, numberEquivalent: 0, label: "Styczeń" },
  { value: 2, numberEquivalent: 1, label: "Luty" },
];

const CalendarHeader: React.FC<Props> = ({ mouth, onMouthChange }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Slider
        onChange={(_, value) => {
          const { numberEquivalent } = mouths.find(
            (mouth) => mouth.value === value
          )!;
          onMouthChange(numberEquivalent);
        }}
        marks={mouths}
        max={mouths.length - 1}
      />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));
export default CalendarHeader;
