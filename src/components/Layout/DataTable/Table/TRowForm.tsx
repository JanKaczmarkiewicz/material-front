import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
import InputFactory, { InputConfig } from "./Inputs/InputFactory";
import { PassUpdate } from "../DataTable";

export interface Props {
  config: { [key: string]: InputConfig };
  data: any;
  onChange: PassUpdate;
}

const TRowForm: React.FC<Props> = ({ config, data, onChange }) => {
  return (
    <TableRow>
      {Object.keys(data).map(key => (
        <TableCell>
          {InputFactory(config[key], { onChange, value: data[key], name: key })}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TRowForm;
