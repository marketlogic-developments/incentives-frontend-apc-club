import { API } from "services/connectapi.service";
import {
    GenericalPromise,
    HandleError,
    MultipleElements,
    PaginatedElements,
} from "services/generical.service";

interface OrganizationCodeReport {
    id: string;
    code: string;
    status: boolean;
}

interface DistributionChannelReport {
    id: string;
    name: string;
}

interface Country {
    id: string;
    name: string;
    status: boolean;
    region: Region;
}

interface Region {
    id: string;
    name: string;
    status: boolean;
}

export interface CompaReportTyCPerChannelPPPAPropsny {
    id: string;
    name: string;
    phone_number: string;
    representative_email: string;
    representative_first_name: string;
    representative_last_name: string;
    address: string;
    fiscal_period_year: string;
    status: boolean;
    goals: any[]; // Se puede ajustar según el tipo de "goals"
    distribution_channel: DistributionChannelReport;
    country: Country;
    organization_codes: OrganizationCodeReport[];
    has_partner_admin_policies: boolean;
    has_partner_principal_policies: boolean;
    is_fully_accepted: boolean;
}

export interface RegionDataCompanyUsersTC {
    region_name: string; // Nombre de la región
    channels_levels: string; // Nivel del canal (por ejemplo, DISTRIBUTORS)
    total_organizations: number; // Total de organizaciones
    total_users: number; // Total de usuarios
    accept_policies_users: number; // Usuarios que han aceptado políticas
    active_organizations: number; // Total de organizaciones activas
}

export interface RolTYCReport {
    rol: string;
    total_users: number;
    users_sign: number;
}

export interface MedalTYCReport {
    active_organizations: number;
    distribution_channel_name: string;
    total_channels: number;
}

export const ReportTyCPerChannelPPPA = async (params: string) => {
    try {
        const response = await API.get<
            PaginatedElements<CompaReportTyCPerChannelPPPAPropsny>>
            (
                `organizations/adobe/partnet/connection/club/reports/terms_conditions?${params}`
            );
        return response.data.result; // Devuelve la respuesta de la API si todo está bien
    } catch (err: any) {
        HandleError(err);
        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};



export const ReportsProductsParticipating = async (params: string) => {
    try {
        const response = await API.get<
            PaginatedElements<any>>
            (
                `organizations/adobe/partnet/connection/club/reports/participating_products?${params}`
            );
        return response.data.result; // Devuelve la respuesta de la API si todo está bien
    } catch (err: any) {
        HandleError(err);
        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};


export const ReportsUsersPerfomancesTyC = async (params: string) => {
    try {
        const response = await API.get<
            PaginatedElements<any>>
            (
                `organizations/adobe/partnet/connection/club/reports/users_performances/terms_conditions_users?${params}`
            );
        return response.data.result; // Devuelve la respuesta de la API si todo está bien
    } catch (err: any) {
        HandleError(err);
        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};



export const ReportsOrganizationsTyCDownload = async () => {
    try {
        const response = await API.get(
            `organizations/adobe/partnet/connection/club/reports/terms_conditions/organizations/download`,
            {
                responseType: "blob",
            }
        );
        // Crear una URL del archivo descargado
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");

        // Configurar el enlace para descargar el archivo
        link.href = url;
        link.setAttribute("download", "organizations_terms_conditions.xlsx"); // Nombre del archivo
        document.body.appendChild(link);
        link.click();

        // Limpiar la URL creada
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);

        return response.data.result;

    } catch (err: any) {
        HandleError(err);
        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};



export const InvoiceReportsDownload = async () => {
    // try {
    //     const response = await API.get(
    //         `administration/queries_storage/run_query_without_param?id=04c31aa2-84b3-4d18-860d-21b2a42d011b&download=true&name=invoice_report`,
    //         {
    //             responseType: "blob",
    //         }
    //     );
    //     // Crear una URL del archivo descargado
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement("a");

    //     // Configurar el enlace para descargar el archivo
    //     link.href = url;

    //     // Nombre del archivo
    //     link.setAttribute("download", "invoice_report.xlsx");
    //     document.body.appendChild(link);
    //     link.click();

    //     // Limpiar la URL creada
    //     link.parentNode?.removeChild(link);
    //     window.URL.revokeObjectURL(url);

    //     return response.data.result;

    // } catch (err) {
    //     HandleError(err);
    //     // Retorna `null` en caso de error, lo cual puede ser 
    //     // manejado en el componente que llama esta función
    //     throw err;
    // };
};



export const ReportsUsersPerfomancesTyCDownload = async () => {
    try {
        const response = await API.get(
            `organizations/adobe/partnet/connection/club/reports/terms_conditions/download`,
            {
                responseType: "blob",
            }
        );
        // Crear una URL del archivo descargado
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");

        // Configurar el enlace para descargar el archivo
        link.href = url;
        link.setAttribute("download", "users_terms_conditions.xlsx"); // Nombre del archivo
        document.body.appendChild(link);
        link.click();

        // Limpiar la URL creada
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);

        return response.data.result;

    } catch (err: any) {
        HandleError(err);
        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};


export const ReportTyCSummaryCompanyUsers = async (params: string) => {
    try {
        const response = await API.get<
            GenericalPromise<RegionDataCompanyUsersTC[]>
        >(
            `organizations/adobe/partnet/connection/club/reports/terms_conditions/summary?${params}`
        );
        return response.data.result; // Devuelve la respuesta de la API si todo está bien
    } catch (err: any) {
        HandleError(err);
        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};


export const ReportTyCSummaryRol = async (params: string) => {
    try {
        const response = await API.get<GenericalPromise<RolTYCReport[]>>(
            `organizations/adobe/partnet/connection/club/reports/terms_conditions/summary/users_roles?${params}`
        );
        console.log(response);
        return response.data.result; // Devuelve la respuesta de la API si todo está bien
    } catch (err: any) {
        HandleError(err);
        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};


export const ReportTyCSummaryMedal = async (params: string) => {
    try {
        const response = await API.get<GenericalPromise<MedalTYCReport[]>>(
            `organizations/adobe/partnet/connection/club/reports/terms_conditions/summary/distributions_channels?${params}`
        );
        console.log(response);
        return response.data.result; // Devuelve la respuesta de la API si todo está bien
    } catch (err: any) {
        HandleError(err);
        throw err; // Retorna `null` en caso de error, lo cual puede ser manejado en el componente que llama esta función
    }
};