import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RowForm from "./RowForm";
import RawRowForm from "./RawRowForm";

import { Edit, Add, Delete } from "@material-ui/icons";
import {
  IconButton,
  TableFooter,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  Typography,
  Toolbar
} from "@material-ui/core";

interface Props<T> {
  initialState: T[];
  emptyRow: T;
  title: string;
  categoryNames: string[];
}

function DataTable<T>({
  initialState,
  title,
  categoryNames,
  emptyRow
}: Props<T>) {
  const classes = useStyles();

  const [items, setItems] = useState(initialState);
  const [editedItemIndex, setEditedItemIndex] = useState<number | null>(null);
  const [addRowOpen, setAddRowOpen] = useState<boolean>(false);

  const handleAddRowOpen = () => {
    setAddRowOpen(true);
  };

  const handleAddRowClose = (data: any) => {
    setItems([...items, data]);
    setAddRowOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (typeof editedItemIndex === "number") {
      setItems([
        ...items.slice(0, editedItemIndex),
        { ...items[editedItemIndex], [e.target.name]: e.target.value },
        ...items.slice(editedItemIndex + 1)
      ]);
    }
  };

  const handleDelete = (index: number) => {
    const tItems = [...items];
    tItems.splice(index, 1);
    setItems(tItems);
  };

  return (
    <Paper>
      <Toolbar>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
      <TableContainer>
        <Table className={classes.table} aria-label="acolytes-table">
          <TableHead>
            <TableRow>
              {categoryNames.map(category => (
                <TableCell>{category}</TableCell>
              ))}

              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((data: any, index) =>
              index === editedItemIndex ? (
                <RawRowForm
                  onSubmit={() => {
                    setEditedItemIndex(null);
                  }}
                  input={items[editedItemIndex]}
                  onChange={handleChange}
                />
              ) : (
                <TableRow key={index}>
                  {Object.keys(data).map(key => (
                    <TableCell>{data[key]}</TableCell>
                  ))}
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setEditedItemIndex(index);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
            {addRowOpen && (
              <RowForm onSubmit={handleAddRowClose} values={emptyRow} />
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={Object.keys(emptyRow).length + 1}
                align="center"
              >
                <IconButton onClick={handleAddRowOpen}>
                  <Add />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default DataTable;
