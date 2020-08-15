import React, { useState } from "react";
import { useDayContext } from "../../../../../../context/day/DayContext";
import { useMutation } from "@apollo/react-hooks";
import {
  ChangeAssignedStreets,
  ChangeAssignedStreetsVariables,
} from "../../../../../../generated/ChangeAssignedStreets";
import { CHANGE_ASSIGNED_STREETS } from "../../../actions";
import {
  assignDayStateAfterAssignedStreetsChanged,
  updateStreets,
} from "../../cacheActions";
import AssignedStreetsFormModal from "./AssignedStreetsFormModal";
import { Alert } from "@material-ui/lab";

interface Props {
  onModalClose: () => void;
}

const EditAssignedStreetsFormModal: React.FC<Props> = ({ onModalClose }) => {
  const {
    day: { assignedStreets },
    dayQueryVariables,
  } = useDayContext();

  const assignedStreetsIds = assignedStreets.map(({ id }) => id);

  const [tempAssignedStreets, setTempAssignedStreets] = useState<string[]>(
    assignedStreetsIds
  );
  const [changeAssignedStreets] = useMutation<
    ChangeAssignedStreets,
    ChangeAssignedStreetsVariables
  >(CHANGE_ASSIGNED_STREETS, {
    onCompleted: (data) => {
      if (!data.updateDay) return;
      assignDayStateAfterAssignedStreetsChanged(
        dayQueryVariables,
        data.updateDay
      );
    },
  });

  const handleStreetSubmitChange = () => {
    const removedStreets: string[] = assignedStreetsIds.filter(
      (id) => !tempAssignedStreets.includes(id)
    );

    updateStreets(removedStreets, dayQueryVariables);

    changeAssignedStreets({
      variables: {
        season: dayQueryVariables.season,
        streets: tempAssignedStreets,
        id: dayQueryVariables.input.id,
      },
    });
  };

  return (
    <AssignedStreetsFormModal
      open
      headerText={"Zmień ulice"}
      submitText={"Zatwierdz zmiany"}
      selectedStreets={tempAssignedStreets}
      infoComponent={
        <Alert severity="warning">
          Usunięcie ulicy spowoduje usunięcie wszyskich domów powiązanych z tą
          ulicą.
        </Alert>
      }
      setSelectedStreets={setTempAssignedStreets}
      onFormSubmit={handleStreetSubmitChange}
      onModalClose={onModalClose}
    />
  );
};

export default EditAssignedStreetsFormModal;
