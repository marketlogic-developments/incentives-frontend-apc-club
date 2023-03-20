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
      const data = res.data.filter(({ employeeId }) => employeeId === id);
      dispatch(getAllOrders(data));
    });
};

export const getOrdersAll = (token) => async (dispatch) => {
  // axios
  //   .get(`${process.env.BACKURL}/reporters/redeem`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then((res) => {
  //     const data = res.data;
  //     dispatch(getAllOrders(data));
  //   });

  dispatch(
    getAllOrders([
      {
        created_at: "2023-03-18T12:48:37.024Z",
        digipoint_substract: 5955,
        email: "camilo.salazar@bcrservicos.com.br",
        employeeid: 20,
        id: 165,
        name: "Cristian Camilo Salazar Arias",
        operationstatusid: 13,
        ordernumber: "4d26fec7-8174-419f-8855-3bf6222696f2",
        productsobject: [
          {
            CreatedAt: "2023-02-01T12:16:48.384Z",
            description: "R$",
            digipoints: "178",
            id: "6",
            imagePath:
              "https://poqhyp.stripocdn.email/content/guids/CABINET_ce1ec2500b20b321e49e028e3a8142b2f8bda2f0f8c0ae1d47fe8fdf77af987b/images/real100.png",
            imagePathSecond: "/awards/reales/real100.png",
            name: "R$100",
            price: "100",
            quantity: "1",
            status: "true",
          },
        ],
        role_id: 3,
        role_name: "Lider",
        status_name: "Orden Recibida",
      },
    ])
  );
};
