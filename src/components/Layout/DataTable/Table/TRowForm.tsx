import React from "react";
import { TableCell } from "@material-ui/core";
import { PassUpdate, EditConfig } from "../EditableDataTable";
import InputFactory from "./Inputs/InputFactory";

export interface Props {
  config: EditConfig;
  data: any;
  onChange: PassUpdate;
  renderOptions?: () => JSX.Element;
}

const TRowForm: React.FC<Props> = ({
  config,
  data,
  onChange,
  renderOptions
}) => (
  <>
    {Object.keys(data).map(key => (
      <TableCell>
        {InputFactory(config[key], { onChange, value: data[key], name: key })}
      </TableCell>
    ))}
    {renderOptions && renderOptions()}
  </>
);

export default TRowForm;
