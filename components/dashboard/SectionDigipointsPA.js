import React, { useEffect, useState } from "react";
import DigiPointsTotal from "../reports/summary/DigipointsPerformance/DigiPointsTotal";
import CardChart from "../cardReportes/CardChart";
import { useDispatch, useSelector } from "react-redux";
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
                response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=8c6f1313-7291-4450-911c-828b7d7411f5`,
                    {},
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
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/queries_storage/run_query_with_param?id=8c6f1313-7291-4450-911c-828b7d7411f5`,
                    {
                        params: {
                            organization_name: `${user.profile.organizations[0].name}`,
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

            let digipointByCategory = {
                Sales: 0,
                Promotion: 0,
                Behavior: 0
            };

            let totalPointsAssigned = 0;
            let totalPointsUploaded = 0;
            let redeemed = 0;

            // <-- CAMBIO CLAVE: categorías válidas -->
            const validCats = new Set([
                "10% ASSIGNMENT",
                "Promotion",
                "BEHAVIOR",
                "Behavior",
                "CC",
                "DC",
                "Certified points assigned",
            ]);

            response.data.result.forEach((item) => {
                const category = item.category;
                const points = parseFloat(item.total_points ?? 0);
                const points_assigned = parseFloat(item.total_points_assigned ?? 0);
                const tenPercent     = parseFloat(item.ten_percent_points_assigned ?? 0);

                // Uploaded: sumar solo categorías válidas
                if (validCats.has(category)) {
                    totalPointsUploaded += points;
                    totalPointsAssigned += points_assigned;
                }

                // sumar SIEMPRE el 10 %
                totalPointsAssigned += tenPercent;

                // Redimidos
                if (category === 'Redeemed') {
                    redeemed += points;
                }

                // Categorías específicas para desglose visual
                if (category === 'CC' || category === 'DC' || category === 'Certified points assigned' || category === '10% ASSIGNMENT') {
                    digipointByCategory.Sales += points;
                } else if (category === 'Promotion') {
                    digipointByCategory.Promotion += points;
                } else if (category === 'Behavior') {
                    digipointByCategory.Behavior += points;
                }
            });

            setTtotalUpload(Math.round(totalPointsUploaded));
            setAssignedValue(Math.round(totalPointsAssigned));
            setRedeemedValue(Math.round(redeemed));

            setDigipointUploaded([
                { name: "Sales", value: digipointByCategory.Sales },
                { name: "Promotion", value: digipointByCategory.Promotion },
                { name: "Behavior", value: digipointByCategory.Behavior }
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
                                left: "70%",
                                orient: "vertical",
                                itemWidth: 14,
                                itemHeight: 14,
                                textStyle: { fontSize: 12 },
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