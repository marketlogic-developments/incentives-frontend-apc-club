import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    getSalesByType,
    getSalesByTypeComp,
    getSalesByTypeDist,
    getSalesByTypeAll,
    getGoalsByDistri,
    getGoalsByChannel,
    getAllGoals,
} from "../../store/reducers/sales.reducer";
import TargetSales from "./GraphSales/TargetSales";
import PerformaceSales from "./GraphSales/PerformaceSales";
import axios from "axios";

const GraphSales = () => {
    const { user, token } = useSelector((state) => state.currentUser);
    const userb = useSelector((state) => state.currentUser);

    const sales = useSelector((state) => state.sales.salesbType);
    const goals = useSelector((state) => state.sales.goals);
    const dispatch = useDispatch();
    const [content, setContent] = useState(0);

    // Metas
    const [CC, setCC] = useState([]);
    const [DC, setDC] = useState([]);
    const [CCGoal, setCCGoal] = useState([]);
    const [DCGoal, setDCGoal] = useState([]);
    const [VIP_NEW_BUSINESS_CC, setVIP_NEW_BUSINESS_CC] = useState([]);
    const [VIP_NEW_BUSINESS_DC, setVIP_NEW_BUSINESS_DC] = useState([]);
    const [VMP_AUTO_RENEWAL_CC, setVMP_AUTO_RENEWAL_CC] = useState([]);
    const [VMP_AUTO_RENEWAL_DC, setVMP_AUTO_RENEWAL_DC] = useState([]);
    const [VMP_NEW_BUSINESS_CC, setVMP_NEW_BUSINESS_CC] = useState([]);
    const [VMP_NEW_BUSINESS_DC, setVMP_NEW_BUSINESS_DC] = useState([]);

    // Ventas
    const [CCSales, setCCSales] = useState([]);
    const [DCSales, setDCSales] = useState([]);
    const [CCGoalSales, setCCGoalSales] = useState([]);
    const [DCGoalSales, setDCGoalSales] = useState([]);
    const [VIP_NEW_BUSINESS_CC_SALES, setVIP_NEW_BUSINESS_CC_SALES] = useState([]);
    const [VIP_NEW_BUSINESS_DC_SALES, setVIP_NEW_BUSINESS_DC_SALES] = useState([]);
    const [VMP_AUTO_RENEWAL_CC_SALES, setVMP_AUTO_RENEWAL_CC_SALES] = useState([]);
    const [VMP_AUTO_RENEWAL_DC_SALES, setVMP_AUTO_RENEWAL_DC_SALES] = useState([]);
    const [VMP_NEW_BUSINESS_CC_SALES, setVMP_NEW_BUSINESS_CC_SALES] = useState([]);
    const [VMP_NEW_BUSINESS_DC_SALES, setVMP_NEW_BUSINESS_DC_SALES] = useState([]);

    const [t, i18n] = useTranslation("global");
    const organizatitons_id = userb.user ? userb.user.profile.organizations[0].id : undefined;

    useEffect(() => {
        // console.log(goals);
        // if (token && sales.length === 0) {
        //   if (user?.roles[0].name === "administrador") {
        //     dispatch(getSalesByTypeAll(token));
        //     dispatch(getAllGoals(token));
        //   } else if (user.company === null) {
        //     dispatch(
        //       getGoalsByDistri(token, user?.distributionChannel?.soldToParty)
        //     );
        //     dispatch(
        //       getSalesByTypeDist(token, user?.distributionChannel?.soldToParty)
        //     );
        //   } else {
        //     dispatch(getGoalsByChannel(token, user.company.resellerMasterId));
        //     dispatch(getSalesByTypeComp(token, user.company.resellerMasterId));
        //   }
        // }

        const fetchSales = async () => {
            let response = undefined;

            if (userb && token) {
                if (userb.user.is_superuser) {
                    response = await axios.get(
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

                    response = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=aacd4c7e-d8f0-4a2c-a99c-a1f189a7a576`,
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

                // Limpia el tipo (eliminar espacios y poner en minúsculas)
                const cleanType = (type) => type.trim().toLowerCase();

                // Acumuladores generales
                let totalByCategory = { CC: 0, DC: 0 };
                let totalBySubCategory = { VIP: 0, VMP: 0 };
                let totalByType = { 'New Business': 0, Autorenewal: 0 };

                // Acumuladores para combinaciones específicas
                let vipNewBusinessCC = 0;
                let vipNewBusinessDC = 0;
                let vmpAutoRenewalCC = 0;
                let vmpAutoRenewalDC = 0;
                let vmpNewBusinessCC = 0;
                let vmpNewBusinessDC = 0;

                response.data.result.forEach((item) => {
                    const category = item.category;
                    const sub = item.sub_category;
                    const type = cleanType(item.type);
                    const revenue = item.total_revenue;

                    // Totales generales
                    if (category === 'CC' || category === 'DC') {
                        totalByCategory[category] += revenue;
                    }

                    if (sub === 'VIP' || sub === 'VMP') {
                        totalBySubCategory[sub] += revenue;
                    }

                    if (type === 'new business') {
                        totalByType['New Business'] += revenue;
                    } else if (type === 'autorenewal' || type === 'autorrenewal') {
                        totalByType['Autorenewal'] += revenue;
                    }

                    // Totales específicos para los setters
                    if (sub === 'VIP' && type === 'new business') {
                        if (category === 'CC') vipNewBusinessCC += revenue;
                        if (category === 'DC') vipNewBusinessDC += revenue;
                    }

                    if (sub === 'VMP' && type === 'autorenewal') {
                        if (category === 'CC') vmpAutoRenewalCC += revenue;
                        if (category === 'DC') vmpAutoRenewalDC += revenue;
                    }

                    if (sub === 'VMP' && type === 'new business') {
                        if (category === 'CC') vmpNewBusinessCC += revenue;
                        if (category === 'DC') vmpNewBusinessDC += revenue;
                    }
                });

                // Se actualizan los estados
                setCCGoalSales(totalByCategory.CC);
                setDCGoalSales(totalByCategory.DC);
                setVIP_NEW_BUSINESS_CC_SALES(vipNewBusinessCC);
                setVIP_NEW_BUSINESS_DC_SALES(vipNewBusinessDC);
                setVMP_AUTO_RENEWAL_CC_SALES(vmpAutoRenewalCC);
                setVMP_AUTO_RENEWAL_DC_SALES(vmpAutoRenewalDC);
                setVMP_NEW_BUSINESS_CC_SALES(vmpNewBusinessCC);
                setVMP_NEW_BUSINESS_DC_SALES(vmpNewBusinessDC);

                setCC(
                    [
                        { business_unit: "Creative Cloud", business_type: "Renewal", total_sales_amount: vmpAutoRenewalCC || 0 },
                        { business_unit: "Creative Cloud", business_type: "New Business", total_sales_amount: vipNewBusinessCC || 0 },
                        { business_unit: "Creative Cloud", business_type: "New Business", total_sales_amount: vmpNewBusinessCC || 0 },
                    ].filter(({ business_unit }) => business_unit === "Creative Cloud")
                );

                setDC(
                    [
                        { business_unit: "Document Cloud", business_type: "Renewal", total_sales_amount: vmpAutoRenewalDC || 0 },
                        { business_unit: "Document Cloud", business_type: "New Business", total_sales_amount: vipNewBusinessDC || 0 },
                        { business_unit: "Document Cloud", business_type: "New Business", total_sales_amount: vmpNewBusinessDC || 0 },
                    ].filter(({ business_unit }) => business_unit === "Document Cloud")
                );
            };
        };

        const fetchData = async () => {
            if (userb && token) {
                try {
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
                    };


                    const goalsData = response_goals.data.result[0].extended_attributes

                    setCCGoal(goalsData.CC);
                    setDCGoal(goalsData.DC);
                    setVIP_NEW_BUSINESS_CC(goalsData.VIP_NEW_BUSINESS_CC);
                    setVIP_NEW_BUSINESS_DC(goalsData.VIP_NEW_BUSINESS_DC);
                    setVMP_AUTO_RENEWAL_CC(goalsData.VMP_AUTO_RENEWAL_CC);
                    setVMP_AUTO_RENEWAL_DC(goalsData.VMP_AUTO_RENEWAL_DC);
                    setVMP_NEW_BUSINESS_CC(goalsData.VMP_NEW_BUSINESS_CC);
                    setVMP_NEW_BUSINESS_DC(goalsData.VMP_NEW_BUSINESS_DC);

                    if (token && dataFromAxios.length === 0) {
                        if (userb.roleId === 1) {
                            dispatch(getSalesBySegmentAll(token));
                        }

                        if (userb.companyId === null) {
                            dispatch(
                                getSalesBySegmentDist(token, userb.distributionChannel.soldToParty)
                            );
                        } else {
                            dispatch(
                                getSalesBySegmentComp(token, userb.company.resellerMasterId)
                            );
                        }
                    }

                    setLoading(false);
                    setWait(true);
                } catch (error) {
                    console.error("Error en la consulta:", error);
                }
            }
        };

        fetchData();
        fetchSales();
    }, [token]);

    return (
        <div className="flex flex-col w-full gap-6">
            <div>
                <h2 className="text-xl font-bold">
                    {/* {user?.roles[0].name === "sales_rep"
                        ? t("dashboard.misVentas")
                        : t("dashboard.ventasOrg")} */}
                    My organization's sales
                </h2>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                <TargetSales
                    data={CC}
                    goal={VIP_NEW_BUSINESS_CC + VMP_NEW_BUSINESS_CC + VMP_AUTO_RENEWAL_CC}
                    goalNew={VIP_NEW_BUSINESS_CC + VMP_NEW_BUSINESS_CC}
                    goalRenew={VMP_AUTO_RENEWAL_CC}
                    saleNew={VIP_NEW_BUSINESS_CC_SALES + VMP_NEW_BUSINESS_CC_SALES}
                    saleRenew={VMP_AUTO_RENEWAL_CC_SALES}
                />
                <TargetSales
                    data={DC}
                    goal={VIP_NEW_BUSINESS_DC + VMP_NEW_BUSINESS_DC + VMP_AUTO_RENEWAL_DC}
                    goalNew={VIP_NEW_BUSINESS_DC + VMP_NEW_BUSINESS_DC}
                    goalRenew={VMP_AUTO_RENEWAL_DC}
                    saleNew={VIP_NEW_BUSINESS_DC_SALES + VMP_NEW_BUSINESS_DC_SALES}
                    saleRenew={VMP_AUTO_RENEWAL_DC_SALES}
                />
                <PerformaceSales
                    CC={CC}
                    DC={DC}
                    goals={goals}
                    VIP_NEW_BUSINESS_CC={VIP_NEW_BUSINESS_CC}
                    VIP_NEW_BUSINESS_DC={VIP_NEW_BUSINESS_DC}
                    VMP_AUTO_RENEWAL_CC={VMP_AUTO_RENEWAL_CC}
                    VMP_AUTO_RENEWAL_DC={VMP_AUTO_RENEWAL_DC}
                    VMP_NEW_BUSINESS_CC={VMP_NEW_BUSINESS_CC}
                    VMP_NEW_BUSINESS_DC={VMP_NEW_BUSINESS_DC}
                    VIP_NEW_BUSINESS_CC_SALES={VIP_NEW_BUSINESS_CC_SALES}
                    VIP_NEW_BUSINESS_DC_SALES={VIP_NEW_BUSINESS_DC_SALES}
                    VMP_AUTO_RENEWAL_CC_SALES={VMP_AUTO_RENEWAL_CC_SALES}
                    VMP_AUTO_RENEWAL_DC_SALES={VMP_AUTO_RENEWAL_DC_SALES}
                    VMP_NEW_BUSINESS_CC_SALES={VMP_NEW_BUSINESS_CC_SALES}
                    VMP_NEW_BUSINESS_DC_SALES={VMP_NEW_BUSINESS_DC_SALES}
                />
            </div>
        </div>
    );
};

export default GraphSales;
