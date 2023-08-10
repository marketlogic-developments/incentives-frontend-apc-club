/**
 * Aqui van todos los encabezados para los diferentes reportes.
 */

const parseData = (data, columns) => {
  const csvContent =
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

export const userPerformanceColumnsExcel = [
  "User Name",
  "Email",
  "FirstName",
  "LastName",
  "Country",
  "Region",
  "Company Name",
  "Company Type",
  "Company Level",
  "Company Status",
  "User Role",
  "VIP Renewal CC (USD)",
  "VIP Renewal DC (USD)",
  "VIP New Business CC (USD)",
  "VIP New Business DC (USD)",
  "VMP Renewal CC (USD)",
  "VMP Renewal DC (USD)",
  "VMP New Business CC (USD)",
  "VMP New Business DC (USD)",
  "VIP Revenue Q1 (USD)",
  "VIP Revenue Q2 (USD)",
  "VIP Revenue Q3 (USD)",
  "VIP Revenue Q4 (USD)",
  "VMP Revenue Q1 (USD)",
  "VMP Revenue Q2 (USD)",
  "VMP Revenue Q3 (USD)",
  "VMP Revenue Q4 (USD)",
  "Revenue Q1 (USD)",
  "Revenue Q2 (USD)",
  "Revenue Q3 (USD)",
  "Revenue Q4 (USD)",
  "Total VIP Revenue (USD)",
  "Total VMP Revenue (USD)",
  "Actual Revenue (USD)",
  "RMA (USD)",
  "Sales DigiPoints",
  "Promotion DigiPoints",
  "Behavior DigiPoints",
  "Total DigiPoints",
  "DigiPoints Redeemed",
  "Total % effectiveness",
];

export const salesPerformanceColumnsExcel = [
  "Membership ID",
  "Company Name",
  "Region",
  "Country",
  "Company Type",
  "Company Level",
  "Company Status",
  "Company Active Users",
  "VIP Renewal CC (USD)",
  "VIP Renewal DC (USD)",
  "VIP New Business CC (USD)",
  "VIP New Business DC (USD)",
  "VMP Renewal CC (USD)",
  "VMP Renewal DC (USD)",
  "VMP New Business CC (USD)",
  "VMP New Business DC (USD)",
  "VIP Revenue Q1 (USD)",
  "VIP Revenue Q2 (USD)",
  "VIP Revenue Q3 (USD)",
  "VIP Revenue Q4 (USD)",
  "VMP Revenue Q1 (USD)",
  "VMP Revenue Q2 (USD)",
  "VMP Revenue Q3 (USD)",
  "VMP Revenue Q4 (USD)",
  "Revenue Q1 (USD)",
  "Revenue Q2 (USD)",
  "Revenue Q3 (USD)",
  "Revenue Q4 (USD)",
  "Total VIP Revenue (USD)",
  "Total VMP Revenue (USD)",
  "Actual Revenue (USD)",
  "RMA (USD)",
  "Total Revenue (USD)",
  "Expected Revenue (USD)",
  "Total % effectiveness",
];

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
  const result = parseData(data, columns);
  return result;
};

export const salesPerformanceColumnsCsv = (data)=>{
  const columns = {
    id: "Membership ID",
    company_id: "Company Name",
    company_name: "Region",
    region: "Country",
    country_id: "Company Type",
    level: "Company Level",
    active: "Company Status",
    usuarios: "Company Active Users",
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
    total_vip: "Total VIP Revenue (USD)",
    total_vmp: "Total VMP Revenue (USD)",
    rma: "RMA (USD)",
    actual_revenue: "Actual Revenue (USD)",
    total_revenue: "Total Revenue (USD)",
    expected_revenue: "Expected Revenue (USD)",
    avg_effectiveness: "Total % effectiveness",
  };

  const result = parseData(data, columns);
  return result;
}
