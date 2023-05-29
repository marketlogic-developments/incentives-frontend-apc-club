import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  collapse: false,
};

export const FrontAction = createSlice({
  name: "front",
  initialState,
  reducers: {},
});

export const {} = FrontAction.actions;

export default FrontAction.reducer;
