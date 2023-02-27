import { configureStore } from "@reduxjs/toolkit";
import awardsAction from "./reducers/awards.reducer";
import ordersAction from "./reducers/orders.reducer";
import userActions from "./reducers/users.reducer";
import saleActions from "./reducers/sales.reducer";
import teamsAction from "./reducers/teams.reducer";

export const store = configureStore({
  reducer: {
    user: userActions,
    awards: awardsAction,
    orders: ordersAction,
    sales: saleActions,
    teams: teamsAction,
  },
});
