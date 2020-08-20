import React from "react";
import Header from "./structure/Header/Header";
import { Theme, makeStyles } from "@material-ui/core";
import MobileDrower from "./structure/Drawer";
import Router from "./router/router";
import SeasonProvider from "../context/Season/SeasonProvider";

const LoggedApp: React.FC = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <SeasonProvider>
      <div>
        <Header handleToggle={handleDrawerToggle} />

        <main className={classes.root}>
          <MobileDrower isOpen={mobileOpen} handleToggle={handleDrawerToggle} />
          <Router />
        </main>
      </div>
    </SeasonProvider>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

export default LoggedApp;
