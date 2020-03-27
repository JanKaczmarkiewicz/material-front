import React from "react";

import { TableBody, Paper, Toolbar } from "@material-ui/core";

import Title from "../../Title";
import THead from "./Table/THead";
import Table from "./Table/Table";

import { FieldConfig } from "./Table/types";
import TDisplayRow from "./Table/TDisplayRow";

import { getDisplayNames } from "./util";

interface RelationField extends FieldConfig {
  getName: (id: string) => string;
}
interface TextField extends FieldConfig {}

export interface Props<T> {
  items: T[];
  title: string;
  config: Record<string, TextField | RelationField>;
}

function DataTable<T>(props: Props<T>) {
  const { title, items, config } = props;

  const rows = items.map((data: any) => (
    <TDisplayRow data={getDisplayNames(data, config)} />
  ));

  return (
    <Paper>
      <Toolbar>
        <Title>{title}</Title>
      </Toolbar>
      <Table>
        <THead config={config} />
        <TableBody>{rows}</TableBody>
      </Table>
    </Paper>
  );
}

export default DataTable;
