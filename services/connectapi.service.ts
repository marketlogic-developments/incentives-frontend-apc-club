import axios, { AxiosInstance } from "axios";
import '../envConfig'

const createInstance = (): AxiosInstance => {
    const api = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
        headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" 
        }
    });

    // Middleware para agregar el token dinámicamente
    api.interceptors.request.use(
        (config) => {
            if (typeof window !== "undefined") {
                const token = window.sessionStorage.getItem("token"); // Leer el token en cada solicitud
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return api;
};

export const API = createInstance();