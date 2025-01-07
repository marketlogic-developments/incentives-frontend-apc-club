import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { MultipleElements } from "services/generical.service";
import { AssingInvoice } from "services/Invoices/invoices.service";

interface Props{
    invoicesDistribution: MultipleElements<AssingInvoice> | null
}

const initialState: Props = {
  invoicesDistribution: null
};

export const InvoicesAction = createSlice({
  name: "invoicesActions",
  initialState,
  reducers: {
    getInvoices: (state, action) => {
      state.invoicesDistribution = action.payload;
    },
  },
});

export const { getInvoices } = InvoicesAction.actions;

export default InvoicesAction.reducer;