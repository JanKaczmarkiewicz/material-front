import React from "react";
import {
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { Paper, Typography, ListItem } from "@material-ui/core";
import { splitByLabel } from "../../../../utils/splitByLabel";
import { getKeys } from "../../../Layout/DataTable/util";
import { sortByHouseNumber } from "../../../../utils/sortByHouseNumber";
import HousesSteetList from "./HousesSteetList";

type AbstractItem = { id: string };

interface Props<T extends AbstractItem> extends InnerListProps<T> {
  title: string;
  droppableId: string;
}

interface InnerListProps<T extends AbstractItem> {
  items: T[];
  getElementCategory: (item: T) => string | undefined;
  renderListItemContent: (item: T) => React.ReactNode;
  onItemSelected: (id: string) => void;
  getItemNumber: (item: T) => string | undefined;
}

const InnerList = <T extends AbstractItem>({
  items,
  renderListItemContent,
  getElementCategory,
  getItemNumber,
  onItemSelected,
}: InnerListProps<T>) => {
  const spitedItems = splitByLabel(items, getElementCategory);

  return (
    <>
      {getKeys(spitedItems).map((key) => (
        <HousesSteetList key={`c-in-${key}`} title={key as string}>
          {sortByHouseNumber(spitedItems[key], getItemNumber).map((item) => (
            <Draggable draggableId={item.id} index={item.index}>
              {(provided, snapshot) => (
                <ListItem
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  innerRef={provided.innerRef}
                  onClick={onItemSelected.bind(null, item.id)}
                  style={getStyle(provided.draggableProps?.style, snapshot)}
                >
                  {renderListItemContent(item)}
                </ListItem>
              )}
            </Draggable>
          ))}
        </HousesSteetList>
      ))}
    </>
  );
};

const InnerListMemorized = React.memo(InnerList) as typeof InnerList;

const Column = <T extends AbstractItem>({
  title,
  droppableId,
  ...restProps
}: Props<T>) => (
  <Droppable droppableId={droppableId}>
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        <Typography variant={"h6"}>{title}</Typography>
        <Paper>
          <InnerListMemorized<T> {...restProps} />
        </Paper>
      </div>
    )}
  </Droppable>
);

export default Column;

export function getStyle(
  style: DraggingStyle | NotDraggingStyle | undefined,
  snapshot: DraggableStateSnapshot
) {
  if (!snapshot.isDragging) return {};
  if (!snapshot.isDropAnimating) {
    return style;
  }

  return {
    ...style,
    transitionDuration: `0.001s`,
  };
}
