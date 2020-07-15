import React from "react";
import Header from "./Header/Header";
import { makeStyles, Theme } from "@material-ui/core";
import MobileDrower from "./Drawer";
import AppMain from "../AppMain";
import Router from "../router/router";

const Layout: React.FC = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <Header isOpen={mobileOpen} handleToggle={handleDrawerToggle} />
      <MobileDrower isOpen={mobileOpen} handleToggle={handleDrawerToggle} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Router />
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

export default Layout;
