import produce from "immer";

export enum SelectAction {
  CLEAR,
  SELECT,
  START_DRAG,
  CANCEL_DRAG,
}

export type EntrancesSelectionState = {
  currentPastoralVisitId: string | null;
  selectedEntrances: string[];
  currentDraggedEntranceId: string | null;
};

type ActionTypes =
  | {
      type: SelectAction.SELECT;
      payload: { entranceId: string; columnId: string };
    }
  | {
      type: SelectAction.CLEAR;
    }
  | {
      type: SelectAction.START_DRAG;
      payload: { entranceId: string };
    }
  | {
      type: SelectAction.CANCEL_DRAG;
    };

export const entrancesSelectionInitialState = {
  currentPastoralVisitId: null,
  currentDraggedEntranceId: null,
  selectedEntrances: [],
};

export const reducer = (
  state: EntrancesSelectionState,
  action: ActionTypes
): EntrancesSelectionState => {
  switch (action.type) {
    case SelectAction.SELECT:
      return produce(state, (draft) => {
        const { columnId, entranceId } = action.payload;

        draft.currentDraggedEntranceId = null;

        if (columnId !== state.currentPastoralVisitId) {
          draft.selectedEntrances = [entranceId];
          draft.currentPastoralVisitId = columnId;
          return;
        }

        const index = draft.selectedEntrances.indexOf(entranceId);

        // if there is not selected entrance then add it, else slice it
        index === -1
          ? draft.selectedEntrances.push(entranceId)
          : draft.selectedEntrances.splice(index, 1);
      });

    case SelectAction.START_DRAG:
      return produce(state, (draft) => {
        const { entranceId } = action.payload;

        draft.currentDraggedEntranceId = entranceId;

        const selected = state.selectedEntrances.find(
          (id) => entranceId === id
        );

        if (!selected) {
          draft.selectedEntrances = [entranceId];
        }
      });

    case SelectAction.CLEAR:
      return entrancesSelectionInitialState;

    case SelectAction.CANCEL_DRAG:
      return {
        ...state,
        currentDraggedEntranceId: null,
      };

    default:
      return state;
  }
};
