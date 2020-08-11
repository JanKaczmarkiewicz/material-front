import React, { useMemo } from "react";
import { Drawer, Toolbar, makeStyles } from "@material-ui/core";
import { useDayContext } from "../../../../../context/day/DayContext";
import Column from "../dragAndDrop/Column";
import {
  extractHouseCategory,
  extractHouseNumber,
  renderHouseItemContent,
} from "../dragAndDrop/ItemUtils";
import { Day_day_assignedStreets_unusedHouses } from "../../../../../generated/Day";

interface Props {}

const drawerWidth = 240;

const UnusedHousesDrawer: React.FC<Props> = (props) => {
  const classes = useStyles();

  const {
    day: { assignedStreets },
  } = useDayContext();

  const unusedHouses = useMemo(
    () => assignedStreets.flatMap(({ unusedHouses }) => unusedHouses),
    [assignedStreets]
  );

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.drawerContainer}>
        <Toolbar />
        <Column<Day_day_assignedStreets_unusedHouses>
          items={unusedHouses}
          columnId={"unusedHouses"}
          getElementCategory={extractHouseCategory}
          getItemNumber={extractHouseNumber}
          renderListItemContent={renderHouseItemContent}
          title={"Nieużywane domy"}
        />
      </div>
    </Drawer>
  );
};

export default UnusedHousesDrawer;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
}));
