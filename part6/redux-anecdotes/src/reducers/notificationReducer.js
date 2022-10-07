import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    set(state, { payload }) {
      return payload;
    },
  },
});

const { actions, reducer: notificationReducer } = notificationSlice;

const { set } = actions;

export default notificationReducer;

let timeout;
export const setNotification = (notification, time) => {
  return async (dispatch) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      dispatch(set(""));
    }, time * 1_000);

    dispatch(set(notification));

    return () => {
      clearTimeout(timeout);
    };
  };
};
