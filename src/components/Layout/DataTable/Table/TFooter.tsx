import React from "react";
import { TableRow, TableFooter, TableCell } from "@material-ui/core";

interface Props {}

const TFooter: React.FC<Props> = () => {
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={10} align="center" />
      </TableRow>
    </TableFooter>
  );
};

export default TFooter;
