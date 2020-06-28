import React from "react";
import PageTitle from "../Layout/Typography/PageTitle";
import { IconButton, makeStyles, Theme } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { mouths } from "./CalendarAnimationReducer";

type h = () => void;

interface Props {
  text: string;
  onLeftArrowClick: h;
  onRightArrowClick: h;
}

const mouthSeed = mouths.map((mount, index) => ({
  value: index,
  label: mount,
}));

const CalendarHeader: React.FC<Props> = ({
  text,
  onLeftArrowClick,
  onRightArrowClick,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PageTitle text={text} />
      <div className={classes.controls}>
        <IconButton aria-label="previous" onClick={onLeftArrowClick}>
          <ArrowBackIos />
        </IconButton>
        <IconButton aria-label="next" onClick={onRightArrowClick}>
          <ArrowForwardIos />
        </IconButton>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  controls: {
    display: "flex",
    alignItems: "center",
  },
}));
export default CalendarHeader;
