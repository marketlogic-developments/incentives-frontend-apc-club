import { API } from "services/connectapi.service";
import { HandleError, PaginatedElements } from "services/generical.service";

export interface Order{

}

export const GetAllOrders= async (params:string):Promise<PaginatedElements<Order>>=>{
    try {
        const response = await API.get<PaginatedElements<Order>>(`marketplace/orders/products/all?${params}`);
        
        return response.data;
      } catch (err: any) {
        HandleError(err);
        throw err;
      }
}

export const GetMyOrders=async (params:string)=>{
    try {
        const response = await API.get(`marketplace/orders/products/all?${params}`);
        return response.data;
      } catch (err: any) {
        HandleError(err);
        throw err;
      }
}