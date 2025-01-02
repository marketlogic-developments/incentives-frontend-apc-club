import { createSlice } from "@reduxjs/toolkit";
import { MultipleElements } from "services/generical.service";
import { CurrentUser } from "services/User/user.service";

interface Props {
  allUsers: MultipleElements<CurrentUser> | null;
}

const initialState: Props = {
  allUsers: null,
};

export const Users = createSlice({
  name: "Users",
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.allUsers = {
        ...state.allUsers,
        content: [...(state.allUsers?.content || []), action.payload],
      };
    },
    getUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    deleteUser: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { createUser, deleteUser, getUsers } = Users.actions;

export default Users.reducer;
