import { API } from "services/connectapi.service";
import { GenericalPromise, HandleError } from "services/generical.service";

interface UserLogIn {
  email: string;
  password: string;
}

export interface ResponseLogin {
  type: string;
  token: string;
  refresh_token: string;
}

interface ResetPassword {
  password: string,
  password_repeat: string
}

interface RequestPassword {
  email: string;
  lang: string;
}

export const LoginFunc = async (
  postData: UserLogIn
): Promise<GenericalPromise<ResponseLogin> | void> => {
  try {
    const response = await API.post<GenericalPromise<ResponseLogin>>(
      "authentication/login",
      postData
    );
    return response.data; // Devuelve la respuesta de la API si todo está bien
  } catch (err: any) {
    HandleError(err);
    throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
  }
};

export const ResetPasswordService = async (
  newPassword: ResetPassword
): Promise<GenericalPromise<any> | void> => {
  try {
    const response = await API.put<GenericalPromise<any>>(
      "administration/users/change/password",
      newPassword
    );
    return response.data;
  } catch (err: any) {
    HandleError(err);
    throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
  }
};

export const RequestNewPasswordService = async (
  postData: RequestPassword
): Promise<GenericalPromise<any> | void> => {
  try {
    const response = await API.post<GenericalPromise<any>>(
      "auth/recovery",
      postData
    );
    return response.data;
  } catch (err: any) {
    HandleError(err);
    throw err;
  }
};
