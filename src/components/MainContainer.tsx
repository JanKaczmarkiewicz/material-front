import React from "react";
import { Theme, makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

type Props = {
  children: React.ReactElement | JSX.Element[];
};

const MainContainer: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      {children}
    </Container>
  );
};

export default MainContainer;
