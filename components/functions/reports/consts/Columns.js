/**
 * Aqui van todos los encabezados para los diferentes reportes.
 */

import { date } from "./Headers";

const parseData = (data, columns, customHeader) => {
  const csvContent =
    customHeader.join(",") + // Agregar el encabezado personalizado
    "\n" +
    Object.keys(data[0])
      .map((key) => columns[key] || key)
      .join(",") +
    "\n" +
    data
      .map((row) =>
        Object.values(row)
          .map((value) => {
            if (typeof value === "string" && value.includes(",")) {
              return `"${value}"`;
            }
            return value;
          })
          .join(",")
      )
      .join("\n");
  return csvContent;
};

export const userPerformanceColumnsExcel = {
  employ_id: "User Name",
  email: "Email",
  name: "FirstName",
  last_name: "LastName",
  country_id: "Country",
  region: "Region",
  reseller_or_dist_name: "Company Name",
  reseller_or_dist_id: "Company Type",
  rtype: "Company Level",
  dcname: "Company Status",
  rolname: "User Role",
  vip_cc_newbusiness: "VIP Renewal CC (USD)",
  vip_cc_renewal: "VIP Renewal DC (USD)",
  vip_dc_newbusiness: "VIP New Business CC (USD)",
  vip_dc_renewal: "VIP New Business DC (USD)",
  vmp_cc_newbusiness: "VMP Renewal CC (USD)",
  vmp_cc_renewal: "VMP Renewal DC (USD)",
  vmp_dc_newbusiness: "VMP New Business CC (USD)",
  vmp_dc_renewal: "VMP New Business DC (USD)",
  vip_revenue_q1: "VIP Revenue Q1 (USD)",
  vip_revenue_q2: "VIP Revenue Q2 (USD)",
  vip_revenue_q3: "VIP Revenue Q3 (USD)",
  vip_revenue_q4: "VIP Revenue Q4 (USD)",
  vmp_revenue_q1: "VMP Revenue Q1 (USD)",
  vmp_revenue_q2: "VMP Revenue Q2 (USD)",
  vmp_revenue_q3: "VMP Revenue Q3 (USD)",
  vmp_revenue_q4: "VMP Revenue Q4 (USD)",
  revenue_q1: "Revenue Q1 (USD)",
  revenue_q2: "Revenue Q2 (USD)",
  revenue_q3: "Revenue Q3 (USD)",
  revenue_q4: "Revenue Q4 (USD)",
  vip_revenue_total: "Total VIP Revenue (USD)",
  vmp_revenue_total: "Total VMP Revenue (USD)",
  revenue_actual: "Actual Revenue (USD)",
  rma: "RMA (USD)",
  sales_digipoints: "Sales DigiPoints",
  promotion_digipoints: "Promotion DigiPoints",
  behavior_digiPoints: "Behavior DigiPoints",
  total_digipoints: "Total DigiPoints",
  redenciones: "DigiPoints Redeemed",
  avg_effectiveness: "Total % effectiveness",
};

export const salesPerformanceColumnsExcel = {
  company_id: "Membership ID",
  company_name: "Company Name",
  region: "Region",
  country_id: "Country",
  company_type: "Company Type",
  level: "Company Level",
  active: "Company Status",
  usuarios: "Company Active Users",
  vip_cc_renewal: "VIP Renewal CC (USD)",
  vip_dc_renewal: "VIP Renewal DC (USD)",
  vip_cc_newbusiness: "VIP New Business CC (USD)",
  vip_dc_newbusiness: "VIP New Business DC (USD)",
  vmp_cc_renewal: "VMP Renewal CC (USD)",
  vmp_dc_renewal: "VMP Renewal DC (USD)",
  vmp_cc_newbusiness: "VMP New Business CC (USD)",
  vmp_dc_newbusiness: "VMP New Business DC (USD)",
  vip_revenue_q1: "VIP Revenue Q1 (USD)",
  vip_revenue_q2: "VIP Revenue Q2 (USD)",
  vip_revenue_q3: "VIP Revenue Q3 (USD)",
  vip_revenue_q4: "VIP Revenue Q4 (USD)",
  vmp_revenue_q1: "VMP Revenue Q1 (USD)",
  vmp_revenue_q2: "VMP Revenue Q2 (USD)",
  vmp_revenue_q3: "VMP Revenue Q3 (USD)",
  vmp_revenue_q4: "VMP Revenue Q4 (USD)",
  revenue_q1: "Revenue Q1 (USD)",
  revenue_q2: "Revenue Q2 (USD)",
  revenue_q3: "Revenue Q3 (USD)",
  revenue_q4: "Revenue Q4 (USD)",
  total_vip: "Total VIP Revenue (USD)",
  total_vmp: "Total VMP Revenue (USD)",
  rma: "RMA (USD)",
  actual_revenue: "Actual Revenue (USD)",
  total_revenue: "Total Revenue (USD)",
  expected_revenue: "Expected Revenue (USD)",
  avg_effectiveness: "Total % effectiveness",
};

export const digiPointsPerformanceColumnsExcel = {
  company_id: "Membership ID",
  company_name: "Company Name",
  region: "Region",
  country: "Country",
  company_type: "Company Type",
  company_level: "Company Level",
  company_status: "Company Status",
  company_active_users: "Company Active Users",
  sales_digipoints_admin: "Sales DigiPoints (Admin)",
  sales_digipoints_sales_rep: "Sales DigiPoints (Sales Rep)",
  promotion_digipoints: "Promotion DigiPoints",
  behavior_digipoints: "Behavior DigiPoints",
  so_digipoints: "Total DigiPoints Uploaded",
  total_digipoints_assigned: "DigiPoints Assigned",
  digipoints_redeemed: "DigiPoints Redeemed",
  digipoints_redeemed_admin: "DigiPoints Redeemed (Admin)",
  digipoints_redeemed_sales_rep: "DigiPoints Redeemed(Sales Rep)",
  total_avg_effectiveness: "Total % effectiveness",
};

export const digipointRedemtionColumnsExcel = {
  email: "User Email",
  name: "First Name",
  role_name: "User Role",
  region: "Region",
  country: "Country",
  company_id: "Company ID",
  company_name: "Company Name",
  company_level: "Company Level",
  pp_email: "Partner Principal User Email",
  pp_tos: "Partner Principal Accepted ToS",
  ordernumber: "Request ID",
  digipoint_substract: "Redeemed DigiPoints",
  total_quantity: "Quantity",
  total_price: "Amount (USD)",
  created_at: "Redeemed On",
  status_name: "Reward Status",
};

export const invoiceColumnsExcel = {
  company_id: "Membership ID",
  company_name: "Company Name",
  partner_type: "Company Type",
  company_level: "Company Level",
  user: "User Name",
  user_rol: "User Role",
  invoice: "Invoice",
  material_sku: "Material Sku",
  licensing_contract: "Licensing Contract",
  major_licensing_program_id: "Major Licensing Programid",
  business_unit: "Business Unit",
  business_type: "Business Type",
  month: "Month",
  date: "Date",
  client: "Client",
  amount_by_user: "Revenue by user (USD)",
  digipoints_by_user: "Sales DigiPoints by user",
  puntosxpromo: "Promotions DigiPoints",
  promoname: "Promotions Name",
};

export const userPerformanceColumnsCsv = (data) => {
  const columns = {
    employ_id: "User Name",
    email: "Email",
    name: "FirstName",
    last_name: "LastName",
    country_id: "Country",
    region: "Region",
    reseller_or_dist_name: "Company Name",
    reseller_or_dist_id: "Company Type",
    rtype: "Company Level",
    dcname: "Company Status",
    rolname: "User Role",
    vip_cc_newbusiness: "VIP Renewal CC (USD)",
    vip_cc_renewal: "VIP Renewal DC (USD)",
    vip_dc_newbusiness: "VIP New Business CC (USD)",
    vip_dc_renewal: "VIP New Business DC (USD)",
    vmp_cc_newbusiness: "VMP Renewal CC (USD)",
    vmp_cc_renewal: "VMP Renewal DC (USD)",
    vmp_dc_newbusiness: "VMP New Business CC (USD)",
    vmp_dc_renewal: "VMP New Business DC (USD)",
    vip_revenue_q1: "VIP Revenue Q1 (USD)",
    vip_revenue_q2: "VIP Revenue Q2 (USD)",
    vip_revenue_q3: "VIP Revenue Q3 (USD)",
    vip_revenue_q4: "VIP Revenue Q4 (USD)",
    vmp_revenue_q1: "VMP Revenue Q1 (USD)",
    vmp_revenue_q2: "VMP Revenue Q2 (USD)",
    vmp_revenue_q3: "VMP Revenue Q3 (USD)",
    vmp_revenue_q4: "VMP Revenue Q4 (USD)",
    revenue_q1: "Revenue Q1 (USD)",
    revenue_q2: "Revenue Q2 (USD)",
    revenue_q3: "Revenue Q3 (USD)",
    revenue_q4: "Revenue Q4 (USD)",
    vip_revenue_total: "Total VIP Revenue (USD)",
    vmp_revenue_total: "Total VMP Revenue (USD)",
    revenue_actual: "Actual Revenue (USD)",
    rma: "RMA (USD)",
    sales_digipoints: "Sales DigiPoints",
    promotion_digipoints: "Promotion DigiPoints",
    behavior_digiPoints: "Behavior DigiPoints",
    total_digipoints: "Total DigiPoints",
    redenciones: "DigiPoints Redeemed",
    avg_effectiveness: "Total % effectiveness",
  };
  const customHeader = [
    "Adobe Partner Connection Club",
    "User Performance",
    date(),
  ];
  const result = parseData(data, columns, customHeader);
  return result;
};

export const digiPointsPerformanceColumnsCsv = (data) => {
  const columns = {
    company_id: "Membership ID",
    company_name: "Company Name",
    region: "Region",
    country: "Country",
    company_type: "Company Type",
    company_level: "Company Level",
    company_status: "Company Status",
    company_active_users: "Company Active Users",
    sales_digipoints_admin: "Sales DigiPoints (Admin)",
    sales_digipoints_sales_rep: "Sales DigiPoints (Sales Rep)",
    promotion_digipoints: "Promotion DigiPoints",
    behavior_digipoints: "Behavior DigiPoints",
    so_digipoints: "Total DigiPoints Uploaded",
    total_digipoints_assigned: "DigiPoints Assigned",
    digipoints_redeemed: "DigiPoints Redeemed",
    digipoints_redeemed_admin: "DigiPoints Redeemed (Admin)",
    digipoints_redeemed_sales_rep: "DigiPoints Redeemed(Sales Rep)",
    total_avg_effectiveness: "Total % effectiveness",
  };
  const customHeader = [
    "Adobe Partner Connection Club",
    "DigiPoints Performance",
    date(),
  ];
  const result = parseData(data, columns, customHeader);
  return result;
};

export const salesPerformanceColumnsCsv = (data) => {
  const columns = {
    company_id: "Membership ID",
    company_name: "Company Name",
    region: "Region",
    country_id: "Country",
    company_type: "Company Type",
    level: "Company Level",
    active: "Company Status",
    usuarios: "Company Active Users",
    vip_cc_renewal: "VIP Renewal CC (USD)",
    vip_dc_renewal: "VIP Renewal DC (USD)",
    vip_cc_newbusiness: "VIP New Business CC (USD)",
    vip_dc_newbusiness: "VIP New Business DC (USD)",
    vmp_cc_renewal: "VMP Renewal CC (USD)",
    vmp_dc_renewal: "VMP Renewal DC (USD)",
    vmp_cc_newbusiness: "VMP New Business CC (USD)",
    vmp_dc_newbusiness: "VMP New Business DC (USD)",
    vip_revenue_q1: "VIP Revenue Q1 (USD)",
    vip_revenue_q2: "VIP Revenue Q2 (USD)",
    vip_revenue_q3: "VIP Revenue Q3 (USD)",
    vip_revenue_q4: "VIP Revenue Q4 (USD)",
    vmp_revenue_q1: "VMP Revenue Q1 (USD)",
    vmp_revenue_q2: "VMP Revenue Q2 (USD)",
    vmp_revenue_q3: "VMP Revenue Q3 (USD)",
    vmp_revenue_q4: "VMP Revenue Q4 (USD)",
    revenue_q1: "Revenue Q1 (USD)",
    revenue_q2: "Revenue Q2 (USD)",
    revenue_q3: "Revenue Q3 (USD)",
    revenue_q4: "Revenue Q4 (USD)",
    total_vip: "Total VIP Revenue (USD)",
    total_vmp: "Total VMP Revenue (USD)",
    rma: "RMA (USD)",
    actual_revenue: "Actual Revenue (USD)",
    total_revenue: "Total Revenue (USD)",
    expected_revenue: "Expected Revenue (USD)",
    avg_effectiveness: "Total % effectiveness",
  };

  const customHeader = [
    "Adobe Partner Connection Club",
    "Sales Performance",
    date(),
  ];

  const result = parseData(data, columns, customHeader);
  return result;
};

export const digipointRedemtionColumnsCsv = (data) => {
  const columns = {
    email: "User Email",
    name: "First Name",
    role_name: "User Role",
    region: "Region",
    country: "Country",
    company_id: "Company ID",
    company_name: "Company Name",
    company_level: "Company Level",
    pp_email: "Partner Principal User Email",
    pp_tos: "Partner Principal Accepted ToS",
    ordernumber: "Request ID",
    digipoint_substract: "Redeemed DigiPoints",
    total_quantity: "Quantity",
    total_price: "Amount (USD)",
    created_at: "Redeemed On",
    status_name: "Reward Status",
  };

  const customHeader = [
    "Adobe Partner Connection Club",
    "DigiPoints Redemption",
    date(),
  ];

  const result = parseData(data, columns, customHeader);
  return result;
};

export const invoiceColumnsCsv = (data) => {
  const columns = {
    company_id: "Membership ID",
    company_name: "Company Name",
    partner_type: "Company Type",
    company_level: "Company Level",
    user: "User Name",
    user_rol: "User Role",
    invoice: "Invoice",
    material_sku: "Material Sku",
    licensing_contract: "Licensing Contract",
    major_licensing_program_id: "Major Licensing Programid",
    business_unit: "Business Unit",
    business_type: "Business Type",
    month: "Month",
    date: "Date",
    client: "Client",
    amount_by_user: "Revenue by user (USD)",
    digipoints_by_user: "Sales DigiPoints by user",
    puntosxpromo: "Promotions DigiPoints",
    promoname: "Promotions Name",
  };

  const customHeader = [
    "Adobe Partner Connection Club",
    "Invoice",
    date(),
  ];

  const result = parseData(data, columns, customHeader);
  return result;
};