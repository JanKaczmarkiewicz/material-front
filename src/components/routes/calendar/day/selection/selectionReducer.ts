import produce from "immer";

export enum SelectAction {
  CLEAR,
  TOGGLE_ONE,
  START_DRAG,
  CANCEL_DRAG,
  SELECT,
  UNSELECT,
}

export type SelectionState = {
  currentColumnId: string | null;
  selectedItems: string[];
  currentDraggedItemId: string | null;
};

type ActionTypes =
  | {
      type: SelectAction.TOGGLE_ONE;
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
    }
  | {
      type: SelectAction.SELECT;
      payload: { itemsIds: string[]; columnId: string };
    }
  | {
      type: SelectAction.UNSELECT;
      payload: { itemsIds: string[] };
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
        const { columnId, itemsIds } = action.payload;

        draft.currentDraggedItemId = null;

        if (columnId !== state.currentColumnId) {
          draft.selectedItems = itemsIds;
          draft.currentColumnId = columnId;
          return;
        }

        draft.selectedItems = [
          ...new Set([...itemsIds, ...draft.selectedItems]),
        ];
      });

    case SelectAction.UNSELECT:
      return produce(state, (draft) => {
        const { itemsIds } = action.payload;

        draft.currentDraggedItemId = null;

        draft.selectedItems = draft.selectedItems.filter(
          (id) => !itemsIds.includes(id)
        );
      });

    case SelectAction.TOGGLE_ONE:
      return produce(state, (draft) => {
        const { columnId, itemId } = action.payload;

        draft.currentDraggedItemId = null;

        if (columnId !== state.currentColumnId) {
          draft.selectedItems = [itemId];
          draft.currentColumnId = columnId;
          return;
        }

        const index = draft.selectedItems.indexOf(itemId);

        // if item not found
        index === -1
          ? draft.selectedItems.push(itemId)
          : draft.selectedItems.splice(index, 1);
      });

    case SelectAction.START_DRAG:
      return produce(state, (draft) => {
        const { columnId, itemId } = action.payload;

        draft.currentDraggedItemId = itemId;

        if (
          columnId !== state.currentColumnId ||
          draft.selectedItems.indexOf(itemId) === -1
        ) {
          draft.selectedItems = [itemId];
          draft.currentColumnId = columnId;
          return;
        }

        draft.selectedItems.push(itemId);
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
