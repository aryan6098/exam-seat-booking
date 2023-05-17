import { configureStore } from "@reduxjs/toolkit";
import { examDataApi } from "./examDataApi";

const store = configureStore({
  reducer: {
    [examDataApi.reducerPath]: examDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([examDataApi.middleware]),
});
export default store;
