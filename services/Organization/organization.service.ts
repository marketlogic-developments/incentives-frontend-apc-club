import { API } from "services/connectapi.service";
import {
  GenericalPromise,
  HandleError,
  MultipleElements,
} from "services/generical.service";

interface Reseller {
  id: string;
  name: string;
  phone_number: string;
  representative_email: string;
  representative_first_name: string;
  representative_last_name: string;
  address: string;
  fiscal_period_year: string;
  status: boolean;
}

const getOneCompany = async (
  id: number
): Promise<GenericalPromise<Reseller> | void> => {
  try {
    const response = await API.get("");
    return response.data;
  } catch (err: any) {
    const error = HandleError(err);
    return error;
  }
};
