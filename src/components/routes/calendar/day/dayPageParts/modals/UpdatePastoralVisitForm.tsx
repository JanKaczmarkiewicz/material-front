import React from "react";
import { AddPastoralVisitHandler } from "../../../../../../types/day";
import PastoralVisitFormModal from "./PastoralVisitFormModal";
import { useDayContext } from "../../../../../../context/day/DayContext";

interface Props {
  onModalClose: () => void;
  pastoralVisitId: string;
}

const UpdatePastoralVisitForm: React.FC<Props> = ({
  onModalClose,
  pastoralVisitId,
}) => {
  const { updatePastoralVisit } = useDayContext();

  const handleUpdatePastoralVisit: AddPastoralVisitHandler = (payload) => {
    updatePastoralVisit({ id: pastoralVisitId, ...payload });
    onModalClose();
  };

  return (
    <PastoralVisitFormModal
      open
      headerText={"Edytuj kolędę"}
      onFormSubmit={handleUpdatePastoralVisit}
      onModalClose={onModalClose}
      submitText={"Edytuj"}
    />
  );
};

export default UpdatePastoralVisitForm;
