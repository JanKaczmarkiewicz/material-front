import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import { Config } from "../EditableDataTable";
import { getKeys } from "../util";

interface Props<T> {
  config: Config<T>;
}

function THead<T>({ config }: Props<T>) {
  const labels = getKeys(config)
    .map((key) => config[key])
    .sort((curr, next) => curr.index - next.index)
    .map((field) => field.label);

  return (
    <TableHead>
      <TableRow>
        {labels.map((label) => (
          <TableCell key={label}>{label}</TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}

export default THead;
