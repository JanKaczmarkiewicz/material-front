import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  DaySchedule,
  DayScheduleVariables,
  DaySchedule_pastoralVisits,
} from "../../generated/DaySchedule";
import PageTitle from "../Layout/Typography/PageTitle";
import { Grid } from "@material-ui/core";
import Column from "./DND/Column";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import {
  RelocateEntrance,
  RelocateEntranceVariables,
} from "../../generated/RelocateEntrance";
import { isSameDay } from "date-fns";
import { client } from "../../context/client/ApolloClient";

type Props = RouteComponentProps<{
  date: string;
}>;

const EntrenceFragment = gql`
  fragment EntrenceFragment on Entrance {
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
`;
const RELOCATE_ENTRANCE = gql`
  mutation RelocateEntrance($id: String!, $to: String!) {
    updateEntrance(input: { id: $id, pastoralVisit: $to }) {
      ...EntrenceFragment
      pastoralVisit {
        id
      }
    }
  }
  ${EntrenceFragment}
`;

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
        ...EntrenceFragment
      }
    }
  }
  ${EntrenceFragment}
`;

const DayManager: React.FC<Props> = ({ match }) => {
  const { date } = match.params;
  const [relocateEntrance] = useMutation<
    RelocateEntrance,
    RelocateEntranceVariables
  >(RELOCATE_ENTRANCE);

  const { loading, error, data } = useQuery<DaySchedule, DayScheduleVariables>(
    DAY,
    { variables: { input: { date } } }
  );
  if (!Date.parse(date)) return <>"404"</>;

  if (loading || !data) return <div>loading...</div>;
  if (error) return <div>error</div>;

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

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    console.log(result, provided);
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    const queryOptions = {
      query: DAY,
      variables: { input: { date } },
    };

    const query = client.cache.readQuery<DaySchedule, DayScheduleVariables>(
      queryOptions
    )!;

    const indexes = findEntranceInPastoralVisits(
      draggableId,
      query.pastoralVisits
    );

    if (!indexes) return;

    const newData = [...query.pastoralVisits];

    const destinationPastoralVisitIndex = newData.findIndex(
      ({ id }) => id === destination.droppableId
    );

    if (destinationPastoralVisitIndex < 0) return;

    const {
      entranceIndex,
      pastoralVisitIndex: sourcePastoralVisitIndex,
    } = indexes;

    //delete entrance from cache copy
    const sourceEntrances = [...newData[sourcePastoralVisitIndex].entrances];
    const movedEntrance = sourceEntrances.splice(entranceIndex, 1)[0];
    newData[sourcePastoralVisitIndex].entrances = sourceEntrances;

    //add updated entrance to cache copy
    newData[destinationPastoralVisitIndex].entrances = [
      ...newData[destinationPastoralVisitIndex].entrances,
      movedEntrance,
    ];

    client.cache.writeQuery<DaySchedule, DayScheduleVariables>({
      ...queryOptions,
      data: { pastoralVisits: newData },
    });

    relocateEntrance({
      variables: { id: draggableId, to: destination.droppableId },
    });
  };

  return (
    <>
      <PageTitle text={headerText} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {visits.map(({ id, priest, entrances }) => (
            <Column
              key={id}
              droppableId={id}
              title={
                priest?.username
                  ? `ks. ${(priest?.username).split(" ")[1]}`
                  : "Brak kapłana"
              }
              items={entrances}
            />
          ))}
        </DragDropContext>
      </div>
    </>
  );
};

const findEntranceInPastoralVisits = (
  id: string,
  pastoralVisits: DaySchedule_pastoralVisits[]
) => {
  let pastoralVisitIndex = null;
  let entranceIndex = null;
  for (let i = 0; i < pastoralVisits.length; i++) {
    for (let j = 0; j < pastoralVisits[i].entrances.length; j++) {
      const entrance = pastoralVisits[i].entrances[j];
      if (entrance.id === id) {
        pastoralVisitIndex = i;
        entranceIndex = j;
      }
    }
  }
  if (pastoralVisitIndex === null || entranceIndex === null) return null;

  return { pastoralVisitIndex, entranceIndex };
};

export default DayManager;
