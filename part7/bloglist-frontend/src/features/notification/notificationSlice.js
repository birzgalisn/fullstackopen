import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "info",
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => ({
      ...initialState,
      ...action.payload,
    }),
    clearNotification: () => initialState,
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const selectNotification = (state) => state.notification;
