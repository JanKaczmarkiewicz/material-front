import React, { useState } from "react";
import {
  TableRow,
  TableFooter,
  TableCell,
  IconButton
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

interface Props {
  onSubmit: (data: any) => void;
}

const TFooter: React.FC<Props> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (data: any) => {
    onSubmit(data);
    setIsOpen(false);
  };
  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={10} align="center">
          <IconButton onClick={handleOpen}>
            <Add />
          </IconButton>
        </TableCell>

        {isOpen && null
        //   <RowForm
        //     onSubmit={onSubmit}
        //     values={initialValue}
        //     config={fieldsConfig}
        //   />
        }
      </TableRow>
    </TableFooter>
  );
};

export default TFooter;
