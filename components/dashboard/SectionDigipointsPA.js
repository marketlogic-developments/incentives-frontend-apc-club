import React, { useEffect, useState } from "react";
import DigiPointsTotal from "../reports/summary/DigipointsPerformance/DigiPointsTotal";
import CardChart from "../cardReportes/CardChart";
import { useDispatch, useSelector } from "react-redux";
import { getDigiPointPerformance } from "../../store/reducers/sales.reducer";
import { useTranslation } from "react-i18next";
import DigiPointsTotalD from "./DigiPointsSections/DigiPointsTotalD";
import PieChart from "../charts/PieChart";
import axios from "axios";


const SectionDigipointsPA = () => {
    const dispatch = useDispatch();
    const [t, i18n] = useTranslation("global");
    const { token, user } = useSelector((state) => state.currentUser);
    const [digipointUploaded, setDigipointUploaded] = useState([]);
    const [digipointSR, setDigipointSR] = useState({
        datas: {},
        yNames: [],
    });
    const [digipointsRA, setDigipointRA] = useState({
        datas: [],
    });
    const [isDataReady, setIsReady] = useState(true);
    const [filters, setFilters] = useState({
        year: "2024",
        company_name:
            user?.company?.name !== "MarketLogic"
                ? encodeURIComponent(user?.company?.name)
                : "",
        region: "",
        country: "",
    });
    const [totalUpload, setTtotalUpload] = useState(0);
    const [assignedValue, setAssignedValue] = useState(0);
    const [redeemedValue, setRedeemedValue] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            let response = undefined;
            if (user.is_superuser) {
                response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_without_param?id=04c31aa2-84b3-4d18-860d-21b2a42d099b`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
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
                            id: `${user.profile.organizations[0].id}`,
                            region_name: null,
                            country_name: null,
                            point_type: null,
                        },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
            }
    
            let totalPointsByCategory = { CC: 0, DC: 0 };
            let totalPointsAssignedByCategory = { CC: 0, DC: 0 };
            let totalPointsAssignedByPartnerAdmin = { CC: 0, DC: 0 };
            let promotionPoints = 0;
            let behaviorPoints = 0;
            let redeemed = 0;
    
            response.data.result.forEach((item) => {
                const category = item.category;
                const points = parseInt(item.total_points ?? 0);
                const points_assigned = parseInt(item.total_points_assigned ?? 0);
                const percent_points_assigned = parseInt(item.ten_percent_points_assigned ?? 0);
    
                if (category === 'CC' || category === 'DC') {
                    totalPointsByCategory[category] += points;
                    totalPointsAssignedByCategory[category] += points_assigned;
                    totalPointsAssignedByPartnerAdmin[category] += percent_points_assigned;
                } else if (category === 'Promotion') {
                    promotionPoints += points;
                } else if (category === 'Behavior') {
                    behaviorPoints += points;
                } else if (category === 'Redeemed') {
                    redeemed += points;
                }
            });
    
            const totalSales =
                totalPointsByCategory.CC + totalPointsByCategory.DC +
                totalPointsAssignedByPartnerAdmin.CC + totalPointsAssignedByPartnerAdmin.DC;
    
            const totalAssigned =
                totalPointsAssignedByCategory.CC + totalPointsAssignedByCategory.DC +
                totalPointsAssignedByPartnerAdmin.CC + totalPointsAssignedByPartnerAdmin.DC;
    
            setTtotalUpload(totalSales + promotionPoints + behaviorPoints);
            setAssignedValue(totalAssigned);
            setRedeemedValue(redeemed);
    
            setDigipointUploaded([
                {
                    value: totalSales,
                    name: "Sales"
                },
                {
                    value: promotionPoints,
                    name: "Promotion"
                },
                {
                    value: behaviorPoints,
                    name: "Behavior"
                },
                // {
                //     value: redeemedValue,
                //     name: "Redeemed"
                // }
            ]);
        };
    
        fetchData();
    }, [user, filters]);

    return (
        <div className="w-full flex gap-6">
            <div className="w-1/2 card bg-base-100 shadow-md ">
                <DigiPointsTotalD
                    dataLoaded={true}
                    totalSaleGoal={{
                        expected: totalUpload || 0,
                        reached: assignedValue || 0,
                        progress: redeemedValue || 0,
                    }}
                />
            </div>

            <div className="w-1/2 h-auto flex">
                <CardChart title={"DigiPoints Uploaded YTD"} paragraph="">
                    {isDataReady ? (
                        <PieChart
                            datas={digipointUploaded}
                            colors={["#21A5A2", "#009C3B", "#1473E6"]}
                            formatter=""
                            legend={{
                                top: "center",
                                left: "70%", // Mueve la leyenda un poco más hacia el centro
                                orient: "vertical",
                                itemWidth: 14, // Ajusta el ancho del cuadrado de color de la leyenda
                                itemHeight: 14, // Ajusta la altura del cuadrado de color de la leyenda
                                textStyle: {
                                    fontSize: 12, // Tamaño de la fuente para la leyenda
                                },
                            }}
                            center={["40%", "60%"]}
                        />
                    ) : (
                        <div className="lds-dual-ring my-auto"></div>
                    )}
                </CardChart>
            </div>
        </div>
    );
};

export default SectionDigipointsPA;
