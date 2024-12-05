import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportPartnerTC: [],
};

export const Reports = createSlice({
  name: "Reports",
  initialState,
  reducers: {
    getPartnerTyc: ({ reportPartnerTC }, action) => {
      reportPartnerTC = action.payload;
    },
  },
});
