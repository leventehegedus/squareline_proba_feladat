import { configureStore, combineReducers } from "@reduxjs/toolkit";
import favoriteSlice from "./features/favorites/favoriteSlice";

export const store = configureStore({
  reducer: combineReducers({ favoriteSlice }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
