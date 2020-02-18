import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";

interface Props {
  categories: string[];
}

const THead: React.FC<Props> = ({ categories }) => {
  return (
    <TableHead>
      <TableRow>
        {categories.map(category => (
          <TableCell>{category}</TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default THead;
