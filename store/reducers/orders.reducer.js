import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
};

export const ordersAction = createSlice({
  name: "orders",
  initialState,
  reducers: {
    ordersPush: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
    getAllOrders: (state, action) => {
      state.orders = action.payload;
    },
    setInitialStateOrders: (state, action) => {
      return initialState;
    },
  },
});

export const { ordersPush, getAllOrders, setInitialStateOrders } =
  ordersAction.actions;

export default ordersAction.reducer;

export const getOrders = (token, id) => async (dispatch) => {
  axios
    .get(`${process.env.BACKURL}/order-carts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const data = res.data.filter(({ employeeId }) => employeeId === id);
      dispatch(getAllOrders(data));
    });
};

export const getOrdersAll = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/reporters/redeem`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(getAllOrders(res.data)));
  } catch (err) {
    console.log(err);
  }
};