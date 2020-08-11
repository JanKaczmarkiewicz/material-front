export type ToggleHandler = (payload: {
  columnId: string;
  itemId: string;
}) => void;
export type UnselectHandler = (payload: { itemsIds: string[] }) => void;
export type SelectHandler = (payload: {
  columnId: string;
  itemsIds: string[];
}) => void;
export type StartDragHandler = (payload: {
  columnId: string;
  itemId: string;
}) => void;
export type ClearHandler = () => void;
export type CancelDragHandler = () => void;
