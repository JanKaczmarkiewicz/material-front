import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
} from "@material-ui/core";

import { Menu as MenuIcon } from "@material-ui/icons";
import { useAuthContext } from "../../../context/Auth/AuthContext";
import { Link as RouterLink, useHistory } from "react-router-dom";

import { seed } from "../../routes";
type Props = {
  handleToggle: () => void;
};

const Header: React.FC<Props> = ({ handleToggle }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));
  const { me } = useAuthContext();
  const history = useHistory();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.appBarContentContainer}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggle}
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" onClick={() => history.push("/")}>
            Kolęda
          </Typography>

          <div className={classes.nav}>
            {isMobile &&
              seed.map(({ title, url }) => (
                <Button
                  key={`ab-${url}`}
                  variant={"contained"}
                  to={url}
                  component={RouterLink}
                >
                  {title}
                </Button>
              ))}
            {/* there will be always `me` becouse this app bar would not be rendered (see App component) */}
            <Typography>Witamy, {me!.username}!</Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarContentContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  nav: {
    display: "flex",

    "& *": {
      alignItems: "center",
      margin: theme.spacing(0, 1, 0, 1),
    },
  },
}));
