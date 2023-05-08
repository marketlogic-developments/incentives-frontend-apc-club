import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  awards: [],
  shoopingCar: [],
  rules: [],
  modalCard: false,
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
    modalCardState: (state, action) => {
      state.modalCard = action.payload;
    },

    setInitialStateAwards: (state, action) => {
      return initialState;
    },
  },
});

export const {
  shoopingCarPush,
  awardsPush,
  awardsDelete,
  productsPush,
  rulesGetAll,
  rulesPush,
  setInitialStateAwards,
  modalCardState,
} = awardsAction.actions;

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

export const getDataAwards = (token, user) => async (dispatch) => {
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
        dispatch(
          awardsPush(
            res.data.filter((e) => {
              if (user.roleId === 1) {
                return e;
              }

              if (user.countryId === "Chile") {
                return e.description !== "BRASIL";
              }
              if (user.region === "BRAZIL") {
                return e.description === "BRASIL";
              }

              if (["SOLA", "NOLA", "MEXICO"].includes(user.region)) {
                return e.description === "NOLA - SOLA - MEX";
              }
            })
          )
        );
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
