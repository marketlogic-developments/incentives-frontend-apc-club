import { TitleWithIcon } from 'components';
import ButtonBgOut from 'components/buttons/ButtonBgOut';
import StackedBarChart from 'components/charts/TYC/StackedBarChart';
import { UserPerformance } from 'components/icons';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome, AiOutlineRight } from 'react-icons/ai';
import PartnerTycReport from 'screens/ReportTyC/PartnerTyC';
import PartnerTyCRU from 'screens/ReportTyC/PartnerTyCRU';

const PartnerTyc = () => {
  const [report,setReport]=useState<number>(0)
  const [t,i18n]=useTranslation("global")
  const router=useRouter()

  const TypeReport=useMemo(()=>{
    switch(report){
      case 0:
        return <PartnerTycReport/>
      case 1:
        return <PartnerTyCRU/>

      default:
        return   
    }
  },[report])

  return (
    <>
     <div className="pt-2 grid items-center grid-rows-1 gap-3">
            <TitleWithIcon icon={<UserPerformance />} title={"Partner T&C"} />
          </div>
          <div className="flex w-full items-center gap-4 pt-10 pb-2 pl-0">
            <AiOutlineHome
              className="cursor-pointer"
              onClick={() => {
                router.push("/dashboard");
              }}
            />
            <span>
              <AiOutlineRight />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => {
                router.push("/reportesDashboard");
              }}
            >
              My Reports
            </span>
            <span>
              <AiOutlineRight />
            </span>
            <span className="font-bold text-[#1473E6]">{"Partner T&C"}</span>
          </div>
    <div className="gap-2 my-3 flex justify-start">
    <ButtonBgOut
          title={"Report T&C Channels"}
          styles={`${
            !report
              ? "bg-red-100"
              : "hover:bg-red-100 hover:!text-red-500 hover:!text-sm"
          }`}
          onClick={() => setReport(0)}
        />
    <ButtonBgOut
          title={"Report T&C By Region"}
          styles={`${
            report === 1
              ? "bg-red-100"
              : "hover:bg-red-100 hover:!text-red-500 hover:!text-sm"
          }`}
          onClick={() => setReport(1)}
        />
    </div>
    {TypeReport}
    </>
    
  );
};

export default PartnerTyc;