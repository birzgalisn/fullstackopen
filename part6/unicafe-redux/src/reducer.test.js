import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = { type: "DO_NOTHING" };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const state = initialState;
    const action = { type: "GOOD" };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ ...state, good: state.good + 1 });
  });

  test("ok is incremented", () => {
    const state = initialState;
    const action = { type: "OK" };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ ...state, ok: state.ok + 1 });
  });

  test("bad is incremented", () => {
    const state = initialState;
    const action = { type: "BAD" };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ ...state, bad: state.bad + 1 });
  });

  test("zero resets state to default values", () => {
    const state = { ...initialState, good: 99 };
    const action = { type: "ZERO" };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
