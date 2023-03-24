import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import taskSliceReducer from "../features/task/tasksSlice";
import teamsSliceReducer from "../features/teams/teamsSlice";
import projectSliceReducer from "../features/projects/projectSlice";
import filterSliceReducer from "../features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    tasks: taskSliceReducer,
    teams: teamsSliceReducer,
    projects: projectSliceReducer,
    filters: filterSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
