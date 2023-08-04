import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  collapse: false,
  openCustomerCare: false,
};

export const FrontAction = createSlice({
  name: "front",
  initialState,
  reducers: {
    openModalCustomerCare: (state, action) => {
      state.openCustomerCare = action.payload;
    },
  },
});

export const {} = FrontAction.actions;

export default FrontAction.reducer;
