import { reducer, ActionTypes } from "../singleDayReducer";
import { Day_day } from "../../../../../generated/Day";

// prettier-ignore
const getInitialState= ():Day_day => require("./initialState.json")

describe("", () => {
  let state: Day_day;

  beforeEach(() => {
    state = getInitialState();
  });

  test("should crate new updatedState state", () => {
    const entrancesIdsToMove: string[] = [
      state.pastoralVisits[0].entrances[0].id,
    ];

    const newState = reducer(state, {
      type: ActionTypes.RELOCATE_ENTRANCES,
      payload: {
        destinationPastoralVisitId: state.pastoralVisits[1].id,
        entrancesIds: entrancesIdsToMove,
        sourcePastoralVisitId: state.pastoralVisits[0].id,
      },
    });

    // reference checks
    expect(newState).not.toBe(state);
    expect(newState.assignedStreets).toBe(state.assignedStreets);
    expect(newState.id).toBe(state.id);
    expect(newState.unusedHouses).toBe(state.unusedHouses);
    expect(newState.reeceDate).toBe(state.reeceDate);
    expect(newState.visitDate).toBe(state.visitDate);
    expect(newState.pastoralVisits).not.toBe(state.pastoralVisits);

    expect(newState.pastoralVisits[0].id).toBe(state.pastoralVisits[0].id);
    expect(newState.pastoralVisits[0] === state.pastoralVisits[0]).toBe(false);
    expect(newState.pastoralVisits[0].entrances).not.toBe(
      state.pastoralVisits[0].entrances
    );
    expect(newState.pastoralVisits[1].entrances).not.toBe(
      state.pastoralVisits[1].entrances
    );

    const newSourceEntrancesIds = newState.pastoralVisits[0].entrances.map(
      ({ id }) => id
    );

    const newDestinationEntrancesIds = newState.pastoralVisits[1].entrances.map(
      ({ id }) => id
    );

    const initialSourceEntrancesIds = state.pastoralVisits[0].entrances.map(
      ({ id }) => id
    );

    const initalDestinationEntrancesIds = state.pastoralVisits[1].entrances.map(
      ({ id }) => id
    );

    expect(newSourceEntrancesIds.length).toBe(
      initialSourceEntrancesIds.length - entrancesIdsToMove.length
    );
    expect(newDestinationEntrancesIds.length).toBe(
      initalDestinationEntrancesIds.length + entrancesIdsToMove.length
    );

    expect(newSourceEntrancesIds).not.toEqual(
      expect.arrayContaining(entrancesIdsToMove)
    );

    expect(newDestinationEntrancesIds).toEqual(
      expect.arrayContaining(entrancesIdsToMove)
    );
  });
});
