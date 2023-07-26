import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comunicates: [],
  videos: [],
};

export const contentfulAction = createSlice({
  name: "contentful",
  initialState,
  reducers: {
    getComunicates: (state, action) => {
      state.comunicates = action.payload;
    },
    getVideos: (state, action) => {
      state.videos = action.payload;
    },

    setInitialStateCompany: (state, action) => {
      return initialState;
    },
  },
});

export const { getComunicates, getVideos, setInitialStateCompany } =
  contentfulAction.actions;

export default contentfulAction.reducer;
