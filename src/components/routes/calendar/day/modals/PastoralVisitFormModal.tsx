import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import ModalForm from "../ModalForm";
import PickAndList from "../../PickAndList";

import {
  AllUsers,
  AllUsers_priests,
  AllUsers_acolytes,
} from "../../../../../generated/AllUsers";
import { BaseUserFragment } from "../../actions";
import { Typography, TextField, makeStyles, Button } from "@material-ui/core";
import { AddPastoralVisitHandler } from "../../../../../types/day";
import { Alert } from "@material-ui/lab";

const USERS = gql`
  query AllUsers {
    priests: users(input: { role: PRIEST }) {
      ...BaseUserFragment
    }
    acolytes: users(input: { role: ACOLYTE }) {
      ...BaseUserFragment
    }
  }
  ${BaseUserFragment}
`;

interface Props {
  open: boolean;
  headerText: string;
  submitText: string;
  usedPriests: string[];
  usedAcolytes: string[];
  onModalClose: () => void;
  onFormSubmit: AddPastoralVisitHandler;
}

const getUsername = (user: AllUsers_acolytes | AllUsers_priests) =>
  user.username;

const PastoralVisitFormModal = (props: Props) => {
  const { usedPriests, usedAcolytes, onFormSubmit, ...restProps } = props;
  const classes = useStyles();
  const [hour, setHour] = useState<string>("16:00");
  const [selectedPriest, setSelectedPriest] = useState<string | null>(null);
  const [selectedAcolytes, setSelectedAcolytes] = useState<string[]>([]);

  const handleSubmit = () => {
    onFormSubmit({ priest: selectedPriest, acolytes: selectedAcolytes, hour });
  };

  const { loading, error, data } = useQuery<AllUsers>(USERS);

  if (loading) return <div>loading...</div>;

  if (error || !data) return <div>error</div>;

  const { priests: allPriests, acolytes: allAcolytes } = data;

  const availableAcolytes = allAcolytes.filter(
    ({ id }) => !usedAcolytes.includes(id)
  );

  const availablePriests = allPriests.filter(
    ({ id }) => !usedPriests.includes(id)
  );

  const disableFormState =
    availablePriests.length === 0 ? (
      <>
        <Alert severity="error">Brak dostępnych księży w tym dniu.</Alert>
        <Button onClick={restProps.onModalClose}>Powrót</Button>
      </>
    ) : null;

  return (
    <ModalForm
      onFormSubmit={handleSubmit}
      {...restProps}
      disableMessage={disableFormState}
    >
      <Typography>Ksiądz</Typography>
      <PickAndList<AllUsers_priests>
        options={availablePriests}
        max={1}
        selectedItemsIds={selectedPriest ? [selectedPriest] : []}
        label={"Ksiądz (wymagane przed zatwierdzeniem)"}
        setSelectedItemsIds={([priest]) => setSelectedPriest(priest)}
        getOptionLabel={getUsername}
      />

      <Typography>Ministranci:</Typography>
      <PickAndList<AllUsers_acolytes>
        options={availableAcolytes}
        max={3}
        selectedItemsIds={selectedAcolytes}
        label={"Dodaj ministaranta"}
        setSelectedItemsIds={setSelectedAcolytes}
        getOptionLabel={getUsername}
      />

      <Typography>Godzina:</Typography>
      <div className={classes.inputRoot}>
        <TextField
          className={classes.input}
          id="time"
          type="time"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setHour(e.target.value)}
          value={hour}
          inputProps={{
            step: 300 * 6, // 30 min
          }}
        />
      </div>
    </ModalForm>
  );
};

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    padding: theme.spacing(2, 2, 2, 2),
  },
  input: {
    display: "flex",
  },
}));
export default PastoralVisitFormModal;
