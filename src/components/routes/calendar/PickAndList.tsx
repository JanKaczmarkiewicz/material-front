import React from "react";
import ListMultiple, { ObjectWithId } from "./ListMultiple";
import PickMultiple from "./PickMultiple";

interface BaseProps<T> {
  getOptionLabel: (item: T) => string;
  selectedItems: T[];
}

interface Props<T> extends BaseProps<T> {
  setSelectedItems: (items: T[]) => void;
  options: T[];
  label: string;
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
    console.log(selectedItems, result);
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
