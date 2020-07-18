import React from "react";

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
} from "../../../../generated/Day";

//ui
import {
  Container,
  Drawer,
  makeStyles,
  List,
  ListSubheader,
  Paper,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import Column from "../DND/Column";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

//data
import { useMutation, useQuery } from "@apollo/react-hooks";
import { RELOCATE_ENTRANCE, DAY } from "../actions";
import { client } from "../../../../context/client/ApolloClient";
import { splitByLabel } from "../../../../utils/splitByLabel";
import { getKeys } from "../../../Layout/DataTable/util";
import { sortByHouseNumber } from "../../../../utils/sortByHouseNumber";
import { getStyle } from "../DND/Item";
import PageTitle from "../../../Layout/typography/PageTitle";

const drawerWidth = 240;

type Props = RouteComponentProps<{
  dayId: string;
}>;

const DayManager: React.FC<Props> = ({ match }) => {
  const classes = useStyles();
  const { dayId } = match.params;

  const [relocateEntrance] = useMutation<
    RelocateEntrance,
    RelocateEntranceVariables
  >(RELOCATE_ENTRANCE);

  const { loading, error, data } = useQuery<Day, DayVariables>(DAY, {
    variables: { input: { id: dayId } },
  });

  if (loading) return <div>loading...</div>;

  if (error || !data || !data.day) return <div>error</div>;

  const { pastoralVisits, visitDate, unusedHouses } = data.day;

  const currDate = new Date(visitDate);

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

    const query = client.cache.readQuery<Day, DayVariables>(queryOptions)!;

    const pastoralVisits = query.day?.pastoralVisits;

    if (!query.day || !pastoralVisits) return;

    const indexes = findEntranceInPastoralVisits(draggableId, pastoralVisits);

    if (!indexes) return;

    const newData = [...pastoralVisits];

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

    client.cache.writeQuery<Day, DayVariables>({
      ...queryOptions,
      data: { day: { ...query.day, pastoralVisits: newData } },
    });

    relocateEntrance({
      variables: { id: draggableId, to: destination.droppableId },
    });
  };

  const splitedUnusedHouses = splitByLabel(
    unusedHouses,
    (house) => house.street?.name
  );

  return (
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
          <Droppable droppableId={"unusedHouses"}>
            {(provided) => (
              <Paper innerRef={provided.innerRef} {...provided.droppableProps}>
                {getKeys(splitedUnusedHouses).map((key) => (
                  <List subheader={<ListSubheader>{key}</ListSubheader>}>
                    {sortByHouseNumber(
                      splitedUnusedHouses[key],
                      (house) => house.number
                    ).map(({ id, number, index }) => (
                      <Draggable draggableId={id} index={index}>
                        {(provided, snapshot) => (
                          <ListItem
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            innerRef={provided.innerRef}
                            style={getStyle(
                              provided.draggableProps?.style,
                              snapshot
                            )}
                          >
                            <ListItemText primary={number} />
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                  </List>
                ))}
              </Paper>
            )}
          </Droppable>
        </div>
      </Drawer>
      <Container maxWidth={"lg"}>
        <PageTitle text={headerText} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {pastoralVisits.map(({ id, priest, entrances }) => (
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
        </div>
      </Container>
    </DragDropContext>
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
