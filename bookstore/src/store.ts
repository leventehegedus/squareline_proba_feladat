import { configureStore, combineReducers } from "@reduxjs/toolkit";
import favoriteSlice from "./features/favorites/favoriteSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: combineReducers({ favoriteSlice, authSlice }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
