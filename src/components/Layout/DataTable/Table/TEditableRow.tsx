import React from "react";
import { TableConfig } from "./types";
import { PassUpdate } from "../EditableDataTable";
import TRowForm from "./TRowForm";
import TDisplayRow from "./TDisplayRow";
import flattenObject from "../../../../utils/flattenObject";
import { getDisplayNames } from "../util";
import RowOptions from "./RowOptions";
import { Delete, Edit } from "@material-ui/icons";

interface Props {
  data: any;
  deleteItem: () => void;
  startEditItem: () => void;
  onFormClose: () => void;
  config: TableConfig;
  isFormOpen: boolean;
  onChange: PassUpdate;
}

function TRow({
  data,
  startEditItem,
  deleteItem,
  config,
  isFormOpen,
  onChange,
  onFormClose
}: Props) {
  // <props transformation>
  const displayValues = getDisplayNames(data, config);
  const formConfig = flattenObject("form", config);
  // </props transformation>

  return isFormOpen ? (
    <TRowForm
      config={formConfig}
      data={displayValues}
      onChange={onChange}
      onFormClose={onFormClose}
    />
  ) : (
    <TDisplayRow
      data={displayValues}
      renderOptions={() => (
        <RowOptions
          delete={{
            renderIcon: () => <Delete />,
            handler: () => {
              deleteItem();
            }
          }}
          edit={{
            renderIcon: () => <Edit />,
            handler: () => {
              startEditItem();
            }
          }}
        />
      )}
    />
  );
}
export default TRow;
