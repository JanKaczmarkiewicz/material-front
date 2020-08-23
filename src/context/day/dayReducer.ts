import {
  Day_day,
  Day_day_pastoralVisits,
  Day_day_pastoralVisits_entrances,
  Day,
  DayVariables,
} from "../../generated/Day";
import produce from "immer";
import { DAY } from "./actions";
import { client } from "@koleda/common-context";
import { splitByLabel } from "../../utils/splitByLabel";
import {
  RelocateEntrancesPayload,
  DeleteEntrancesPayload,
  CreateEntrancesPayload,
} from "../../types/day";
import { UpdatePastoralVisit_updatePastoralVisit } from "../../generated/UpdatePastoralVisit";

export enum ActionTypes {
  RELOCATE_ENTRANCES,
  DELETE_ENTRANCES,
  CREATE_FAKE_ENTRANCES,
  CREATE_ENTRANCES,
  CHANGE_ASSIGNED_STREETS,
  ADD_PASTORAL_VISIT,
  UPDATE_PASTORAL_VISIT,
}

type Action =
  | {
      type: ActionTypes.RELOCATE_ENTRANCES;
      payload: RelocateEntrancesPayload;
    }
  | {
      type: ActionTypes.DELETE_ENTRANCES;
      payload: DeleteEntrancesPayload;
    }
  | {
      type: ActionTypes.CREATE_ENTRANCES;
      payload: {
        entrances: Day_day_pastoralVisits_entrances[];
      };
    }
  | {
      type: ActionTypes.CREATE_FAKE_ENTRANCES;
      payload: CreateEntrancesPayload;
    }
  | {
      type: ActionTypes.CHANGE_ASSIGNED_STREETS;
      payload: { assignedStreetsIds: string[] };
    }
  | {
      type: ActionTypes.ADD_PASTORAL_VISIT;
      payload: { pastoralVisit: Day_day_pastoralVisits };
    }
  | {
      type: ActionTypes.UPDATE_PASTORAL_VISIT;
      payload: { pastoralVisit: UpdatePastoralVisit_updatePastoralVisit };
    };

type State = Day_day;

export const useDayReducer = (variables: DayVariables) => {
  const dispath = (action: Action) => {
    const query = client.readQuery<Day, DayVariables>({
      query: DAY,
      variables,
    });

    if (!query || !query.day) throw new Error("day not found");

    const newState = reducer(query.day, action);

    client.writeQuery<Day, DayVariables>({
      query: DAY,
      variables,
      data: { day: newState },
    });
  };

  return dispath;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.RELOCATE_ENTRANCES:
      const result = produce(state, (draft) => {
        const {
          destinationPastoralVisitId,
          sourcePastoralVisitId,
          entrancesIds,
        } = action.payload;

        const sourcePastoralVisitIndex = findPastoralVisitIndexById(
          draft,
          sourcePastoralVisitId
        );

        const removedEntrances = [];
        const restEntrances = [];

        for (const entrance of draft.pastoralVisits[sourcePastoralVisitIndex]
          .entrances)
          entrancesIds.includes(entrance.id)
            ? removedEntrances.push(entrance)
            : restEntrances.push(entrance);

        draft.pastoralVisits[
          sourcePastoralVisitIndex
        ].entrances = restEntrances;

        const destinationPastoralVisitIndex = findPastoralVisitIndexById(
          draft,
          destinationPastoralVisitId
        );

        // and put them into dropped column
        draft.pastoralVisits[destinationPastoralVisitIndex].entrances.push(
          ...removedEntrances
        );
      });
      return result;

    case ActionTypes.CREATE_FAKE_ENTRANCES:
      return produce(state, (draft) => {
        const { housesIds, destinationPastoralVisitId } = action.payload;

        const destinationPastoralVisitIndex = findPastoralVisitIndexById(
          state,
          destinationPastoralVisitId
        );

        const removedHouses = [];

        for (const assignedStreet of draft.assignedStreets) {
          const restHouses = [];

          for (const house of assignedStreet.unusedHouses)
            housesIds.includes(house.id)
              ? removedHouses.push(house)
              : restHouses.push(house);

          assignedStreet.unusedHouses = restHouses;
        }

        const fakeHouses = removedHouses.map((house) => ({
          id: house.id, //fake
          comment: null,
          __typename: "Entrance",
          house,
        }));

        //and put created entrance (with fake temporary id) into dropped column
        draft.pastoralVisits[destinationPastoralVisitIndex].entrances.push(
          ...fakeHouses
        );
      });

    case ActionTypes.CREATE_ENTRANCES:
      return produce(state, (draft) => {
        const { entrances } = action.payload;

        if (!entrances.length) return;

        const indexes = findEntranceInPastoralVisits(
          entrances[0].house!.id,
          draft.pastoralVisits
        )!;

        const clearedEntrances = [];

        for (const entrance of draft.pastoralVisits[indexes.pastoralVisitIndex]
          .entrances) {
          const entraceToReplece = entrances.find(
            ({ house }) => house?.id === entrance.id
          );
          clearedEntrances.push(entraceToReplece ?? entrance);
        }

        //replece fake entrances (see: CREATE_FAKE_ENTRANCES case) with real ones
        draft.pastoralVisits[
          indexes.pastoralVisitIndex
        ].entrances = clearedEntrances;
      });

    case ActionTypes.DELETE_ENTRANCES:
      return produce(state, (draft) => {
        const { entrancesIds, sourcePastoralVisitId } = action.payload;

        const sourcePastoralVisitIndex = findPastoralVisitIndexById(
          draft,
          sourcePastoralVisitId
        );

        const removedEntrances = [];
        const restEntrances = [];

        for (const entrance of draft.pastoralVisits[sourcePastoralVisitIndex]
          .entrances) {
          entrancesIds.includes(entrance.id)
            ? removedEntrances.push(entrance)
            : restEntrances.push(entrance);
        }

        draft.pastoralVisits[
          sourcePastoralVisitIndex
        ].entrances = restEntrances;

        const sanitizedHouses = removedEntrances.map(({ house }) => house!);

        const splitedHouses = splitByLabel(
          sanitizedHouses,
          ({ street }) => street?.id
        );

        for (const streetId in splitedHouses) {
          const pastoralVisit = draft.assignedStreets.find(
            (street) => street.id === streetId
          );

          if (!pastoralVisit) continue;

          pastoralVisit.unusedHouses.push(...splitedHouses[streetId]);
        }
      });

    case ActionTypes.ADD_PASTORAL_VISIT:
      return produce(state, (draft) => {
        draft.pastoralVisits.push(action.payload.pastoralVisit);
      });

    case ActionTypes.UPDATE_PASTORAL_VISIT:
      return produce(state, (draft) => {
        const { pastoralVisit } = action.payload;

        const visitIndex = draft.pastoralVisits.findIndex(
          ({ id }) => id === pastoralVisit.id
        );

        if (!visitIndex) return;

        draft.pastoralVisits[visitIndex] = {
          ...draft.pastoralVisits[visitIndex],
          ...pastoralVisit,
        };
      });

    default:
      return state;
  }
};

const findEntranceInPastoralVisits = (
  id: string,
  pastoralVisits: Day_day_pastoralVisits[]
) => {
  for (let i = 0; i < pastoralVisits.length; i++) {
    for (let j = 0; j < pastoralVisits[i].entrances.length; j++) {
      const entrance = pastoralVisits[i].entrances[j];
      if (entrance.id === id) {
        return { pastoralVisitIndex: i, entranceIndex: j };
      }
    }
  }
  return null;
};

const findPastoralVisitIndexById = (
  state: State,
  pastoralVisitId: string
): number =>
  state.pastoralVisits.findIndex(({ id }) => id === pastoralVisitId)!;
