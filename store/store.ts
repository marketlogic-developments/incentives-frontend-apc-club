import { configureStore } from "@reduxjs/toolkit";
import awardsAction from "./reducers/awards.reducer";
import ordersAction from "./reducers/orders.reducer";
import currentUserActions from "./reducers/currentUser.reducer";
import userActions from "./reducers/users.reducer";
import saleActions from "./reducers/sales.reducer";
import InvoicesAction from "./reducers/invoices.reducer";
import teamsAction from "./reducers/teams.reducer";
import loadingData from "./reducers/loading.reducer";
import companyAction from "./reducers/company.reducer";
import promosAction from "./reducers/promos.reducer";
import contentfulAction from "./reducers/contentful.reducer";
import dashboardReportAction from "./reducers/dashboardreport.reducer";
import  OrganizationAction  from "./reducers/organization.reducer";

export const store = configureStore({
  reducer: {
    currentUser: currentUserActions,
    user: userActions,
    awards: awardsAction,
    orders: ordersAction,
    sales: saleActions,
    invoices: InvoicesAction,
    teams: teamsAction,
    loadingData: loadingData,
    company: companyAction,
    organization: OrganizationAction,
    promos: promosAction,
    contentful: contentfulAction,
    dashboardReport: dashboardReportAction,
  },
});

// Tipo RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
