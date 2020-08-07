import React from "react";

import { stringToColour } from "../../../../../utils/stringToColor";
import {
  List,
  ListSubheader,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  ListItem,
  makeStyles,
  Divider,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import {
  sortByHouseNumber,
  parseHouseNumber,
} from "../../../../../utils/sortByHouseNumber";
import { shorterStreetName } from "../../../../../utils/shorterStreetName";
import { green, red } from "@material-ui/core/colors";

export interface AbstractItem {
  id: string;
}

export interface AbstractItemWithIndex extends AbstractItem {
  index: number;
}

type Props<T extends AbstractItemWithIndex> = {
  items: T[];
  title: string;
  droppableId: string;
  selectionData: SelectionData | null;

  renderListItemContent: (item: T) => React.ReactNode;
  getItemNumber: (item: T) => string | undefined;

  onItemSelect: (columnId: string, itemId: string) => void;
  onItemsUnselect: (itemsIds: string[]) => void;
  onItemsSelect: (columnId: string, itemsIds: string[]) => void;
};

export type SelectionData = {
  draggedItemId: string | null;
  selectedItems: string[];
};

const HousesSteetList = <T extends AbstractItemWithIndex>({
  title,
  items,
  selectionData,
  droppableId: columnId,
  renderListItemContent,
  getItemNumber,
  onItemsUnselect,
  onItemsSelect,
  onItemSelect,
}: Props<T>) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const color = stringToColour(title.substr(0, 4));
  const odd: string[] = [];
  const even: string[] = [];

  for (const item of items) {
    const num = getItemNumber(item);
    if (!num) continue;
    const numValue = parseHouseNumber(num);
    if (Number.isNaN(numValue)) continue;
    const resultArray = numValue % 2 === 0 ? even : odd;
    resultArray.push(item.id);
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleSelectOdd = () => {
    selectMultiple(odd);
  };

  const handleSelectEven = () => {
    selectMultiple(even);
  };

  const handleSelectAll = () => {
    selectMultiple([...even, ...odd]);
  };

  const selectMultiple = (ids: string[]) => {
    onItemsSelect(columnId, ids);
    handleClose();
  };

  const handleUnselectOdd = () => {
    unselectMultiple(odd);
  };
  const handleUnselectEven = () => {
    unselectMultiple(even);
  };
  const handleUnselectAll = () => {
    unselectMultiple([...even, ...odd]);
  };
  const unselectMultiple = (ids: string[]) => {
    onItemsUnselect(ids);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const selectWord = <span className={classes.selectWord}>Zaznacz </span>;
  const unselectWord = <span className={classes.unselectWord}>Odznacz</span>;

  return (
    <List
      dense
      subheader={
        <ListSubheader className={classes.listSubheader}>
          <Typography>{shorterStreetName(title)}</Typography>
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
              {selectWord} nieparzyste
            </MenuItem>
            <MenuItem onClick={handleSelectEven}>
              {selectWord} parzyste
            </MenuItem>
            <MenuItem onClick={handleSelectAll}>{selectWord} wszyskie</MenuItem>
            <Divider />
            <MenuItem onClick={handleUnselectOdd}>
              {unselectWord} nieparzyste
            </MenuItem>
            <MenuItem onClick={handleUnselectEven}>
              {unselectWord} parzyste
            </MenuItem>
            <MenuItem onClick={handleUnselectAll}>
              {unselectWord} wszyskie
            </MenuItem>
          </Menu>
        </ListSubheader>
      }
      style={{ backgroundColor: color }}
    >
      {sortByHouseNumber(items, getItemNumber).map((item) => (
        <Draggable draggableId={item.id} index={item.index} key={item.id}>
          {(provided, snapshot) => {
            let baseStyles: object;

            if (!selectionData) baseStyles = styles.UNSELECTED;
            else if (!selectionData.selectedItems.includes(item.id))
              baseStyles = styles.UNSELECTED;
            else if (item.id === selectionData.draggedItemId)
              baseStyles = styles.DRAGGED;
            else
              baseStyles = !!selectionData.draggedItemId
                ? styles.SELECTED_FADED
                : styles.SELECTED;

            const style = {
              ...baseStyles,
              ...getStyle(provided.draggableProps?.style, snapshot),
            };

            return (
              <ListItem
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                innerRef={provided.innerRef}
                onClick={onItemSelect.bind(null, columnId, item.id)}
                style={style}
              >
                {renderListItemContent(item)}
              </ListItem>
            );
          }}
        </Draggable>
      ))}
    </List>
  );
};

const styles = {
  SELECTED: { border: "1px dotted black" },
  SELECTED_FADED: { border: "1px dotted black", display: "none" },
  DRAGGED: { backGroundColor: "red", color: "white" },
  UNSELECTED: {},
};

export default HousesSteetList;

export function getStyle(
  style: DraggingStyle | NotDraggingStyle | undefined,
  snapshot: DraggableStateSnapshot
) {
  if (!snapshot.isDragging) return {};

  if (!snapshot.isDropAnimating) {
    return style;
  }

  return {
    ...style,
    transitionDuration: `0.001s`,
  };
}

const useStyles = makeStyles(() => ({
  listSubheader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectWord: {
    color: green[300],
  },
  unselectWord: {
    color: red[300],
  },
}));
