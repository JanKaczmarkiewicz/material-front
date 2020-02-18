import React from "react";
import { TableCell, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

interface Props {
  onDelete: () => void;
  onEdit: () => void;
}

const RowOptions: React.FC<Props> = ({ onDelete, onEdit }) => {
  return (
    <TableCell align="right">
      <IconButton onClick={onDelete}>
        <Edit />
      </IconButton>
      <IconButton onClick={onDelete}>
        <Delete />
      </IconButton>
    </TableCell>
  );
};

export default RowOptions;
