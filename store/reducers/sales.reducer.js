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
  invoiceperformance: [],
  getsalesvsgoals: [],
  getdigipointspermonth: [],
  getsalesvsgoalsuseper: [],
  getlicenciesbymonth: [],
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
    getInvoicePer: (state, action) => {
      state.invoiceperformance = action.payload;
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

    getSalesvsGoalsUsePer: (state, action) => {
      state.getsalesvsgoalsuseper = action.payload;
    },

    setInitialStateSales: (state, action) => {
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
  getInvoicePer,
  getSalesVSGoals,
  getDigipointsPer,
  getSalesvsGoalsUsePer,
  getLicenciesbyMonth,
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
        const dataObj = res.data.map((data) => ({
          ...data,
          date: data.invoiceDetails[0].billing_date.split(" ")[0],
          country: data.invoiceDetails[0].deploy_to_country,
          client: data.invoiceDetails[0].end_user_name1,
          marketSegment: data.invoiceDetails[0].market_segment,
          sku: data.invoiceDetails[0].materia_sku,
          salesOrder: data.invoiceDetails[0].sales_order,
          soldToParty: data.invoiceDetails[0].sold_to_party,
          totalSalesAmount: data.invoiceDetails
            .map(({ total_sales_amount }) => Number(total_sales_amount))
            .reduce((currently, preValue) => currently + preValue),
          salesQuantity: data.invoiceDetails
            .map(({ total_sales_qty }) => Number(total_sales_qty))
            .reduce((currently, preValue) => currently + preValue),
          invoiceDetails: null,
        }));

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

export const getSalesAllByChannel = (token, data, iduser) => async (dispatch) => {
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

export const getSalesAllByDist = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/salesallbydistri/${data}`,
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

export const getSalesPerformance = (token) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/salesperformance`,
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

export const getInvoiceReport = (token) => async (dispatch) => {
  try {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/invoiceperformance`,
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
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reporters/getlicenciesbymonth`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(getLicenciesbyMonth(res.data)));
  } catch (err) {
    console.log(err);
  }
};
