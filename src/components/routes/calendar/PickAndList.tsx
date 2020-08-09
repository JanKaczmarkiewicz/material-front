import React from "react";
import ListMultiple, { ObjectWithId } from "./ListMultiple";
import PickMultiple from "./PickMultiple";

interface BaseProps<T extends ObjectWithId> {
  getOptionLabel: (item: T) => string;
  selectedItemsIds: string[];
}

interface Props<T extends ObjectWithId> extends BaseProps<T> {
  label: string;
  options: T[];
  max?: number;
  setSelectedItemsIds: (ids: string[]) => void;
}

const PickAndList = <T extends ObjectWithId>({
  selectedItemsIds,
  options,
  label,
  max,
  getOptionLabel,
  setSelectedItemsIds,
}: Props<T>) => {
  const removeItem = (id: string) => {
    const result = selectedItemsIds.filter(
      (selectedItemId) => selectedItemId !== id
    );
    return setSelectedItemsIds(result);
  };

  const addItem = (id: string) =>
    setSelectedItemsIds([...selectedItemsIds, id]);

  const selectedItems: T[] = selectedItemsIds
    .map((itemId) => options.find(({ id }) => id === itemId)!)
    .filter(Boolean);

  const displayPickComponent = !max || selectedItems.length < max;
  const displayListComponent = selectedItems.length > 0;

  return (
    <div>
      {displayListComponent && (
        <ListMultiple<T>
          items={selectedItems}
          getOptionLabel={getOptionLabel}
          onItemRemoval={removeItem}
        />
      )}
      {displayPickComponent && (
        <PickMultiple<T>
          selectedItemsIds={selectedItemsIds}
          items={options}
          label={label}
          onItemSelected={addItem}
          getOptionLabel={getOptionLabel}
        />
      )}
    </div>
  );
};

export default PickAndList;
