import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  makeStyles,
  CardActionArea,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Calendar_season_days as Day } from "../../../generated/Calendar";

interface Props {
  mouth: number;
  onAddNewDay: (day: number) => void;
  plannedDays: Day[];
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

const CalendarBody: React.FC<Props> = ({ mouth, plannedDays, onAddNewDay }) => {
  const classnames = useStyles();
  const days = getMonthDays(mouth);
  return (
    <Grid container spacing={2} className={classnames.root}>
      {new Array(days)
        .fill(null)
        .map((_, i) => i + 1)
        .map((day) => {
          const plannedDay = plannedDays.find(
            ({ visitDate }) => new Date(visitDate).getDate() === day
          );

          const card = (
            <Grid item xs={6} md={4} lg={2} key={`${mouth + 1}-${day}`}>
              {plannedDay ? (
                <ActiveDayCard day={plannedDay} />
              ) : (
                <Card variant="outlined" style={{ opacity: 0.5 }}>
                  <CardActionArea onClick={() => onAddNewDay(day)}>
                    <CardHeader title={day} />
                  </CardActionArea>
                </Card>
              )}
            </Grid>
          );

          return card;
        })}
    </Grid>
  );
};

type ActiveDayCardProps = {
  day: Day;
};

const ActiveDayCard: React.FC<ActiveDayCardProps> = ({ day }) => (
  <Card variant="outlined">
    <CardActionArea to={`/calendar/${day.id}`} component={Link}>
      <CardHeader title={new Date(day.visitDate).getDate()} />
    </CardActionArea>
  </Card>
);

export default CalendarBody;
