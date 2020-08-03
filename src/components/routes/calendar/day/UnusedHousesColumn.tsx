import React, { useMemo } from "react";
import { Day_day_assignedStreets } from "../../../../generated/Day";
import {
  extractHouseCategory,
  extractHouseNumber,
  renderHouseItemContent,
} from "../DND copy/Item";
import Column from "../DND copy/Column";

interface Props {
  assignedStreets: Day_day_assignedStreets[];
  onHouseSelected: (columnId: string, itemId: string) => void;
}

const UnusedHousesColumn: React.FC<Props> = ({
  assignedStreets,
  onHouseSelected,
}) => {
  const unusedHouses = useMemo(
    () => assignedStreets.flatMap(({ unusedHouses }) => unusedHouses),
    [assignedStreets]
  );
  return (
    <Column
      items={unusedHouses}
      selectionData={null}
      droppableId={"unusedHouses"}
      getElementCategory={extractHouseCategory}
      getItemNumber={extractHouseNumber}
      renderListItemContent={renderHouseItemContent}
      onItemSelected={onHouseSelected}
      title={"Nieurzywane domy"}
    />
  );
};

export default UnusedHousesColumn;
