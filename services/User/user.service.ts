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
  roles: Roles;
  status: StatusUser[];
  region: Region;
}

export interface Profile {
  first_name: string;
  middle_name: string;
  last_name: string;
  second_last_name: string;
  document: string;
  birth_date: string;
  photoProfile: string;
  language: string;
  phone_number: string;
  organization: any;
  digipoints: DigipointsUser;
}

export interface StatusUser {
  name: string;
  status: boolean;
}

export interface DigipointsUser {
  historical: number;
  current: number;
  redeemed: number;
}

export interface Region {
  id: string;
  name: string;
}

export const getCurrentUser =
  async (): Promise<GenericalPromise<CurrentUser> | void> => {
    try {
      const response = await API.get<GenericalPromise<CurrentUser>>(
        "administration/users/get_current_user"
      );
      return response.data;
    } catch (err: any) {
      console.log("Error to get user info");
      const error = HandleError(err);
      return error;
    }
  };

export const listUsers =
  async (): Promise<PaginatedElements<CurrentUser> | void> => {
    try {
      const response = await API.get("administration/users");
      return response.data;
    } catch (err) {
      console.log("Error to list users");
      const error = HandleError(err);
      return error;
    }
  };

export const updateUser =
  async (): Promise<GenericalPromise<CurrentUser> | void> => {};
