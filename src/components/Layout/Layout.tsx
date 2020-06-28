import React from "react";
import Header from "./Header";
import { makeStyles, Theme } from "@material-ui/core";
import AppDrawer from "./Drawer";
import AppMain from "../AppMain";

const Layout: React.FC = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <Header isOpen={mobileOpen} handleOpen={handleDrawerToggle} />
      <AppDrawer isOpen={mobileOpen} handleOpen={handleDrawerToggle} />
      <AppMain />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
}));

export default Layout;
