import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CHANGE_ASSIGNED_STREETS } from "../../../actions";
import {
  assignDayStateAfterAssignedStreetsChanged,
  updateStreets,
} from "../../cacheActions";
import {
  ChangeAssignedStreets,
  ChangeAssignedStreetsVariables,
} from "../../../../../../generated/ChangeAssignedStreets";
import AssignedStreetsFormModal from "./AssignedStreetsFormModal";
import { Alert } from "@material-ui/lab";

import { useDayContext } from "../../../../../../context/day/DayContext";
import AddPastoralVisitForm from "./AddPastoralVisitForm";
import UpdatePastoralVisitForm from "./UpdatePastoralVisitForm";

interface Props {
  modal: ModalType;
  onModalClose: () => void;
}

export enum ModalType {
  CLOSED,
  ASSIGNED_STREETS,
  EDIT_PASTORAL_VISIT,
  ADD_PASTORAL_VISIT,
}

const DayModals: React.FC<Props> = ({ modal, onModalClose }) => {
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

  switch (modal) {
    case ModalType.ADD_PASTORAL_VISIT:
      return <AddPastoralVisitForm onModalClose={onModalClose} />;

    case ModalType.EDIT_PASTORAL_VISIT:
      return (
        <UpdatePastoralVisitForm
          pastoralVisitId={""}
          onModalClose={onModalClose}
        />
      );

    case ModalType.ASSIGNED_STREETS:
      return (
        <AssignedStreetsFormModal
          open
          headerText={"Zmień ulice"}
          submitText={"Zatwierdz zmiany"}
          selectedStreets={tempAssignedStreets}
          infoComponent={
            <Alert severity="warning">
              Usunięcie ulicy spowoduje usunięcie wszyskich domów powiązanych z
              tą ulicą.
            </Alert>
          }
          setSelectedStreets={setTempAssignedStreets}
          onFormSubmit={handleStreetSubmitChange}
          onModalClose={onModalClose}
        />
      );

    default:
      return null;
  }
};

export default DayModals;
