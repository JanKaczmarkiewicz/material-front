import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";

import { Menu as MenuIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/Auth/AuthContext";
const drawerWidth = 240;

type Props = {
  isOpen: boolean;
  handleOpen: () => void;
};

const Header: React.FC<Props> = ({ isOpen, handleOpen }) => {
  const classes = useStyles();

  const { me } = useAuthContext();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, isOpen && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleOpen}
          className={clsx(
            classes.menuButton,
            isOpen && classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Kolęda
        </Typography>
        {me ? (
          `Witamy, ${me.username}!`
        ) : (
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
          >
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
}));
