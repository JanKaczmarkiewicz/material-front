import React, { useState, useCallback } from "react";

//types
import { RouteComponentProps } from "react-router-dom";

import {
  Day,
  DayVariables,
  Day_day_pastoralVisits_entrances,
} from "../../../../generated/Day";

//ui
import {
  Container,
  Drawer,
  makeStyles,
  Toolbar,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import Column from "../DND copy/Column";
import { DragDropContext, DropResult, DragStart } from "react-beautiful-dnd";

//data
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  DAY,
  CHANGE_ASSIGNED_STREETS,
  ADD_ENTRANCES,
  DELETE_ENTRANCES,
  RELOCATE_ENTRANCES,
} from "../actions";

import DayMenagerFormModal from "../DayMenagerFormModal";
import {
  ChangeAssignedStreets,
  ChangeAssignedStreetsVariables,
} from "../../../../generated/ChangeAssignedStreets";

import { Alert } from "@material-ui/lab";

import { useDayReducer, ActionTypes } from "./singleDayReducer";
import {
  reducer as selectionReducer,
  SelectAction,
  selectionInitialState,
} from "./selectionReducer";
import {
  extractEntranceHouseNumber,
  extractEntranceHouseCategory,
  renderEntranceHouseItemContent,
} from "../DND copy/Item";
import UnusedHousesColumn from "./UnusedHousesColumn";
import { useSeasonContext } from "../../../../context/Season/SeasonContext";
import {
  DeleteEntrances,
  DeleteEntrancesVariables,
} from "../../../../generated/DeleteEntrances";
import {
  RelocateEntrances,
  RelocateEntrancesVariables,
} from "../../../../generated/RelocateEntrances";
import {
  AddEntrancesVariables,
  AddEntrances,
} from "../../../../generated/AddEntrances";

const drawerWidth = 240;

type Props = RouteComponentProps<{
  dayId: string;
}>;

const DayManager: React.FC<Props> = ({ match }) => {
  const { currentSeason } = useSeasonContext();
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempAssignedStreets, setTempAssignedStreets] = useState<string[]>([]);
  const [selection, dispathSelection] = React.useReducer(
    selectionReducer,
    selectionInitialState
  );

  const dayQueryVariables: DayVariables = {
    input: { id: match.params.dayId },
    season: currentSeason.id,
  };

  const dispathDay = useCallback(useDayReducer(dayQueryVariables), []);

  const { loading, error, data } = useQuery<Day, DayVariables>(DAY, {
    variables: dayQueryVariables,
    onCompleted({ day }) {
      if (!day) return;
      setTempAssignedStreets(day.assignedStreets.map(({ id }) => id));
    },
  });

  const [relocateEntrances] = useMutation<
    RelocateEntrances,
    RelocateEntrancesVariables
  >(RELOCATE_ENTRANCES);

  const [deleteEntrances] = useMutation<
    DeleteEntrances,
    DeleteEntrancesVariables
  >(DELETE_ENTRANCES);

  const [addEntrances] = useMutation<AddEntrances, AddEntrancesVariables>(
    ADD_ENTRANCES,
    {
      onCompleted: (data) => {
        if (!data.addEntrances) return;
        dispathDay({
          type: ActionTypes.CREATE_ENTRANCES,
          payload: { entrances: data.addEntrances },
        });
      },
    }
  );

  const [changeAssignedStreets] = useMutation<
    ChangeAssignedStreets,
    ChangeAssignedStreetsVariables
  >(CHANGE_ASSIGNED_STREETS, {
    onCompleted: (data) => {
      if (!data.updateDay) return;
      // assignDayStateAfterAssignedStreetsChanged(dayId, data.updateDay);
    },
  });

  const handleItemSelection = useCallback(
    (columnId: string, itemId: string) => {
      dispathSelection({
        type: SelectAction.SELECT,
        payload: { itemId, columnId },
      });
    },
    []
  );

  const handleEntrancesCreation = useCallback(
    (housesIds: string[], pastoralVisitId: string) => {
      dispathDay({
        type: ActionTypes.CREATE_FAKE_ENTRANCES,
        payload: { housesIds, destinationPastoralVisitId: pastoralVisitId },
      });

      addEntrances({
        variables: {
          input: {
            houses: housesIds,
            pastoralVisit: pastoralVisitId,
          },
        },
      });
    },
    []
  );

  const handleEntrancesRelocation = useCallback(
    (
      sourcePastoralVisitId: string,
      destinationPastoralVisitId: string,
      selectedItemsIds: string[]
    ) => {
      dispathDay({
        type: ActionTypes.RELOCATE_ENTRANCES,
        payload: {
          sourcePastoralVisitId,
          destinationPastoralVisitId,
          entrancesIds: selectedItemsIds,
        },
      });

      relocateEntrances({
        variables: {
          ids: selectedItemsIds,
          to: destinationPastoralVisitId,
        },
      });
    },
    []
  );

  const handleEntrancesRemoval = useCallback(
    (sourcePastoralVisitId: string, selectedEntrances: string[]) => {
      dispathDay({
        type: ActionTypes.DELETE_ENTRANCES,
        payload: { sourcePastoralVisitId, entrancesIds: selectedEntrances },
      });
      deleteEntrances({ variables: { input: { ids: selectedEntrances } } });
    },
    []
  );

  const onDragStart = useCallback(({ draggableId, source }: DragStart) => {
    const id = draggableId;
    dispathSelection({
      type: SelectAction.START_DRAG,
      payload: { itemId: id, columnId: source.droppableId },
    });
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;

      if (!destination || destination.droppableId === source.droppableId) {
        dispathSelection({ type: SelectAction.CANCEL_DRAG });
        return;
      }

      dispathSelection({ type: SelectAction.CLEAR });

      if (source.droppableId === "unusedHouses")
        handleEntrancesCreation(
          selection.selectedItems,
          destination.droppableId
        );
      else if (destination.droppableId === "unusedHouses")
        handleEntrancesRemoval(source.droppableId, selection.selectedItems);
      else
        handleEntrancesRelocation(
          source.droppableId,
          destination.droppableId,
          selection.selectedItems
        );
    },
    [selection.selectedItems]
  );

  const handleModalClose = useCallback(() => setIsEditing(false), []);
  const handleModalOpen = useCallback(() => setIsEditing(true), []);

  if (loading) return <div>loading...</div>;
  if (error || !data || !data.day) return <div>error</div>;

  const { pastoralVisits, visitDate, assignedStreets } = data.day;

  const currDate = new Date(visitDate);

  const headerText = `Zaplanuj dzień: ${currDate.toLocaleDateString()}r.`;

  const handleStreetSubmitChange = () => {
    changeAssignedStreets({
      variables: {
        season: currentSeason.id,
        streets: tempAssignedStreets,
        id: dayQueryVariables.input.id,
      },
    });
  };

  return (
    <>
      <DayMenagerFormModal
        open={isEditing}
        headerText={"Zmień ulice"}
        submitText={"Zatwierdz zmiany"}
        selectedStreets={tempAssignedStreets}
        day={currDate}
        infoComponent={
          <Alert severity="warning">
            Usunięcie ulicy spowoduje usunięcie wszyskich domów powiązanych z tą
            ulicą.
          </Alert>
        }
        setSelectedStreets={setTempAssignedStreets}
        onFormSubmit={handleStreetSubmitChange}
        onModalClose={handleModalClose}
      />

      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.drawerContainer}>
            <Toolbar />
            <UnusedHousesColumn
              assignedStreets={assignedStreets}
              selection={selection}
              onHouseSelected={handleItemSelection}
            />
          </div>
        </Drawer>
        <Container maxWidth={"lg"}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={10}>
              <Typography variant={"h3"} className={classes.title}>
                {headerText}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button color={"primary"} onClick={handleModalOpen}>
                Dostosuj
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3} justify="center">
            {pastoralVisits.map(({ id, priest, entrances }) => (
              <Grid item xs={12} md={2} key={id}>
                <Column<Day_day_pastoralVisits_entrances>
                  key={id}
                  items={entrances}
                  droppableId={id}
                  selection={selection}
                  onItemSelected={handleItemSelection}
                  getItemNumber={extractEntranceHouseNumber}
                  getElementCategory={extractEntranceHouseCategory}
                  renderListItemContent={renderEntranceHouseItemContent}
                  title={
                    priest?.username
                      ? `ks. ${(priest?.username).split(" ")[1]}`
                      : "Brak kapłana"
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </DragDropContext>
    </>
  );
};

export default DayManager;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
