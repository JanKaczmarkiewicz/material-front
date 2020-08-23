import React, { useMemo } from "react";
import { SelectionData } from "./HousesSteetList";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { ListItem } from "@material-ui/core";
import { ToggleHandler } from "../../../../../types/selection";
import { AbstractItemWithIndex } from "../../../../../types/shered";

export interface ItemForwardProps<T> {
  renderListItemContent: (item: T) => React.ReactNode;
  selectionData: SelectionData | null;
  columnId: string;
  toggle: ToggleHandler;
}

interface Props<T> extends ItemForwardProps<T> {
  item: T;
}

const Item = <T extends AbstractItemWithIndex>({
  item,
  selectionData,
  columnId,
  toggle,
  renderListItemContent,
}: Props<T>) =>
  useMemo(
    () => (
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
              onClick={toggle.bind(null, { columnId, itemId: item.id })}
              style={style}
            >
              {renderListItemContent(item)}
            </ListItem>
          );
        }}
      </Draggable>
    ),
    [selectionData]
  );

export default Item;

const styles = {
  SELECTED: { border: "1px dotted black" },
  SELECTED_FADED: { border: "1px dotted black", display: "none" },
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
