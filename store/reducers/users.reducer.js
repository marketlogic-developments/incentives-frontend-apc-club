import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const initialState = {
  user: 0,
  token: "",
  loading: false,
  error: null,
  users: [],
  digipoints: {},
};

export const userActions = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
    },
    userToken: (state, action) => {
      state.token = action.payload;
    },
    loadingUser: (state, action) => {
      state.loading = action.payload;
    },

    createUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    policyAndPassword: (state, action) => {
      state.user = action.payload;
    },
    setDigipoints: (state, action) => {
      state.digipoints = action.payload;
    },
  },
});

export const {
  userLogin,
  loadingUser,
  createUser,
  getUsers,
  getPoints,
  policyAndPassword,
  setDigipoints,
  userToken,
} = userActions.actions;

export default userActions.reducer;

export const getUsersData = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/users/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return dispatch(getUsers(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getRolesData = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/roles/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((roles) => {
        return roles.data;
      });
  } catch (err) {
    console.log(err);
  }
};

export const createUserData = (token, data) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.BACKURL}/users/`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        res.data;
      });
  } catch (err) {
    console.log(err);
  }
};
export const getPointsData = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/reporters/digipoints-redeem-status/1/0/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((puntos) => {
        return puntos.data;
      });
  } catch (err) {
    console.log(err);
  }
};
