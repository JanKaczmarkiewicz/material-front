import React from "react";

import PickAndList from "./PickAndList";
import { gql } from "@apollo/client";
import { AllStreets } from "../../../generated/AllStreets";
import { useQuery } from "@apollo/react-hooks";
import ModalForm from "./day/dayPageParts/modals/ModalForm";

const STREETS = gql`
  query AllStreets {
    streets {
      id
      name
    }
  }
`;

interface Props {
  open: boolean;
  setSelectedStreets: (streets: string[]) => void;
  infoComponent?: React.ReactNode;
  selectedStreets: string[];

  headerText: string;
  submitText: string;
  onModalClose: () => void;
  onFormSubmit: () => void;
}

const AssignedStreetsFormModal = (props: Props) => {
  const {
    selectedStreets,
    infoComponent,
    setSelectedStreets,
    ...restProps
  } = props;

  const streetsQuery = useQuery<AllStreets>(STREETS);

  if (streetsQuery.loading) return <div>loading...</div>;

  if (streetsQuery.error || !streetsQuery.data) return <div>error</div>;

  return (
    <ModalForm {...restProps}>
      {infoComponent}
      <PickAndList
        options={streetsQuery.data.streets}
        selectedItemsIds={selectedStreets}
        getOptionLabel={({ name }) => name}
        setSelectedItemsIds={setSelectedStreets}
        label={"Dodaj ulicę"}
      />
    </ModalForm>
  );
};

export default AssignedStreetsFormModal;
