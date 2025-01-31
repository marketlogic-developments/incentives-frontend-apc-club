import { API } from "services/connectapi.service";
import { HandleError } from "services/generical.service";

export const GetAllOrders= async (params:string)=>{
    try {
        const response = await API.get(`administration/organizations?id=${params}`);
        return response.data;
      } catch (err: any) {
        HandleError(err);
        throw err;
      }
}

export const GetMyOrders=async (params:string)=>{
    try {
        const response = await API.get(`administration/organizations?id=${params}`);
        return response.data;
      } catch (err: any) {
        HandleError(err);
        throw err;
      }
}