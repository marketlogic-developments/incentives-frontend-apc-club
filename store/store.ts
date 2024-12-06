import { configureStore } from "@reduxjs/toolkit";
import awardsAction from "./reducers/awards.reducer";
import ordersAction from "./reducers/orders.reducer";
import currentUserActions from "./reducers/currentUser.reducer";
import userActions from "./reducers/currentUser.reducer";
import saleActions from "./reducers/sales.reducer";
import teamsAction from "./reducers/teams.reducer";
import loadingData from "./reducers/loading.reducer";
import companyAction from "./reducers/company.reducer";
import promosAction from "./reducers/promos.reducer";
import contentfulAction from "./reducers/contentful.reducer";

export const store = configureStore({
  reducer: {
    currentUser: currentUserActions,
    user: userActions,
    awards: awardsAction,
    orders: ordersAction,
    sales: saleActions,
    teams: teamsAction,
    loadingData: loadingData,
    company: companyAction,
    promos: promosAction,
    contentful: contentfulAction,
  },
});

// Tipo RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
