import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  teams: null,
};

export const teamsAction = createSlice({
  name: "teams",
  initialState,
  reducers: {
    teamsPush: (state, action) => {
      state.teams = [...state.teams, action.payload];
    },
    teamsUpdate: (state, action) => {
      state.teams = action.payload;
    },
    getAllTeams: (state, action) => {
      state.teams = action.payload;
    },
    setInitialStateTeams: () => {
      return initialState;
    },
  },
});

export const { teamsPush, getAllTeams, teamsUpdate, setInitialStateTeams } =
  teamsAction.actions;

export default teamsAction.reducer;
