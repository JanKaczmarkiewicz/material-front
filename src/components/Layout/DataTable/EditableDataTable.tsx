import React, { useState } from "react";

import { TableBody, Paper, Toolbar } from "@material-ui/core";

import Title from "../../Title";
import THead from "./Table/THead";
import TFooter from "./Table/TFooter";
import TRow, {
  FieldConfig,
  InputProps,
  Props as RowProps,
} from "./Table/TEditableRow";
import Table from "./Table/Table";

export type Config<T> = {
  [N in keyof T]: FieldConfig<T[N], InputProps<T[N], T, N>>;
};

interface WithIdentyfier {
  id: string;
}

type Id<T> = (id: string) => T;

export interface Props<T, M = Omit<T, "id">> {
  items: T[];
  title: string;
  config: Config<M>;
  deleteItem?: Id<void>;
  updateItem?: Id<RowProps<M>["updateItem"]>;
  sanitize: (data: T) => T;
}

function DataTable<T extends WithIdentyfier>(props: Props<T>) {
  const [editedItemId, setEditedItemId] = useState<WithIdentyfier["id"] | null>(
    null
  );

  const { title, items, config, sanitize, deleteItem, updateItem } = props;

  const rows = items.map((data) => {
    const { id, ...rest } = sanitize(data);

    return (
      <TRow
        key={id}
        config={config}
        data={rest}
        isFormOpen={editedItemId === id}
        onFormClose={() => setEditedItemId(null)}
        startEditItem={() => setEditedItemId(id)}
        {...(updateItem ? { updateItem: updateItem(id) } : {})}
        {...(deleteItem ? { deleteItem: deleteItem.bind(null, id) } : {})}
      />
    );
  });

  return (
    <Paper>
      <Toolbar>
        <Title>{title}</Title>
      </Toolbar>
      <Table>
        <THead config={config} />
        <TableBody>{rows}</TableBody>
        <TFooter />
      </Table>
    </Paper>
  );
}

export default DataTable;
