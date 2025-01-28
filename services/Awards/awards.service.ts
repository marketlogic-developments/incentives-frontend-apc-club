import { API } from "services/connectapi.service";
import { HandleError, PaginatedElements } from "services/generical.service";

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
  price: number;
  image: string;
  status: boolean;
  category: Category;
  supplier: Supplier;
}

export interface ProductSend {
  product_id: "0d012afa-f885-4e65-aeca-37e27701e2d1";
  operation?: "SUM" | "REDUCE";
  quantity?: 1;
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

export const postProduct = async (data: ProductSend) => {
  try {
    const response = await API.post<PaginatedElements<Award>>(
      `marketplace/products`,
      data
    );
    return response.data.result; // Devuelve la respuesta de la API si todo está bien
  } catch (err: any) {
    HandleError(err);
    throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
  }
};
export const deleteProduct = async (params: string) => {
  try {
    const response = await API.delete<PaginatedElements<Award>>(
      `marketplace/products?${params}`
    );
    return response.data.result; // Devuelve la respuesta de la API si todo está bien
  } catch (err: any) {
    HandleError(err);
    throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
  }
};

export const sendOrder = async (params: string) => {
  try {
    const response = await API.post<PaginatedElements<Award>>(
      `marketplace/products?${params}`
    );
    return response.data.result; // Devuelve la respuesta de la API si todo está bien
  } catch (err: any) {
    HandleError(err);
    throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
  }
};
