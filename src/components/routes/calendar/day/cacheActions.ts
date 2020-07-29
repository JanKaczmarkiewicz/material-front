import { AddEntrance_addEntrance } from "../../../../generated/AddEntrance";
import { ChangeAssignedStreets_updateDay } from "../../../../generated/ChangeAssignedStreets";
import {
  DayVariables,
  Day,
  Day_day,
  Day_day_pastoralVisits_entrances_house,
  Day_day_pastoralVisits,
} from "../../../../generated/Day";
import { client } from "../../../../context/client/ApolloClient";
import { DAY } from "../actions";
import { getKeys } from "../../../Layout/DataTable/util";

type HousesGroupedByStreetId = {
  [key: string]: Day_day_pastoralVisits_entrances_house[];
};

export const removeAllHousesByStreetInDay = (
  id: string,
  streets: string[]
): HousesGroupedByStreetId => {
  const queryVariables = { input: { id } };

  const query = readDayQuery({ input: { id } });

  if (!query.day) return {};

  const deletedHouses: HousesGroupedByStreetId = {};

  const pastoralVisitsCopy = query.day.pastoralVisits.map((pastoralVisit) => ({
    ...pastoralVisit,
    entrances: pastoralVisit.entrances.filter(({ house }) => {
      const currentEntranceHouseStreetId = house?.street?.id;
      if (
        currentEntranceHouseStreetId &&
        streets.includes(currentEntranceHouseStreetId)
      ) {
        deletedHouses[currentEntranceHouseStreetId] = [
          ...(deletedHouses[currentEntranceHouseStreetId] || []),
          house!,
        ];

        return false;
      }
      return true;
    }),
  }));

  const unusedHousesCopy = query.day.unusedHouses.filter(
    (house) => !streets.includes(house.street?.id || "")
  );

  writeDayQuery(queryVariables, {
    ...query.day,
    pastoralVisits: pastoralVisitsCopy,
    unusedHouses: unusedHousesCopy,
  });

  return deletedHouses;
};

const readDayQuery = (variables: DayVariables) => {
  return client.readQuery<Day, DayVariables>({ query: DAY, variables })!;
};

const writeDayQuery = (variables: DayVariables, data: Day_day) =>
  client.writeQuery<Day, DayVariables>({
    query: DAY,
    variables,
    data: { day: data },
  });

export const assignProperDeletedHousesToDay = (
  queryVariables: DayVariables,
  deletedHousesByStreets: HousesGroupedByStreetId
) => {
  const query = readDayQuery(queryVariables);

  if (!query.day) return;

  const deletedStreetsIds = getKeys(deletedHousesByStreets);

  const commonPartOfStreetsSets = query.day.assignedStreets
    .map(({ id }) => id)
    .filter(deletedStreetsIds.includes);

  const properHouses = commonPartOfStreetsSets.flatMap(
    (key) => deletedHousesByStreets[key]
  );

  writeDayQuery(queryVariables, {
    ...query.day,
    unusedHouses: [...query.day.unusedHouses, ...properHouses],
  });
};

const dayInput = (id: string) => ({
  input: {
    id,
  },
});

export const addTemporaryEntrance = (
  dayId: string,
  houseId: string,
  pastoralVisitId: string
) => {
  const input = dayInput(dayId);

  const query = readDayQuery(input);

  if (!query.day) return;

  const destinationPastoralVisitIndex = query.day.pastoralVisits.findIndex(
    ({ id }) => id === pastoralVisitId
  );

  if (destinationPastoralVisitIndex < 0) return;

  const pastoralVisitsCopy = [...query.day.pastoralVisits];
  const unusedHousesCopy = [...query.day.unusedHouses];

  const houseIndex = unusedHousesCopy.findIndex(
    (house) => house.id === houseId
  );

  if (houseIndex < 0) return;

  const house = unusedHousesCopy.splice(houseIndex, 1)[0];

  const newEntrance = {
    id: house.id, //temp
    __typename: "Entrance",
    house: house,
    comment: null,
  };

  const destinationPastoralVisitCopy = {
    ...pastoralVisitsCopy[destinationPastoralVisitIndex],
  };

  destinationPastoralVisitCopy.entrances = [
    ...destinationPastoralVisitCopy.entrances,
    newEntrance,
  ];

  pastoralVisitsCopy[
    destinationPastoralVisitIndex
  ] = destinationPastoralVisitCopy;

  writeDayQuery(input, {
    ...query.day,
    unusedHouses: unusedHousesCopy,
    pastoralVisits: pastoralVisitsCopy,
  });
};

export const replaceTemporaryEntranceWithRealOne = (
  dayId: string,
  entrance: AddEntrance_addEntrance
) => {
  const input = dayInput(dayId);

  const query = readDayQuery(input);

  if (!query.day) return;
  const pastoralVisitsCopy = [...query.day.pastoralVisits];

  const indexes = findEntranceInPastoralVisits(
    entrance.house!.id,
    pastoralVisitsCopy
  );

  if (!indexes) return;

  const {
    entranceIndex,
    pastoralVisitIndex: destinationPastoralVisitIndex,
  } = indexes;

  const destinationPastoralVisit = {
    ...pastoralVisitsCopy[destinationPastoralVisitIndex],
  };

  //replece dummy one with real one
  const entrancesCopy = [...destinationPastoralVisit.entrances];

  entrancesCopy.splice(entranceIndex, 1, entrance);

  destinationPastoralVisit.entrances = entrancesCopy;

  pastoralVisitsCopy[destinationPastoralVisitIndex] = destinationPastoralVisit;

  writeDayQuery(input, {
    ...query.day,
    pastoralVisits: pastoralVisitsCopy,
  });
};

const findEntranceInPastoralVisits = (
  id: string,
  pastoralVisits: Day_day_pastoralVisits[]
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

export const assignDayStateAfterAssignedStreetsChanged = (
  dayId: string,
  updatedDay: ChangeAssignedStreets_updateDay
) => {
  const input = dayInput(dayId);
  const query = readDayQuery(input);

  if (!query.day) return;

  writeDayQuery(input, {
    ...query.day,
    ...updatedDay,
  });
};

export const relocateEntranceInCache = (
  dayId: string,
  entranceId: string,
  pastoralVisitId: string
) => {
  const index = dayInput(dayId);
  const query = readDayQuery(index);

  if (!query.day) return;

  const pastoralVisitsCopy = [...query.day.pastoralVisits];

  const indexes = findEntranceInPastoralVisits(entranceId, pastoralVisitsCopy);

  if (!indexes) return;

  const destinationPastoralVisitIndex = query.day.pastoralVisits.findIndex(
    ({ id }) => id === pastoralVisitId
  );

  if (destinationPastoralVisitIndex < 0) return;

  const {
    entranceIndex,
    pastoralVisitIndex: sourcePastoralVisitIndex,
  } = indexes;

  const sourceEntrances = [
    ...pastoralVisitsCopy[sourcePastoralVisitIndex].entrances,
  ];

  //delete entrance from cache copy
  const entrance = sourceEntrances.splice(entranceIndex, 1)[0];

  pastoralVisitsCopy[sourcePastoralVisitIndex].entrances = sourceEntrances;

  const destinationPastoralVisitCopy = {
    ...pastoralVisitsCopy[destinationPastoralVisitIndex],
  };

  //add updated entrance to cache copy
  destinationPastoralVisitCopy.entrances = [
    ...destinationPastoralVisitCopy.entrances,
    entrance,
  ];

  pastoralVisitsCopy[
    destinationPastoralVisitIndex
  ] = destinationPastoralVisitCopy;

  writeDayQuery(index, {
    ...query.day,
    pastoralVisits: pastoralVisitsCopy,
  });
};

export const handleEntranceRemoval = (dayId: string) => {
  console.error(dayId);
};
