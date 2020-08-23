import { reducer, SelectAction, SelectionState } from "../selectionReducer";

const columnId = "column_id";
const newColumnId = "new";

const getInitialState = (): SelectionState => ({
  currentColumnId: columnId,
  selectedItems: ["1", "3", "6", "10"],
  currentDraggedItemId: null,
});

describe("CLEAR", () => {
  it("should entirely change referance to the object", () => {
    const state = getInitialState();
    const newState = reducer(state, { type: SelectAction.CLEAR });

    expect(newState).not.toBe(state);
    expect(newState.selectedItems).not.toBe(state.selectedItems);

    expect(newState.currentColumnId).toBe(null);
    expect(newState.selectedItems.length).toBe(0);
    expect(newState.currentDraggedItemId).toBe(null);
  });
});

describe("TOGGLE_ONE", () => {
  it("should add item into selectedItem if not selected yet", () => {
    const newItem = "new_id";
    const state = getInitialState();
    const newState = reducer(state, {
      type: SelectAction.TOGGLE_ONE,
      payload: { columnId, itemId: newItem },
    });
    expect(newState).not.toBe(state);
    expect(newState.currentColumnId).toBe(state.currentColumnId);
    expect(newState.selectedItems).not.toBe(state.selectedItems);

    expect(newState.selectedItems.length).toBe(state.selectedItems.length + 1);
    expect(newState.selectedItems).toEqual(
      expect.arrayContaining([...state.selectedItems, newItem])
    );
    expect(newState.currentDraggedItemId).toBe(null);
  });

  it("should remove item into selectedItem if selected", () => {
    const state = getInitialState();
    const itemId = state.selectedItems[0];
    const newState = reducer(state, {
      type: SelectAction.TOGGLE_ONE,
      payload: { columnId, itemId: itemId },
    });
    expect(newState).not.toBe(state);
    expect(newState.currentColumnId).toBe(state.currentColumnId);
    expect(newState.selectedItems).not.toBe(state.selectedItems);
    expect(newState.selectedItems.length).toBe(state.selectedItems.length - 1);

    const expectedArrayContent = expect.arrayContaining(
      state.selectedItems.filter((id) => id !== itemId)
    );

    expect(newState.selectedItems).toEqual(expectedArrayContent);
    expect(newState.currentDraggedItemId).toBe(null);
  });

  it("should 'change' column if column is diffrent, seletedItems should have only one item", () => {
    const newItem = "new_id";
    const state = getInitialState();
    const newState = reducer(state, {
      type: SelectAction.TOGGLE_ONE,
      payload: { columnId: newColumnId, itemId: newItem },
    });
    expect(newState).not.toBe(state);
    expect(newState.currentColumnId).toBe(newColumnId);
    expect(newState.selectedItems).not.toBe(state.selectedItems);
    expect(newState.selectedItems.length).toBe(1);
    expect(newState.selectedItems).toEqual(expect.arrayContaining([newItem]));
    expect(newState.currentDraggedItemId).toBe(null);
  });
});

describe("START_DRAG", () => {
  it("should clear selectedItems and add item if not selected yet", () => {
    const newItem = "new_id";
    const state = getInitialState();
    const newState = reducer(state, {
      type: SelectAction.START_DRAG,
      payload: { columnId, itemId: newItem },
    });
    expect(newState).not.toBe(state);
    expect(newState.currentColumnId).toBe(state.currentColumnId);
    expect(newState.selectedItems).not.toBe(state.selectedItems);

    expect(newState.selectedItems.length).toBe(1);
    expect(newState.selectedItems).toEqual(expect.arrayContaining([newItem]));
    expect(newState.currentDraggedItemId).toBe(newItem);
  });

  it("should add item if item selected", () => {
    const state = getInitialState();

    const itemId = state.selectedItems[0];
    const newState = reducer(state, {
      type: SelectAction.START_DRAG,
      payload: { columnId, itemId: itemId },
    });
    expect(newState).not.toBe(state);
    expect(newState.currentColumnId).toBe(state.currentColumnId);
    expect(newState.selectedItems).not.toBe(state.selectedItems);

    expect(newState.selectedItems.length).toBe(state.selectedItems.length + 1);
    expect(newState.selectedItems).toEqual(
      expect.arrayContaining([...state.selectedItems, itemId])
    );
    expect(newState.currentDraggedItemId).toBe(itemId);
  });

  it("should 'change' column if column is diffrent, seletedItems should have only one item", () => {
    const newItem = "new_id";
    const state = getInitialState();
    const newState = reducer(state, {
      type: SelectAction.START_DRAG,
      payload: { columnId: newColumnId, itemId: newItem },
    });
    expect(newState).not.toBe(state);
    expect(newState.currentColumnId).toBe(newColumnId);
    expect(newState.selectedItems).not.toBe(state.selectedItems);
    expect(newState.selectedItems.length).toBe(1);
    expect(newState.selectedItems).toEqual(expect.arrayContaining([newItem]));
    expect(newState.currentDraggedItemId).toBe(newItem);
  });
});

describe("CANCEL_DRAG", () => {
  it("should clear only currentDraggedItemId", () => {
    const newItem = "new_id";
    const state = reducer(getInitialState(), {
      type: SelectAction.START_DRAG,
      payload: { columnId: newColumnId, itemId: newItem },
    });
    const newState = reducer(state, {
      type: SelectAction.CANCEL_DRAG,
    });
    expect(newState).not.toBe(state);
    expect(newState.currentColumnId).toBe(newColumnId);
    expect(newState.selectedItems).toBe(state.selectedItems);
    expect(newState.selectedItems.length).toBe(state.selectedItems.length);
    expect(newState.currentDraggedItemId).toBe(null);
  });
});
describe("SELECT", () => {
  it("should select only new items in the same column", () => {
    const state = getInitialState();
    const newItems = ["1", "36", "90", "64"];
    const expectedArrayContent = [
      ...new Set([...newItems, ...state.selectedItems]),
    ];

    const newState = reducer(state, {
      type: SelectAction.SELECT,
      payload: { columnId: columnId, itemsIds: newItems },
    });

    expect(newState).not.toBe(state);
    expect(newState.currentColumnId).toBe(state.currentColumnId);
    expect(newState.selectedItems).not.toBe(state.selectedItems);
    expect(newState.selectedItems.length).toBe(expectedArrayContent.length);
    expect(newState.selectedItems).toEqual(
      expect.arrayContaining(expectedArrayContent)
    );
    expect(newState.currentDraggedItemId).toBe(null);
  });

  it("should clear items an add items if column changed ", () => {
    const state = getInitialState();
    const newItems = ["1", "36", "90", "64"];

    const newState = reducer(state, {
      type: SelectAction.SELECT,
      payload: { columnId: newColumnId, itemsIds: newItems },
    });

    expect(newState).not.toBe(state);
    expect(newState.currentColumnId).toBe(newColumnId);
    expect(newState.selectedItems).not.toBe(state.selectedItems);
    expect(newState.selectedItems.length).toBe(newItems.length);
    expect(newState.selectedItems).toEqual(expect.arrayContaining(newItems));
    expect(newState.currentDraggedItemId).toBe(null);
  });
});

describe("UNSELECT", () => {
  it("should remove only existing items in the same column", () => {
    const state = getInitialState();
    const itemsToRemove = ["1", "36", "90", "64"];

    const existingItems = state.selectedItems.filter((id) =>
      itemsToRemove.includes(id)
    );

    const newState = reducer(state, {
      type: SelectAction.UNSELECT,
      payload: { itemsIds: itemsToRemove },
    });

    expect(newState).not.toBe(state);
    expect(newState.currentColumnId).toBe(state.currentColumnId);
    expect(newState.selectedItems).not.toBe(state.selectedItems);
    expect(newState.selectedItems.length).toBe(
      state.selectedItems.length - existingItems.length
    );
    expect(newState.selectedItems).not.toEqual(
      expect.arrayContaining(existingItems)
    );
    expect(newState.currentDraggedItemId).toBe(null);
  });
});
