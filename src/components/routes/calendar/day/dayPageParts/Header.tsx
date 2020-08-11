import React from "react";
import { makeStyles, Grid, Typography, Button } from "@material-ui/core";
import { useDayContext } from "../../../../../context/day/DayContext";

interface Props {
  onAdjustClick: () => void;
  onAddClick: () => void;
}

const Header: React.FC<Props> = ({ onAdjustClick, onAddClick }) => {
  const classes = useStyles();

  const {
    day: { visitDate },
  } = useDayContext();

  const headerText = `Zaplanuj dzień: ${new Date(
    visitDate
  ).toLocaleDateString()}r.`;

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={9}>
        <Typography variant={"h3"} className={classes.title}>
          {headerText}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" color={"primary"} onClick={onAddClick}>
          Dodaj
        </Button>
        <Button color={"primary"} onClick={onAdjustClick}>
          Dostosuj
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2, 0, 3, 0),
  },
}));

export default Header;
