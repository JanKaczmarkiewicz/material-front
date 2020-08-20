import React from "react";

import { stringToColour } from "../../../../../utils/stringToColor";
import { List, ListSubheader, Typography, makeStyles } from "@material-ui/core";

import {
  sortByHouseNumber,
  parseHouseNumber,
} from "../../../../../utils/sortByHouseNumber";

import { shorterStreetName } from "../../../../../utils/shorterStreetName";
import Item, { ItemForwardProps } from "./Item";
import GroupMenu, { ForwardProps as GroupForwardProps } from "./GroupMenu";
import { AbstractItemWithIndex } from "../../../../../types/shered";

interface Props<T> extends ItemForwardProps<T>, GroupForwardProps {
  items: T[];
  title: string;
  getItemNumber: (item: T) => string | undefined;
}

export type SelectionData = {
  draggedItemId: string | null;
  selectedItems: string[];
};

const HousesSteetList = <T extends AbstractItemWithIndex>({
  title,
  items,
  getItemNumber,
  onSelect,
  onUnselect,
  ...restProps
}: Props<T>) => {
  const classes = useStyles();

  const color = stringToColour(title.substr(0, 4));

  const odd: string[] = [];
  const even: string[] = [];

  for (const item of items) {
    const num = getItemNumber(item);
    if (!num) continue;
    const numValue = parseHouseNumber(num);
    if (Number.isNaN(numValue)) continue;
    const resultArray = numValue % 2 === 0 ? even : odd;
    resultArray.push(item.id);
  }

  const groupMenuProps = {
    odd,
    even,
    columnId: restProps.columnId,
    onSelect,
    onUnselect,
  };

  return (
    <List
      dense
      subheader={
        <ListSubheader className={classes.listSubheader}>
          <Typography>{shorterStreetName(title)}</Typography>
          <GroupMenu {...groupMenuProps} />
        </ListSubheader>
      }
      style={{ backgroundColor: color }}
    >
      {sortByHouseNumber(items, getItemNumber).map((item) => (
        <Item key={item.id} item={item} {...restProps} />
      ))}
    </List>
  );
};

export default HousesSteetList;

const useStyles = makeStyles(() => ({
  listSubheader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
