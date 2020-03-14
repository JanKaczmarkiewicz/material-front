import React, { useState } from "react";
import check from "../../../utils/check";

import { TableBody, Paper, Toolbar } from "@material-ui/core";

import Title from "../../Title";
import THead from "./Table/THead";
import TFooter from "./Table/TFooter";
import validateProps from "./Table/validateProps";
import TRow from "./Table/TRow";
import Table from "./Table/Table";
import TRowForm from "./Table/TRowForm";

import { TableConfig } from "./Table/types";

export interface Props<T> {
  items: T[];
  title: string;
  config: TableConfig;
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

  const formConfig = Object.keys(config).reduce(
    (obj, name) => ({ ...obj, [name]: config[name].form }),
    {}
  );

  const rows = items.map((data: any, index) =>
    editedItem === index ? (
      <TRowForm config={formConfig} data={data} onChange={editItem(index)} />
    ) : (
      <TRow
        config={config}
        key={index}
        data={data}
        deleteItem={() => deleteItem(index)}
        startEditItem={() => setEditedItem(index)}
      />
    )
  );

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
