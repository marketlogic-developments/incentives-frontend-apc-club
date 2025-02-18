import { GenericalPromise, MultipleElements } from "services/generical.service";
import { CompaReportTyCPerChannelPPPAPropsny, MedalTYCReport, RegionDataCompanyUsersTC, ReportsUsersPerfomancesTyC, ReportTyCPerChannelPPPA, ReportTyCSummaryCompanyUsers, ReportTyCSummaryMedal, ReportTyCSummaryRol, RolTYCReport } from "services/Reports/tycreports.service";

export interface PromiseMedalRol{
    users:RolTYCReport[]
    medal:MedalTYCReport[]
}

export const TyCReportsFunctions=()=>{

    const ReportUserPerfomanceTyC = async(params:string): Promise<MultipleElements<any>>=>{
        try{
            const res= await ReportsUsersPerfomancesTyC(params)

            return res
        }catch (err) {
            console.error(err);
            throw err;
          }
    }


    const ReportTyC = async(params:string): Promise<MultipleElements<CompaReportTyCPerChannelPPPAPropsny>>=>{
        try{
            const res= await ReportTyCPerChannelPPPA(params)

            return res
        }catch (err) {
            console.error(err);
            throw err;
          }
    }

    const ReportTyCCompanyUsers = async(params:string): Promise<RegionDataCompanyUsersTC[]>=>{
        try{
            const res= await ReportTyCSummaryCompanyUsers(params)

            return res
        }catch (err) {
            console.error(err);
            throw err;
          }
    }

    const ReportTyCMedalRol = async(params:string): Promise<PromiseMedalRol>=>{
        try{
            const users= await ReportTyCSummaryRol(params)
            const medal= await ReportTyCSummaryMedal(params)

            const res= {users,medal}

            console.log(res)

            return res
        }catch (err) {
            console.error(err);
            throw err;
          }
    }

    return {ReportTyC, ReportTyCCompanyUsers, ReportTyCMedalRol, ReportUserPerfomanceTyC}
}