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
  Day_day_pastoralVisits,
  Day_day,
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
} from "../actions";
import { client } from "../../../../context/client/ApolloClient";

import UnusedHouses from "../DND/UnusedHouses";
import {
  AddEntranceVariables,
  AddEntrance,
} from "../../../../generated/AddEntrance";
import DayMenagerFormModal from "../DayMenagerFormModal";
import { Alert } from "@material-ui/lab";
import {
  ChangeAssignedStreets,
  ChangeAssignedStreetsVariables,
} from "../../../../generated/ChangeAssignedStreets";

const drawerWidth = 240;

type Props = RouteComponentProps<{
  dayId: string;
}>;

const DayManager: React.FC<Props> = ({ match }) => {
  const classes = useStyles();
  const { dayId } = match.params;
  const dayQueryVariables = { input: { id: dayId } };
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [relocateEntrance] = useMutation<
    RelocateEntrance,
    RelocateEntranceVariables
  >(RELOCATE_ENTRANCE);

  const [changeAssignedStreets] = useMutation<
    ChangeAssignedStreets,
    ChangeAssignedStreetsVariables
  >(CHANGE_ASSIGNED_STREETS, {
    onCompleted: (data) => {
      if (!data.updateDay) return;
      const query = readDayQuery();
      if (!query.day) return;

      writeDayQuery({
        ...query.day,
        ...data.updateDay,
      });
    },
  });

  const [addEntrance] = useMutation<AddEntrance, AddEntranceVariables>(
    ADD_ENTRANCE,
    {
      onCompleted: (data) => {
        const query = readDayQuery();
        if (!data.addEntrance) return;

        if (!query.day) return;
        const pastoralVisitsCopy = [...query.day.pastoralVisits];

        const indexes = findEntranceInPastoralVisits(
          data.addEntrance.house!.id,
          pastoralVisitsCopy
        );

        if (!indexes) return;

        const {
          entranceIndex,
          pastoralVisitIndex: destinationPastoralVisitIndex,
        } = indexes;

        const destinationPastoralVisit = {
          ...pastoralVisitsCopy[destinationPastoralVisitIndex],
        };

        //replece dummy one with real one
        const entrancesCopy = [...destinationPastoralVisit.entrances];

        entrancesCopy.splice(entranceIndex, 1, data.addEntrance);

        destinationPastoralVisit.entrances = entrancesCopy;

        pastoralVisitsCopy[
          destinationPastoralVisitIndex
        ] = destinationPastoralVisit;

        writeDayQuery({ ...query.day, pastoralVisits: pastoralVisitsCopy });
      },
    }
  );

  const { loading, error, data } = useQuery<Day, DayVariables>(DAY, {
    variables: dayQueryVariables,
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

  const queryOptions = {
    query: DAY,
    variables: dayQueryVariables,
  };

  const readDayQuery = () => client.readQuery<Day, DayVariables>(queryOptions)!;

  const writeDayQuery = (data: Day_day) =>
    client.writeQuery<Day, DayVariables>({
      ...queryOptions,
      data: { day: data },
    });

  const handleEntranceCreation = (
    houseId: string,
    destinationPastoralVisitIndex: number
  ) => {
    const query = readDayQuery();

    if (!query.day) return;

    const pastoralVisitsCopy = [...query.day.pastoralVisits];
    const unusedHousesCopy = [...query.day.unusedHouses];

    const houseIndex = unusedHousesCopy.findIndex(
      (house) => house.id === houseId
    );

    if (houseIndex < 0) return;

    const house = unusedHousesCopy.splice(houseIndex, 1)[0];

    const newEntrance = {
      id: house.id, //temp
      __typename: "Entrance",
      house: house,
      comment: null,
    };

    const destinationPastoralVisitCopy = {
      ...pastoralVisitsCopy[destinationPastoralVisitIndex],
    };

    destinationPastoralVisitCopy.entrances = [
      ...destinationPastoralVisitCopy.entrances,
      newEntrance,
    ];

    pastoralVisitsCopy[
      destinationPastoralVisitIndex
    ] = destinationPastoralVisitCopy;

    writeDayQuery({
      ...query.day,
      unusedHouses: unusedHousesCopy,
      pastoralVisits: pastoralVisitsCopy,
    });

    addEntrance({
      variables: {
        houseId,
        pastoralVisitId: pastoralVisitsCopy[destinationPastoralVisitIndex].id,
      },
    });
  };

  const handleEntranceRelocation = (
    entranceId: string,
    destinationPastoralVisitIndex: number
  ) => {
    const query = readDayQuery();

    if (!query.day) return;

    const pastoralVisitsCopy = [...query.day.pastoralVisits];

    const indexes = findEntranceInPastoralVisits(
      entranceId,
      pastoralVisitsCopy
    );

    if (!indexes) return;

    const {
      entranceIndex,
      pastoralVisitIndex: sourcePastoralVisitIndex,
    } = indexes;

    const sourceEntrances = [
      ...pastoralVisitsCopy[sourcePastoralVisitIndex].entrances,
    ];

    //delete entrance from cache copy
    const entrance = sourceEntrances.splice(entranceIndex, 1)[0];

    pastoralVisitsCopy[sourcePastoralVisitIndex].entrances = sourceEntrances;

    const destinationPastoralVisitCopy = {
      ...pastoralVisitsCopy[destinationPastoralVisitIndex],
    };

    //add updated entrance to cache copy
    destinationPastoralVisitCopy.entrances = [
      ...destinationPastoralVisitCopy.entrances,
      entrance,
    ];

    pastoralVisitsCopy[
      destinationPastoralVisitIndex
    ] = destinationPastoralVisitCopy;

    writeDayQuery({
      ...query.day,
      pastoralVisits: pastoralVisitsCopy,
    });

    relocateEntrance({
      variables: {
        id: entranceId,
        to: pastoralVisitsCopy[destinationPastoralVisitIndex].id,
      },
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    const destinationPastoralVisitIndex = data.day!.pastoralVisits.findIndex(
      ({ id }) => id === destination.droppableId
    );

    if (destinationPastoralVisitIndex < 0) return;

    source.droppableId !== "unusedHouses"
      ? handleEntranceRelocation(draggableId, destinationPastoralVisitIndex)
      : handleEntranceCreation(draggableId, destinationPastoralVisitIndex);
  };

  const handleStreetSubmitChange = () => {
    const tempStreetsIds = tempAssignedStreets.map(({ id }) => id);
    const initialStreetsIds = data.day!.assignedStreets.map(({ id }) => id);

    const areStreetsSame =
      initialStreetsIds.findIndex((id) => !(id in tempStreetsIds)) === -1;

    if (areStreetsSame) return;

    changeAssignedStreets({
      variables: { id: dayId, streets: tempStreetsIds },
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

const findEntranceInPastoralVisits = (
  id: string,
  pastoralVisits: Day_day_pastoralVisits[]
) => {
  let pastoralVisitIndex = null;
  let entranceIndex = null;
  for (let i = 0; i < pastoralVisits.length; i++) {
    for (let j = 0; j < pastoralVisits[i].entrances.length; j++) {
      const entrance = pastoralVisits[i].entrances[j];
      if (entrance.id === id) {
        pastoralVisitIndex = i;
        entranceIndex = j;
      }
    }
  }
  if (pastoralVisitIndex === null || entranceIndex === null) return null;

  return { pastoralVisitIndex, entranceIndex };
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
