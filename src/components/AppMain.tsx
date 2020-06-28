import React from "react";
import { makeStyles, Theme, Container } from "@material-ui/core";
import Router from "./router/router";

interface Props {}

const useMainStyles = makeStyles((theme: Theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const AppMain = () => {
  const classes = useMainStyles();
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Router />
      </Container>
    </main>
  );
};
export default AppMain;
