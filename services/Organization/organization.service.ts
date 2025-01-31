import { API } from "services/connectapi.service";
import {
  GenericalPromise,
  HandleError,
  MultipleElements,
} from "services/generical.service";
import { CurrentUser } from "services/User/user.service";

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

export interface CompleteOrganization{
  id: string,
  name: string,
  phone_number: string,
  representative_email: string,
  representative_first_name: string,
  representative_last_name: string,
  address: string,
  fiscal_period_year: string,
  status: true,
  goals: [],
  distribution_channel: {
    id: string,
    name: string
  },
  organization_codes: [
    {
      id: string,
      code: string,
      status: true
    }
  ]
  users_organizations: CurrentUser[]
}

export const GetOneOrganization = async (
  id: string
): Promise<GenericalPromise<CompleteOrganization> | void> => {
  try {
    const response = await API.get(`administration/organizations?id=${id}`);
    return response.data;
  } catch (err: any) {
    HandleError(err);
    throw err;
  }
};

export const GetOrganizations = async (
  id: number
): Promise<MultipleElements<Reseller> | void> => {
  try {
    const response = await API.get("administration/organizations");
    return response.data;
  } catch (err: any) {
    HandleError(err);
    throw err;
  }
};
