import React from "react";
import {
  Hidden,
  List,
  ListItem,
  ListItemText,
  Drawer,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { seed } from "../routes";
import { Link } from "react-router-dom";

const drawerWidth = 240;

interface Props {
  isOpen: boolean;
  handleToggle: () => void;
}

const MobileDrower: React.FC<Props> = ({ isOpen, handleToggle }) => {
  const classes = useStyles();

  const drawer = (
    <>
      <List>
        {seed.map(({ title, url }) => (
          <ListItem
            button
            key={`mdr-${title}`}
            component={Link}
            to={url}
            onClick={handleToggle}
          >
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"left"}
          open={isOpen}
          onClose={handleToggle}
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
    </nav>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      flexShrink: 0,
    },
  },

  drawerPaper: {
    width: drawerWidth,
  },
}));

export default MobileDrower;
