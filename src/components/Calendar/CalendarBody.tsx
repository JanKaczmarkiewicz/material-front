import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
  CardActionArea,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  mouth: number;
}

const season = 2020; //TODO

const getMonthDays = (mouth: number) => {
  const nextMouth = mouth + 1;
  const to = new Date(season, nextMouth, 1).getTime();
  const from = new Date(season, mouth, 1).getTime();
  return Math.floor((to - from) / (1000 * 60 * 60 * 24));
};

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "100%",
  },
}));

const CalendarBody: React.FC<Props> = ({ mouth }) => {
  const classnames = useStyles();
  const days = getMonthDays(mouth);
  return (
    <Grid container spacing={2} className={classnames.root}>
      {new Array(days)
        .fill(undefined)
        .map((_, i) => i + 1)
        .map((day) => (
          <Grid item xs={6} md={4} lg={2} key={`${mouth + 1}-${day}`}>
            <Card variant="outlined">
              <CardActionArea
                to={`/calendar/${season}-${mouth + 1}-${day}`}
                component={Link}
              >
                <CardHeader title={day} />

                <CardContent>
                  Zwiady 0
                  <Divider />
                  Kolendy 5
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default CalendarBody;