import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Paper, Typography } from "@material-ui/core";
import { splitByLabel } from "../../../../../utils/splitByLabel";
import { getKeys } from "../../../../Layout/DataTable/util";
import HousesSteetList, { AbstractItem } from "./HousesSteetList";
import { useSelectionContext } from "../../../../../context/Selection/selectionContext";
import { ItemForwardProps } from "./Item";

interface Props<T>
  extends Omit<Omit<InnerListProps<T>, "selectionData">, "toggle"> {
  title: string;
}

interface InnerListProps<T> extends ItemForwardProps<T> {
  items: T[];
  getElementCategory: (item: T) => string | undefined;
  getItemNumber: (item: T) => string | undefined;
}

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

const Column = <T extends AbstractItem>({ title, ...restProps }: Props<T>) => {
  const { selection, toggle } = useSelectionContext();

  const selectionData =
    selection.currentColumnId === restProps.columnId
      ? {
          draggedItemId: selection.currentDraggedItemId,
          selectedItems: selection.selectedItems,
        }
      : null;

  return (
    <Droppable droppableId={restProps.columnId}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Typography variant={"h6"}>{title}</Typography>
          <Paper>
            <InnerListMemorized<T>
              {...restProps}
              toggle={toggle}
              selectionData={selectionData}
            />
          </Paper>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
