import { createContext } from "../util";
import { SelectionState } from "./selectionReducer";
import {
  ToggleHandler,
  UnselectHandler,
  StartDragHandler,
  ClearHandler,
  SelectHandler,
  CancelDragHandler,
} from "../../types/selection";

export type SelectionAPI = {
  selection: SelectionState;
  toggle: ToggleHandler;
  unselect: UnselectHandler;
  select: SelectHandler;
  startDrag: StartDragHandler;
  clear: ClearHandler;
  cancelDrag: CancelDragHandler;
};

const { useContext: useSelectionContext, Provider } = createContext<
  SelectionAPI
>();

export { useSelectionContext, Provider };
