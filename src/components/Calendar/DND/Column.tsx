import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { List, Paper, ListSubheader } from "@material-ui/core";
import Item from "./Item";
import { DaySchedule_pastoralVisits_entrances } from "../../../generated/DaySchedule";
import { getKeys } from "../../Layout/DataTable/util";
interface Props {
  title: string;
  items: Entrance[];
}

const matchLetters = /\D/g;

type Entrance = DaySchedule_pastoralVisits_entrances;

type Splited<T> = { [key: string]: T[] };
function splitByLabel<T>(
  items: T[],
  condition: (item: T) => string | undefined
) {
  const splited: Splited<T> = {};
  for (const item of items) {
    const key = condition(item);
    if (!key) continue;

    if (!splited[key]) {
      splited[key] = [];
    }
    splited[key].push(item);
  }
  return splited;
}

type GroupProps = {
  label: string;
  entrances: Entrance[];
};

const Group: React.FC<GroupProps> = ({ entrances, label }) => (
  <List subheader={<ListSubheader>{label}</ListSubheader>}>
    {entrances
      .sort((e1, e2) => {
        if (!e1.house || !e2.house) {
          return 0;
        }

        const a = e1.house.number.replace(matchLetters, "");
        const b = e2.house.number.replace(matchLetters, "");

        const aValue = Number.parseInt(a, 10);
        const bValue = Number.parseInt(b, 10);

        if (Number.isNaN(aValue) || Number.isNaN(bValue)) return 0;

        return aValue > bValue ? 1 : -1;
      })
      .map((entrance, index) => (
        <Item key={`g-${entrance.id}`} entrance={entrance} index={index} />
      ))}
  </List>
);

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
const Column: React.FC<Props> = ({ title, items }) => {
  return (
    <Droppable droppableId={title}>
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
