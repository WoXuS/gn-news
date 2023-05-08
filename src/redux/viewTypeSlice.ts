import { createSlice } from "@reduxjs/toolkit";
import { ViewTypes } from "../types/types";

const initialState = {
  viewType: ViewTypes.list,
};

const viewTypeSlice = createSlice({
  name: "viewType",
  initialState,
  reducers: {
    handleViewTypeChange(state) {
      state.viewType = state.viewType === ViewTypes.list ? ViewTypes.tiles : ViewTypes.list;
    },
  },
});
export const viewTypeActions = viewTypeSlice.actions;
export default viewTypeSlice.reducer;
