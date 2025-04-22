import React, { useEffect, useState } from "react";
import CardChart from "../../../cardReportes/CardChart";
import StackedHorizontalBarChart from "../../../charts/StackedHorizontalBarChart";
import PieChart from "../../../charts/PieChart";

const DigipointSection = ({
    isDataReady,
    dataUploaded = [],
    dataSR = { datas: {}, yNames: [] },
}) => {
    const [percentage, setPercentage] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [chartNames, setChartNames] = useState([]);
    const calculatePercentage = (data) => {
        const resultado = data.map((item) => {
            const [total, asigned, redeem] = item.data;

            const asignedVsUpload = Math.round((asigned / total) * 100 * 100) / 100;
            const redeemVsAsigned = Math.round((redeem / asigned) * 100 * 100) / 100;

            return {
                asignedVsUpload,
                redeemVsAsigned,
            };
        });
        return resultado;
    };
    useEffect(() => {
        if (dataSR?.datas.length) {
            const res = calculatePercentage(dataSR?.datas);
            setChartData(dataSR.datas);
            const names = dataSR.datas.map((item) => item.name);
            setChartNames(names);
            setPercentage(res);
        }
    }, [dataSR?.datas.length, isDataReady]);

    return (
        <>
            <CardChart title={"DigiPoints Uploaded YTD"} paragraph="">
                {isDataReady ? (
                    <PieChart
                        datas={dataUploaded}
                        colors={["#21A5A2", "#009C3B", "#1473E6"]}
                        formatter=""
                    />
                ) : (
                    <div className="lds-dual-ring"></div>
                )}
            </CardChart>
            <CardChart title={"DigiPoints by Status and Region"} paragraph="">
                {isDataReady && chartData.length !== 0 ? (
                    <StackedHorizontalBarChart
                        datas={chartData}
                        chartNames={chartNames}
                        yNames={dataSR.yNames}
                        percentage={percentage}
                    />
                ) : (
                    <div className="lds-dual-ring"></div>
                )}
            </CardChart>
        </>
    );
};

export default DigipointSection;
