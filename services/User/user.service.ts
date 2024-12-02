import { API } from "services/connectapi.service";
import { GenericalPromise, HandleError } from "services/generical.service";
import { Group } from "services/Groups/groups.service";
import { Roles } from "services/Roles/roles.service";

interface CurrentUser {
  email: "user@example.com";
  is_active: true;
  is_superuser: true;
  profile: Profile;
  roles: Roles[];
  groups: Group[];
}

interface Profile {
  first_name: "string";
  last_name: "string";
  document: "string";
  birth_date: "2019-08-24";
}

interface Status {}

export const getCurrentUser =
  async (): Promise<GenericalPromise<CurrentUser> | null> => {
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
