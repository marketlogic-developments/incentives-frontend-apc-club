import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import organizacion from "pages/organizacion";
import {
  CurrentUser,
  DigipointsUser,
  StatusUser,
} from "services/User/user.service";

export interface InitialStateUserReducer {
  user: CurrentUser | null;
  token: string | null;
  loading: boolean;
  error: null;
  organization: any;
  digipoints: DigipointsUser | null;
  status: StatusUser[];
  userSwitch: CurrentUser | null;
}

interface CurrentUserToken extends CurrentUser {
  token: string;
}

const initialState: InitialStateUserReducer = {
  user: null,
  token: null,
  loading: false,
  error: null,
  organization: null,
  digipoints: null,
  userSwitch: null,
  status: [],
};

export const currentUserActions = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<CurrentUserToken>) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.organization = action.payload.profile.organizations;
      state.digipoints = action.payload.profile.digipoints;
    },
    userSwitch: (state, action: PayloadAction<CurrentUserToken>) => {
      state.userSwitch = action.payload;
      state.token = action.payload.token;
      state.organization = action.payload;
      state.digipoints = action.payload.profile.digipoints;
    },
    userToken: (state, action) => {
      state.token = action.payload;
    },

    userUpdate: ({ user }: { user: CurrentUser | null }, action) => {
      const actionPay = action.payload;

      user = { ...user, ...actionPay };
    },

    loadingUser: (state, action) => {
      state.loading = action.payload;
    },

    setDigipoints: (state, action) => {
      state.digipoints = action.payload;
    },

    udpateDigipoints: (state, action) => {
      state.digipoints = action.payload;
    },

    setInitialStateUser: () => {
      return initialState;
    },
  },
});

export const {
  userLogin,
  loadingUser,
  setDigipoints,
  userToken,
  setInitialStateUser,
  userUpdate,
} = currentUserActions.actions;

export default currentUserActions.reducer;
