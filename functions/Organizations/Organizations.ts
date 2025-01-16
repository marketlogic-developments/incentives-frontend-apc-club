import { useDispatch } from "react-redux";
import { GetOneOrganization } from "services/Organization/organization.service";
import { oneOrganization } from "store/reducers/organization.reducer";

export const OrganizationsFunction = () => {
    const dispatch=useDispatch()

  const getOneOrganization = async (id: string): Promise<void> => {
    try {
      const res = await GetOneOrganization(id);

      if (!res) throw new Error("Failed to get Organization");

        dispatch(oneOrganization(res.result))
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {getOneOrganization}
};
