import React from "react";
import PastoralVisitFormModal from "./PastoralVisitFormModal";
import { useDayContext } from "../../../../../../context/day/DayContext";
import { AddPastoralVisitHandler } from "../../../../../../types/day";

interface Props {
  onModalClose: () => void;
}

const AddPastoralVisitForm: React.FC<Props> = ({ onModalClose }) => {
  const { addPastoralVisit } = useDayContext();

  const handleAddPastoralVisit: AddPastoralVisitHandler = (payload) => {
    addPastoralVisit(payload);
    onModalClose();
  };

  return (
    <PastoralVisitFormModal
      headerText={"Dodaj dodatkową kolędę"}
      onFormSubmit={handleAddPastoralVisit}
      onModalClose={onModalClose}
      open
      submitText={"Dodaj"}
    />
  );
};

export default AddPastoralVisitForm;
