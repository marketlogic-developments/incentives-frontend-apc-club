import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  awards: [],
  shoopingCar: [],
  rules: [],
  menuMarket: false,
};

export const awardsAction = createSlice({
  name: "awards",
  initialState,
  reducers: {
    awardsPush: (state, action) => {
      state.awards = [...state.awards, ...action.payload];
    },
    awardsDelete: (state, action) => {
      state.awards = [];
    },
    productsPush: (state, action) => {
      state.shoopingCar = action.payload;
    },
    rulesGetAll: (state, action) => {
      state.rules = [...state.rules, ...action.payload];
    },
    rulesPush: (state, action) => {
      state.rules = action.payload;
    },
    setMenuMarket: (state, action) => {
      state.menuMarket = action.payload;
    },

    setInitialStateAwards: () => {
      return initialState;
    },
  },
});

export const {
  shoopingCarPush,
  awardsPush,
  awardsDelete,
  productsPush,
  rulesGetAll,
  rulesPush,
  setInitialStateAwards,
  setMenuMarket,
} = awardsAction.actions;

export default awardsAction.reducer;

export const pushReward = (token, data) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/awards`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(awardsPush([res.data])));
  } catch (err) {
    console.log(err);
  }
};

export const getDataAwards = (token, user) => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/awards`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let obj = res.data
          .filter((e) => {
            // Primero se verifica el rol, ya que es una condición universal.
            if (user.roleId === 1) {
              return e;
            }

            // Verificar `user.countryId` si está definido.
            if (user.countryId) {
              if (user.countryId === "CHILE") {
                return (
                  e.name.split(" ")[0] === "Cencosud" ||
                  e.name.includes("Tremendous")
                );
              }

              if (["Brasil", "Brazil"].includes(user.countryId)) {
                return e.description === "BRASIL";
              }

              if (user.countryId === "Nothing") {
                return false; // No cumple, no lo incluimos.
              }

              if (e.description === user.countryId) {
                return e.description === user.countryId;
              }
            }

            // Si no hay `countryId`, verificamos `countryCompany`.
            const countryCompany =
              user.companyId !== null
                ? user.company.country
                : user.distributionChannel.country;

            if (
              ["Ecuador", "Paraguay", "Peru", "Argentina"].includes(
                countryCompany
              )
            ) {
              return e.description === "PERU - ECUADOR - PARAGUAY";
            }

            if (countryCompany === "Colombia") {
              return e.description === "COLOMBIA";
            }

            if (countryCompany === "Chile") {
              return (
                e.name.split(" ")[0] === "Cencosud" ||
                e.name.includes("Tremendous")
              );
            }

            if (countryCompany === "Paraguay") {
              return e.name.split(" ")[0] === "Nothing";
            }

            // Verificar región si no se categoriza por país.
            if (["BRAZIL", "Brazil"].includes(user.region)) {
              return e.description === "BRASIL";
            }

            if (["SOLA", "NOLA", "MEXICO"].includes(user.region)) {
              return e.description === "NOLA - SOLA - MEX";
            }

            // Si no cumple ninguna condición, no incluir el elemento.
            return false;
          })
          .sort(function (a, b) {
            // Comparar por nombre
            const nameComparison = a.name
              .split(" ")[0]
              .localeCompare(b.name.split(" ")[0]);

            if (nameComparison !== 0) {
              // Si los nombres son diferentes, retorna la comparación alfabética
              return nameComparison;
            } else {
              // Si los nombres son iguales, comparar por precio
              return a.digipoints - b.digipoints;
            }
          });

        dispatch(awardsPush(obj));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getDataRules = (token) => async (dispatch) => {
  try {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rules`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(rulesGetAll(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};
