import { API } from "services/connectapi.service";
import { HandleError, PaginatedElements } from "services/generical.service";

export interface AssingInvoice {
  id: string;
  points: number;
  point_type: string;
  rule_type: string;
  invoices: {
    assigned_type: "UNASSIGNED" | "ASSIGNED";
    sale:Sale
    product:Product
    reseller:Reseller
  };

  rule: Rule;
}

interface Sale {
  deploy_to_country: string;
  sold_to_party: string;
  disti_partner_rollup: string;
  reseller_master_rollup_id: string;
  reseller_partner_rollup: string;
  reseller_channel_program_level2: string;
  market_segment: string;
  hed_k12: string;
  end_user_name1: string;
  licensing_contract: string;
  sales_order: string;
  billing_date: string; // Representamos fechas como cadenas (ISO 8601)
  fiscal_year_and_qtr_desc: string;
  major_licensing_program_id: string;
  material_sku: string;
  product_name: string;
  prod_config: string;
  prod_config_groups: string;
  name_vs_device: string;
  vip_sku_tem: number; // Parece un entero
  total_sales_us: number; // Cantidad en dólares
  total_sales_qty: number; // Cantidad de ventas
  classifications: string;
  extended_attributes: Record<string, any>; // Para claves dinámicas en `extended_attributes`
}

interface Product {
  code: string;
  business_unit: string;
  business_unit_sub: string;
  business_type: string;
  sub_bu: string;
  sub_unit: string;
  product_category: string;
  family: string;
  description: string;
  country: string;
  product_type: string;
  extended_attributes: Record<string, any>; // Claves dinámicas para `extended_attributes`
}

interface Rule {
    id: string; // UUID en formato de cadena
    name: string;
    points: number;
    rule_type: "PER_RULE" | string; // Enum o cadena personalizada
    point_type: "RESELLERS" | string; // Enum o cadena personalizada
    status: boolean;
    rules: Record<string, any>; // Claves dinámicas para `rules`
  }

  interface Reseller {
    sales_region: string;
    state_province: string;
    country: string;
    city: string;
    account_name: string;
    account_level: string;
    membership_id: string;
    status: string;
    account_id: string;
    main_contact_type: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    anniversary_date: string; // Fecha en formato ISO 8601
    account_owner: string;
    partner_program_type: string;
    vmi_id_desktop: string;
    extended_attributes: Record<string, any>; // Claves dinámicas para `extended_attributes`
  }

export const listInvoices = async (
  params: string = ""
): Promise<PaginatedElements<AssingInvoice> | void> => {
  try {
    const response = await API.get(`organizations/adobe/partnet/connection/club/invoices/assignments/invoices_points?${params}`);
    return response.data;
  } catch (err) {
    const error = HandleError(err);
    return error;
  }
};
