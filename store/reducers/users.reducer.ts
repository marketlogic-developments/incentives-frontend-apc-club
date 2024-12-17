import { createSlice } from "@reduxjs/toolkit";
import { PaginatedElements } from "services/generical.service";
import { CurrentUser } from "services/User/user.service";


interface Props{
  allUsers:PaginatedElements<CurrentUser> | null
}

const initialState:Props = {
  allUsers: null,
};

export const Users = createSlice({
  name: "Users",
  initialState,
  reducers: {
    createUser: ({ allUsers }, action) => {
      allUsers = [...allUsers, action.payload];
    },
    getUsers: ({ allUsers }, action) => {
      allUsers = action.payload;
    },
    deleteUser: ({ allUsers }, action) => {
      allUsers = action.payload;
    },
  },
});
