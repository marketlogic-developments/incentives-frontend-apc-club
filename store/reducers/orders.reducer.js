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
  },
});

export const { ordersPush, getAllOrders } = ordersAction.actions;

export default ordersAction.reducer;

export const getOrders = (token, id) => async (dispatch) => {
  axios
    .get(`${process.env.BACKURL}/order-carts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data.filter(({ employeeId }) => employeeId === id));
      const data = res.data.filter(({ employeeId }) => employeeId === id);
      dispatch(getAllOrders(data));
    });
};
