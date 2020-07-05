import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ListItem, ListItemText } from "@material-ui/core";
import { DaySchedule_pastoralVisits_entrances } from "../../../generated/DaySchedule";

interface Props {
  entry: DaySchedule_pastoralVisits_entrances;
  index: number;
}

const Item: React.FC<Props> = ({ entry, index }) => {
  const { id, comment } = entry;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <ListItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
        >
          <ListItemText primary={"XD"} secondary={comment} />
        </ListItem>
      )}
    </Draggable>
  );
};

export default Item;
