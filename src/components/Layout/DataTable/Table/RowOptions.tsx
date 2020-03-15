import React from "react";
import { TableCell, IconButton } from "@material-ui/core";

interface Props {
  [key: string]: {
    renderIcon: () => JSX.Element;
    handler: () => void;
  };
}

const RowOptions: React.FC<Props> = props => {
  return (
    <TableCell align="right">
      {Object.keys(props).map(key => (
        <IconButton onClick={props[key].handler}>
          {props[key].renderIcon()}
        </IconButton>
      ))}
    </TableCell>
  );
};

export default RowOptions;
