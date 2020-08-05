import React from "react";
import {
  Droppable,
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { Paper, Typography, ListItem } from "@material-ui/core";
import { splitByLabel } from "../../../../../utils/splitByLabel";
import { getKeys } from "../../../../Layout/DataTable/util";
import { sortByHouseNumber } from "../../../../../utils/sortByHouseNumber";
import HousesSteetList from "./HousesSteetList";
import { SelectionState } from "../selection/selectionReducer";

type AbstractItem = { id: string };

interface Props<T extends AbstractItem> extends AbstractInnerListProps<T> {
  title: string;
  selection: SelectionState;
}

interface AbstractInnerListProps<T extends AbstractItem> {
  items: T[];
  droppableId: string;
  getElementCategory: (item: T) => string | undefined;
  renderListItemContent: (item: T) => React.ReactNode;
  onItemSelected: (columnId: string, itemId: string) => void;
  getItemNumber: (item: T) => string | undefined;
}

type InnerListProps<T extends AbstractItem> = {
  selectionData: SelectionData | null;
} & AbstractInnerListProps<T>;

type SelectionData = {
  draggedItemId: string | null;
  selectedItems: string[];
};

const InnerList = <T extends AbstractItem>({
  items,
  droppableId,
  selectionData,
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
            <Draggable draggableId={item.id} index={item.index} key={item.id}>
              {(provided, snapshot) => {
                let baseStyles: object;

                if (!selectionData) baseStyles = styles.UNSELECTED;
                else if (!selectionData.selectedItems.includes(item.id))
                  baseStyles = styles.UNSELECTED;
                else if (item.id === selectionData.draggedItemId)
                  baseStyles = styles.DRAGGED;
                else
                  baseStyles = !!selectionData.draggedItemId
                    ? styles.SELECTED_FADED
                    : styles.SELECTED;

                const style = {
                  ...baseStyles,
                  ...getStyle(provided.draggableProps?.style, snapshot),
                };

                return (
                  <ListItem
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    innerRef={provided.innerRef}
                    onClick={onItemSelected.bind(null, droppableId, item.id)}
                    style={style}
                  >
                    {renderListItemContent(item)}
                  </ListItem>
                );
              }}
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
  selection,
  ...restProps
}: Props<T>) => {
  const selectionData =
    selection.currentColumnId === restProps.droppableId
      ? {
          draggedItemId: selection.currentDraggedItemId,
          selectedItems: selection.selectedItems,
        }
      : null;

  return (
    <Droppable droppableId={restProps.droppableId}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Typography variant={"h6"}>{title}</Typography>
          <Paper>
            <InnerListMemorized<T>
              selectionData={selectionData}
              {...restProps}
            />
          </Paper>
        </div>
      )}
    </Droppable>
  );
};

export default Column;

const styles = {
  SELECTED: { border: "1px solid black" },
  SELECTED_FADED: { border: "1px solid black", display: "none" },
  DRAGGED: { backGroundColor: "red", color: "white" },
  UNSELECTED: {},
};

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
