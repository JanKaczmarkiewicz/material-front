import React, { useMemo } from "react";
import {
  MenuItem,
  IconButton,
  Divider,
  Menu,
  makeStyles,
} from "@material-ui/core";
import { useSelectionContext } from "../../../../../context/Selection/selectionContext";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { green, red } from "@material-ui/core/colors";
import { UnselectHandler, SelectHandler } from "../../../../../types/selection";

interface Props extends ForwardProps {
  odd: string[];
  even: string[];
  columnId: string;
}

export interface ForwardProps {
  onSelect: SelectHandler;
  onUnselect: UnselectHandler;
}

const GroupMenu: React.FC<Props> = ({ odd, even, columnId }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => setAnchorEl(null);

  const { select: onSelect, unselect: onUnselect } = useSelectionContext();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleSelectOdd = () => selectMultiple(odd);

  const handleSelectEven = () => selectMultiple(even);

  const handleSelectAll = () => selectMultiple([...even, ...odd]);

  const selectMultiple = (itemsIds: string[]) => {
    onSelect({ columnId, itemsIds });
    handleClose();
  };

  const handleUnselectOdd = () => unselectMultiple(odd);

  const handleUnselectEven = () => unselectMultiple(even);

  const handleUnselectAll = () => unselectMultiple([...even, ...odd]);
  const unselectMultiple = (itemsIds: string[]) => {
    onUnselect({ itemsIds });
    handleClose();
  };

  const selectWord = <span className={classes.selectWord}>Zaznacz</span>;
  const unselectWord = <span className={classes.unselectWord}>Odznacz</span>;

  return useMemo(
    () => (
      <>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          keepMounted
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <MenuItem onClick={handleSelectOdd}>
            <span>{selectWord} nieparzyste</span>
          </MenuItem>
          <MenuItem onClick={handleSelectEven}>
            <span>{selectWord} parzyste</span>
          </MenuItem>
          <MenuItem onClick={handleSelectAll}>
            <span>{selectWord} wszyskie</span>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleUnselectOdd}>
            <span>{unselectWord} nieparzyste</span>
          </MenuItem>
          <MenuItem onClick={handleUnselectEven}>
            <span> {unselectWord} parzyste</span>
          </MenuItem>
          <MenuItem onClick={handleUnselectAll}>
            <span>{unselectWord} wszyskie</span>
          </MenuItem>
        </Menu>
      </>
    ),
    //doesnt matter if memo checks even or odd props
    [even, anchorEl]
  );
};

export default GroupMenu;

const useStyles = makeStyles(() => ({
  selectWord: {
    color: green[300],
  },
  unselectWord: {
    color: red[300],
  },
}));
