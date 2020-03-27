import React from "react";
import { PassUpdate, EditConfig } from "../EditableDataTable";
import TRowForm from "./TRowForm";
import TDisplayRow from "./TDisplayRow";
import { getDisplayNames } from "../util";
import RowOptions from "./RowOptions";
import { Delete, Edit, Done } from "@material-ui/icons";
import { TableRow } from "@material-ui/core";

interface Props {
  data: any;
  deleteItem: () => void;
  startEditItem: () => void;
  onFormClose: () => void;
  config: EditConfig;
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
  // </props transformation>

  return (
    <TableRow>
      {isFormOpen ? (
        <TRowForm
          config={config}
          data={displayValues}
          onChange={onChange}
          renderOptions={() => (
            <RowOptions
              closeForm={{
                renderIcon: () => <Done />,
                handler: () => {
                  onFormClose();
                }
              }}
            />
          )}
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
      )}
    </TableRow>
  );
}
export default TRow;
