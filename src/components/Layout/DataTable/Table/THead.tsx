import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import { FieldConfig } from "./types";

interface Props<T> {
  config: Record<string, T>;
}

const THead: <T extends FieldConfig>(
  props: Props<T>
) => React.ReactElement<Props<T>> = ({ config }) => {
  const labels = Object.keys(config)
    .map(key => config[key])
    .sort((curr, next) => curr.index - next.index)
    .map(field => field.label);

  return (
    <TableHead>
      <TableRow>
        {labels.map(label => (
          <TableCell key={label}>{label}</TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default THead;
