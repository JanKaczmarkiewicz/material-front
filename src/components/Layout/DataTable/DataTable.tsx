import React from "react";

import { TableBody, Paper, Toolbar } from "@material-ui/core";

import Title from "../../Title";
import THead from "./Table/THead";
import Table from "./Table/Table";

import { TableConfig } from "./Table/types";
import TDisplayRow from "./Table/TDisplayRow";

import { getDisplayNames } from "./util";

export interface Props<T> {
  items: T[];
  title: string;
  config: TableConfig;
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
