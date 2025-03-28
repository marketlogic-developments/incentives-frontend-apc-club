import React from "react";
import { useTranslation } from "react-i18next";
import NoDataRanking from "./NoDataRanking";
import UserRanking from "./userRanking";



type Sale = {
    "User Email": string;
    "Main Organization": string;
    "Total Revenue by user (USD)": string;
};

type Props = {
    top_sales: Sale[];
};

const RankingTable: React.FC<Props> = ({ top_sales }) => {
    const [t] = useTranslation("global");
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const Months = [
        t("meses.enero"),
        t("meses.febrero"),
        t("meses.marzo"),
        t("meses.abril"),
        t("meses.mayo"),
        t("meses.junio"),
        t("meses.julio"),
        t("meses.agosto"),
        t("meses.septiembre"),
        t("meses.octubre"),
        t("meses.noviembre"),
        t("meses.diciembre"),
    ];

    const sortedSales = Array.isArray(top_sales)
        ? [...top_sales]
            .sort(
                (a, b) =>
                    parseFloat(b["Total Revenue by user (USD)"]) -
                    parseFloat(a["Total Revenue by user (USD)"])
            )
            .slice(0, 3)
            .map((sale, idx) => ({
                names: sale["User Email"],
                company: sale["Main Organization"],
                region: "LATAM",
                ranking: idx + 1,
            }))
        : [];


    return (
        <div className="flex flex-col w-full p-6 gap-6 targetDashboard">
            <div>
                <h2 className="!text-xl font-bold">TOP Sales Rep LATAM</h2>
                <p className="!text-xs">{`${Months[month]} ${year}`}</p>
            </div>
            <div className="flex flex-col gap-6 h-full">
                {sortedSales.length === 0 ? (
                    <NoDataRanking />
                ) : (
                    sortedSales.map((data, index) => (
                        <UserRanking key={index} data={data} index={index + 1} />
                    ))
                )}
            </div>
        </div>
    );
};

export default RankingTable;
