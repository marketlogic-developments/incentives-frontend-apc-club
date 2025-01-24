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
    id:string
    name: string;
    price: number;
    image: string;
    status: boolean;
    category: Category;
    supplier: Supplier;
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