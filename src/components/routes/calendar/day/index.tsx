import React from "react";

//types
import { RouteComponentProps } from "react-router-dom";

//ui
import { Container } from "@material-ui/core";

//my components
import DayModals from "./dayPageParts/modals/index";
import DayProvider from "../../../../context/day/DayProvider";
import Header from "./dayPageParts/Header";
import UnusedHousesDrawer from "./dayPageParts/UnusedHousesDrawer";
import PastoralVisitsLists from "./dayPageParts/PastoralVisitsLists";
import DraggingLogic from "./dayPageParts/DraggingLogic";
import SelectionProvider from "../../../../context/Selection/selectionProvider";

type Props = RouteComponentProps<{
  dayId: string;
}>;

const DayManager: React.FC<Props> = ({ match }) => (
  <DayProvider dayId={match.params.dayId}>
    <SelectionProvider>
      <DraggingLogic>
        <UnusedHousesDrawer />
        <Container maxWidth={"lg"}>
          <DayModals>
            {({
              openAddPastoralVisitModal,
              openAssignedStreetsModal,
              openUpdatePastoralVisitModal,
            }) => (
              <>
                <Header
                  onAddClick={openAddPastoralVisitModal}
                  onAdjustClick={openAssignedStreetsModal}
                />
                <PastoralVisitsLists
                  onOpenSettings={openUpdatePastoralVisitModal}
                />
              </>
            )}
          </DayModals>
        </Container>
      </DraggingLogic>
    </SelectionProvider>
  </DayProvider>
);

export default DayManager;
