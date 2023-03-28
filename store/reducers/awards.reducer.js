import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  awards: [],
  shoopingCar: [],
  rules: [],
};

export const awardsAction = createSlice({
  name: "awards",
  initialState,
  reducers: {
    awardsPush: (state, action) => {
      state.awards = [...state.awards, ...action.payload];
    },
    awardsDelete: (state, action) => {
      state.awards = [];
    },
    productsPush: (state, action) => {
      state.shoopingCar = [...state.shoopingCar, ...action.payload];
    },
    shoopingCarPush: (state, action) => {
      state.shoopingCar = action.payload;
    },
    rulesGetAll: (state, action) => {
      state.rules = [...state.rules, ...action.payload];
    },
    rulesPush: (state, action) => {
      state.rules = action.payload;
    },
  },
});

export const { shoopingCarPush, awardsPush, awardsDelete, productsPush, rulesGetAll, rulesPush } =
  awardsAction.actions;

export default awardsAction.reducer;

export const pushReward = (token, data) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.BACKURL}/awards`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(awardsPush([res.data])));
  } catch (err) {
    console.log(err);
  }
};

export const getDataAwards = (token) => async (dispatch) => {
  try {
    axios
      .get(`${process.env.BACKURL}/awards`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(awardsPush(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getDataRules = (token) => async (dispatch) => {
  try {
    axios
      .get(`${process.env.BACKURL}/rules`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(rulesGetAll(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};
