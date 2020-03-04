import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import getCurrentTime from "../../utils/getCurrentTime";
import Title from "../Title";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();

  const [time, setTime] = React.useState(getCurrentTime());
  const [priest, setPriest] = React.useState(getCurrentTime());

  return (
    <>
      <Title>Dodaj kolędę:</Title>
      <TextField
        id="visit-time"
        label="Czas"
        style={{ display: "block" }}
        type="datetime-local"
        value={time}
        className={classes.textField}
        onChange={e => {
          setTime(e.target.value);
        }}
      />
    </>
  );
};

export default Dashboard;
