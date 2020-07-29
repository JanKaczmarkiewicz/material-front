import React, { useState } from "react";

//types
import { RouteComponentProps } from "react-router-dom";
import {
  RelocateEntrance,
  RelocateEntranceVariables,
} from "../../../../generated/RelocateEntrance";
import {
  Day,
  DayVariables,
  Day_day_assignedStreets,
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
import Column from "../DND/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

//data
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  RELOCATE_ENTRANCE,
  DAY,
  ADD_ENTRANCE,
  CHANGE_ASSIGNED_STREETS,
  DELETE_ENTRANCE,
} from "../actions";
import { client } from "../../../../context/client/ApolloClient";

import UnusedHouses from "../DND/UnusedHouses";
import {
  AddEntranceVariables,
  AddEntrance,
} from "../../../../generated/AddEntrance";
import DayMenagerFormModal from "../DayMenagerFormModal";
import {
  ChangeAssignedStreets,
  ChangeAssignedStreetsVariables,
} from "../../../../generated/ChangeAssignedStreets";
import {
  DeleteEntrance,
  DeleteEntranceVariables,
} from "../../../../generated/DeleteEntrance";
import { Alert } from "@material-ui/lab";
import { getKeys } from "../../../Layout/DataTable/util";
import {
  assignDayStateAfterAssignedStreetsChanged,
  assignProperDeletedHousesToDay,
  removeAllHousesByStreetInDay,
} from "./cacheActions";
import { difference } from "../../../../utils/diffrence";

import { useDayReducer, ActionTypes } from "./singleDayReducer";

const drawerWidth = 240;

type Props = RouteComponentProps<{
  dayId: string;
}>;

const DayManager: React.FC<Props> = ({ match }) => {
  const { dayId } = match.params;
  const classes = useStyles();
  const { current: dispath } = React.useRef(useDayReducer(dayId));

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [relocateEntrance] = useMutation<
    RelocateEntrance,
    RelocateEntranceVariables
  >(RELOCATE_ENTRANCE);

  const [deleteEntrance] = useMutation<DeleteEntrance, DeleteEntranceVariables>(
    DELETE_ENTRANCE
  );

  const [changeAssignedStreets] = useMutation<
    ChangeAssignedStreets,
    ChangeAssignedStreetsVariables
  >(CHANGE_ASSIGNED_STREETS, {
    onCompleted: (data) => {
      if (!data.updateDay) return;
      assignDayStateAfterAssignedStreetsChanged(dayId, data.updateDay);
    },
  });

  const [addEntrance] = useMutation<AddEntrance, AddEntranceVariables>(
    ADD_ENTRANCE,
    {
      onCompleted: (data) => {
        if (!data.addEntrance) return;
        dispath({
          type: ActionTypes.CREATE_ENTRANCE,
          payload: { entrance: data.addEntrance },
        });
      },
    }
  );

  const { loading, error, data } = useQuery<Day, DayVariables>(DAY, {
    variables: { input: { id: dayId } },
    onCompleted({ day }) {
      if (!day) return;
      setTempAssignedStreets([...day.assignedStreets]);
    },
  });

  const [tempAssignedStreets, setTempAssignedStreets] = useState<
    Day_day_assignedStreets[]
  >([]);

  if (loading) return <div>loading...</div>;
  if (error || !data || !data.day) return <div>error</div>;

  const handleModalClose = () => setIsEditing(false);
  const handleModalOpen = () => setIsEditing(true);

  const { pastoralVisits, visitDate, unusedHouses } = data.day;

  const currDate = new Date(visitDate);

  const headerText = `Zaplanuj dzień: ${currDate.toLocaleDateString()}r.`;

  const handleEntranceCreation = (houseId: string, pastoralVisitId: string) => {
    dispath({
      type: ActionTypes.CREATE_FAKE_ENTRANCE,
      payload: { houseId, pastoralVisitId },
    });

    addEntrance({
      variables: {
        houseId,
        pastoralVisitId,
      },
    });
  };

  const handleEntranceRelocation = (
    entranceId: string,
    pastoralVisitId: string
  ) => {
    dispath({
      type: ActionTypes.RELOCATE_ENTRANCE,
      payload: { pastoralVisitId, entranceId },
    });

    relocateEntrance({
      variables: {
        id: entranceId,
        to: pastoralVisitId,
      },
    });
  };

  const handleEntranceRemoval = (entranceId: string) => {
    dispath({ type: ActionTypes.DELETE_ENTRANCE, payload: { entranceId } });
    deleteEntrance({ variables: { input: { id: entranceId } } });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    if (source.droppableId === "unusedHouses")
      handleEntranceCreation(draggableId, destination.droppableId);
    else if (destination.droppableId === "unusedHouses")
      handleEntranceRemoval(draggableId);
    else handleEntranceRelocation(draggableId, destination.droppableId);
  };

  const handleStreetSubmitChange = () => {
    const tempStreetsIds = tempAssignedStreets.map(({ id }) => id);
    const initialStreetsIds = data.day!.assignedStreets.map(({ id }) => id);

    const removedStreetsIds: string[] = difference(
      initialStreetsIds,
      tempStreetsIds
    );

    const areStreetsSame =
      removedStreetsIds.length === 0 &&
      tempStreetsIds.length === initialStreetsIds.length;

    if (areStreetsSame) return;

    changeAssignedStreets({
      variables: { id: dayId, streets: tempStreetsIds },
    });

    const removedHouses = removeAllHousesByStreetInDay(
      dayId,
      removedStreetsIds
    );

    const allQueries = (client.extract() as any).ROOT_QUERY;

    // update rest day queries cache
    getKeys(allQueries).forEach((key) => {
      const queryInfo = allQueries[key];

      if (queryInfo.typename !== "Day" || typeof queryInfo.id !== "string")
        return;

      const currentDayId = queryInfo.id.split(":")[1] as string;

      if (currentDayId === dayId) return;

      assignProperDeletedHousesToDay(
        { input: { id: currentDayId } },
        removedHouses
      );
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

      <DragDropContext onDragEnd={onDragEnd}>
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
            <Typography variant={"h6"}>Nieurzywane domy.</Typography>
            <UnusedHouses houses={unusedHouses} />
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
                <Column
                  droppableId={id}
                  title={
                    priest?.username
                      ? `ks. ${(priest?.username).split(" ")[1]}`
                      : "Brak kapłana"
                  }
                  items={entrances}
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
