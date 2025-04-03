import { API } from "services/connectapi.service";
import {
    GenericalPromise,
    HandleError,
    PaginatedElements,
} from "services/generical.service";

interface Region {
    id: string;
    name: string;
    status: boolean;
}

interface Country {
    id: string;
    name: string;
    status: boolean;
    region: Region;
}

interface Supplier {
    name: string;
    code: string;
    countries: Country[];
}

interface Category {
    name: string;
}

export interface Award {
    id: string;
    name: string;
    price: string;
    image: string;
    status: boolean;
    category: Category;
    supplier: Supplier;
    value: string;
}

export interface ShoppingCarProduct extends Award {
    quantity: number;
    product_id: string;
}

export interface OrderListProduct extends ShoppingCarProduct {
    supplier_name: string;
    supplier_id: string;
}

export interface ShoppingCar {
    order_id: string;
    products: ShoppingCarProduct[];
}

export interface ProductSend {
    product_id: string;
    operation?: "SUM" | "REDUCE";
    quantity?: number;
}

export const listAwards = async (params: string) => {
    try {
        const response = await API.get<PaginatedElements<Award>>(
            `marketplace/products?${params}`
        );
        return response.data.result; // Devuelve la respuesta de la API si todo está bien
    } catch (err: any) {
        HandleError(err);
        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};


export const listSuppliers = async (user_id: string) => {
    try {
        const response = await API.post<any>(
            `administration/queries_storage/run_query_with_param?id=aacd4c7e-d8f0-4a2c-a99c-a1f189a7a577`,
            {
                params: {
                    id: `${user_id}`,
                },
            },
        );
        return response.data.result;
    } catch (err: any) {
        HandleError(err);
        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};

export const postProduct = async (data: ProductSend) => {
    try {
        const response = await API.post<GenericalPromise<ProductSend>>(
            `marketplace/orders/add_products`,
            data
        );
        console.log(response);
        return response.data.result; // Devuelve la respuesta de la API si todo está bien
    } catch (err: any) {
        HandleError(err);
        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};

export const deleteProduct = async (product_id: string) => {
    try {
        const response = await API.delete<GenericalPromise<Award>>(
            `marketplace/orders/remove_products?product_id=${product_id}`
        );
        return response.data.result; // Devuelve la respuesta de la API si todo está bien
    } catch (err: any) {
        HandleError(err);
        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};

export const sendOrder = async (order_id: string) => {
    try {
        const response = await API.post<GenericalPromise<any>>(
            `marketplace/orders/orders_advance?order_id=${order_id}`
        );
        return response.data.result; // Devuelve la respuesta de la API si todo está bien
    } catch (err: any) {
        HandleError(err);
        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};

export const getShoppingCar = async () => {
    try {
        const response = await API.get<GenericalPromise<ShoppingCar>>(
            `marketplace/orders/products`
        );
        return response.data.result; // Devuelve la respuesta de la API si todo está bien
    } catch (err: any) {
        if (err.response.data.detail.code === 404) {

        } else {
            HandleError(err);
        }

        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};
