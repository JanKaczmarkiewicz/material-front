import {
  Day_day,
  Day_day_pastoralVisits,
  Day_day_pastoralVisits_entrances,
  Day,
  DayVariables,
} from "../../../../generated/Day";
import produce from "immer";
import { DAY } from "../actions";
import { client } from "../../../../context/client/ApolloClient";

export enum ActionTypes {
  RELOCATE_ENTRANCES,
  DELETE_ENTRANCE,
  CREATE_FAKE_ENTRANCE,
  CREATE_ENTRANCE,
}

type Action =
  | {
      type: ActionTypes.RELOCATE_ENTRANCES;
      payload: {
        entrancesIds: string[];
        sourcePastoralVisitId: string;
        destinationPastoralVisitId: string;
      };
    }
  | {
      type: ActionTypes.DELETE_ENTRANCE;
      payload: { entranceId: string };
    }
  | {
      type: ActionTypes.CREATE_ENTRANCE;
      payload: {
        entrance: Day_day_pastoralVisits_entrances;
      };
    }
  | {
      type: ActionTypes.CREATE_FAKE_ENTRANCE;
      payload: { houseId: string; pastoralVisitId: string };
    };

type State = Day_day;

export const useDayReducer = (dayId: string) => {
  const variables = { input: { id: dayId } };

  const dispath = (action: Action) => {
    const query = client.readQuery<Day, DayVariables>({
      query: DAY,
      variables,
    });

    if (!query || !query.day) {
      console.error("nothing found");
      return;
    }

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
      return produce(state, (draft) => {
        const {
          destinationPastoralVisitId,
          sourcePastoralVisitId,
        } = action.payload;

        const sourcePastoralVisitIndex = findPastoralVisitIndexById(
          draft,
          sourcePastoralVisitId
        );

        const destinationPastoralVisitIndex = findPastoralVisitIndexById(
          draft,
          destinationPastoralVisitId
        );

        const removedEntrances = draft.pastoralVisits[
          sourcePastoralVisitIndex
        ].entrances.filter((entrance, i, arrRef) => {
          if (!action.payload.entrancesIds.includes(entrance.id)) return false;
          // removing from entrances
          arrRef.splice(i, 1);
          return true;
        });

        // and put them into dropped column
        draft.pastoralVisits[destinationPastoralVisitIndex].entrances.push(
          ...removedEntrances
        );
      });

    case ActionTypes.CREATE_FAKE_ENTRANCE:
      return produce(state, (draft) => {
        const destinationPastoralVisitIndex = findPastoralVisitIndexById(
          state,
          action.payload.pastoralVisitId
        );

        const houseIndex = state.unusedHouses.findIndex(
          (house) => house.id === action.payload.houseId
        );
        //remove dragged house from source unusedHouses
        const house = draft.unusedHouses.splice(houseIndex, 1)[0];

        const fakeEntrance = {
          id: house.id, //fake
          comment: null,
          __typename: "Entrance",
          house,
        };

        //and put created entrance (with fake temporary id) into dropped column
        draft.pastoralVisits[destinationPastoralVisitIndex].entrances.push(
          fakeEntrance
        );
      });

    case ActionTypes.CREATE_ENTRANCE:
      return produce(state, (draft) => {
        const { entrance } = action.payload;

        const indexes = findEntranceInPastoralVisits(
          entrance.house!.id,
          draft.pastoralVisits
        )!;

        //replece fake entrance (see: CREATE_FAKE_ENTRANCE case) with real one
        draft.pastoralVisits[indexes.pastoralVisitIndex].entrances.splice(
          indexes.entranceIndex,
          1,
          entrance
        );
      });

    case ActionTypes.DELETE_ENTRANCE:
      return produce(state, (draft) => {
        const {
          entranceIndex,
          pastoralVisitIndex,
        } = findEntranceInPastoralVisits(
          action.payload.entranceId,
          draft.pastoralVisits
        )!;

        const { house } = draft.pastoralVisits[
          pastoralVisitIndex
        ].entrances.splice(entranceIndex, 1)[0];

        draft.unusedHouses.push(house!);
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
