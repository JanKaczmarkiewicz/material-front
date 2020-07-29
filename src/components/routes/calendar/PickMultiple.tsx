import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField, makeStyles } from "@material-ui/core";
import { ObjectWithId } from "./ListMultiple";

interface Props<T> {
  items: T[];
  selectedItems: T[];
  label: string;
  onItemSelected: (item: T) => void;
  getOptionLabel: (item: T) => string;
}

const PickMultiple = <T extends ObjectWithId>({
  items,
  selectedItems,
  label,
  onItemSelected,
  getOptionLabel,
}: Props<T>) => {
  const [itemInput, setItemInput] = useState<string>("");
  const classes = useStyles();
  const allowedItems = items.filter(
    (item) => selectedItems.findIndex(({ id }) => item.id === id) < 0
  );
  return (
    <div className={classes.root}>
      <Autocomplete
        options={allowedItems}
        getOptionLabel={getOptionLabel}
        inputValue={itemInput}
        value={null}
        onChange={(_, item) => {
          if (!item) return;
          setItemInput("");
          onItemSelected(item);
        }}
        onInputChange={(_, value) => {
          setItemInput(value);
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
};

export default PickMultiple;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2, 2, 2),
  },
}));
