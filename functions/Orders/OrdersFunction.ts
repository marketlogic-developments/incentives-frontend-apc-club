import React from 'react';
import { GetAllOrders } from 'services/Orders/orders.service';

const OrdersFunction = () => {
    const getAllOrder= async (params:string):Promise<any>=>{
        try{

        }catch (err) {
            console.error(err);
            throw err;
          }
        const res= await GetAllOrders(params)
    }

    return {getAllOrder}
}

export default OrdersFunction;