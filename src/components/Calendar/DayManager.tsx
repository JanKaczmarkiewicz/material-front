import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import {
  DaySchedule,
  DayScheduleVariables,
  DaySchedule_pastoralVisits,
} from "../../generated/DaySchedule";
import PageTitle from "../Layout/Typography/PageTitle";
import { Grid, List, ListItemText, ListItemIcon } from "@material-ui/core";

type Props = RouteComponentProps<{
  date: string;
}>;

const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const DAY = gql`
  query DaySchedule($input: PastoralVisitsInput!) {
    pastoralVisits(input: $input) {
      id
      priest {
        id
        username
      }
      reeceTime
      visitTime
    }
  }
`;

const DayManager: React.FC<Props> = ({ match }) => {
  const { date } = match.params;
  const { loading, error, data } = useQuery<DaySchedule, DayScheduleVariables>(
    DAY,
    { variables: { input: { date } } }
  );
  if (loading || !data) return <div>loading...</div>;
  if (error) return <div>error</div>;
  if (!Date.parse(date)) return <>"404"</>;

  const currDate = new Date(date);
  const dayActivities = data.pastoralVisits;

  const isEmpty = !dayActivities.length;

  const headerText = isEmpty ? "Zaplanuj dzień" : "Zarządzaj dniem";

  const { reeces, visits } = dayActivities.reduce(
    (obj, pastoralVisit) => {
      const pastoralVisitDate = new Date(pastoralVisit.visitTime);
      if (isSameDay(pastoralVisitDate, currDate))
        return { ...obj, visits: [...obj.visits, pastoralVisit] };

      const reeceVisitDate = new Date(pastoralVisit.reeceTime);
      if (isSameDay(reeceVisitDate, currDate))
        return { ...obj, reeces: [...obj.reeces, pastoralVisit] };
      return obj;
    },
    {
      reeces: [],
      visits: [],
    } as { [key: string]: DaySchedule_pastoralVisits[] }
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageTitle text={headerText} />
      </Grid>
      {[reeces, visits].map((items, i) => (
        <Grid item xs={6}>
          <List key={`dm-${i}`}>
            {items.map(({ priest, id }) => (
              <ListItemIcon key={`dm-i-${id}`}>
                <ListItemText primary={priest?.username} />
              </ListItemIcon>
            ))}
          </List>
        </Grid>
      ))}
    </Grid>
  );
};

export default DayManager;
