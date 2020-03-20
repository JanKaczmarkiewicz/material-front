import React, { useState, useEffect } from "react";
import {
  TextField,
  makeStyles,
  FormControl,
  FormLabel,
  FormGroup,
  Grid
} from "@material-ui/core";
import getCurrentTime from "../../utils/getCurrentTime";
import AutocompleteInput from "../Layout/DataTable/Table/Inputs/AutocompleteInput";
import request from "../../utils/request";

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [allPriests, setAllPriests] = useState<any>([]);

  useEffect(() => {
    request(
      `query{
              priests{
                id
                name
              }
            }`,
      { useAuthorizationToken: true }
    )
      .then(({ data: { priests } }) => setAllPriests(priests))
      .catch(console.log);
  });

  const [time, setTime] = React.useState(getCurrentTime());

  const [priest, setPriest] = React.useState("");

  const getPriestName = (id: string): string => {
    const foundPriest = allPriests.find((priest: any) => priest.id === id);
    return foundPriest ? foundPriest.name : null;
  };

  return (
    <>
      <FormControl component="fieldset" className={classes.container}>
        <FormLabel component="legend">Dodaj kolędę</FormLabel>
        <FormGroup>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <AutocompleteInput
                options={allPriests}
                label={"Ksiądz"}
                onChange={update => setPriest(update["priest"])}
                value={getPriestName(priest)}
                name={"priest"}
              />
            </Grid>

            <Grid item>
              <TextField
                id="visit-time"
                style={{ display: "block" }}
                type="datetime-local"
                value={time}
                label={"Data"}
                className={classes.textField}
                onChange={e => {
                  setTime(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </FormGroup>
      </FormControl>

      {/* <Title>Dodaj kolędę:</Title>
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
      <AutocompleteInput
        label={"Ksiądz"}
        options={allPriests}
        onChange={update => setPriest(update["priest"])}
        value={getPriestName(priest)}
        name={"priest"}
      /> */}
    </>
  );
};

export default Dashboard;

const useStyles = makeStyles(theme => ({
  container: {
    justifyContent: "space-around"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));
