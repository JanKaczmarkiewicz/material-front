import React from "react";

//types
import { RouteComponentProps } from "react-router-dom";
import {
  DaySchedule,
  DayScheduleVariables,
  DaySchedule_pastoralVisits,
} from "../../generated/DaySchedule";
import {
  RelocateEntrance,
  RelocateEntranceVariables,
} from "../../generated/RelocateEntrance";

//ui
import PageTitle from "../Layout/Typography/PageTitle";
import {
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles,
} from "@material-ui/core";
import Column from "./DND/Column";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

//data
import { client } from "../../context/client/ApolloClient";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { RELOCATE_ENTRANCE, DAY } from "./actions";

type Props = RouteComponentProps<{
  date: string;
}>;

const DayManager: React.FC<Props> = ({ match }) => {
  const { date } = match.params;

  const [relocateEntrance] = useMutation<
    RelocateEntrance,
    RelocateEntranceVariables
  >(RELOCATE_ENTRANCE);

  const day = useQuery<DaySchedule, DayScheduleVariables>(DAY, {
    variables: { input: { date } },
  });

  if (day.loading) return <div>loading...</div>;

  if (day.error || !day.data) return <div>error</div>;

  const currDate = new Date(date);
  const visits = day.data.pastoralVisits;

  // const visits = dayActivities.reduce((obj, pastoralVisit) => {
  //   const pastoralVisitDate = new Date(pastoralVisit.visitTime);
  //   return isSameDay(pastoralVisitDate, currDate)
  //     ? [...obj, pastoralVisit]
  //     : obj;
  // }, [] as DaySchedule_pastoralVisits[]);

  const headerText = `Zaplanuj dzień: ${currDate.toLocaleDateString()}r.`;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    const queryOptions = {
      query: DAY,
      variables: { input: { id: dayId } },
    };

    const query = client.cache.readQuery<DaySchedule, DayScheduleVariables>(
      queryOptions
    )!;

    const indexes = findEntranceInPastoralVisits(
      draggableId,
      query.pastoralVisits
    );

    if (!indexes) return;

    const newData = [...query.pastoralVisits];

    const destinationPastoralVisitIndex = newData.findIndex(
      ({ id }) => id === destination.droppableId
    );

    if (destinationPastoralVisitIndex < 0) return;

    const {
      entranceIndex,
      pastoralVisitIndex: sourcePastoralVisitIndex,
    } = indexes;

    //delete entrance from cache copy
    const sourceEntrances = [...newData[sourcePastoralVisitIndex].entrances];
    const movedEntrance = sourceEntrances.splice(entranceIndex, 1)[0];
    newData[sourcePastoralVisitIndex].entrances = sourceEntrances;

    //add updated entrance to cache copy
    newData[destinationPastoralVisitIndex].entrances = [
      ...newData[destinationPastoralVisitIndex].entrances,
      movedEntrance,
    ];

    client.cache.writeQuery<DaySchedule, DayScheduleVariables>({
      ...queryOptions,
      data: { pastoralVisits: newData },
    });

    relocateEntrance({
      variables: { id: draggableId, to: destination.droppableId },
    });
  };

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {/* <Toolbar /> */}
        <div className={classes.drawerContainer}>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? "K" : "L"}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? "K" : "L"}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <Container maxWidth={"lg"}>
        <PageTitle text={headerText} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            {visits.map(({ id, priest, entrances }) => (
              <Column
                key={id}
                droppableId={id}
                title={
                  priest?.username
                    ? `ks. ${(priest?.username).split(" ")[1]}`
                    : "Brak kapłana"
                }
                items={entrances}
              />
            ))}
          </DragDropContext>
        </div>
      </Container>
    </>
  );
};

const findEntranceInPastoralVisits = (
  id: string,
  pastoralVisits: DaySchedule_pastoralVisits[]
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
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
