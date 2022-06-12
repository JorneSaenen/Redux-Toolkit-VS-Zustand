import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./TodoSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
