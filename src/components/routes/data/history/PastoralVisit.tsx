import React from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { PastoralVisit as IPastoralVisit } from "../../../../generated/PastoralVisit";

type Props = RouteComponentProps<{
  id: string;
}>;

const PASTORAL_VISIT = gql`
  query PastoralVisit($input: FindOneInput!) {
    pastoralVisit(input: $input) {
      id
      priest {
        id
        username
      }
      acolytes {
        id
        username
      }
      visitTime
      reeceTime
      season {
        id
        year
      }
    }
  }
`;

const PastoralVisit: React.FC<Props> = ({ match }) => {
  const id = match.params.id;
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);

  const { loading, error, data } = useQuery<IPastoralVisit>(PASTORAL_VISIT);

  if (error) return <div>error</div>;
  if (loading || !data) return <div>loading...</div>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" className={classes.title}>
          Avatar with text
        </Typography>
        <div className={classes.demo}>
          <List dense={dense}>
            {[0, 1, 2].map((val) => (
              <ListItem>
                <ListItemAvatar>
                  {/* <Avatar>
                    <FolderIcon />
                  </Avatar> */}
                </ListItemAvatar>
                <ListItemText
                  primary="Single-line item"
                  secondary={secondary ? "Secondary text" : null}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default PastoralVisit;
