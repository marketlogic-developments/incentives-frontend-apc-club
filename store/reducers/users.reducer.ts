import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyUsers: [],
  allUsers: [],
};

export const Users = createSlice({
  name: "Users",
  initialState,
  reducers: {
    createUser: ({ allUsers }, action) => {
      allUsers = action.payload;
    },
    getUsers: ({ allUsers }, action) => {
      allUsers = action.payload;
    },
    deleteUser: ({ allUsers }, action) => {
      allUsers = action.payload;
    },
    setCompanyUsers: ({ companyUsers }, action) => {
      companyUsers = action.payload;
    },
  },
});
