import React from "react";
import {
  makeStyles,
  TableContainer,
  Table as MuiTable
} from "@material-ui/core";

interface Props {
  children: React.ReactChildren;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const Table: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <TableContainer>
      <MuiTable className={classes.table}>{children}</MuiTable>
    </TableContainer>
  );
};

export default Table;
