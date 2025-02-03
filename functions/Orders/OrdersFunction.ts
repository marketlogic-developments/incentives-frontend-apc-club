import React from 'react';
import { MultipleElements } from 'services/generical.service';
import { GetAllOrders, Order } from 'services/Orders/orders.service';

const OrdersFunction = () => {
    const getAllOrder= async (params:string):Promise<MultipleElements<Order>>=>{
        try{
            const res= await GetAllOrders(params)

            return res.result
        }catch (err) {
            console.error(err);
            throw err;
          }
    }

    return {getAllOrder}
}

export default OrdersFunction;