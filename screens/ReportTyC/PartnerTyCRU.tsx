import { CardChart } from "components";
import PieChart from "components/charts/TYC/PieChar";
import StackedBarChart from "components/charts/TYC/StackedBarChart";
import StackedVerticalBarChart from "components/charts/TYC/StackedVerticalBarChart";
import DataNotFound from "components/Module/404/DataNotFound";
import regionColor, { rolColor } from "functions/Internal/regionColor";
import {
  PromiseMedalRol,
  TyCReportsFunctions,
} from "functions/Reports/TyCReportsFunctions";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GenericalPromise } from "services/generical.service";
import {
  RegionDataCompanyUsersTC,
  RolTYCReport,
} from "services/Reports/tycreports.service";
import TestReport from "testing/TestingReportBarTY.json";

interface StateReport {
  yAxis: string[] | null;
  Users: any;
  Company: any;
}

interface StateReportMedalUser {
  users: {
    xAxis: string[] | null;
    Users: any;
  };
  medal: {
    valuePie: any;
    values: any;
  };
}

const PartnerTyCRU = () => {
  const [data, setData] = useState<RegionDataCompanyUsersTC[] | null>(null);
  const [dataMedalRol, setDataMedalRol] = useState<PromiseMedalRol | null>(
    null
  );
  const [report, setReport] = useState<StateReport>({
    yAxis: null,
    Users: null,
    Company: null,
  });
  const [reportMedalUser, setReportMedalUser] = useState<StateReportMedalUser>({
    users: {
      xAxis: null,
      Users: null,
    },
    medal: {
      valuePie: null,
      values: null,
    },
  });
  const [loading, setLoading] = useState({
    GraphReport: false,
    MedalRol: false,
  });
  const { ReportTyCCompanyUsers, ReportTyCMedalRol } = TyCReportsFunctions();
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

  const getDataReportMedalRol = () => {
    setLoading((prev) => ({ ...prev, MedalRol: true }));
    const { limit, page, search } = params;
    ReportTyCMedalRol(
      `page=${page}&limit=${limit}&search=${search}&search_fields=name`
    )
      .then((res) => {
        setDataMedalRol(res);
        ConfigReportMedalRol(res);
      })
      .finally(() => setLoading((prev) => ({ ...prev, MedalRol: false })));
  };

  useEffect(() => {
    getDataReportRegionTC();
    getDataReportMedalRol();
  }, [params]);

  const ConfigReport = (data: RegionDataCompanyUsersTC[]) => {
    const testDesign = TestReport.Report1;

    const arrY = data.map(({ region_name }) => region_name);

    const BarDataCompany = data.map(
      ({ total_organizations, active_organizations, region_name }) => ({
        total: active_organizations,
        totalColor: regionColor(region_name),
        expected: total_organizations,
        expectedColor: "#e6e6e6",
      })
    );

    const BarDataUser = data.map(
      ({ total_users, accept_policies_users, region_name }) => ({
        total: accept_policies_users,
        totalColor: regionColor(region_name),
        expected: total_users,
        expectedColor: "#e6e6e6",
      })
    );

    setReport({ yAxis: arrY, Users: BarDataUser, Company: BarDataCompany });
  };

  const ConfigReportMedalRol = (data: PromiseMedalRol) => {
    // Configuración para usuarios
    const arrX = data.users.map(({ rol }): string | undefined => {
      switch (rol) {
        case "sales_rep":
          return "Sales Rep";
        case "partner_admin":
          return "Partner Admin";
        case "partner_principal":
          return "Partner Principal";
        case "Total":
          return "Total";
      }
    });

    const testDesign = TestReport.Report2;

    // data.users
    const BarDataUser = data?.users.map(({ total_users, users_sign, rol }) => ({
      total: users_sign,
      totalColor: rolColor(rol),
      expected: total_users,
      expectedColor: "#e6e6e6",
    }));

    setReportMedalUser((prev) => ({
      ...prev,
      users: { Users: BarDataUser, xAxis: arrX as string[] },
    }));

    //Configuración para roles

    const valuesPieChart = data.medal.map(
      ({ distribution_channel_name }) => distribution_channel_name
    );

    const PieDataMedal = data.medal.map(
      ({
        distribution_channel_name,
        active_organizations,
        total_channels,
      }) => ({
        total: total_channels,
        value: active_organizations,
        name: distribution_channel_name,
      })
    );

    setReportMedalUser((prev) => ({
      ...prev,
      medal: { valuePie: PieDataMedal, values: valuesPieChart },
    }));
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

  const RenderGraphMedalRol = (report: any, isPie: boolean) =>
    useMemo(() => {
      if (loading.MedalRol) {
        return <div className="lds-dual-ring"></div>;
      }

      if (!dataMedalRol) {
        return <DataNotFound action={getDataReportMedalRol} />;
      }

      if (isPie) {
        return <PieChart datas={report} colors={["#FFC15E", "#4B75FF"]} />;
      }

      return (
        <StackedVerticalBarChart
          totalDatas={report}
          yNames={reportMedalUser?.users.xAxis}
        />
      );
    }, [loading.MedalRol]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <CardChart title="By Company" hfull="!w-1/2">
          {RenderGraphCompanyUsersRegion(report.Company)}
        </CardChart>
        <CardChart title="By Users" hfull="!w-1/2">
          {RenderGraphCompanyUsersRegion(report.Users)}
        </CardChart>
      </div>
      <div className="flex gap-6">
        <CardChart title="By Rol User" hfull="!w-1/2">
          {RenderGraphMedalRol(reportMedalUser.users.Users, false)}
        </CardChart>
        <CardChart title="By Channel Medal" hfull="!w-1/2">
          {RenderGraphMedalRol(reportMedalUser.medal.valuePie, true)}
        </CardChart>
      </div>
    </div>
  );
};

export default PartnerTyCRU;
