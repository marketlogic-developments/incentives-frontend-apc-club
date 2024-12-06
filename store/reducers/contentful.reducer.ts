import { createSlice } from "@reduxjs/toolkit";

interface Is{
  videos: any[],
  comunicates:any[]
}

const initialState:Is = {
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

    setInitialStateCompany: () => {
      return initialState;
    },
  },
});

export const { getComunicates, getVideos, setInitialStateCompany } =
  contentfulAction.actions;

export default contentfulAction.reducer;
