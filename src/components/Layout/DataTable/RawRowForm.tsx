import React from "react";
import { TableRow, TableCell, TextField, IconButton } from "@material-ui/core";

import DoneIcon from "@material-ui/icons/Done";

interface Props {
  input: any;
  onChange: any;
  onSubmit: any;
}

const RawRowForm: React.FC<Props> = ({ onChange, input, onSubmit }) => {
  return (
    <TableRow>
      {Object.keys(input).map((key: string) => {
        return (
          <TableCell>
            <TextField
              required
              id={`acolyte-${key}`}
              name={key}
              autoComplete={`acolyte-${key}`}
              size="small"
              value={input[key]}
              onChange={onChange}
            />
          </TableCell>
        );
      })}
      <TableCell align="right">
        <IconButton onClick={onSubmit}>
          <DoneIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default RawRowForm;
