import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  company: {},
  usersCompany: [],
  distri: {},
  usersDistri: {},
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
    getDistri: (state, action) => {
      state.company = action.payload;
    },
    getUsersDistri: (state, action) => {
      state.usersCompany = action.payload;
    },

    setInitialStateCompany: () => {
      return initialState;
    },
  },
});

export const { getCompany, getUsersCompany, setInitialStateCompany } =
  companyAction.actions;

export default companyAction.reducer;

export const importCompany = (token, data) => async (dispatch) => {
  try {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/process/file-catalog`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        return res.data;
      });
  } catch (err) {
    console.log(err);
  }
};
export const getCompanyAll = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/companies`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      });
  } catch (err) {
    console.log(err);
  }
};
export const getDistriAll = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/distribution-channel`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      });
  } catch (err) {
    console.log(err);
  }
};
