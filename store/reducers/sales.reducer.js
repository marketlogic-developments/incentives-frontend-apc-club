import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  sales: [],
  loading: false,
  error: null,
  statusSale: [],
  products: [],
  digipa: [],
  salesgement: [],
  salesbType: [],
  salesall: [],
  goals: [],
  userperformance: [],
  salesperformance: [],
  salesperformancefilters: [],
  digipointsperformancefilters: [],
  getDigiPointsFilterCountry: [],
  digipointsperformance: [],
  invoiceperformance: [],
  invoiceperformancebyusuer: [],
  getsalesvsgoals: [],
  getdigipointspermonth: [],
  getsalesvsgoalsuseper: [],
  getlicenciesbymonth: [],
  getdigipointsbypromotions: [],
  getdigipointsbybeha: [],
};

export const saleActions = createSlice({
  name: "sales",
  initialState,
  reducers: {
    createSale: (state, action) => {
      state.sales = [...state.sales, action.payload];
    },
    getStatusSale: (state, action) => {
      state.statusSale = [...state.statusSale, action.payload];
    },
    getSales: (state, action) => {
      state.sales = [...state.users, action.payload];
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getSalesPoints: (state, action) => {
      state.sales = [...state.users, action.payload];
    },
    pushSalesFile: (state, action) => {
      state.sales = action.payload;
    },
    getDigiPa: (state, action) => {
      state.digipa = action.payload;
    },
    getSalesSegment: (state, action) => {
      state.salesgement = [...action.payload];
    },
    getSalesType: (state, action) => {
      state.salesbType = action.payload;
    },
    getallSales: (state, action) => {
      state.salesall = action.payload;
    },
    getGoals: (state, action) => {
      state.goals = action.payload;
    },
    getUserSale: (state, action) => {
      state.userperformance = action.payload;
    },
    getSalePer: (state, action) => {
      state.salesperformance = action.payload;
    },
    getSaleYTD: (state, action) => {
      state.salesperformancefilters = action.payload;
    },
    getDigiPointPerformanceFilter: (state, action) => {
      state.digipointsperformancefilters = action.payload;
    },
    getDigiPointsFilterCountry: (state, action) => {
      state.getDigiPointsFilterCountry = action.payload;
    },
    getOrganizationsCharts: (state, action) => {
      state.digipointsperformancefilters = action.payload;
    },
    getDigiPointsPer: (state, action) => {
      state.digipointsperformance = action.payload;
    },
    getInvoicePer: (state, action) => {
      state.invoiceperformance = action.payload;
    },
    getInvoicePerUser: (state, action) => {
      state.invoiceperformancebyusuer = action.payload;
    },
    getSalesVSGoals: (state, action) => {
      state.getsalesvsgoals = action.payload;
    },
    getDigipointsPer: (state, action) => {
      state.getdigipointspermonth = action.payload;
    },
    getSalesvsGoalsUsePer: (state, action) => {
      state.getsalesvsgoalsuseper = action.payload;
    },
    getLicenciesbyMonth: (state, action) => {
      state.getlicenciesbymonth = action.payload;
    },
    getDigiPointsByPromotionsState: (state, action) => {
      state.getdigipointsbypromotions = action.payload;
    },
    getDigiPointsByBehaState: (state, action) => {
      state.getdigipointsbybeha = action.payload;
    },
    getSalesvsGoalsUsePer: (state, action) => {
      state.getsalesvsgoalsuseper = action.payload;
    },

    setInitialStateSales: () => {
      return initialState;
    },
  },
});

export const {
  createSale,
  getSales,
  getSalesPoints,
  getStatusSale,
  getProducts,
  pushSalesFile,
  getDigiPa,
  getSalesSegment,
  getSalesType,
  getallSales,
  setInitialStateSales,
  getGoals,
  getUserSale,
  getSalePer,
  getSaleYTD,
  getDigiPointPerformanceFilter,
  getDigiPointsFilterCountry,
  getOrganizationsCharts,
  getDigiPointsPer,
  getInvoicePer,
  getInvoicePerUser,
  getSalesVSGoals,
  getDigipointsPer,
  getSalesvsGoalsUsePer,
  getLicenciesbyMonth,
  getDigiPointsByPromotionsState,
  getDigiPointsByBehaState,
} = saleActions.actions;

export default saleActions.reducer;

export const getSalesData = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/files-so`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(pushSalesFile(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};
export const processFile = (token, data) => async (dispatch) => {
  try {
    return axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/csv-files/`,
        {
          fileProcess: data,
          userAssign: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {})
      .finally(() => {
        dispatch(getSalesData(token));
      });
  } catch (err) {
    console.log(err);
  }
};
export const getSalesPointsData = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/assigned/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      });
  } catch (err) {
    console.log(err);
  }
};

export const getProductsData = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return dispatch(getProducts(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getStatus = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/operation-status/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(getStatusSale([res.data])));
  } catch (err) {
    console.log(err);
  }
};

export const createSaleData = (token, data) => async (dispatch) => {
  try {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/document/`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(getSalesData(token));
      });
  } catch (err) {
    console.log(err);
  }
};
export const getDigipointsAll = (token) => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/partner-admin-accums-all/`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(getDigiPa(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};
export const getDigipointsPa = (token, data) => async (dispatch) => {
  try {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/partner-admin-accums/${data}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const dataObj = res.data
          .filter(({ digipoints }) => digipoints != 0)
          .map((data) => {
            const invoiceDetails = data.invoiceDetails && data.invoiceDetails.length > 0 ? data.invoiceDetails[0] : null;
      
            if (invoiceDetails) {
              return {
                ...data,
                date: invoiceDetails.billing_date ? invoiceDetails.billing_date.split(" ")[0] : null,
                country: invoiceDetails.deploy_to_country,
                client: invoiceDetails.end_user_name1,
                marketSegment: invoiceDetails.market_segment,
                sku: invoiceDetails.materia_sku,
                salesOrder: invoiceDetails.sales_order,
                soldToParty: invoiceDetails.sold_to_party,
                totalSalesAmount: invoiceDetails.total_sales_amount ? Number(invoiceDetails.total_sales_amount) : 0,
                salesQuantity: invoiceDetails.total_sales_qty ? Number(invoiceDetails.total_sales_qty) : 0,
                invoiceDetails: null,
              };
            } else {
              return null;
            }
          })
          .filter((data) => data !== null);
      
        dispatch(getDigiPa(dataObj));
      });
      
  } catch (err) {
    console.log(err);
  }
};
export const getSalesBySegmentAll = (token) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/salesbysegmentall/`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(getSalesSegment(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};
export const getSalesBySegmentComp = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/salesbysegment/${data}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(getSalesSegment(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getSalesBySegmentDist = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/salesbysegment-distri/${data}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getSalesSegment(res.data)));
  } catch (err) {
    console.log(err);
  }
};
export const getSalesByTypeAll = (token) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/salesbybtypeall/`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(getSalesType(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getSalesByTypeComp = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/salesbybtype/${data}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(getSalesType(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getSalesByTypeDist = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/salesbybtype-distri/${data}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(getSalesType(res.data));
      });
  } catch (err) {
    console.log(err);
  }
};

export const getSalesAll = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/salesall/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(getallSales(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getSalesAllByChannel =
  (token, data, iduser) => async (dispatch) => {
    try {
      return axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/salesallbychannels/${data}/${iduser}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => dispatch(getallSales(res.data)));
    } catch (err) {
      console.log(err);
    }
  };

export const getSalesAllByDist = (token, data, iduser) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/salesallbydistri/${data}/${iduser}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getallSales(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getGoalsByChannel = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/goalsbycompaniessegment/${data}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getGoals(res.data)));
  } catch (err) {
    console.log(err);
  }
};
export const getGoalsByDistri = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/goalsbydistrisegment/${data}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getGoals(res.data)));
  } catch (err) {
    console.log(err);
  }
};
export const getAllGoals = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/goalsbysegment`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(getGoals(res.data)));
  } catch (err) {
    console.log(err);
  }
};
export const getUserSalePerformance = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/userperformance`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(getUserSale(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getSalesPerformance = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/salesperformance/?year=${data.year}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getSalePer(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getSalesYtd = (token, data) => async (dispatch) => {
  try {
    //  `${process.env.NEXT_PUBLIC_BACKEND_URL}/administration/organizations/?year=${data.year}&company_name=${data.company_name}&region=${data.region}&country_id=${data.country_id}&level=${data.level}`,
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}administration/organizations?page=1&limit=100`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(getSaleYTD(res.data));
        return res.data;
    });
  } catch (err) {
    console.log(err);
  }
};

export const getDigiPointPerformance = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/digipoints-performance-charts?year=${data.year}&company_name=${data.company_name}&region=${data.region}&country=${data.country}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getDigiPointPerformanceFilter(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getDigiPointContry = (token) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/digipoints-performance-charts`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getDigiPointsFilterCountry(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getOrganizations = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/organizations?year=${data.year}&company_name=${data.company_name}&region=${data.region}&country=${data.country}&level=${data.level}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getOrganizationsCharts(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getDigiPointsPerformance = (token) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/digipointsperformance`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getDigiPointsPer(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getInvoiceReport = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/invoiceperformance?year=${data.year}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getInvoicePer(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getInvoiceReportByUser = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/invoiceperformancebyuser/${data}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getInvoicePerUser(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getSalesvGoals = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/getsalesvsgoals`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(getSalesVSGoals(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getDigipointsPermonth = (token) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/getdigipointspermonth`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getDigipointsPer(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getSalesvsGoalsUsePerformance = (token) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/getsalesvsredeem`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getSalesvsGoalsUsePer(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getLicenciesByMonth = (token) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/getlicenciesbymonth`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getLicenciesbyMonth(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getDigiPointsByPromotions = (token) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/getdigipointsbypromo`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getDigiPointsByPromotionsState(res.data)));
  } catch (err) {
    console.log(err);
  }
};

export const getDigiPointsByBeha = (token) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/getdigipointsbybeha`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => dispatch(getDigiPointsByBehaState(res.data)));
  } catch (err) {
    console.log(err);
  }
};