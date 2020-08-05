import produce from "immer";

export enum SelectAction {
  CLEAR,
  SELECT,
  START_DRAG,
  CANCEL_DRAG,
}

export type SelectionState = {
  currentColumnId: string | null;
  selectedItems: string[];
  currentDraggedItemId: string | null;
};

type ActionTypes =
  | {
      type: SelectAction.SELECT;
      payload: { itemId: string; columnId: string };
    }
  | {
      type: SelectAction.CLEAR;
    }
  | {
      type: SelectAction.START_DRAG;
      payload: { itemId: string; columnId: string };
    }
  | {
      type: SelectAction.CANCEL_DRAG;
    };

export const selectionInitialState: SelectionState = {
  currentColumnId: null,
  currentDraggedItemId: null,
  selectedItems: [],
};

export const reducer = (
  state: SelectionState,
  action: ActionTypes
): SelectionState => {
  switch (action.type) {
    case SelectAction.SELECT:
      return produce(state, (draft) => {
        const { columnId, itemId } = action.payload;

        draft.currentDraggedItemId = null;

        if (columnId !== state.currentColumnId) {
          draft.selectedItems = [itemId];
          draft.currentColumnId = columnId;
          return;
        }

        const index = draft.selectedItems.indexOf(itemId);

        // if there is not selected item then add it, else slice it
        index === -1
          ? draft.selectedItems.push(itemId)
          : draft.selectedItems.splice(index, 1);
      });

    case SelectAction.START_DRAG:
      const newState = reducer(state, {
        type: SelectAction.SELECT,
        payload: action.payload,
      });

      return produce(newState, (draft) => {
        const { itemId } = action.payload;

        draft.currentDraggedItemId = itemId;
      });

    case SelectAction.CLEAR:
      return selectionInitialState;

    case SelectAction.CANCEL_DRAG:
      return {
        ...state,
        currentDraggedItemId: null,
      };

    default:
      return state;
  }
};
