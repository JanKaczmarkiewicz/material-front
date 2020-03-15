import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import RowOptions from "./RowOptions";

import { Edit, Delete } from "@material-ui/icons";

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
        delete={{
          renderIcon: () => <Delete />,
          handler: () => {
            deleteItem();
          }
        }}
        edit={{
          renderIcon: () => <Edit />,
          handler: () => {
            startEditItem();
          }
        }}
      />
    </TableRow>
  );
}

export default TDisplayRow;
