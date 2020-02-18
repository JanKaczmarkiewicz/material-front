import React from "react";
import { TableCell, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

interface Props {
  onDelete: () => void;
  onEdit: () => void;
}

const RowOptions: React.FC<Props> = props => {
  return (
    <TableCell align="right">
      <IconButton
        onClick={() => {
          setEditedItem(index);
        }}
      >
        <Edit />
      </IconButton>
      <IconButton
        onClick={() => {
          deleteItem(index);
        }}
      >
        <Delete />
      </IconButton>
    </TableCell>
  );
};

export default RowOptions;
