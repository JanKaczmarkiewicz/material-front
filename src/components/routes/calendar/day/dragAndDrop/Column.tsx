import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Paper, Typography } from "@material-ui/core";
import { splitByLabel } from "../../../../../utils/splitByLabel";
import { getKeys } from "../../../../Layout/DataTable/util";
import HousesSteetList, {
  SelectionData,
  AbstractItem,
} from "./HousesSteetList";
import { SelectionState } from "../selection/selectionReducer";

interface Props<T extends AbstractItem> extends AbstractInnerListProps<T> {
  title: string;
  selection: SelectionState;
}

interface AbstractInnerListProps<T extends AbstractItem> {
  items: T[];
  droppableId: string;
  getElementCategory: (item: T) => string | undefined;
  renderListItemContent: (item: T) => React.ReactNode;
  onItemSelect: (columnId: string, itemId: string) => void;
  onItemsUnselect: (itemsIds: string[]) => void;
  onItemsSelect: (columnId: string, itemsIds: string[]) => void;
  getItemNumber: (item: T) => string | undefined;
}

type InnerListProps<T extends AbstractItem> = {
  selectionData: SelectionData | null;
} & AbstractInnerListProps<T>;

const InnerList = <T extends AbstractItem>({
  items,
  getElementCategory,
  ...restProps
}: InnerListProps<T>) => {
  const spitedItems = splitByLabel(items, getElementCategory);

  return (
    <>
      {getKeys(spitedItems).map((key) => (
        <HousesSteetList
          key={`c-in-${key}`}
          title={key as string}
          items={spitedItems[key]}
          {...restProps}
        />
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
