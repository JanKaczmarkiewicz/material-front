import React, { useCallback, useState } from "react";

//types
import { RouteComponentProps } from "react-router-dom";

//ui
import { Container } from "@material-ui/core";

import DayModals, { ModalType } from "./dayPageParts/modals/index";
import DayProvider from "../../../../context/day/DayProvider";
import Header from "./dayPageParts/Header";
import UnusedHousesDrawer from "./dayPageParts/UnusedHousesDrawer";
import PastoralVisitsLists from "./dayPageParts/PastoralVisitsLists";
import DraggingLogic from "./dayPageParts/DraggingLogic";
import SelectionProvider from "../../../../context/Selection/selectionProvider";

type Props = RouteComponentProps<{
  dayId: string;
}>;

const DayManager: React.FC<Props> = ({ match }) => {
  const [modal, setModal] = useState<ModalType>(ModalType.CLOSED);

  const handleModalClose = useCallback(() => setModal(ModalType.CLOSED), []);
  const handleAssignedStreetsModalOpen = useCallback(
    () => setModal(ModalType.ASSIGNED_STREETS),
    []
  );

  const handleAddPastoralVisitModalOpen = useCallback(
    () => setModal(ModalType.ADD_PASTORAL_VISIT),
    []
  );

  return (
    <DayProvider dayId={match.params.dayId}>
      <SelectionProvider>
        <DayModals modal={modal} onModalClose={handleModalClose} />
        <DraggingLogic>
          <UnusedHousesDrawer />
          <Container maxWidth={"lg"}>
            <Header
              onAddClick={handleAddPastoralVisitModalOpen}
              onAdjustClick={handleAssignedStreetsModalOpen}
            />
            <PastoralVisitsLists />
          </Container>
        </DraggingLogic>
      </SelectionProvider>
    </DayProvider>
  );
};

export default DayManager;
