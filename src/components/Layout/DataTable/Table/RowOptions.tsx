import React from "react";
import { TableCell, IconButton } from "@material-ui/core";
import { getKeys } from "../util";

export interface Props {
  [key: string]: {
    renderIcon: () => React.ReactNode;
    handler: () => void;
  };
}

const RowOptions: React.FC<Props> = (props) => {
  return (
    <TableCell align="right">
      {getKeys(props).map((key) => (
        <IconButton onClick={props[key].handler}>
          {props[key].renderIcon()}
        </IconButton>
      ))}
    </TableCell>
  );
};

export default RowOptions;
