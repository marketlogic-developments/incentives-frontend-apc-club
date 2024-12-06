import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import organizacion from "pages/organizacion";
import { CurrentUser, StatusUser } from "services/User/user.service";

export interface InitialStateUserReducer {
  user: CurrentUser | null;
  token: string | null;
  loading: boolean;
  error: null;
  organization: any;
  digipoints: any;
  status: StatusUser[];
  userSwitch: CurrentUser | null;
}

interface addTokenCurrentUser extends CurrentUser{
  token: string
}

const initialState: InitialStateUserReducer = {
  user: null,
  token: null,
  loading: false,
  error: null,
  organization: null,
  digipoints: null,
  userSwitch: null,
  status:[]
};


export const currentUserActions = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    userLogin: ({ user, organization, digipoints, token }, action:PayloadAction<addTokenCurrentUser>) => {
      user = action.payload;
      token = action.payload.token;
      organization = action.payload;
      digipoints = action.payload
    },
    userToken: ({ token }, action) => {
      token = action.payload;
    },

    userUpdate: ({ user }: { user: CurrentUser | null }, action) => {
      const actionPay = action.payload;

      user = { ...user, ...actionPay };
    },

    loadingUser: (state, action) => {
      state.loading = action.payload;
    },

    setDigipoints: ({ digipoints }, action) => {
      digipoints = action.payload;
    },

    udpateDigipoints: ({ digipoints }, action) => {
      digipoints = action.payload;
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
