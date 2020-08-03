import { ChangeAssignedStreets_updateDay } from "../../../../generated/ChangeAssignedStreets";
import {
  DayVariables,
  Day,
  Day_day,
  Day_day_pastoralVisits_entrances_house,
} from "../../../../generated/Day";
import { client } from "../../../../context/client/ApolloClient";
import { DAY } from "../actions";
import { getKeys } from "../../../Layout/DataTable/util";

type HousesGroupedByStreetId = {
  [key: string]: Day_day_pastoralVisits_entrances_house[];
};

// export const removeAllHousesByStreetInDay = (
//   id: string,
//   streets: string[]
// ): HousesGroupedByStreetId => {
//   const queryVariables = { input: { id } };

//   const query = readDayQuery({ input: { id } });

//   if (!query.day) return {};

//   const deletedHouses: HousesGroupedByStreetId = {};

//   const pastoralVisitsCopy = query.day.pastoralVisits.map((pastoralVisit) => ({
//     ...pastoralVisit,
//     entrances: pastoralVisit.entrances.filter(({ house }) => {
//       const currentEntranceHouseStreetId = house?.street?.id;
//       if (
//         currentEntranceHouseStreetId &&
//         streets.includes(currentEntranceHouseStreetId)
//       ) {
//         deletedHouses[currentEntranceHouseStreetId] = [
//           ...(deletedHouses[currentEntranceHouseStreetId] || []),
//           house!,
//         ];

//         return false;
//       }
//       return true;
//     }),
//   }));

//   const unusedHousesCopy = query.day.unusedHouses.filter(
//     (house) => !streets.includes(house.street?.id || "")
//   );

//   writeDayQuery(queryVariables, {
//     ...query.day,
//     pastoralVisits: pastoralVisitsCopy,
//     unusedHouses: unusedHousesCopy,
//   });

//   return deletedHouses;
// };

const readDayQuery = (variables: DayVariables) => {
  return client.readQuery<Day, DayVariables>({ query: DAY, variables })!;
};

const writeDayQuery = (variables: DayVariables, data: Day_day) =>
  client.writeQuery<Day, DayVariables>({
    query: DAY,
    variables,
    data: { day: data },
  });

// export const assignProperDeletedHousesToDay = (
//   queryVariables: DayVariables,
//   deletedHousesByStreets: HousesGroupedByStreetId
// ) => {
//   const query = readDayQuery(queryVariables);

//   if (!query.day) return;

//   const deletedStreetsIds = getKeys(deletedHousesByStreets);

//   const commonPartOfStreetsSets = query.day.assignedStreets
//     .map(({ id }) => id)
//     .filter(deletedStreetsIds.includes);

//   const properHouses = commonPartOfStreetsSets.flatMap(
//     (key) => deletedHousesByStreets[key]
//   );

//   writeDayQuery(queryVariables, {
//     ...query.day,
//     unusedHouses: [...query.day.unusedHouses, ...properHouses],
//   });
// };

// export const assignDayStateAfterAssignedStreetsChanged = (
//   dayId: string,
//   updatedDay: ChangeAssignedStreets_updateDay
// ) => {
//   const input = dayInput(dayId);
//   const query = readDayQuery(input);

//   if (!query.day) return;

//   writeDayQuery(input, {
//     ...query.day,
//     ...updatedDay,
//   });
// };

const dayInput = (id: string) => ({ input: { id } });
