import { CardChart } from 'components';
import StackedBarChart from 'components/charts/TYC/StackedBarChart';
import { TyCReportsFunctions } from 'functions/Reports/TyCReportsFunctions';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GenericalPromise } from 'services/generical.service';
import { RegionDataCompanyUsersTC } from 'services/Reports/tycreports.service';

const PartnerTyCRU = () => {
      const [data, setData] =
        useState<RegionDataCompanyUsersTC[] | null>(
          null
        );
      const [report,setReport]=useState({
        yAxis:[],
        
      })  
      const [t, i18n] = useTranslation("global");
      const [loading, setLoading] = useState(false);
      const router = useRouter();
      const { ReportTyCCompanyUsers } = TyCReportsFunctions();
      const [params, setParams] = useState({
        page: 1,
        limit: 10,
        search: "",
      });
    
      const getDataReportRegionTC = () => {
        setLoading(true);
        const { limit, page, search } = params;
        ReportTyCCompanyUsers(`page=${page}&limit=${limit}&search=${search}&search_fields=name`)
          .then((res) => {
            setData(res);
          })
          .finally(() => setLoading(false));
      };
    
      useEffect(() => {
        getDataReportRegionTC();
      }, [params]);

    



    return (
        <div className='flex gap-6'>
         <CardChart title='Per Company' hfull='!w-1/2'>
            <StackedBarChart/>
         </CardChart>
         <CardChart title='Per Company' hfull='!w-1/2'>
            <StackedBarChart/>
         </CardChart>
        </div>
        
       
    );
};

export default PartnerTyCRU;