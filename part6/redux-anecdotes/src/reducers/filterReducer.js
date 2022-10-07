import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    set(state, { payload }) {
      return payload;
    },
  },
});

const { actions, reducer: filterReducer } = filterSlice;

const { set } = actions;

export default filterReducer;

export const setFilter = (filter) => {
  return async (dispatch) => {
    dispatch(set(filter));
  };
};
