import React, { useState } from "react";
import check from "../../../utils/check";

import {
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Table
} from "@material-ui/core";

import Title from "../../Title";
import THead from "./Table/THead";
import TFooter from "./Table/TFooter";
import RowOptions from "./Table/RowOptions";
import validateProps from "./Table/validateProps";

export interface Props<T> {
  items: T[];
  title: string;
  categoryNames: string[];
  deleteItem: (index: number) => void;
  addItem: (data: T) => void;
  editItem: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

function DataTable<T>(props: Props<T>) {
  check(validateProps<T>(props), "Table props are invalid!");

  const { title, categoryNames, items, deleteItem, addItem } = props;
  const [editedItem, setEditedItem] = useState<number | null>(null);
  const rows = items.map((data: any, index) => (
    <TableRow key={index}>
      {Object.keys(data).map(key => (
        <TableCell>{data[key]}</TableCell>
      ))}
      <RowOptions
        onDelete={() => {
          deleteItem(index);
        }}
        onEdit={() => {
          setEditedItem(index);
        }}
      />
    </TableRow>
  ));

  return (
    <Paper>
      <Title>{title}</Title>
      <Table>
        <THead categories={categoryNames} />
        <TableBody>{rows}</TableBody>
        <TFooter onSubmit={addItem} />
      </Table>
    </Paper>
  );
}

export default DataTable;
