import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { IconButton, Divider, List } from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Navbar from "../Navbar";

const drawerWidth = 240;

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

type Seed = Array<{
  icon: JSX.Element;
  text: string;
  link: string;
}>;

const navbarSeed: Seed = [
  // {
  //   icon: <DashboardIcon />,
  //   text: "Podsumowanie",
  //   link: "dashboard"
  // },
  // {
  //   icon: <PeopleIcon />,
  //   text: "Członkowie",
  //   link: "users"
  // },
  // {
  //   icon: <AddIcon />,
  //   text: "Dodaj",
  //   link: "add"
  // },
  // {
  //   icon: <FormatListBulletedIcon />,
  //   text: "Dane",
  //   link: "data"
  // }
];

const DrawerMenu: React.FC<Props> = ({ isOpen, handleClose }) => {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
      }}
      open={isOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <Navbar seed={navbarSeed}></Navbar>
      </List>
    </Drawer>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,

  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));
export default DrawerMenu;
