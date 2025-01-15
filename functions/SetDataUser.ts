import { useCustomNavigation } from "hooks/useCustomNavigation";
import {
  CurrentUser,
  getCurrentUser,
  getOneUser,
} from "services/User/user.service";
import CurrentUserTest from "../testing/CurrentUserTest.json";
import { ResetPasswordService } from "services/Login/login.service";
import { useDispatch, useSelector } from "react-redux";
import { setUserStatus, userUpdate } from "store/reducers/currentUser.reducer";
import { RootState } from "store/store";

interface FormUpdateProps {
  birthDate: string;
  documentinfo: string;
  documenttype: string;
  first_name: string;
  languageId: number;
  last_name: string;
  middlename: string;
  phoneNumber: string;
  secondlastname: string;
}

export const useDataUser = () => {
  const { redirectBasedOnStatus, dispatchUserLogin } = useCustomNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.currentUser);

  const setDataUser = async (): Promise<void> => {
    try {
      const res1 = await getCurrentUser(); // O CurrentUserTest para pruebas
      // const res = { result: CurrentUserTest }; // O CurrentUserTest para pruebas
      if (!res1) throw new Error("Failed Login, try again");

      const res = await getOneUser(res1.result.id);

      if (!res) throw new Error("Failed Login, try again");

      const tyCStatus = res.result.status["POLICIES"];

      dispatchUserLogin(res.result);
      await redirectBasedOnStatus(tyCStatus ?? false);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const resetPassword = async (data: {
    newPassword: string;
    token: string;
  }): Promise<void> => {
    try {
      // const res = await ResetPasswordService(data);

      // if (!res) throw new Error("Failed to Reset Password");

      dispatch(setUserStatus({ RESET_PASSWORD: true }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateUser = async (data: FormUpdateProps): Promise<void> => {
    try {
      // const res = await ResetPasswordService(data);

      // if (!res) throw new Error("Failed to Reset Password");

      const dataUserUpdate = {
        ...user,
        profile: {
          ...user?.profile,
          first_name: data.first_name,
          last_name: data.last_name,
          extended_attributes: {
            middle_name: data.middlename,
            second_last_name: data.secondlastname,
          },
          document: `${data.documenttype} - ${data.documentinfo}`,
          birth_date: data.birthDate,
          phone_number: data.phoneNumber,
        },
      };

      dispatch(userUpdate(dataUserUpdate));
      dispatch(setUserStatus({ UPDATE_INFORMATION: true }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { setDataUser, resetPassword, updateUser };
};
