import React from "react";
import Header from "./Layout/Header/Header";
import { Toolbar, Theme, makeStyles } from "@material-ui/core";
import MobileDrower from "./Layout/Drawer";
import Router from "./router/router";

const App: React.FC = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <Header handleToggle={handleDrawerToggle} />

      <main className={classes.root}>
        <MobileDrower isOpen={mobileOpen} handleToggle={handleDrawerToggle} />
        <Router />
      </main>
    </div>
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

export default App;
