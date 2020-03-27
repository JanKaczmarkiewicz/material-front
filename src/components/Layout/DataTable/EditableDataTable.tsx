import React, { useState } from "react";
import check from "../../../utils/check";

import { TableBody, Paper, Toolbar } from "@material-ui/core";

import Title from "../../Title";
import THead from "./Table/THead";
import TFooter from "./Table/TFooter";
import TRow from "./Table/TEditableRow";
import Table from "./Table/Table";
import validateProps from "./Table/validateProps";

import { FieldConfig } from "./Table/types";

interface RelationField extends FieldConfig {
  type: "AUTOCOMPLETE";
  getName: (id: string) => string;
  options: any[];
}

interface TextField extends FieldConfig {
  type: "TEXT";
}

export type EditConfig = Record<string, DataConfig>;
export type DataConfig = TextField | RelationField;

export interface Props<T> {
  items: T[];
  title: string;
  config: EditConfig;
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

  const { title, items, deleteItem, addItem, config, editItem } = props;

  const rows = items.map((data: any, index) => (
    <TRow
      config={config}
      key={index}
      data={data}
      deleteItem={() => deleteItem(index)}
      startEditItem={() => setEditedItem(index)}
      isFormOpen={editedItem === index}
      onChange={editItem(index)}
      onFormClose={() => setEditedItem(null)}
    />
  ));

  return (
    <Paper>
      <Toolbar>
        <Title>{title}</Title>
      </Toolbar>
      <Table>
        <THead config={config} />
        <TableBody>{rows}</TableBody>
        <TFooter onSubmit={addItem} />
      </Table>
    </Paper>
  );
}

export default DataTable;
