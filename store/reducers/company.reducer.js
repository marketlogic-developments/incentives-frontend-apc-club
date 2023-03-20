import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  company: {},
  usersCompany: [],
};

export const companyAction = createSlice({
  name: "company",
  initialState,
  reducers: {
    getCompany: (state, action) => {
      state.company = action.payload;
    },
    getUsersCompany: (state, action) => {
      state.usersCompany = action.payload;
    },
  },
});

export const { getCompany, getUsersCompany } = companyAction.actions;

export default companyAction.reducer;
