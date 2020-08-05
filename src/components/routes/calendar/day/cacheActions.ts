import { ChangeAssignedStreets_updateDay } from "../../../../generated/ChangeAssignedStreets";
import {
  DayVariables,
  Day,
  Day_day,
  Day_day_pastoralVisits_entrances_house,
  Day_day_assignedStreets_unusedHouses,
  Day_day_assignedStreets,
} from "../../../../generated/Day";
import { client } from "../../../../context/client/ApolloClient";
import { DAY, HouseFragment } from "../actions";
import { getKeys } from "../../../Layout/DataTable/util";
import { gql } from "apollo-boost";
import produce from "immer";
import { StreetFragment } from "../../data/streets/actions";

type HousesGroupedByStreetId = {
  [key: string]: Day_day_pastoralVisits_entrances_house[];
};

export const updateStreets = (
  houses: HousesGroupedByStreetId,
  seasonId: string
) => {
  for (const streetId of Object.keys(houses)) {
    const fragment = gql`
    fragment AssignedStreetFragment on Street {
      ...StreetFragment
      unusedHouses(season: ${seasonId}){
        ...HouseFragment
      }
    }
    ${StreetFragment}
    ${HouseFragment}`;

    const streetQuery = client.readFragment<Day_day_assignedStreets>({
      id: streetId,
      fragment,
    });

    if (!streetQuery) continue;

    const updatedStreet = produce(streetQuery, (draft) => {
      draft.unusedHouses.push(...houses[streetId]);
    });

    client.writeFragment<Day_day_assignedStreets>({
      id: streetId,
      fragment,
      data: updatedStreet,
    });
  }
};
