import React from "react";
import {
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Inbox } from "@material-ui/icons";

const drawerWidth = 240;

interface Props {
  isOpen: boolean;
  handleOpen: () => void;
}

const AppDrawer: React.FC<Props> = ({ isOpen, handleOpen }) => {
  const classes = useStyles();

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <List>
        {[].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"left"}
          open={isOpen}
          onClose={handleOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default AppDrawer;
