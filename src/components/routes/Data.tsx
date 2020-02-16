import React from "react";
import { Grid } from "@material-ui/core";
import Card, { Props as CardProps } from "../Layout/CallToAction/Card";

type Seed = Array<CardProps>;

const seed: Seed = [
  {
    title: "Ulice",
    url: "street",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqKPB1d7wzKUOGEcwTe96-plAnzuWvBwYymiwRkuZYUJLqcVcW"
  },
  {
    title: "Domy",
    url: "house",
    image:
      "https://pracownia-projekty.dom.pl/images/444/32604_wizualizacje1_dl_jaskolka_2_z_garazem_ce.jpg"
  },
  {
    title: "Ministranci",
    url: "acolyte",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Messdienergruppe_-001-.jpg/299px-Messdienergruppe_-001-.jpg"
  },
  {
    title: "Księża",
    url: "priest",
    image:
      "https://g1.gazetaprawna.pl/p/_wspolne/pliki/1407000/1407069-lemanskiksiadzhoser.jpg"
  }
];

const Data: React.FC = () => {
  return (
    <Grid container spacing={3}>
      {seed.map(props => (
        <Grid item xs={12} sm={6} md={4}>
          <Card {...props} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Data;
