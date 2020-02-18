import React from "react";
import { TableRow, TableCell, IconButton, TextField } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

interface Props {
  input: any;
  onChange: any;
  onSubmit: any;
}

const RawRowForm: React.FC<Props> = ({ onChange, input, onSubmit }) => {
  return (
    <TableRow>
      {Object.keys(input).map((key: string) => (
        <TableCell>
          <TextField></TextField>
        </TableCell>
      ))}
      <TableCell align="right">
        <IconButton onClick={onSubmit}>
          <DoneIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default RawRowForm;

// export type FormInput = React.ComponentType<TextFieldProps>;
