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
} = saleActions.actions;

export default saleActions.reducer;

export const getSalesData = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/reporters/files-so`, {
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
        `${process.env.BACKURL}/csv-files/`,
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
      .get(`${process.env.BACKURL}/reporters/assigned/`, {
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
      .get(`${process.env.BACKURL}/products/`, {
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
      .get(`${process.env.BACKURL}/operation-status/`, {
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
      .post(`${process.env.BACKURL}/uploads/document/`, data, {
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
      .get(`${process.env.BACKURL}/reporters/partner-admin-accums-all/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
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
      .get(`${process.env.BACKURL}/partner-admin-accums/${data}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
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
      .get(`${process.env.BACKURL}/reporters/salesbysegmentall/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
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
      .get(`${process.env.BACKURL}/reporters/salesbysegment/${data}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
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
      .get(`${process.env.BACKURL}/reporters/salesbysegment-distri/${data}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(getSalesSegment(res.data)));
  } catch (err) {
    console.log(err);
  }
};
export const getSalesByTypeAll = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/reporters/salesbybtypeall/`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
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
      .get(`${process.env.BACKURL}/reporters/salesbybtype/${data}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
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
      .get(`${process.env.BACKURL}/reporters/salesbybtype-distri/${data}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
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
      .get(`${process.env.BACKURL}/reporters/salesall/`, {
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

export const getSalesAllByChannel = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/reporters/salesallbychannels/${data}`, {
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

export const getSalesAllByDist = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/reporters/salesallbydistri/${data}`, {
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

export const getGoalsByChannel = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/reporters/goalsbycompaniessegment/${data}`, {
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
export const getGoalsByDistri = (token, data) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/reporters/goalsbydistrisegment/${data}`, {
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
export const getAllGoals = (token) => async (dispatch) => {
  try {
    return axios
      .get(`${process.env.BACKURL}/reporters/goalsbysegment`, {
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
