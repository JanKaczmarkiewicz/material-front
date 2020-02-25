import React, { useState } from "react";
import check from "../../../utils/check";

import { TableBody, Paper } from "@material-ui/core";

import Title from "../../Title";
import THead from "./Table/THead";
import TFooter from "./Table/TFooter";
import validateProps from "./Table/validateProps";
import TRow from "./Table/TRow";
import Table from "./Table/Table";
import TRowForm, { Props as TRowFormProps } from "./Table/TRowForm";

export interface Props<T> {
  items: T[];
  title: string;
  categoryNames: string[];
  formConfig: TRowFormProps["config"];
  deleteItem: (index: number) => void;
  addItem: (data: T) => void;
  editItem: UpdateHandler;
}

type Update = {
  [key: string]: string;
};

export type PassUpdate = (update: Update) => void;
export type UpdateHandler = (index: number) => PassUpdate;

function DataTable<T>(props: Props<T>) {
  check(validateProps<T>(props), "Table props are invalid!");

  const [editedItem, setEditedItem] = useState<number | null>(null);

  const {
    title,
    categoryNames,
    items,
    deleteItem,
    addItem,
    formConfig,
    editItem
  } = props;

  const rows = items.map((data: any, index) =>
    editedItem === index ? (
      <TRowForm config={formConfig} data={data} onChange={editItem(index)} />
    ) : (
      <TRow
        key={index}
        data={data}
        deleteItem={() => deleteItem(index)}
        startEditItem={() => setEditedItem(index)}
      />
    )
  );

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
