import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { List } from "@material-ui/core";
import Item from "./Item";
import { DaySchedule_pastoralVisits_entrances } from "../../../generated/DaySchedule";
interface Props {
  title: string;
  items: DaySchedule_pastoralVisits_entrances[];
}

const Column: React.FC<Props> = ({ title, items }) => {
  return (
    <>
      <h1>{title}</h1>
      <Droppable droppableId={title}>
        {(provided) => (
          <List innerRef={provided.innerRef} {...provided.droppableProps}>
            {items.map((el, index) => (
              <Item key={el.id} entry={el} index={index} />
            ))}
          </List>
        )}
      </Droppable>
    </>
  );
};

export default Column;
