import { useDispatch } from "react-redux";
import { listInvoices } from "services/Invoices/invoices.service";
import { getInvoices } from "store/reducers/invoices.reducer";

export const InvoicesFunction=()=>{
    const dispatch = useDispatch();

    const ListInvoices= async (params: string = ""): Promise<void> => {
        try {
          const res = await listInvoices(params);
          if (!res) throw new Error("Failed to get teams");

          console.log(res)
    
          dispatch(getInvoices(res.result));
        } catch (err) {
          console.error(err);
        }
      };


    return {ListInvoices}
}