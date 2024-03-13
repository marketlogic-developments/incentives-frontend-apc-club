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
  company: {},
  companyUsers: [],
  digipoints: {},
  distribuitor: {},
  ranking: [],
  userSwitch: {},
  partnerTyc: [],
};

export const userActions = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
    },
    getPartnerTyc: (state, action) => {
      state.partnerTyc = action.payload;
    },
    userToken: (state, action) => {
      state.token = action.payload;
    },
    userUpdate: (state, action) => {
      const actionPay = action.payload;
      state.user = { ...state.user, ...actionPay };
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
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setDistribuitor: (state, action) => {
      state.distribuitor = action.payload;
    },
    setCompanyUsers: (state, action) => {
      state.companyUsers = action.payload;
    },

    setRanking: (state, action) => {
      state.ranking = action.payload;
    },

    setDataSession: (state, action) => {
      state.userSwitch = action.payload;
    },

    setInitialStateUser: (state, action) => {
      return initialState;
    },
  },
});

export const {
  userLogin,
  getPartnerTyc,
  loadingUser,
  createUser,
  getUsers,
  getPoints,
  policyAndPassword,
  setDigipoints,
  userToken,
  setCompany,
  setCompanyUsers,
  setDistribuitor,
  setInitialStateUser,
  userUpdate,
  setRanking,
  setDataSession,
} = userActions.actions;

export default userActions.reducer;

export const getUsersData = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/`, {
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
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/roles/`, {
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
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/`, data, {
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

export const getDigiPoints = (token, id) => async (dispatch) => {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/digipoints-redeem-status/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((dpInfo) => {
      const [digipoints] = dpInfo.data;

      dispatch(
        digipoints === undefined
          ? setDigipoints({
              employ_id: 1761,
              assigned_points: 0,
              cart_points: 0,
            })
          : setDigipoints(digipoints)
      );
    });
};

export const getPartnerTycData = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/getpartnertyc`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(getPartnerTyc(res.data)));
  } catch (err) {
    console.log(err);
  }
};
