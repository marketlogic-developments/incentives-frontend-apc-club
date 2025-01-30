import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Award, ShoppingCar } from "services/Awards/awards.service";

interface InitialState {
  awards: Award[],
  shoopingCar: ShoppingCar,
  menuMarket: boolean,
}

const initialState:InitialState = {
  awards: [],
  shoopingCar: {
    order_id: "",
    products:[]
  },
  menuMarket: false,
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
      state.shoopingCar = action.payload;
    },
    setProductsInitalState: (state) => {
      state.shoopingCar = initialState.shoopingCar;
    },
    productsCarPush: (state, action) => {
      state.shoopingCar = {...state.shoopingCar,products:action.payload};
    },
    setMenuMarket: (state, action) => {
      state.menuMarket = action.payload;
    },

    setInitialStateAwards: () => {
      return initialState;
    },
  },
});

export const {
  awardsPush,
  productsCarPush,
  awardsDelete,
  productsPush,
  setInitialStateAwards,
  setMenuMarket,
  setProductsInitalState
} = awardsAction.actions;

export default awardsAction.reducer;

