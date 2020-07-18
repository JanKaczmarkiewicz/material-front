import React from "react";
import RowOptions, { Props as RowOptionsProps } from "./RowOptions";
import { Delete, Edit, Done } from "@material-ui/icons";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Config } from "../EditableDataTable";
import { getKeys } from "../util";
import { useHistory } from "react-router-dom";

export interface Props<T> {
  data: T;
  config: Config<T>;
  isFormOpen: boolean;
  startEditItem: () => void;
  onFormClose: () => void;
  deleteItem?: DeleteHandler;
  updateItem?: UpdateHandler<T>;
  linkTo?: string;
}

function TRow<T>({
  startEditItem,
  isFormOpen,
  onFormClose,
  updateItem,
  deleteItem,
  data,
  config,
  linkTo,
}: Props<T>) {
  const history = useHistory();

  const cellsContent = getKeys(data)
    .sort((prevKey, nextKey) => config[prevKey].index - config[nextKey].index)
    .map((key) => {
      const fieldConfig = config[key];
      const fieldData = data[key];

      if (isFormOpen && updateItem && fieldConfig.renderInput)
        return fieldConfig.renderInput({
          value: fieldData,
          name: key,
          onChange: updateItem,
        });

      if (fieldConfig.displayValue) return fieldConfig.displayValue(fieldData);

      return fieldData;
    });

  let rowOptionsProps: RowOptionsProps = {};

  if (updateItem) {
    if (isFormOpen) {
      rowOptionsProps.closeForm = {
        renderIcon: () => <Done />,
        handler: onFormClose,
      };
    } else {
      rowOptionsProps.openForm = {
        renderIcon: () => <Edit />,
        handler: startEditItem,
      };
    }
  }
  if (deleteItem && !isFormOpen) {
    rowOptionsProps.delete = {
      renderIcon: () => <Delete />,
      handler: deleteItem,
    };
  }

  const rowOptions = <RowOptions {...rowOptionsProps} />;

  const cells = cellsContent.map((el) => (
    <TableCell key={`tc-${el}`}>{el}</TableCell>
  ));

  const tableRowProps = linkTo ? { onClick: () => history.push(linkTo) } : {};

  return (
    <TableRow {...tableRowProps}>
      {cells}
      {rowOptions}
    </TableRow>
  );
}
export default TRow;

export interface FieldConfig<T, P> {
  label: string;
  index: number;
  displayValue?: (data: T) => string | React.ReactNode;
  renderInput?: (props: P) => React.ReactNode;
}

export type PassUpdate<T> = (update: Partial<T>) => void;

export interface InputProps<T, A, N> {
  value: T;
  name: N;
  onChange: PassUpdate<A>;
}

export type DeleteHandler = () => void;
export type UpdateHandler<T> = (update: Partial<T>) => void;
