import { useCustomNavigation } from "hooks/useCustomNavigation";
import { getCurrentUser, getOneUser } from "services/User/user.service";
import CurrentUserTest from "../testing/CurrentUserTest.json";

export const useDataUser = () => {
  const { redirectBasedOnStatus, dispatchUserLogin } = useCustomNavigation();

  const setDataUser = async (): Promise<void> => {
    try {
      const res1 = await getCurrentUser(); // O CurrentUserTest para pruebas
      // const res = { result: CurrentUserTest }; // O CurrentUserTest para pruebas
      if (!res1) throw new Error("Failed Login, try again");

      const res= await getOneUser(res1.result.id)

      if (!res) throw new Error("Failed Login, try again");

      const tyCStatus = res.result.status["POLICIES"];

      dispatchUserLogin(res.result);
      await redirectBasedOnStatus(tyCStatus ?? false);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { setDataUser };
};
