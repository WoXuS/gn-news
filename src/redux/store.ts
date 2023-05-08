import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import viewTypeReducer from "./viewTypeSlice";
import languageReducer from "./languageSlice";

export const store = configureStore({
  reducer: {
    viewType: viewTypeReducer,
    language: languageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
