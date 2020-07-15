import React from "react";
import { Me_me } from "../../../generated/Me";
import { seed } from "../../routes/Data";
import {
  Link as A,
  Button,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  me: Me_me;
}

const AuthenticatedHeaderContent: React.FC<Props> = ({ me }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div className={classes.root}>
      {isMobile &&
        seed.map(({ title, url }) => (
          <Button
            key={`ab-${url}`}
            variant={"contained"}
            to={url}
            component={Link}
          >
            {title}
          </Button>
        ))}
      <Typography className={classes.welcome}>
        Witamy, {me.username}!
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    "& *": {
      margin: theme.spacing(0, 1, 0, 1),
    },
  },
  welcome: {
    textAlign: "center",
  },
}));

export default AuthenticatedHeaderContent;
