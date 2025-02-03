import { ShoppingCarProduct } from "services/Awards/awards.service";
import { API } from "services/connectapi.service";
import { HandleError, PaginatedElements } from "services/generical.service";

export interface Order {
  order_id: string;
  stage: string;
  status: OrderStatus;
  user_id: string;
  user: UserOrder;
  products: ShoppingCarProduct[];
}

interface UserOrder {
  id: string;
  email: string;
  username: string;
}

export interface OrderStatus {
  DELIVERED: boolean;
  ON_REVIEW: boolean;
  ON_PROCESS: boolean;
  ORDER_RECIEVED: boolean;
}

export const GetAllOrders= async (params:string):Promise<PaginatedElements<Order>>=>{
    try {
        const response = await API.get<PaginatedElements<Order>>(`marketplace/orders/products/all?${params}`);
        
        console.log(response)
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