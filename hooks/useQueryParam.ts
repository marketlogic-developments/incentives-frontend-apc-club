import { useRouter } from "next/router";

export const useQueryParam = (param: string): string | null => {
    const { query } = useRouter();
  
    const value = query[param];
  
    if (typeof value === "string") {
      return value;
    }
  
    return null; // Devuelve `undefined` si el parámetro no existe o no es un string.
  };