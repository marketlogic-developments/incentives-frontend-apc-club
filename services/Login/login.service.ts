import { API } from "services/connectapi.service";
import { GenericalPromise } from "services/generical.service";

export interface UserLogIn {    
    email: string;
    password: string;
}

export interface ResponseLogin{
    type:string;
    token: string;
    refresh_token: string;
}

export const LoginFunc = async (postData: UserLogIn): Promise<GenericalPromise<ResponseLogin> | null> => {
    try {
      const response = await API.post<GenericalPromise<ResponseLogin>>("authentication/login", postData);
      return response.data; // Devuelve la respuesta de la API si todo está bien
    } catch (err) {
      console.error("Error en la autenticación:", err);
      return null; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
  };