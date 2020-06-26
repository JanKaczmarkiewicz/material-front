import React from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Theme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
} from "@material-ui/core";
import Card, { Props as CardProps } from "../Layout/CallToAction/Card";
import PageTitle from "../Layout/Typography/PageTitle";
import { RecordState } from "../../generated/globalTypes";
import StateStyles from "./data/history/StateStyles";

type Seed = Array<CardProps>;

const seed: Seed = [
  {
    title: "Ulice",
    url: "street",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqKPB1d7wzKUOGEcwTe96-plAnzuWvBwYymiwRkuZYUJLqcVcW",
  },
  {
    title: "Ministranci",
    url: "acolyte",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Messdienergruppe_-001-.jpg/299px-Messdienergruppe_-001-.jpg",
  },
  {
    title: "Księża",
    url: "priest",
    image:
      "https://g1.gazetaprawna.pl/p/_wspolne/pliki/1407000/1407069-lemanskiksiadzhoser.jpg",
  },
  {
    title: "Minione kolendy",
    url: "history",
    image: "https://miasto-info.pl/upload/2014-01/f1200x650/8598-7856-06-2.jpg",
  },
];

interface InfoItemProps {
  text: string;
  state: RecordState;
}

const InfoItem = ({ text, state }: InfoItemProps) => {
  const { icon, backgroundColor } = StateStyles(state);
  return (
    <ListItem>
      <ListItemIcon>
        <Avatar style={{ backgroundColor }}>{icon}</Avatar>
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

const Data: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <PageTitle text="Aktualny sezon: 2020" />

          <List>
            <InfoItem
              state={RecordState.ACCEPTED}
              text={`Ilość przyjętych domostw ${100}`}
            />
            <InfoItem
              state={RecordState.REJECTED}
              text={`Ilość odrzuconych domostw ${20}`}
            />
            <InfoItem
              state={RecordState.UNKNOWN}
              text={`Ilość niewiadomych domostw ${50}`}
            />
          </List>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" color="primary" size="large">
          Zaplanuj kolejny dzień -{">"}
        </Button>
      </Grid>
      {seed.map((props, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card {...props} />
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

export default Data;
