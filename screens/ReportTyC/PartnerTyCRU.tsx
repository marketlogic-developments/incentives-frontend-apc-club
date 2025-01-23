import { CardChart } from "components";
import StackedBarChart from "components/charts/TYC/StackedBarChart";
import DataNotFound from "components/Module/404/DataNotFound";
import regionColor from "functions/Internal/regionColor";
import { TyCReportsFunctions } from "functions/Reports/TyCReportsFunctions";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GenericalPromise } from "services/generical.service";
import { RegionDataCompanyUsersTC } from "services/Reports/tycreports.service";

interface StateReport {
  yAxis: string[] | null;
  Users: any;
  Company: any;
}

const PartnerTyCRU = () => {
  const [data, setData] = useState<RegionDataCompanyUsersTC[] | null>(null);
  const [report, setReport] = useState<StateReport>({
    yAxis: null,
    Users: null,
    Company: null,
  });
  const [t, i18n] = useTranslation("global");
  const [loading, setLoading] = useState({
    GraphReport: false,
  });
  const router = useRouter();
  const { ReportTyCCompanyUsers } = TyCReportsFunctions();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const getDataReportRegionTC = () => {
    setLoading((prev) => ({ ...prev, GraphReport: true }));
    const { limit, page, search } = params;
    ReportTyCCompanyUsers(
      `page=${page}&limit=${limit}&search=${search}&search_fields=name`
    )
      .then((res) => {
        setData(res);
        ConfigReport(res);
      })
      .finally(() => setLoading((prev) => ({ ...prev, GraphReport: false })));
  };

  useEffect(() => {
    getDataReportRegionTC();
  }, [params]);

  const ConfigReport = (data: RegionDataCompanyUsersTC[]) => {
    const arrY = data.map(({ region_name }) => region_name);

    // const yAxis=[...new Set(arrY)]

    const BarDataCompany = data.map(
      ({ total_organizations, active_organizations, region_name }) => ({
        total: active_organizations,
        totalColor: regionColor(region_name),
        expected: total_organizations,
        expectedColor: "#828282",
      })
    );

    const BarDataUser = data.map(
      ({ total_users, accept_policies_users, region_name }) => ({
        total: accept_policies_users,
        totalColor: regionColor(region_name),
        expected: total_users,
        expectedColor: "#828282",
      })
    );

    setReport({ yAxis: arrY, Users: BarDataUser, Company: BarDataCompany });
  };

  const RenderGraphCompanyUsersRegion = (typeReport: any) =>
    useMemo(() => {
      if (loading.GraphReport) {
        return <div className="lds-dual-ring"></div>;
      }

      if (!data) {
        return <DataNotFound action={getDataReportRegionTC} />;
      }

      return <StackedBarChart totalDatas={typeReport} yNames={report?.yAxis} />;
    }, [loading.GraphReport]);

  return (
    <div className="flex gap-6">
      <CardChart title="Per Company" hfull="!w-1/2">
        {RenderGraphCompanyUsersRegion(report.Company)}
      </CardChart>
      <CardChart title="Per Users" hfull="!w-1/2">
        {RenderGraphCompanyUsersRegion(report.Users)}
      </CardChart>
    </div>
  );
};

export default PartnerTyCRU;
