import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  sales: [],
  loading: false,
  error: null,
  statusSale: [],
  products: [],
};

export const saleActions = createSlice({
  name: "sales",
  initialState,
  reducers: {
    createSale: (state, action) => {
      state.sales = [...state.sales, action.payload];
    },
    getStatusSale: (state, action) => {
      state.statusSale = [...state.statusSale, action.payload];
    },
    getSales: (state, action) => {
      state.sales = [...state.users, action.payload];
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getSalesPoints: (state, action) => {
      state.sales = [...state.users, action.payload];
    },
  },
});

export const {
  createSale,
  getSales,
  getSalesPoints,
  getStatusSale,
  getProducts,
} = saleActions.actions;

export default saleActions.reducer;

export const getSalesData = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/csv-files`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(createSale(res.data)));
  } catch (err) {
    console.log(err);
  }
};
export const getSalesPointsData = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/reporters/assigned/`, {
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

export const getProductsData = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/products/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return dispatch(getProducts(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getStatus = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/operation-status/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(getStatusSale([res.data])));
  } catch (err) {
    console.log(err);
  }
};

export const createSaleData = (token, data) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.BACKURL}/uploads/document/`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(createSale([res.data])));
  } catch (err) {
    console.log(err);
  }
};
