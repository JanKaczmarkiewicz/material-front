import React, { useState } from "react";
import ModalForm from "../../ModalForm";
import PickAndList from "../../../PickAndList";

import {
  AllUsers_priests,
  AllUsers_acolytes,
} from "../../../../../../generated/AllUsers";
import { Typography, TextField, makeStyles, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { AddPastoralVisitHandler } from "../../../../../../types/day";
import { useAvailablePeople } from "./useAvailablePeople";

export interface Props {
  open: boolean;
  initialPriestId?: string;
  initialAcolytesIds?: string[];
  headerText: string;
  submitText: string;
  onModalClose: () => void;
  onFormSubmit: AddPastoralVisitHandler;
}

const getUsername = (user: AllUsers_acolytes | AllUsers_priests) =>
  user.username;

const PastoralVisitFormModal = (props: Props) => {
  const {
    onFormSubmit,
    initialAcolytesIds = [],
    initialPriestId = null,
    ...restProps
  } = props;

  const classes = useStyles();

  const initialPriestsIds = initialPriestId ? [initialPriestId] : [];

  const { loading, error, data } = useAvailablePeople(
    initialAcolytesIds,
    initialPriestsIds
  );

  const [hour, setHour] = useState<string>("16:00");
  const [selectedPriest, setSelectedPriest] = useState<string | null>(
    initialPriestId
  );
  const [selectedAcolytes, setSelectedAcolytes] = useState<string[]>(
    initialAcolytesIds
  );

  if (loading) return <div>loading...</div>;
  if (error || !data) return <div>error</div>;

  const { availableAcolytes, availablePriests } = data;

  const handleSubmit = () =>
    onFormSubmit({
      priest: selectedPriest,
      acolytes: selectedAcolytes,
      hour,
    });

  const disableFormState =
    !selectedPriest && availablePriests.length === 0 ? (
      <>
        <Alert severity="error">Wszyscy księża są zajęci.</Alert>
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
