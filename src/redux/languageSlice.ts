import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    handleLanguageChange(state, action) {
      state.language = action.payload;
    },
  },
});
export const languageActions = languageSlice.actions;
export default languageSlice.reducer;
