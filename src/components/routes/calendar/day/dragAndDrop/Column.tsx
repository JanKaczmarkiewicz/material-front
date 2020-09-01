import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Paper, Typography, IconButton } from "@material-ui/core";
import { splitByLabel } from "@koleda/common";
import { getKeys } from "../../../../Layout/DataTable/util";
import HousesSteetList from "./HousesSteetList";
import { useSelectionContext } from "../../../../../context/Selection/selectionContext";
import { ItemForwardProps } from "./Item";
import { AbstractItem } from "../../../../../types/shered";
import { ForwardProps as GroupForwardProps } from "./GroupMenu";
import SettingsIcon from "@material-ui/icons/Settings";

interface Props<T>
  extends Pick<
    InnerListProps<T>,
    | "renderListItemContent"
    | "getElementCategory"
    | "items"
    | "columnId"
    | "getItemNumber"
  > {
  title: string;
  onOpenSettings?: (id: string) => void;
}

const Column = <T extends AbstractItem>({
  title,
  onOpenSettings,
  ...restProps
}: Props<T>) => {
  const {
    selection,
    toggle,
    select: onSelect,
    unselect: onUnselect,
  } = useSelectionContext();

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
          {onOpenSettings ? (
            <IconButton onClick={() => onOpenSettings(restProps.columnId)}>
              <SettingsIcon />
            </IconButton>
          ) : null}
          <Paper>
            <InnerListMemorized<T>
              {...restProps}
              toggle={toggle}
              onSelect={onSelect}
              onUnselect={onUnselect}
              selectionData={selectionData}
            />
          </Paper>
        </div>
      )}
    </Droppable>
  );
};

interface InnerListProps<T> extends ItemForwardProps<T>, GroupForwardProps {
  items: T[];
  getElementCategory: (item: T) => string | undefined;
  getItemNumber: (item: T) => string | undefined;
}

const InnerList = <T extends AbstractItem>({
  items,
  getElementCategory,
  ...restProps
}: InnerListProps<T>) => {
  const itemsWithIndex = items.map((item, index) => ({ ...item, index }));
  const splitedItems = splitByLabel(itemsWithIndex, getElementCategory);

  return (
    <>
      {getKeys(splitedItems).map((key) => (
        <HousesSteetList
          key={`c-in-${key}`}
          title={key as string}
          items={splitedItems[key]}
          {...restProps}
        />
      ))}
    </>
  );
};

const InnerListMemorized = React.memo(InnerList) as typeof InnerList;

export default Column;
