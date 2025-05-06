import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getSalesBySegment,
    getSalesBySegmentComp,
    getSalesBySegmentDist,
    getSalesBySegmentAll,
} from "../../store/reducers/sales.reducer";
import BarBySegment from "./tableStatsElements/BarBySegment";
import Meta from "./tableStatsElements/Meta";
import RankingTable from "./tableStatsElements/RankingTable";



const TableStats = () => {
    // const token = useSelector((state) => state.user.token);
    const { user, token } = useSelector((state) => state.currentUser);
    const userb = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();
    const [totalSales, setTotalSales] = useState([]);
    const [percentageTotal, setpercentageTotal] = useState(0);
    const [goalSales, setGoalSales] = useState(0);
    const [percentageCC, setpercentageCC] = useState([]);
    const [percentageDC, setpercentageDC] = useState([]);
    const [sales, setSales] = useState(0);
    const [goal, setGoal] = useState(0);
    const [loading, setLoading] = useState(0);
    const dataFromAxios = useSelector((state) => state.sales.salesgement);
    const golprogram = useSelector((state) => state.currentUser.organizations);
    const [wait, setWait] = useState(false);
    const [topGlobalSales, setTopGlobalSales] = useState({});

    const organizatitons_id = userb.user ? userb.user.profile.organizations[0].id : null;
    

    useEffect(() => {
        console.log("Token:", token); // <-- Verifica si el token es válido
        const fetchData = async () => {
            if (userb.user && token) {
                try {
                    setWait(false);
                    setLoading(true);

                    if (userb.user) {        
                        let response_goals = undefined;
                        if (userb.user.is_superuser) {
                            response_goals = await axios.post(
                                `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=aacd4c7e-d8f0-4a2c-a99c-a1f189a7a579`,
                                {
                                    params: {
                                        region_name: null,
                                        country_name: null,
                                        organization_ids: null,
                                    },
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${userb.token}`,
                                        "Content-Type": "application/json",
                                    },
                                }
                            );
                            
                        } else {
                            response_goals = await axios.post(
                                `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=aacd4c7e-d8f0-4a2c-a99c-a1f189a7a579`,
                                {
                                    params: {
                                        organization_ids: `${organizatitons_id}`,
                                    },
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${userb.token}`,
                                        "Content-Type": "application/json",
                                    },
                                }
                            );
                        }

                        let response_sales = undefined;
                        if (userb.user.is_superuser) {
                            response_sales = await axios.get(
                                `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_without_param?id=8c6f1313-7291-4450-911c-828b7d7411f4`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${userb.token}`,
                                        "Content-Type": "application/json",
                                        "Access-Control-Allow-Origin": "*",
                                    },
                                }
                            );

                        } else {

                            response_sales = await axios.post(
                                `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=aacd4c7e-d8f0-4a2c-a99c-a1f189a7a576`,
                                {
                                    params: {
                                        id: `${organizatitons_id}`,
                                        region_name: null,
                                        country_name: null,
                                        point_type: null,
                                    },
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${userb.token}`,
                                        "Content-Type": "application/json",
                                    },
                                }
                            );
                        };

                        let response_licenses = undefined;
                        if (userb.user.is_superuser) {
                            response_licenses = await axios.get(
                                `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_without_param?id=04c31aa2-84b3-4d18-860d-21b2a42d010b`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${userb.token}`,
                                        "Content-Type": "application/json",
                                        "Access-Control-Allow-Origin": "*",
                                    },
                                }
                            );

                        } else {

                            response_licenses = await axios.post(
                                `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=ad066a3a-e7f9-4a4d-a667-813c62969fc3`,
                                {
                                    params: {
                                        id: `${organizatitons_id}`,
                                    },
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${userb.token}`,
                                        "Content-Type": "application/json",
                                    },
                                }
                            );
                        };
                        
                        let response_top_global = undefined
                        response_top_global = await axios.get(
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_without_param?id=04c31aa2-84b3-4d18-860d-21b2a42d012b&download=false`,
                            {
                                headers: {
                                    Authorization: `Bearer ${userb.token}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );

                        setTopGlobalSales(response_top_global.data.result);

                        // Acumuladores generales
                        let totalByCategory = { CC: 0, DC: 0 };

                        // Limpia el tipo (eliminar espacios y poner en minúsculas)
                        const cleanType = (type) => (type ?? '').toString().trim().toLowerCase();

                        response_sales.data.result.forEach((item) => {
                            if (!["Promotion", "BEHAVIOR"].includes(item.category)) {
                                const category = item.category;
                                const revenue = item.total_revenue;

                                // Totales generales
                                if (category === 'CC' || category === 'DC') {
                                    totalByCategory[category] += revenue;
                                };
                            };
                        });

                        const totalGoals = response_goals.data.result[0].extended_attributes?.CC + response_goals.data.result[0].extended_attributes?.DC

                        setGoal(totalGoals);
                        setSales((totalByCategory.CC) + (totalByCategory.DC));
                        setGoalSales((totalByCategory.CC) + (totalByCategory.DC));
                        setpercentageTotal(
                            Math.floor((((totalByCategory.CC + totalByCategory.DC) * 100) / totalGoals) * 100) / 100
                        );
                        
                        const data_licenses = response_licenses.data.result
                        const ccData = data_licenses.filter((item) => item.business_unit === "Creative Cloud");
                        const dcData = data_licenses.filter((item) => item.business_unit === "Document Cloud");

                        const totalCC = ccData.reduce((acc, curr) => acc + curr.total_sales_us, 0);
                        const totalDC = dcData.reduce((acc, curr) => acc + curr.total_sales_us, 0);

                        const newPercentageCC = ccData.map((item) => {
                            const share = totalCC > 0 ? (item.total_sales_us / totalCC) * 100 : 0;
                            return {
                                typeCC: item.sub_bu,
                                sales: item.total_sales_us,
                                tablePercentage: Math.floor(share * 100) / 100
                            };
                        });
                        
                        const newPercentageDC = dcData.map((item) => {
                            const share = totalDC > 0 ? (item.total_sales_us / totalDC) * 100 : 0;
                            return {
                                typeDC: item.sub_bu,
                                sales: item.total_sales_us,
                                tablePercentage: Math.floor(share * 100) / 100
                            };
                        });                        

                        setpercentageCC(newPercentageCC);
                        setpercentageDC(newPercentageDC);
                    };

                    if (token && dataFromAxios.length === 0) {
                        if (user.roleId === 1) {
                            dispatch(getSalesBySegmentAll(token));
                        }

                        if (user.companyId === null) {
                            dispatch(
                                getSalesBySegmentDist(token, user.distributionChannel.soldToParty)
                            );
                        } else {
                            dispatch(
                                getSalesBySegmentComp(token, user.company.resellerMasterId)
                            );
                        };
                    };

                    setLoading(false);
                    setWait(true);
                } catch (error) {
                    console.error("Error en la consulta:", error);
                };
            }
        };

        fetchData();
    }, [token, user]);

    function formatNumber(number) {
        if (number >= 1000000) {
            const millionValue = (number / 1000000).toString();
            return millionValue.includes(".")
                ? millionValue.slice(0, millionValue.indexOf(".") + 3) + "M"
                : millionValue + "M";
        } else if (number >= 1000) {
            const thousandValue = (number / 1000).toString();
            return thousandValue.includes(".")
                ? thousandValue.slice(0, thousandValue.indexOf(".") + 3) + "K"
                : thousandValue + "K";
        } else {
            return number
        }
    }

    return (
        <div className="w-full h-full bg-base-100 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            <BarBySegment
                percentageCC={percentageCC}
                percentageDC={percentageDC}
                formatNumber={formatNumber}
            />
            <Meta
                user={user}
                formatNumber={formatNumber}
                goal={goal}
                percentageTotal={percentageTotal}
                sales={sales}
            />
            <RankingTable top_sales={topGlobalSales}/>
        </div>
    );
};

export default TableStats;