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
import { Grid } from "@material-ui/core";
import Column from "./DND/Column";
import { DragDropContext } from "react-beautiful-dnd";

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
      entrances {
        id
        comment
        house {
          id
          number
          street {
            id
            name
          }
        }
      }
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

  const headerText = `${
    isEmpty ? "Zaplanuj dzień" : "Zarządzaj dniem"
  }: ${currDate.toLocaleDateString()}r.`;

  const visits = dayActivities.reduce((obj, pastoralVisit) => {
    const pastoralVisitDate = new Date(pastoralVisit.visitTime);
    return isSameDay(pastoralVisitDate, currDate)
      ? [...obj, pastoralVisit]
      : obj;
  }, [] as DaySchedule_pastoralVisits[]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageTitle text={headerText} />
      </Grid>
      <Grid item container xs={12} spacing={2}>
        <DragDropContext onDragEnd={() => console.log("drop")}>
          {visits.map(({ id, priest, entrances }) => (
            <Grid item xs={2} key={id}>
              <Column
                title={
                  priest?.username
                    ? `ks. ${(priest?.username).split(" ")[1]}`
                    : "Brak kapłana"
                }
                items={entrances}
              />
            </Grid>
          ))}
        </DragDropContext>
      </Grid>
    </Grid>
  );
};

export default DayManager;
