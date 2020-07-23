import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Paper, ListItem, ListItemText } from "@material-ui/core";
import { getKeys } from "../../../Layout/DataTable/util";
import { sortByHouseNumber } from "../../../../utils/sortByHouseNumber";
import { getStyle } from "./Item";
import { splitByLabel } from "../../../../utils/splitByLabel";
import { Day_day_unusedHouses } from "../../../../generated/Day";
import HousesSteetList from "./HousesSteetList";

interface Props {
  houses: Day_day_unusedHouses[];
}

const UnusedHouses: React.FC<Props> = ({ houses }) => {
  const splitedUnusedHouses = splitByLabel(
    houses,
    (house) => house.street?.name
  );

  return (
    <Droppable droppableId={"unusedHouses"} key={"unusedHouses"}>
      {(provided) => (
        <Paper innerRef={provided.innerRef} {...provided.droppableProps}>
          {getKeys(splitedUnusedHouses).map((key) => (
            <HousesSteetList title={key as string}>
              {sortByHouseNumber(
                splitedUnusedHouses[key],
                (house) => house.number
              ).map(({ id, number, index }) => (
                <Draggable draggableId={id} key={id} index={index}>
                  {(provided, snapshot) => (
                    <ListItem
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      innerRef={provided.innerRef}
                      style={getStyle(provided.draggableProps?.style, snapshot)}
                    >
                      <ListItemText primary={number} />
                    </ListItem>
                  )}
                </Draggable>
              ))}
            </HousesSteetList>
          ))}
        </Paper>
      )}
    </Droppable>
  );
};

export default UnusedHouses;
