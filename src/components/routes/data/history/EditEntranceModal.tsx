import React from "react";
import {
  Paper,
  Typography,
  Grid,
  makeStyles,
  Theme,
  createStyles,
  Fab,
} from "@material-ui/core";
import { RecordState } from "../../../../generated/globalTypes";
import StateStyles from "./StateStyles";

interface Props {
  id: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      boxShadow: theme.shadows[5],
      outline: "none",
      padding: theme.spacing(2, 4, 3),
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%)`,
    },
  })
);

const EditEntranceModal: React.FC<Props> = ({ id }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h3">Edytuj {id}</Typography>
      <Grid container>
        {[RecordState.REJECTED, RecordState.ACCEPTED, RecordState.UNKNOWN].map(
          (state) => {
            const { icon, backgroundColor } = StateStyles(state);
            return (
              <Grid item xs={4} alignItems="center">
                <Fab style={{ backgroundColor }}>{icon}</Fab>
              </Grid>
            );
          }
        )}
      </Grid>
    </Paper>
  );
};

export default EditEntranceModal;
