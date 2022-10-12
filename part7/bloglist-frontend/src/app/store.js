import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import notification from "../features/notification/notificationSlice";
import { api } from "./services/api";

export const createStore = (options) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      auth,
      notification,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    ...options,
  });

export const store = createStore();
