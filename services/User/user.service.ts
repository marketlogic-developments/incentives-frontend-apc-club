import { API } from "services/connectapi.service";
import {
  GenericalPromise,
  HandleError,
  PaginatedElements,
} from "services/generical.service";
import { Roles } from "services/Roles/roles.service";

export interface CurrentUser {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  profile: Profile;
  roles: Roles[];
  status: StatusUser;
  region: Region;
  points: DigipointsUser;
}

export interface Profile {
  first_name: string;
  last_name: string;
  extended_attributes: {
    middle_name: string;
    second_last_name: string;
  };
  document: string;
  birth_date: string;
  photoProfile: string;
  language: Language;
  phone_number: string;
  organizations: Organization[];
  country: any;
}

export interface Language {
  code: string;
  id: string;
  name: string;
  status: boolean;
}

export interface StatusUser {
  [key: string]: any;
}

export interface DigipointsUser {
  history_points: number;
  current_points: number;
  redeemed_points: number;
}

export interface Region {
  id: string;
  name: string;
}
export interface Organization {
  id: string;
  name: string;
  phone_number: string;
  address: string;
  status: boolean;
  level?: any
  validations: string[];
}

export interface tokenRefresh {
  refresh_token: string;
  token: string;
  type: string;
};

export const getCurrentUser =
  async (): Promise<GenericalPromise<CurrentUser> | void> => {
    try {
      const response = await API.get<GenericalPromise<CurrentUser>>(
        `administration/users/get_current_user`
      );
      return response.data;
    } catch (err: any) {
      console.log("Error to get user info");
      HandleError(err);
      throw err;
    }
  };

export const getOneUser = async (
  id: string
): Promise<GenericalPromise<CurrentUser> | void> => {
  try {
    const response = await API.get<GenericalPromise<CurrentUser>>(
      `administration/users?id=${id}`
    );
    return response.data;
  } catch (err: any) {
    console.log("Error to get user info");
    HandleError(err);
    throw err;
  }
};

export const listUsers = async (
  params: string = ""
): Promise<PaginatedElements<CurrentUser> | void> => {
  try {
    const response = await API.get(`administration/users?${params}`);
    return response.data;
  } catch (err) {
    HandleError(err);
    throw err;
  }
};

export const UpdateUser = async (
  data: any,
  id: string
): Promise<GenericalPromise<CurrentUser> | void> => {
  try {
    const response = await API.put(`administration/users?id=${id}`, data);
    return response.data;
  } catch (err) {
    HandleError(err);
    throw err;
  }
};

export const SwitchUser = async (
  email: string
): Promise<GenericalPromise<tokenRefresh> | void> => {
  try {
    const response = await API.post<GenericalPromise<tokenRefresh>>(
      `authentication/impersonate`,
      { email: email }
    );
    return response.data;
  } catch (err: any) {
    console.log("Error to get user info");
    HandleError(err);
    throw err;
  }
};
