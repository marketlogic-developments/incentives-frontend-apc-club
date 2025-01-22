import { GenericalPromise, MultipleElements } from "services/generical.service";
import { CompaReportTyCPerChannelPPPAPropsny, RegionDataCompanyUsersTC, ReportTyCPerChannelPPPA, ReportTyCSummaryCompanyUsers } from "services/Reports/tycreports.service";

export const TyCReportsFunctions=()=>{

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

    return {ReportTyC, ReportTyCCompanyUsers}
}