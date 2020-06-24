import React from "react";
import { TableContainer, Table as MuiTable } from "@material-ui/core";

interface Props {
  children: React.ReactNode;
}

const Table: React.FC<Props> = ({ children }) => (
  <TableContainer>
    <MuiTable>{children}</MuiTable>
  </TableContainer>
);
export default Table;
