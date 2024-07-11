import React, { useEffect, useState } from "react";
import DigiPointsTotal from "../reports/summary/DigipointsPerformance/DigiPointsTotal";
import CardChart from "../cardReportes/CardChart";
import { useDispatch, useSelector } from "react-redux";
import { getDigiPointPerformance } from "../../store/reducers/sales.reducer";
import { useTranslation } from "react-i18next";
import DigiPointsTotalD from "./DigiPointsSections/DigiPointsTotalD";
import PieChart from "../charts/PieChart";

const SectionDigipointsPA = ({ user }) => {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");
  const token = useSelector((state) => state.user.token);
  const [digipointUploaded, setDigipointUploaded] = useState([]);
  const [digipointSR, setDigipointSR] = useState({
    datas: {},
    yNames: [],
  });
  const [digipointsRA, setDigipointRA] = useState({
    datas: [],
  });
  const [isDataReady, setIsReady] = useState(false);
  const [filters, setFilters] = useState({
    year: "2024",
    company_name:
      user?.company?.name !== "MarketLogic" ? user?.company?.name : "",
    region: "",
    country: "",
  });
  const [totalUpload, setTtotalUpload] = useState(0);
  const [assignedValue, setAssignedValue] = useState(0);
  const [redeemedValue, setRedeemedValue] = useState(0);

  console.log(user);

  useEffect(() => {
    setIsReady(false);
    dispatch(getDigiPointPerformance(token, filters, user)).then((res) => {
      /* DIGIPOINTS UPLOADED */
      setDigipointUploaded(res.payload.digipointsUploaded);
      /* const total = digipointUploaded.reduce((acc, item) => acc + parseInt(item.value, 10), 0);
      setTtotalUpload(total); */

      /* DIGIPOINTS BY STATUS AND REGION PENDING*/
      // setDigipointSR({
      //   datas: transformDataWithColors2(
      //     res.payload.digipointsByStatusAndRegion.series,
      //     {
      //       MEXICO: "#1C2226",
      //       NOLA: "#2799F6",
      //       SOLA: "#1473E6",
      //       BRAZIL: "#21A5A2",
      //     }
      //   ),
      //   yNames: filterArray(
      //     res.payload.digipointsByStatusAndRegion.yAxis.data,
      //     "Expected"
      //   ),
      // });

      // /* DIGIPOINTS BY STATUS */
      // const filerDigipintsStatus = filterObject(
      //   res.payload.digipointsByStatus,
      //   "Expected"
      // );
      // setDigipointStatus(mapColorsToData(filerDigipintsStatus, colorsData));

      const digipointsByStatusALL = res.payload.digipointsByStatus;

      // Busca el objeto con name igual a "Assigned"
      const totalItem = digipointsByStatusALL.find(
        (item) => item.name === "Digipoints"
      );
      if (totalItem) {
        setTtotalUpload(totalItem.value);
      }

      // Busca el objeto con name igual a "Assigned"
      const assignedItem = digipointsByStatusALL.find(
        (item) => item.name === "Assigned"
      );
      if (assignedItem) {
        setAssignedValue(assignedItem.value);
      }

      // Busca el objeto con name igual a "Redeemed"
      const redeemedItem = digipointsByStatusALL.find(
        (item) => item.name === "Redeemed"
      );
      if (redeemedItem) {
        setRedeemedValue(redeemedItem.value);
      }

      // /* DIGIPOINTS BY REGION AND AMOUND */
      // setDigipointRA({
      //   datas: transformDataWithColors(
      //     res.payload.redempionsByRegionAndAmount.yAxis.allData,
      //     {
      //       MEXICO: "#1C2226",
      //       NOLA: "#2799F6",
      //       SOLA: "#1473E6",
      //       BRAZIL: "#21A5A2",
      //     }
      //   ),
      // });

      setIsReady(true);
    });
  }, [user, filters]);
  return (
    <div className="w-full flex gap-6">
      <div className="w-1/2 card bg-base-100 shadow-md">
        <DigiPointsTotalD
          dataLoaded={true}
          totalSaleGoal={{
            expected: totalUpload,
            reached: assignedValue,
            progress: redeemedValue,
          }}
        />
      </div>

      <div className="w-1/2">
        <CardChart title={"DigiPoints Uploaded YTD"} paragraph="">
          {isDataReady ? (
            <PieChart
              datas={digipointUploaded}
              colors={["#21A5A2", "#009C3B", "#1473E6"]}
              formatter=""
            />
          ) : (
            <div className="lds-dual-ring"></div>
          )}
        </CardChart>
      </div>
    </div>
  );
};

export default SectionDigipointsPA;
