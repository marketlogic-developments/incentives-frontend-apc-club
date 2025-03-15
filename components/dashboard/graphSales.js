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
        const fetchData = async () => {
            try {
                // setWait(false);
                // setLoading(true);
                
                const obj = `administration/organizations?id=${organizatitons_id}`
                // console.log("Estamos Probando entrar");
                // console.log(user);                
                if (userb.user) {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}${obj}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*",
                                Authorization: `Bearer ${userb.token}`,
                            },
                        }
                    );
                    console.log(response);
                    
                    const data = response.data.result.goals
                    
                    // Setea el Goal partners
                    setCCGoal(data.reduce((acum, item) => {
                        acum.CC = (acum.CC || 0) + (item.extended_attributes?.CATEGORIES?.CC || 0);
                        return acum;
                    }, { CC: 0 }).CC)

                    setDCGoal(data.reduce((acum, item) => {
                        acum.DC = (acum.DC || 0) + (item.extended_attributes?.CATEGORIES?.DC || 0);
                        return acum;
                    }, { DC: 0 }).DC)

                    setVIP_NEW_BUSINESS_CC(data.reduce((acum, item) => {
                        acum.VIP_NEW_BUSINESS_CC = (acum.VIP_NEW_BUSINESS_CC || 0) + (item.extended_attributes?.CATEGORIES?.VIP_NEW_BUSINESS_CC || 0);
                        return acum;
                    }, { VIP_NEW_BUSINESS_CC: 0 }).VIP_NEW_BUSINESS_CC)

                    setVIP_NEW_BUSINESS_DC(data.reduce((acum, item) => {
                        acum.VIP_NEW_BUSINESS_DC = (acum.VIP_NEW_BUSINESS_DC || 0) + (item.extended_attributes?.CATEGORIES?.VIP_NEW_BUSINESS_DC || 0);
                        return acum;
                    }, { VIP_NEW_BUSINESS_DC: 0 }).VIP_NEW_BUSINESS_DC)

                    setVMP_AUTO_RENEWAL_CC(data.reduce((acum, item) => {
                        acum.VMP_AUTO_RENEWAL_CC = (acum.VMP_AUTO_RENEWAL_CC || 0) + (item.extended_attributes?.CATEGORIES?.VMP_AUTO_RENEWAL_CC || 0);
                        return acum;
                    }, { VMP_AUTO_RENEWAL_CC: 0 }).VMP_AUTO_RENEWAL_CC)

                    setVMP_AUTO_RENEWAL_DC(data.reduce((acum, item) => {
                        acum.VMP_AUTO_RENEWAL_DC = (acum.VMP_AUTO_RENEWAL_DC || 0) + (item.extended_attributes?.CATEGORIES?.VMP_AUTO_RENEWAL_DC || 0);
                        return acum;
                    }, { VMP_AUTO_RENEWAL_DC: 0 }).VMP_AUTO_RENEWAL_DC)

                    setVMP_NEW_BUSINESS_CC(data.reduce((acum, item) => {
                        acum.VMP_NEW_BUSINESS_CC = (acum.VMP_NEW_BUSINESS_CC || 0) + (item.extended_attributes?.CATEGORIES?.VMP_NEW_BUSINESS_CC || 0);
                        return acum;
                    }, { VMP_NEW_BUSINESS_CC: 0 }).VMP_NEW_BUSINESS_CC)

                    setVMP_NEW_BUSINESS_DC(data.reduce((acum, item) => {
                        acum.VMP_NEW_BUSINESS_DC = (acum.VMP_NEW_BUSINESS_DC || 0) + (item.extended_attributes?.CATEGORIES?.VMP_NEW_BUSINESS_DC || 0);
                        return acum;
                    }, { VMP_NEW_BUSINESS_DC: 0 }).VMP_NEW_BUSINESS_DC)

                    // console.log(CCGoal, DCGoal);
                    
                }   

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
        };

        fetchData();
    }, [token]);

    useEffect(() => {
        // console.log(goals);
        
        // Check if the sales state is an array before filtering and setting CC state
        if (Array.isArray(sales) && typeof setCC === "function") {
            setCC(
                [
                    { business_unit: "Document Cloud", total: 0 },
                    { business_unit: "Creative Cloud", total: 0 }
                ].filter(({ business_unit }) => business_unit === "Creative Cloud")
            );
        }

        // Check if the sales state is an array before filtering and setting DC state
        if (Array.isArray(sales) && typeof setDC === "function") {
            setDC(
                [
                    { business_unit: "Document Cloud", total: 0 },
                    { business_unit: "Creative Cloud", total: 0 }
                ].filter(({ business_unit }) => business_unit === "Document Cloud")
            );
        }
    }, [sales]);

    return (
        <div className="flex flex-col w-full gap-6">
            <div>
                <h2 className="text-xl font-bold">
                    {user?.roles[0].name === "sales_rep"
                        ? t("dashboard.misVentas")
                        : t("dashboard.ventasOrg")}
                </h2>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                <TargetSales
                    data={CC}
                    goal={CCGoal}
                    goalNew={goals.filter(
                        ({ business_unit, business_type }) =>
                            business_unit === "Creative Cloud" && business_type === "New Business"
                    )}
                    goalRenew={goals.filter(
                        ({ business_unit, business_type }) =>
                            business_unit === "Creative Cloud" && business_type === "Renewal"
                    )}
                />
                <TargetSales
                    data={DC}
                    goal={DCGoal}
                    goalNew={goals.filter(
                        ({ business_unit, business_type }) =>
                            business_unit === "Document Cloud" &&
                            business_type === "New Business"
                    )}
                    goalRenew={goals.filter(
                        ({ business_unit, business_type }) =>
                            business_unit === "Document Cloud" && business_type === "Renewal"
                    )}
                />
                <PerformaceSales CC={CC} DC={DC} goals={goals} VIP_NEW_BUSINESS_CC={VIP_NEW_BUSINESS_CC} VIP_NEW_BUSINESS_DC={VIP_NEW_BUSINESS_DC} VMP_AUTO_RENEWAL_CC={VMP_AUTO_RENEWAL_CC} VMP_AUTO_RENEWAL_DC={VMP_AUTO_RENEWAL_DC} VMP_NEW_BUSINESS_CC={VMP_NEW_BUSINESS_CC} VMP_NEW_BUSINESS_DC={VMP_NEW_BUSINESS_DC} />
            </div>
        </div>
    );
};

export default GraphSales;
