import React from "react";
import ListMultiple, { ObjectWithId } from "./ListMultiple";
import PickMultiple from "./PickMultiple";
import { AllStreets, AllStreets_streets } from "../../../generated/AllStreets";

interface BaseProps<T extends ObjectWithId> {
  getOptionLabel: (item: T) => string;
  selectedItems: T[];
}

interface Props<T extends ObjectWithId> extends BaseProps<T> {
  label: string;
  options: T[];
  setSelectedItems: (items: T[]) => void;
}

const PickAndList = <T extends ObjectWithId>({
  selectedItems,
  options,
  label,
  getOptionLabel,
  setSelectedItems,
}: Props<T>) => {
  const removeItem = (id: string) => {
    const result = selectedItems.filter(
      (selectedItem) => selectedItem.id !== id
    );
    return setSelectedItems(result);
  };

  const addItem = (item: T) => setSelectedItems([...selectedItems, item]);

  return (
    <div>
      <ListMultiple
        selectedItems={selectedItems}
        getOptionLabel={getOptionLabel}
        onItemRemoval={removeItem}
      />
      <PickMultiple
        selectedItems={selectedItems}
        items={options}
        label={label}
        onItemSelected={addItem}
        getOptionLabel={getOptionLabel}
      />
    </div>
  );
};

export default PickAndList;
