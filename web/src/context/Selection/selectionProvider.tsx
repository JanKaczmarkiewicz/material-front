import React, { useReducer, useCallback } from "react";
import { Provider } from "./selectionContext";
import { reducer, SelectionState, SelectAction } from "./selectionReducer";
import {
  SelectHandler,
  UnselectHandler,
  ToggleHandler,
  CancelDragHandler,
  StartDragHandler,
  ClearHandler,
} from "../../types/selection";

const initialState: SelectionState = {
  currentColumnId: null,
  currentDraggedItemId: null,
  selectedItems: [],
};

const SelectionProvider: React.FC = ({ children }) => {
  const [state, dispath] = useReducer(reducer, initialState);

  const handleSelectMultiple: SelectHandler = useCallback(
    (payload) =>
      dispath({
        type: SelectAction.SELECT,
        payload,
      }),
    []
  );

  const handleUnselectMultiple: UnselectHandler = useCallback(
    (payload) =>
      dispath({
        type: SelectAction.UNSELECT,
        payload,
      }),
    []
  );

  const handleToggleOne: ToggleHandler = useCallback(
    (payload) =>
      dispath({
        type: SelectAction.TOGGLE_ONE,
        payload,
      }),
    []
  );

  const handleCancelDrag: CancelDragHandler = useCallback(
    () =>
      dispath({
        type: SelectAction.CANCEL_DRAG,
      }),
    []
  );

  const handleStartDrag: StartDragHandler = useCallback(
    (payload) =>
      dispath({
        type: SelectAction.START_DRAG,
        payload,
      }),
    []
  );

  const handleClear: ClearHandler = useCallback(
    () =>
      dispath({
        type: SelectAction.CLEAR,
      }),
    []
  );

  return (
    <Provider
      value={{
        selection: state,
        toggle: handleToggleOne,
        unselect: handleUnselectMultiple,
        select: handleSelectMultiple,
        cancelDrag: handleCancelDrag,
        clear: handleClear,
        startDrag: handleStartDrag,
      }}
    >
      {children}
    </Provider>
  );
};

export default SelectionProvider;
