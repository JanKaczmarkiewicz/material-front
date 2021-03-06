import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

interface Props<T> {
  getOptionLabel: (item: T) => string;
  onItemRemoval: (id: string) => void;
  items: T[];
}

export type ObjectWithId = { id: string };

const ListMultiple = <T extends ObjectWithId>({
  getOptionLabel,
  onItemRemoval,
  items,
}: Props<T>) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          <ListItemText primary={getOptionLabel(item)} />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => onItemRemoval(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ListMultiple;
