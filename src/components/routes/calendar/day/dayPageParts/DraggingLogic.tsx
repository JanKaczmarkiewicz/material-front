import React, { useCallback } from "react";
import { useDayContext } from "../../../../../context/day/DayContext";
import { useSelectionContext } from "../../../../../context/Selection/selectionContext";
import { DropResult, DragStart, DragDropContext } from "react-beautiful-dnd";

const DraggingLogic: React.FC = ({ children }) => {
  const {
    createEntrances,
    relocateEntrances,
    deleteEntrances,
  } = useDayContext();
  const {
    selection,
    startDrag,
    cancelDrag,
    clear: clearSelected,
  } = useSelectionContext();

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;

      if (!destination || destination.droppableId === source.droppableId) {
        cancelDrag();
        return;
      }

      clearSelected();

      if (source.droppableId === "unusedHouses")
        createEntrances({
          housesIds: selection.selectedItems,
          destinationPastoralVisitId: destination.droppableId,
        });
      else if (destination.droppableId === "unusedHouses")
        deleteEntrances({
          sourcePastoralVisitId: source.droppableId,
          entrancesIds: selection.selectedItems,
        });
      else
        relocateEntrances({
          sourcePastoralVisitId: source.droppableId,
          destinationPastoralVisitId: destination.droppableId,
          entrancesIds: selection.selectedItems,
        });
    },
    [selection.selectedItems]
  );

  const onDragStart = useCallback(({ draggableId, source }: DragStart) => {
    //TODO checks
    const id = draggableId;

    startDrag({ columnId: source.droppableId, itemId: id });
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {children}
    </DragDropContext>
  );
};

export default DraggingLogic;
