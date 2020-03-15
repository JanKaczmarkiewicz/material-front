import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import RowOptions from "./RowOptions";

interface Props {
  data: any;
  deleteItem: () => void;
  startEditItem: () => void;
}

function TDisplayRow({ data, startEditItem, deleteItem }: Props) {
  return (
    <TableRow>
      {Object.keys(data).map(key => (
        <TableCell>{data[key]}</TableCell>
      ))}
      <RowOptions
        onDelete={() => {
          deleteItem();
        }}
        onEdit={() => {
          startEditItem();
        }}
      />
    </TableRow>
  );
}

export default TDisplayRow;
