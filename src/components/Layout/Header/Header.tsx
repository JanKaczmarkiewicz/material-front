import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link,
} from "@material-ui/core";

import { Menu as MenuIcon } from "@material-ui/icons";
import { useAuthContext } from "../../../context/Auth/AuthContext";
import AuthenticatedHeaderContent from "./AuthenticatedHeaderContent";
import UnauthenticatedHeaderContent from "./UnauthenticatedHeaderContent";
import { Link as RouterLink } from "react-router-dom";

const drawerWidth = 240;

type Props = {
  isOpen: boolean;
  handleToggle: () => void;
};

const Header: React.FC<Props> = ({ isOpen, handleToggle }) => {
  const classes = useStyles();

  const { me } = useAuthContext();

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleToggle}
          className={clsx(classes.menuButton)}
        >
          <MenuIcon />
        </IconButton>
        <Typography to="/" component={RouterLink}>
          Kolęda
        </Typography>

        {me ? (
          <AuthenticatedHeaderContent me={me} />
        ) : (
          <UnauthenticatedHeaderContent />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));
