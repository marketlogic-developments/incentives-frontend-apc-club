import { useCustomNavigation } from "hooks/useCustomNavigation";
import { getCurrentUser } from "services/User/user.service";
import CurrentUserTest from "../testing/CurrentUserTest.json";

export const useDataUser = () => {
  const { redirectBasedOnStatus, dispatchUserLogin } = useCustomNavigation();

  const setDataUser = async (): Promise<void> => {
    try {
      // const res = await getCurrentUser(); // O CurrentUserTest para pruebas
      const res = { result: CurrentUserTest }; // O CurrentUserTest para pruebas
      if (!res) throw new Error("Failed Login, try again");

      const tyCStatus = res.result.status["POLICIES"]


      dispatchUserLogin(res.result);
      await redirectBasedOnStatus(tyCStatus ?? false);
    } catch (err) {
      console.error(err);
    }
  };

  return { setDataUser };
};
