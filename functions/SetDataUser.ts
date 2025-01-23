import { useCustomNavigation } from "hooks/useCustomNavigation";
import {
  CurrentUser,
  getCurrentUser,
  getOneUser,
  SwitchUser,
  UpdateUser,
} from "services/User/user.service";
import CurrentUserTest from "../testing/CurrentUserTest.json";
import { ResetPasswordService } from "services/Login/login.service";
import { useDispatch, useSelector } from "react-redux";
import { setUserStatus, userUpdate } from "store/reducers/currentUser.reducer";
import { RootState } from "store/store";
import Cookies from "js-cookie";

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
      const prevSession=Cookies.get("prevSession")
      const res = await getCurrentUser(); // O CurrentUserTest para pruebas
      // const res = { result: CurrentUserTest }; // O CurrentUserTest para pruebas
      if (!res) throw new Error("Failed Login, try again");

      const tyCStatus = res.result.status["POLICIES"];

      dispatchUserLogin(res.result);
      await redirectBasedOnStatus(prevSession || !user?.is_superuser ? true : tyCStatus ?? false);
     
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const resetPassword = async (password:string): Promise<void> => {
    try {
      const passwordSend={
        password: password,
        password_repeat: password,
      }

      const res = await ResetPasswordService(passwordSend);

      if (!res) throw new Error("Failed to Reset Password");

      dispatch(setUserStatus({ RESET_PASSWORD: true }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateUser = async (data: FormUpdateProps): Promise<void> => {
    try {
      if (!user) throw new Error("Failed to updateUser");

      const {roles, token,...userModified}= user
      const dataUserUpdate = {
        ...userModified,
        status:{
        ...userModified.status,
        UPDATE_INFORMATION: true
        },
        profile: {
          first_name: data.first_name,
          last_name: data.last_name,
          extended_attributes: {
            middle_name: data.middlename,
            second_last_name: data.secondlastname,
          },
          document_type:data.documenttype,
          document: data.documentinfo,
          birth_date: data.birthDate,
          phone_number: data.phoneNumber,
          languaje_id: data.languageId
        },
      };

      const res = await UpdateUser(dataUserUpdate, user?.id as string);

      if (!res) throw new Error("Failed to updateUser");

      

      // dispatch(userUpdate(dataUserUpdate));
      setDataUser()
      dispatch(setUserStatus({ UPDATE_INFORMATION: true }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const switchUser= async (email:string): Promise<void> =>{
    try{
      const res = await SwitchUser(email); // O CurrentUserTest para pruebas
      // const res = { result: CurrentUserTest }; // O CurrentUserTest para pruebas
      if (!res) throw new Error("Failed Login, try again");

      // const res = await getOneUser(res1.result.id);

      // if (!res) throw new Error("Failed Login, try again");
      Cookies.set("prevSession",user?.token as string)
      sessionStorage.removeItem("token")
      sessionStorage.setItem("token", res.result.token)
    }catch (err) {
      console.error(err);
      throw err;
    }
  }

  return { setDataUser, resetPassword, updateUser,switchUser };
};
