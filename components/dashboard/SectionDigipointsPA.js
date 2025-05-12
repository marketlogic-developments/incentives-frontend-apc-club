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
    
            let digipointByCategory = {
                Sales: 0,
                Promotion: 0,
                Behavior: 0
            };
            
            let totalPointsAssigned = 0;
            let totalPointsUploaded = 0;
            let redeemed = 0;
            
            response.data.result.forEach((item) => {
                const category = item.category;
                const points = parseInt(item.total_points ?? 0);
                const points_assigned = parseInt(item.total_points_assigned ?? 0);
            
                // Uploaded: sumar todo menos Redeemed
                if (category !== 'Redeemed') {
                    totalPointsUploaded += points;
                }
            
                // Assigned: sumar todo menos UNASSIGNED y Redeemed
                if (category !== 'Redeemed' && category !== 'UNASSIGNED') {
                    totalPointsAssigned += points_assigned;
                }
            
                // Categorías específicas para desglose visual
                if (category === 'CC' || category === 'DC') {
                    digipointByCategory.Sales += points;
                } else if (category === 'Promotion') {
                    digipointByCategory.Promotion += points;
                } else if (category === 'Behavior') {
                    digipointByCategory.Behavior += points;
                } else if (category === 'Redeemed') {
                    redeemed += points;
                }
            });
            
            // Setear los valores
            setTtotalUpload(totalPointsUploaded);        // uploaded total
            setAssignedValue(totalPointsAssigned);       // assigned total
            setRedeemedValue(redeemed);                  // redeemed total
            
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