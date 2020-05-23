import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
} from "@material-ui/core";

import {
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { MeHeader } from "../../generated/MeHeader";

const drawerWidth = 240;

type Props = {
  isOpen: boolean;
  handleOpen: () => void;
};

const ME_HEADER = gql`
  query MeHeader {
    me {
      username
    }
  }
`;
const Header: React.FC<Props> = ({ isOpen, handleOpen }) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery<MeHeader>(ME_HEADER);

  if (loading) return <div>loading ...</div>;
  if (error) return <div>Error</div>;

  const user = data.me;

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
          Dashboard
        </Typography>
        {!user ? (
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
          >
            login
          </Button>
        ) : (
          <>
            {`Witamy, ${user.username}!`}
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </>
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
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
}));
