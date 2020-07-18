import React from "react";
import { makeStyles, Theme, IconButton } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

interface Props {}

const useStyles = makeStyles((theme: Theme) => ({
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const CalendarControl: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.controls}>
      <IconButton aria-label="previous">
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton aria-label="next">
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};

export default CalendarControl;
