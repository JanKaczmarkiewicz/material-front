import React, { useState } from "react";
import { Calendar_streets } from "../../../generated/Calendar";
import { Autocomplete } from "@material-ui/lab";
import {
  Modal,
  Paper,
  Typography,
  List,
  TextField,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

interface Props {
  streets: Calendar_streets[];
  selectedStreets: Calendar_streets[];
  day: Date;
  onModalClose: () => void;
  addStreet: (addStreet: Calendar_streets) => void;
  removeStreet: (index: number) => void;
}

const AddDayForm: React.FC<Props> = ({
  streets,
  day,
  onModalClose,
  addStreet,
  removeStreet,
  selectedStreets,
}) => {
  const classes = useStyles();
  const [streetInput, setStreetInput] = useState<string>("");

  const allowedStreets = streets.filter(
    (street) => selectedStreets.indexOf(street) < 0
  );

  return (
    <Modal open onClose={onModalClose}>
      <Paper className={classes.modalContent}>
        <Typography>Dodaj dzień: {day.toLocaleDateString()}r.</Typography>
        <List>
          <Autocomplete
            options={allowedStreets}
            getOptionLabel={(option) => option.name}
            inputValue={streetInput}
            value={null}
            onChange={(_, street) => {
              if (!street) return;
              setStreetInput("");
              addStreet(street);
            }}
            onInputChange={(_, value) => {
              setStreetInput(value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Dodaj ulicę" />
            )}
          />
          {selectedStreets.map(({ id, name }, i) => (
            <ListItem key={id}>
              <ListItemText primary={name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => removeStreet(i)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Button color={"primary"} variant={"contained"} size={"large"}>
          Zaplanuj ten dzień
        </Button>
      </Paper>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  modalContent: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: "absolute",
    width: 400,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
}));

export default AddDayForm;
