import {
  Day_day_pastoralVisits_entrances_house,
  Day_day_assignedStreets,
  Day,
  DayVariables,
} from "../../../../generated/Day";
import { client } from "@koleda/common-context";
import { DAY } from "../../../../context/day/actions";
import { gql } from "@apollo/client";
import produce from "immer";
import { splitByLabelWithoutIndex } from "../../../../utils/splitByLabel";
import { ChangeAssignedStreets_updateDay } from "../../../../generated/ChangeAssignedStreets";

export const updateStreets = (
  removedStreetsIds: string[],
  dayVariables: DayVariables
) => {
  const dayQuery = client.readQuery<Day, DayVariables>({
    query: DAY,
    variables: dayVariables,
  });

  if (!dayQuery || !dayQuery.day) return;

  const removedHouses = dayQuery.day.pastoralVisits.flatMap(
    ({ entrances }) =>
      entrances
        .filter(({ house }) =>
          removedStreetsIds.includes(house?.street?.id || "")
        )
        .map(({ house }) => house) as Day_day_pastoralVisits_entrances_house[]
  );

  const splitedRemovedHouses = splitByLabelWithoutIndex(
    removedHouses,
    (house) => house?.street?.id
  );

  const fragment = gql`
    fragment AssignedStreetFragment on Street {
      name
      id
      unusedHouses(season: "${dayVariables.season}"){
        number
        street {
          name
          id
        }
      }
    }
    `;

  for (const streetId of Object.keys(splitedRemovedHouses)) {
    const streetQuery = client.readFragment<Day_day_assignedStreets>({
      id: streetId,
      fragment,
    });

    if (!streetQuery) continue;

    const updatedStreet = produce(streetQuery, (draft) => {
      draft.unusedHouses.push(...splitedRemovedHouses[streetId]);
    });

    client.writeFragment<Day_day_assignedStreets>({
      id: streetId,
      fragment,
      data: updatedStreet,
    });
  }
};

export const assignDayStateAfterAssignedStreetsChanged = (
  dayVariables: DayVariables,
  day: ChangeAssignedStreets_updateDay
) => {
  const query = client.readQuery<Day, DayVariables>({
    query: DAY,
    variables: dayVariables,
  });
  if (!query || !query.day) return;
  client.writeQuery<Day, DayVariables>({
    query: DAY,
    variables: dayVariables,
    data: { day: { ...query.day, ...day } },
  });
};
