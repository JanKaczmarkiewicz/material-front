import React from "react";
import { TableConfig, RelationField, TextField } from "./types";
import { PassUpdate } from "../DataTable";
import TRowForm from "./TRowForm";
import TDisplayRow from "./TDisplayRow";
import flattenObject from "../../../../utils/flattenObject";

interface Props {
  data: any;
  deleteItem: () => void;
  startEditItem: () => void;
  config: TableConfig;
  isFormOpen: boolean;
  onChange: PassUpdate;
}

const isRelationalField = (
  config: RelationField | TextField
): config is RelationField => (config as RelationField).getName !== undefined;

function TRow({
  data,
  startEditItem,
  deleteItem,
  config,
  isFormOpen,
  onChange
}: Props) {
  // <props transformation>
  const displayValues = Object.keys(data).reduce((values, key) => {
    const currentConfig = config[key];
    return {
      ...values,
      [key]: isRelationalField(currentConfig)
        ? currentConfig.getName(data[key])
        : data[key]
    };
  }, {});
  const formConfig = flattenObject("form", config);
  // </props transformation>

  return isFormOpen ? (
    <TRowForm config={formConfig} data={displayValues} onChange={onChange} />
  ) : (
    <TDisplayRow
      data={displayValues}
      deleteItem={deleteItem}
      startEditItem={startEditItem}
    />
  );
}
export default TRow;
