import React from "react";
import {
  TextField,
  makeStyles,
  FormControl,
  FormLabel,
  FormGroup,
  Grid,
} from "@material-ui/core";
import getCurrentTime from "../../utils/getCurrentTime";

const Dashboard: React.FC = () => {
  const classes = useStyles();

  const [time, setTime] = React.useState(getCurrentTime());

  return (
    <>
      <FormControl component="fieldset" className={classes.container}>
        <FormLabel component="legend">Dodaj kolędę</FormLabel>
        <FormGroup>
          <Grid container spacing={3} direction="column">
            <Grid item></Grid>

            <Grid item>
              <TextField
                id="visit-time"
                style={{ display: "block" }}
                type="datetime-local"
                value={time}
                label={"Data"}
                className={classes.textField}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </FormGroup>
      </FormControl>
    </>
  );
};

export default Dashboard;

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "space-around",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
