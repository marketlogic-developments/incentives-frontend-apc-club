import { API } from "services/connectapi.service";
import {
  GenericalPromise,
  HandleError,
  MultipleElements,
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

export const ReportTyCPerChannelPPPA = async (params: string) => {
  try {
    const response = await API.get<
      GenericalPromise<MultipleElements<CompaReportTyCPerChannelPPPAPropsny>>
    >(
      `organizations/adobe/partnet/connection/club/reports/terms_conditions?${params}`
    );
    return response.data.result; // Devuelve la respuesta de la API si todo está bien
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
