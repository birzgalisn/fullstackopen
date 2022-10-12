import { createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../app/services/login";
import { storage } from "./storage";

const authSlice = createSlice({
  name: "auth",
  initialState: storage.check(),
  reducers: {
    logout: () => storage.clear(),
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      loginApi.endpoints.login.matchFulfilled,
      (state, action) => {
        return storage.set(action.payload);
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectAuthenticated = (state) => state.auth;
