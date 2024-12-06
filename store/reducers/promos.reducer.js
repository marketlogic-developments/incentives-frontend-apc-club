import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  promos: [],
};

export const promosAction = createSlice({
  name: "promos",
  initialState,
  reducers: {
    ordersPromos: (state, action) => {
      state.promos = [...state.orders, action.payload];
    },
    getAllPromos: (state, action) => {
      state.promos = action.payload;
    },
    setInitialStatePromos: () => {
      return initialState;
    },
  },
});

export const { ordersPromos, getAllPromos, setInitialStatePromos } =
  promosAction.actions;

export default promosAction.reducer;
