import React, { useState } from "react";
import { ArrowDown } from "../../../icons";
import { useTranslation } from "react-i18next";
import SelectSection from "./SelectSection";
import DigipointSection from "./DigipointSection";
import DigipointRedemptionSection from "./DigipointRedemptionSection";
import { useEffect } from "react";
import {
  getDigiPointContry,
  getDigiPointPerformance,
} from "../../../../store/reducers/sales.reducer";
import { useDispatch, useSelector } from "react-redux";
import DigiPointsTotal from "./DigiPointsTotal";

const DigipoinstPerformance = () => {
  const [defaultYear, setDefaultYear] = useState(["2023", "2024"]);
  /* Variables and const */
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [filters, setFilters] = useState({
    year: "2024",
    company_name: "",
    region: "",
    country: "",
  });
  const [digipointUploaded, setDigipointUploaded] = useState([]);
  const [totalUpload, setTtotalUpload] = useState(0);
  const [assignedValue, setAssignedValue] = useState(0);
  const [redeemedValue, setRedeemedValue] = useState(0);

  const [companiesName, setCompaniesName] = useState([]);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [digipointSR, setDigipointSR] = useState({
    datas: {},
    yNames: [],
  });
  const [digipointsStatus, setDigipointStatus] = useState([]);
  const [digipointsRA, setDigipointRA] = useState({
    datas: [],
  });
  const [isDataReady, setIsReady] = useState(false);
  const multiSelect = [
    {
      multiSelect: false,
      placeholder: "Year",
      value: filters.year,
      dataSelect: defaultYear?.map((year) => ({
        label: year,
        value: year,
      })),
      onChange: (name, value) => handleFilters(name, value),
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

  const handleFilters = (name, value) => {
    return setFilters({ ...filters, [name]: value === null ? "" : value });
  };
  const clearSelects = () => {
    setFilters({
      year: "2024",
      company_name: "",
      region: "",
      country: "",
    });
  };

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
      .filter((item) => item.category !== null)
      .map((item) => {
        const countryColor = colorsByCountry[item.category] || "#000000";
        const cleanedData = item.data.map((value) =>
          value === 0 ? undefined : value
        );
        return {
          name: item.category,
          color: countryColor,
          data: cleanedData,
          label: item.labels,
        };
      });
  };

  const transformDataWithColors2 = (data, colorsByCountry) => {
    return data
      .filter((item) => item.name !== null)
      .map((item) => {
        const countryColor = colorsByCountry[item.name] || "#000000";
        const cleanedData = item.data.map((value) =>
          value === 0 ? undefined : value
        );
        return {
          name: item.name,
          color: countryColor,
          data: cleanedData,
        };
      });
  };

  const filterArray = (arr, valueToExclude) => {
    return arr.filter((item) => item !== valueToExclude);
  };

  const filterObject = (object, valueToExclude) => {
    return object.filter((item) => item.name !== valueToExclude);
  };

  const getUniqueFieldValues = (data, fieldName) => {
    const uniqueValues = new Set();

    data.forEach((item) => {
      const fieldValue = item[fieldName];
      if (fieldValue !== null && fieldValue !== "") {
        uniqueValues.add(fieldValue);
      }
    });

    return Array.from(uniqueValues);
  };
  const formattedNumber = (numero) => {
    // Redondear el número hacia abajo para eliminar la parte decimal
    numero = Math.floor(numero);

    // Convertir el número a cadena de texto
    let numeroStr = numero.toString();

    // Dividir la cadena en grupos de tres caracteres desde la derecha
    let grupos = [];
    while (numeroStr.length > 0) {
      grupos.unshift(numeroStr.slice(-3));
      numeroStr = numeroStr.slice(0, -3);
    }

    // Unir los grupos con comas y retornar el resultado
    return grupos.join(",");
  };

  /* GET DATA */
  useEffect(() => {
    setIsReady(false);
    dispatch(getDigiPointPerformance(token, filters)).then((res) => {
      /* DIGIPOINTS UPLOADED */
      setDigipointUploaded(res.payload.digipointsUploaded);
      /* const total = digipointUploaded.reduce((acc, item) => acc + parseInt(item.value, 10), 0);
      setTtotalUpload(total); */

      /* DIGIPOINTS BY STATUS AND REGION PENDING*/
      setDigipointSR({
        datas: transformDataWithColors2(
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
      const filerDigipintsStatus = filterObject(
        res.payload.digipointsByStatus,
        "Expected"
      );
      setDigipointStatus(mapColorsToData(filerDigipintsStatus, colorsData));

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

      /* DIGIPOINTS BY REGION AND AMOUND */
      setDigipointRA({
        datas: transformDataWithColors(
          res.payload.redempionsByRegionAndAmount.yAxis.allData,
          {
            MEXICO: "#1C2226",
            NOLA: "#2799F6",
            SOLA: "#1473E6",
            BRAZIL: "#21A5A2",
          }
        ),
      });

      /* SET DATA FILTER */
      setCompaniesName(res.payload.digipointsFilterCompanyName);
      setCountries(res.payload.digipointsFilterCountry);
      setRegions(res.payload.digipointsFilterRegion);

      setIsReady(true);
    });
  }, [filters]);
  return (
    <div className="m-5">
      <div className="pt-2 grid items-center sm:grid-cols-6 grid-cols-2 gap-3">
        <SelectSection
          filters={filters}
          year={defaultYear}
          companiesName={companiesName}
          countries={countries}
          regions={regions}
          multiSelect={multiSelect}
          handleFilters={handleFilters}
          clearSelects={clearSelects}
        />
      </div>
      {isDataReady && (
        <DigiPointsTotal
          dataLoaded={isDataReady}
          totalSaleGoal={{
            expected: totalUpload,
            reached: assignedValue,
            progress: redeemedValue,
          }}
        />
      )}
      <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4">
        <DigipointSection
          dataUploaded={digipointUploaded}
          isDataReady={isDataReady}
          dataSR={digipointSR}
        />
        <DigipointRedemptionSection
          dataDigStatus={digipointsStatus}
          isDataReady={isDataReady}
          digipointsRA={digipointsRA}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4"></div>
    </div>
  );
};

export default DigipoinstPerformance;
