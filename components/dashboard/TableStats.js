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
    const organizatitons_id = userb.user ? userb.user.profile.organizations[0].id : undefined;

    useEffect(() => {
        console.log("Token:", token); // <-- Verifica si el token es válido
        const fetchData = async () => {
            if (userb.user && token) {
                try {
                    setWait(false);
                    setLoading(true);
                    let page = 1;
                    let totalPages = 1; // Asumimos que hay al menos una página
                    let allGoals = []; // Array para acumular todos los goals
                    let totalGeneral = undefined;

                    if (userb.user) {
                        if (userb.user.is_superuser) {
                            while (page <= totalPages && userb.user.is_superuser) {
                                const obj = `administration/organizations?page=${page}&limit=100`;

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

                                const filteredContent = response.data.result.content.filter(
                                    org => org.distribution_channel &&
                                        (org.distribution_channel.name === "GOLD" || org.distribution_channel.name === "PLATINUM")
                                );


                                // Obtener los goals de la página actual
                                const goals = filteredContent.flatMap(org => org.goals);
                                allGoals = allGoals.concat(goals); // Concatenar los goals

                                // Actualizar el total de páginas
                                totalPages = response.data.result.total_pages;

                                page++; // Ir a la siguiente página
                            }
                            setGoal(allGoals.reduce((acum, goal) => acum + goal.amount, 0));
                            totalGeneral = allGoals.reduce((acum, goal) => acum + goal.amount, 0)
                        } else {
                            const obj = `administration/organizations?id=${organizatitons_id}`
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
                            const data = response.data.result.goals;
                            setGoal(data.reduce((acum, item) => acum + item.amount, 0))
                            totalGeneral = data.reduce((acum, item) => acum + item.amount, 0)
                        };

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

                        // Acumuladores generales
                        let totalByCategory = { CC: 0, DC: 0 };

                        // Limpia el tipo (eliminar espacios y poner en minúsculas)
                        const cleanType = (type) => type.trim().toLowerCase();

                        response_sales.data.result.forEach((item) => {
                            const category = item.category;
                            const revenue = item.total_revenue;

                            // Totales generales
                            if (category === 'CC' || category === 'DC') {
                                totalByCategory[category] += revenue;
                            }
                        });

                        setSales((totalByCategory.CC || 0) + (totalByCategory.DC || 0));
                        setGoalSales((totalByCategory.CC || 0) + (totalByCategory.DC || 0));
                        setpercentageTotal(parseFloat(((totalByCategory.CC || 0) + (totalByCategory.DC || 0) * 100) / totalGeneral).toFixed(2));
                        
                        const data_licenses = response_licenses.data.result
                        const ccData = data_licenses.filter((item) => item.business_unit === "Creative Cloud");
                        const dcData = data_licenses.filter((item) => item.business_unit === "Document Cloud");

                        const totalCC = ccData.reduce((acc, curr) => acc + curr.total_invoices_points, 0);
                        const totalDC = dcData.reduce((acc, curr) => acc + curr.total_invoices_points, 0);

                        const newPercentageCC = ccData.map((item) => {
                            const share = totalCC > 0 ? (item.total_invoices_points / totalCC) * 100 : 0;
                            return {
                                typeCC: item.sub_bu,            // "Teams", "Education", "Enterprise"
                                sales: item.total_invoices_points,
                                tablePercentage: share.toFixed(2) // redondea a 2 decimales
                            };
                        });

                        const newPercentageDC = dcData.map((item) => {
                            const share = totalDC > 0 ? (item.total_invoices_points / totalDC) * 100 : 0;
                            return {
                                typeDC: item.sub_bu,
                                sales: item.total_invoices_points,
                                tablePercentage: share.toFixed(2)
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

    // useEffect(() => {
    //     if (dataFromAxios.length !== 0 && wait) {
    //         setLoading(true);

    //         setTotalSales(dataFromAxios);

    //         const totalSalesReduce = Math.round(
    //             dataFromAxios.reduce(
    //                 (acc, { total_sales_amount }) => acc + Number(total_sales_amount),
    //                 0
    //             )
    //         );

    //         setSales(totalSalesReduce);

    //         const percentageTotal = Math.round(
    //             (totalSalesReduce * 100) / Number(goal)
    //         );
    //         setpercentageTotal(Number(goal) === 0 ? 100 : percentageTotal);

    //         const goalSales = dataFromAxios
    //             .reduce(
    //                 (previous, { total_sales_amount }) =>
    //                     previous + Number(total_sales_amount),
    //                 0
    //             )
    //             .toLocaleString();

    //         setGoalSales(goalSales);

    //         infoPercentages(
    //             dataFromAxios.filter(
    //                 ({ business_unit }) => business_unit === "Creative Cloud"
    //             ),
    //             dataFromAxios.filter(
    //                 ({ business_unit }) => business_unit === "Document Cloud"
    //             )
    //         );

    //         setLoading(false);
    //     }
    // }, [dataFromAxios, goal]);

    //This Function calculates the percentage of all CC business type and DC business type
    // const infoPercentages = (ccInfoFilter, dcInfoFilter) => {
    //     const order = ["Teams", "Enterprise", "Education"];

    //     const compareObjectsCC = (a, b) => {
    //         const indexA = order.indexOf(a.typeCC);
    //         const indexB = order.indexOf(b.typeCC);
    //         return indexA - indexB;
    //     };
    //     const compareObjectsDC = (a, b) => {
    //         const indexA = order.indexOf(a.typeDC);
    //         const indexB = order.indexOf(b.typeDC);
    //         return indexA - indexB;
    //     };

    //     const arrayPercentageCC = ccInfoFilter
    //         .map((data) => {
    //             const allSalesCC = dataFromAxios
    //                 .filter(({ business_unit }) => business_unit === "Creative Cloud")
    //                 .map(({ total_sales_amount }) => Number(total_sales_amount))
    //                 .reduce((previous, currently) => previous + currently);

    //             const percentage = (data.total_sales_amount * 100) / allSalesCC;

    //             return {
    //                 typeCC: data.sub_bu,
    //                 tablePercentage: percentage,
    //                 sales: Number(data.total_sales_amount),
    //             };
    //         })
    //         .sort(compareObjectsCC);

    //     const arrayPercentageDC = dcInfoFilter
    //         .map((data) => {
    //             const allSalesCC = dataFromAxios
    //                 .filter(({ business_unit }) => business_unit === "Document Cloud")
    //                 .map(({ total_sales_amount }) => Number(total_sales_amount))
    //                 .reduce((previous, currently) => previous + currently);

    //             const percentage = (data.total_sales_amount * 100) / allSalesCC;

    //             return {
    //                 typeDC: data.sub_bu,
    //                 tablePercentage: percentage,
    //                 sales: Number(data.total_sales_amount),
    //             };
    //         })
    //         .sort(compareObjectsDC);

    //     setpercentageCC(arrayPercentageCC);
    //     setpercentageDC(arrayPercentageDC);
    // };

    // const infoPercentagesGoals = (totalCC, totalDC) => {
    //     const totalGeneral = totalCC + totalDC;

    //     const percentageCC = (totalCC * 100) / totalGeneral;
    //     const percentageDC = (totalDC * 100) / totalGeneral;

    //     setpercentageCC([{ type: "Creative Cloud", tablePercentage: percentageCC, goal: totalCC }]);
    //     setpercentageDC([{ type: "Document Cloud", tablePercentage: percentageDC, goal: totalDC }]);
    // };

    // if (loading) {
    //   return <div className="lds-dual-ring"></div>;
    // }

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
            <RankingTable />
        </div>
    );
};

export default TableStats;