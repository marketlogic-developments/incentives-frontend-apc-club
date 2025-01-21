import { ReportTyCPerChannelPPPA } from "services/Reports/tycreports.service";

export const TyCReportsFunctions=()=>{

    const ReportTyC = async(params:string)=>{
        try{
            const res= await ReportTyCPerChannelPPPA(params)

            return res
        }catch (err) {
            console.error(err);
            throw err;
          }
    }

    return {ReportTyC}
}