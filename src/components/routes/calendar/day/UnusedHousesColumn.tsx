import React, { useMemo } from "react";
import { Day_day_assignedStreets } from "../../../../generated/Day";
import {
  extractHouseCategory,
  extractHouseNumber,
  renderHouseItemContent,
} from "../DND copy/Item";
import Column from "../DND copy/Column";
import { SelectionState } from "./selectionReducer";

interface Props {
  assignedStreets: Day_day_assignedStreets[];
  onHouseSelected: (columnId: string, itemId: string) => void;
  selection: SelectionState;
}

const UnusedHousesColumn: React.FC<Props> = ({
  assignedStreets,
  onHouseSelected,
  selection,
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
      getItemNumber={extractHouseNumber}
      renderListItemContent={renderHouseItemContent}
      onItemSelected={onHouseSelected}
      title={"Nieużywane domy"}
    />
  );
};

export default UnusedHousesColumn;
