import React, { useEffect, useState } from "react";
import DigiPointsTotal from "../reports/summary/DigipointsPerformance/DigiPointsTotal";
import CardChart from "../cardReportes/CardChart";
import { useDispatch, useSelector } from "react-redux";
import { getDigiPointPerformance } from "../../store/reducers/sales.reducer";
import { useTranslation } from "react-i18next";
import DigiPointsTotalD from "./DigiPointsSections/DigiPointsTotalD";
import PieChart from "../charts/PieChart";

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
    //get data Digipoints
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
