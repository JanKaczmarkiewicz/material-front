import { reducer, ActionTypes } from "../singleDayReducer";
import { Day_day } from "../../../../../generated/Day";
import { splitByLabel } from "../../../../../utils/splitByLabel";
import { AddEntrances_addEntrances } from "../../../../../generated/AddEntrances";

// prettier-ignore
const getInitialState= ():Day_day => require("./initialState.json")
const getRealEntrances = (): AddEntrances_addEntrances[] =>
  require("./entrances.json");

let state: Day_day;

describe("DELETE_ENTRANCES", () => {
  state = getInitialState();
  const entrancesToMove = state.pastoralVisits[0].entrances.filter(
    (_, i) => i % 2 === 0
  );

  const splitedEntrancesToMove = splitByLabel(
    entrancesToMove,
    ({ house }) => house?.street?.id
  );

  const entrancesIdsToMove = entrancesToMove.map(({ id }) => id);

  const newState = reducer(state, {
    type: ActionTypes.DELETE_ENTRANCES,
    payload: {
      entrancesIds: entrancesIdsToMove,
      sourcePastoralVisitId: state.pastoralVisits[0].id,
    },
  });
  // reference checks
  it("should change reference in changed properties", () => {
    expect(newState.id).toBe(state.id);
    expect(newState.reeceDate).toBe(state.reeceDate);
    expect(newState.visitDate).toBe(state.visitDate);
    expect(newState.assignedStreets).not.toBe(state.assignedStreets);

    expect(newState).not.toBe(state);
    expect(newState.pastoralVisits).not.toBe(state.pastoralVisits);

    expect(newState.pastoralVisits[0].id).toBe(state.pastoralVisits[0].id);
    expect(newState.pastoralVisits[0]).not.toBe(state.pastoralVisits[0]);

    expect(newState.pastoralVisits[0].entrances).not.toBe(
      state.pastoralVisits[0].entrances
    );
  });

  // array content checks
  const newSourceEntrancesIds = newState.pastoralVisits[0].entrances.map(
    ({ id }) => id
  );

  const initialSourceEntrancesIds = state.pastoralVisits[0].entrances.map(
    ({ id }) => id
  );

  it("should have changed content of pastoralVisit[0].entrances and assignedStreets", () => {
    for (const streetId of Object.keys(splitedEntrancesToMove)) {
      const newHousesIdsInThisStreet = splitedEntrancesToMove[streetId].map(
        ({ house }) => house!.id
      );

      const unusedHousesIds = newState.assignedStreets
        .find(({ id }) => id === streetId)!
        .unusedHouses.map(({ id }) => id);

      expect(unusedHousesIds).toEqual(
        expect.arrayContaining(newHousesIdsInThisStreet)
      );
    }
    expect(newSourceEntrancesIds.length).toBe(
      initialSourceEntrancesIds.length - entrancesIdsToMove.length
    );

    expect(newSourceEntrancesIds).not.toEqual(
      expect.arrayContaining(entrancesIdsToMove)
    );
  });
});

describe("RELOCATE_ENTRANCES", () => {
  state = getInitialState();

  const entrancesIdsToMove: string[] = [
    state.pastoralVisits[0].entrances[0].id,
    state.pastoralVisits[0].entrances[
      state.pastoralVisits[0].entrances.length - 1
    ].id,
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
  it("should change reference in changed properties", () => {
    expect(newState).not.toBe(state);
    expect(newState.assignedStreets).toBe(state.assignedStreets);
    expect(newState.id).toBe(state.id);
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
  });

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

  it("should have changed content of pastoralVisit[0].entrances and pastoralVisit[1].entrances", () => {
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

describe("CREATE_FAKE_ENTRANCES", () => {
  state = getInitialState();
  const housesIdsToMove: string[] = state.assignedStreets
    .flatMap(({ unusedHouses }) => unusedHouses.map(({ id }) => id))
    .filter((_, i) => i % 2 === 0);

  const newState = reducer(state, {
    type: ActionTypes.CREATE_FAKE_ENTRANCES,
    payload: {
      housesIds: housesIdsToMove,
      destinationPastoralVisitId: state.pastoralVisits[0].id,
    },
  });

  it("should change reference in changed properties", () => {
    expect(newState.id).toBe(state.id);
    expect(newState.reeceDate).toBe(state.reeceDate);
    expect(newState.visitDate).toBe(state.visitDate);
    expect(newState.assignedStreets).not.toBe(state.assignedStreets);

    expect(newState).not.toBe(state);
    expect(newState.pastoralVisits).not.toBe(state.pastoralVisits);

    expect(newState.pastoralVisits[0].id).toBe(state.pastoralVisits[0].id);
    expect(newState.pastoralVisits[0]).not.toBe(state.pastoralVisits[0]);

    expect(newState.pastoralVisits[0].entrances).not.toBe(
      state.pastoralVisits[0].entrances
    );
  });

  // array content checks
  const newDestinationEntrancesIds = newState.pastoralVisits[0].entrances.map(
    ({ id }) => id
  );

  const initialDestinationEntrancesIds = state.pastoralVisits[0].entrances.map(
    ({ id }) => id
  );

  const newUnusedHousesIds = newState.assignedStreets.flatMap(
    ({ unusedHouses }) => unusedHouses.map(({ id }) => id)
  );

  const initialUnusedHousesIds = state.assignedStreets.flatMap(
    ({ unusedHouses }) => unusedHouses.map(({ id }) => id)
  );

  it("should have changed content of pastoralVisit[0].entrances and assignedStreets", () => {
    expect(newDestinationEntrancesIds.length).toBe(
      initialDestinationEntrancesIds.length + housesIdsToMove.length
    );
    expect(newUnusedHousesIds.length).toBe(
      initialUnusedHousesIds.length - housesIdsToMove.length
    );

    expect(newDestinationEntrancesIds).toEqual(
      expect.arrayContaining(initialDestinationEntrancesIds)
    );

    expect(newUnusedHousesIds).not.toEqual(
      expect.arrayContaining(housesIdsToMove)
    );
  });
});

describe("CREATE_ENTRANCES", () => {
  const realEntrances = getRealEntrances();

  const housesIdsToMove = realEntrances.map(({ house }) => house!.id);

  const entrancesToReplece = housesIdsToMove;

  const initialState = getInitialState();

  const state = reducer(initialState, {
    type: ActionTypes.CREATE_FAKE_ENTRANCES,
    payload: {
      housesIds: housesIdsToMove,
      destinationPastoralVisitId: initialState.pastoralVisits[0].id,
    },
  });

  const newState = reducer(state, {
    type: ActionTypes.CREATE_ENTRANCES,
    payload: {
      entrances: realEntrances,
    },
  });

  it("should change reference in changed properties", () => {
    expect(newState.id).toBe(state.id);
    expect(newState.reeceDate).toBe(state.reeceDate);
    expect(newState.visitDate).toBe(state.visitDate);
    expect(newState.assignedStreets).toBe(state.assignedStreets);

    expect(newState).not.toBe(state);
    expect(newState.pastoralVisits).not.toBe(state.pastoralVisits);

    expect(newState.pastoralVisits[0].id).toBe(state.pastoralVisits[0].id);
    expect(newState.pastoralVisits[0]).not.toBe(state.pastoralVisits[0]);

    expect(newState.pastoralVisits[0].entrances).not.toBe(
      state.pastoralVisits[0].entrances
    );
  });

  // array content checks
  const newEntrancesIds = newState.pastoralVisits[0].entrances.map(
    ({ id }) => id
  );

  const initialEntrancesIds = state.pastoralVisits[0].entrances.map(
    ({ id }) => id
  );

  const replecedEntrancesIds = realEntrances.map(({ id }) => id);

  it("should have changed content of pastoralVisit[0].entrances and assignedStreets", () => {
    expect(newEntrancesIds.length).toBe(initialEntrancesIds.length);

    expect(newEntrancesIds).toEqual(
      expect.arrayContaining(replecedEntrancesIds)
    );

    expect(newEntrancesIds).not.toEqual(
      expect.arrayContaining(entrancesToReplece)
    );
  });

  describe("CHANGE_ASSIGNED_STREETS", () => {
  
    const state = getInitialState()
  
    const initialAssignedStretsIds = state.assignedStreets.map(({id})=> id)

    const newAssignedStreetsIds =initialAssignedStretsIds.filter((_, i)=> i%2===0)


    const newState = reducer(state, {
      type: ActionTypes.CHANGE_ASSIGNED_STREETS,
      payload: {
        assignedStreetsIds: newAssignedStreetsIds,
      },
    });
  
    it("should change reference in changed properties", () => {
      expect(newState).not.toBe(state);

      expect(newState.id).toBe(state.id);
      expect(newState.reeceDate).toBe(state.reeceDate);
      expect(newState.visitDate).toBe(state.visitDate);
      expect(newState.assignedStreets).not.toBe(state.assignedStreets);
      expect(newState.pastoralVisits).not.toBe(state.pastoralVisits);
    });
  
    // array content checks
    it("should have changed content of pastoralVisit containing entrances with houses streets that has been deleted and assignedStreets", () => {
      expect(newEntrancesIds.length).toBe(initialEntrancesIds.length);
  
      expect(newEntrancesIds).toEqual(
        expect.arrayContaining(replecedEntrancesIds)
      );
  
      expect(newEntrancesIds).not.toEqual(
        expect.arrayContaining(entrancesToReplece)
      );
    });
});
