import React from "react";
import { makeStyles, Theme, Container } from "@material-ui/core";
import Router from "./router/router";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const AppMain = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Router />
    </Container>
  );
};
export default AppMain;
