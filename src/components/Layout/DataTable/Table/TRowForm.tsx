import React from "react";
import { TableCell } from "@material-ui/core";
import { Done } from "@material-ui/icons";
import { PassUpdate } from "../DataTable";
import RowOptions from "./RowOptions";
import InputFactory, { InputConfig } from "./Inputs/InputFactory";

export interface Props {
  config: { [key: string]: InputConfig };
  data: any;
  onChange: PassUpdate;
  onFormClose: () => void;
}

const TRowForm: React.FC<Props> = ({ config, data, onChange, onFormClose }) => (
  <>
    {Object.keys(data).map(key => (
      <TableCell>
        {InputFactory(config[key], { onChange, value: data[key], name: key })}
      </TableCell>
    ))}
    <RowOptions
      closeForm={{
        renderIcon: () => <Done />,
        handler: () => {
          onFormClose();
        }
      }}
    />
  </>
);

export default TRowForm;
