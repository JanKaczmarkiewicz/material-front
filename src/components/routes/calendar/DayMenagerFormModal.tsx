import React from "react";
import {
  Modal,
  Paper,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import PickAndList from "./PickAndList";
import { gql } from "apollo-boost";
import { AllStreets, AllStreets_streets } from "../../../generated/AllStreets";
import { useQuery } from "@apollo/react-hooks";

const STREETS = gql`
  query AllStreets {
    streets {
      id
      name
    }
  }
`;

interface Props<S = AllStreets_streets> {
  open: boolean;
  day: Date;
  headerText: string;
  submitText: string;
  selectedStreets: S[];
  setSelectedStreets: (users: S[]) => void;
  onModalClose: () => void;
  onFormSubmit: () => void;
}

const DayMenagerFormModal: React.FC<Props> = ({
  day,
  headerText,
  submitText,
  open,
  selectedStreets,
  setSelectedStreets,
  onModalClose,
  onFormSubmit,
}) => {
  const classes = useStyles();

  const streetsQuery = useQuery<AllStreets>(STREETS);

  if (streetsQuery.loading) return <div>loading...</div>;

  if (streetsQuery.error || !streetsQuery.data) return <div>error</div>;

  console.log(selectedStreets);
  return (
    <Modal open={open} onClose={onModalClose}>
      <Paper className={classes.modalContent}>
        <Typography>{headerText}</Typography>
        <Typography variant={"body2"}>{day.toLocaleDateString()}r.</Typography>

        <PickAndList
          options={streetsQuery.data.streets}
          selectedItems={selectedStreets}
          getOptionLabel={({ name }) => name}
          setSelectedItems={setSelectedStreets}
          label={"Dodaj ulicę"}
        />

        <Button
          color={"primary"}
          variant={"contained"}
          size={"large"}
          onClick={onFormSubmit}
        >
          {submitText}
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

export default DayMenagerFormModal;
