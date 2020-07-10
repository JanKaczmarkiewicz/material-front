import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { List, Paper, ListSubheader } from "@material-ui/core";
import { DaySchedule_pastoralVisits_entrances } from "../../../generated/DaySchedule";
import { getKeys } from "../../Layout/DataTable/util";
import { splitByLabel } from "../../../utils/splitByLabel";
import Group from "./Group";

interface Props {
  title: string;
  items: Entrance[];
  droppableId: string;
}

type Entrance = DaySchedule_pastoralVisits_entrances;

const InnerList = React.memo<{ items: Entrance[] }>(({ items: entrances }) => {
  const spitedEntrances = splitByLabel(
    entrances,
    ({ house }) => house?.street?.name
  );

  return (
    <>
      {getKeys(spitedEntrances).map((key) => (
        <Group
          key={`c-in-${key}`}
          entrances={spitedEntrances[key]}
          label={key as string}
        />
      ))}
    </>
  );
});

const Column: React.FC<Props> = ({ title, items, droppableId }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <List
          innerRef={provided.innerRef}
          {...provided.droppableProps}
          subheader={
            <ListSubheader>
              <b>{title}</b>
            </ListSubheader>
          }
        >
          <Paper>
            <InnerList items={items} />
          </Paper>
        </List>
      )}
    </Droppable>
  );
};

export default Column;
