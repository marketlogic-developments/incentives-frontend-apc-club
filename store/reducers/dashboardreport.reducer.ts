import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  licences: null,
  goalPartner: null,
  userRaking: {
    organization: null,
    global: null,
  },
  salesOrganization: {
    creative_cloud: null,
    document_cloud: null,
  },
  digipointsPartner: {
    assigned: null,
    uploaded: null,
    redemeed: null,
    sales: null,
    promotions: null,
    behaviors: null,
  },
};

export const DashboardReport = createSlice({
  name: "front",
  initialState,
  reducers: {
    setRanking: (state, action) => {
      state.userRaking = action.payload;
    },
  },
});

export const { setRanking } = DashboardReport.actions;

export default DashboardReport.reducer;
