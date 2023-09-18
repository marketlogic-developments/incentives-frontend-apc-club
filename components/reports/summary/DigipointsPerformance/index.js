import React, { useState } from "react";
import { ArrowDown } from "../../../icons";
import { useTranslation } from "react-i18next";
import SelectSection from "./SelectSection";
import DigipointSection from "./DigipointSection";
import DigipointRedemptionSection from "./DigipointRedemptionSection";
import { useEffect } from "react";
import { getDigiPointPerformance } from "../../../../store/reducers/sales.reducer";
import { useDispatch, useSelector } from "react-redux";

const DigipoinstPerformance = () => {
  /* Variables and const */
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [filters, setFilters] = useState({
    quarter: "",
    month: "",
    region: "",
    country: "",
    partner_level: "",
    partner: "",
    market_segment: "",
    business_unit: "",
    business_type: "",
    licensing_type: "",
  });
  const [digipointUploaded, setDigipointUploaded] = useState([]);
  const [digipointSR, setDigipointSR] = useState({
    datas: {},
    yNames: [],
  });
  const [digipointsStatus, setDigipointStatus] = useState([]);
  const [digipointsRA, setDigipointRA] = useState({
    datas: [],
    yNames: [],
  });
  const [isDataReady, setIsReady] = useState(false);
  const multiSelect = [
    {
      placeholder: "Year",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "year",
    },
    {
      placeholder: "Quater",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "quater",
    },
    {
      placeholder: "Month",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "Month",
    },
    {
      placeholder: "Region",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "region",
    },
    {
      placeholder: "Country",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "country",
    },
    {
      placeholder: "Partner level",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "partner_level",
    },
    {
      placeholder: "Partner",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "partner",
    },
    {
      placeholder: "Market segment",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "market_segment",
    },
    {
      placeholder: "Business unit",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "business_unit",
    },
    {
      placeholder: "Business type",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "business_type",
    },
    {
      placeholder: "Licensing type",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "licensiong",
    },
  ];
  const colorsData = [
    { name: "Digipoints", color: "#0149A0" },
    { name: "Expected", color: "#1473E6" },
    { name: "Assigned", color: "#75AFF5" },
    { name: "Redeemed", color: "#A4CDFF" },
  ];

  const mapColorsToData = (originalData, colorsData) => {
    const colorMap = colorsData.reduce((map, item) => {
      map[item.name] = item.color;
      return map;
    }, {});

    const modifiedData = originalData.map((item) => ({
      ...item,
      color: colorMap[item.name] || "#000000", // Color predeterminado si no se encuentra en el mapa
    }));

    return modifiedData;
  };

  const transformDataWithColors = (data, colorsByCountry) => {
    return data
      .filter((item) => item.name !== null)
      .map((item) => {
        const countryColor = colorsByCountry[item.name] || "#000000";
        const cleanedData = item.data.filter((value) => value !== 0);
        return {
          name: item.name,
          color: countryColor,
          data: cleanedData.map((value) => parseInt(value)),
        };
      });
  };

  const filterArray = (arr, valueToExclude) => {
    return arr.filter((item) => item !== valueToExclude);
  }

  const filterObject = (object, valueToExclude) => {
    return object.filter(item => item.name !== valueToExclude);
  }

  /* GET DATA */
  useEffect(() => {
    dispatch(getDigiPointPerformance(token, filters)).then((res) => {
      console.log(res.payload);
      /* DIGIPOINTS UPLOADED */
      setIsReady(false);
      setDigipointUploaded(res.payload.digipointsUploaded);

      /* DIGIPOINTS BY STATUS AND REGION PENDING*/
      setDigipointSR({
        datas: transformDataWithColors(
          res.payload.digipointsByStatusAndRegion.series,
          {
            MEXICO: "#1C2226",
            NOLA: "#2799F6",
            SOLA: "#1473E6",
            BRAZIL: "#21A5A2",
          }
        ),
        yNames: filterArray(
          res.payload.digipointsByStatusAndRegion.yAxis.data,
          "Expected"
        ),
      });

      /* DIGIPOINTS BY STATUS */
      const filerDigipintsStatus = filterObject(res.payload.digipointsByStatus, "Expected");
      setDigipointStatus(mapColorsToData(filerDigipintsStatus, colorsData));

      /* DIGIPOINTS BY REGION AND AMOUND */
      setDigipointRA({
        datas: transformDataWithColors(
          res.payload.redempionsByRegionAndAmount.series,
          {
            MEXICO: "#1C2226",
            NOLA: "#2799F6",
            SOLA: "#1473E6",
            BRAZIL: "#21A5A2",
          }
        ),
        yNames: res.payload.redempionsByRegionAndAmount.yAxis.data,
      });

      setIsReady(true);
    });
  }, [filters]);

  return (
    <div className="m-5">
      {/* <div className="pt-2 grid items-center sm:grid-cols-6 grid-rows-1 gap-3">
        <SelectSection multiSelect={multiSelect} />
      </div> */}
      <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4">
        <DigipointSection
          dataUploaded={digipointUploaded}
          isDataReady={isDataReady}
          dataSR={digipointSR}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4">
        <DigipointRedemptionSection
          dataDigStatus={digipointsStatus}
          isDataReady={isDataReady}
          digipointsRA={digipointsRA}
        />
      </div>
    </div>
  );
};

export default DigipoinstPerformance;
