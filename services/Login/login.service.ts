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
  token: string | null;
  newPassword: string;
}

interface RequestPassword {
  email: string;
  lang: string;
}

export const LoginFunc = async (
  postData: UserLogIn
): Promise<GenericalPromise<ResponseLogin> | null> => {
  try {
    const response = await API.post<GenericalPromise<ResponseLogin>>(
      "authentication/login",
      postData
    );
    return response.data; // Devuelve la respuesta de la API si todo está bien
  } catch (err: any) {
    console.error("Error en la autenticación:", err);
    const error = HandleError(err);
    return error; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
  }
};

export const ResetPasswordService = async (
  newPassword: ResetPassword
): Promise<GenericalPromise<any> | null> => {
  try {
    const response = await API.post<GenericalPromise<any>>(
      "/auth/change-password",
      newPassword
    );
    return response.data;
  } catch (err: any) {
    console.error("Error al cambiar la contraseña:", err);
    const { code, message } = err?.response.detail;

    return null; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
  }
};

export const RequestNewPasswordService = async (
  postData: RequestPassword
): Promise<GenericalPromise<any> | null> => {
  try {
    const response = await API.post<GenericalPromise<any>>(
      "auth/recovery",
      postData
    );
    return response.data;
  } catch (err: any) {
    console.error("Error en la autenticación:", err);

    const error = HandleError(err);
    return error;
  }
};
