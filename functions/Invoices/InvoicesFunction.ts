import { useDispatch } from "react-redux";
import { HandleError } from "services/generical.service";
import {
  listInvoices,
  PostAssignInvoice,
  postInvoices,
} from "services/Invoices/invoices.service";
import { getInvoices } from "store/reducers/invoices.reducer";

export const InvoicesFunction = () => {
  const dispatch = useDispatch();

  const ListInvoices = async (params: string = ""): Promise<void> => {
    try {
      const res = await listInvoices(params);
      if (!res) throw new Error("Failed to get invoices");

      console.log(res);

      dispatch(getInvoices(res.result));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const AssignInvoice = async (data: PostAssignInvoice): Promise<void> => {
    try {
      const res = await postInvoices(data);
      if (!res) throw new Error("Failed to assign invoice");

      ListInvoices();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { ListInvoices, AssignInvoice };
};
