import React, { useMemo } from "react";
import { Day_day_assignedStreets } from "../../../../../generated/Day";
import {
  extractHouseCategory,
  extractHouseNumber,
  renderHouseItemContent,
} from "./Item";
import Column from "./Column";
import { SelectionState } from "../selection/selectionReducer";

interface Props {
  assignedStreets: Day_day_assignedStreets[];
  selection: SelectionState;
  onHousesSelect: (columnId: string, itemsIds: string[]) => void;
  onHouseSelect: (columnId: string, itemId: string) => void;
  onHousesUnselect: (itemsIds: string[]) => void;
}

const UnusedHousesColumn: React.FC<Props> = ({
  assignedStreets,
  selection,
  onHousesSelect,
  onHouseSelect,
  onHousesUnselect,
}) => {
  const unusedHouses = useMemo(
    () => assignedStreets.flatMap(({ unusedHouses }) => unusedHouses),
    [assignedStreets]
  );
  return (
    <Column
      items={unusedHouses}
      droppableId={"unusedHouses"}
      selection={selection}
      getElementCategory={extractHouseCategory}
      onItemSelect={onHouseSelect}
      onItemsUnselect={onHousesUnselect}
      getItemNumber={extractHouseNumber}
      renderListItemContent={renderHouseItemContent}
      onItemsSelect={onHousesSelect}
      title={"Nieużywane domy"}
    />
  );
};

export default UnusedHousesColumn;
