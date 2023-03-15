import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingData: false,
};

export const loadingDataAction = createSlice({
  name: "loadingData",
  initialState,
  reducers: {
    changeLoadingData: (state, action) => {
      state.loadingData = action.payload;
    },
  },
});

export const { changeLoadingData } = loadingDataAction.actions;

export default loadingDataAction.reducer;
