import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import RowOptions from "./RowOptions";
import { TableConfig, RelationField, TextField } from "./types";

interface Props {
  data: any;
  deleteItem: () => void;
  startEditItem: () => void;
  config: TableConfig;
}

const isRelationalField = (
  config: RelationField | TextField
): config is RelationField => (config as RelationField).getName !== undefined;

function TRow({ data, startEditItem, deleteItem, config }: Props) {
  return (
    <TableRow>
      {Object.keys(data).map(key => {
        const currentConfig = config[key];
        return (
          <TableCell>
            {isRelationalField(currentConfig)
              ? currentConfig.getName(data[key])
              : data[key]}
          </TableCell>
        );
      })}
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

export default TRow;
