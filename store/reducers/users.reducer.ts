import { createSlice } from "@reduxjs/toolkit";
import { MultipleElements } from "services/generical.service";
import { CurrentUser } from "services/User/user.service";

interface Props {
  allUsers: MultipleElements<CurrentUser> | null;
  loading:boolean
}

const initialState: Props = {
  allUsers: null,
  loading:false
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
    setLoading:(state,action)=>{
      state.loading=action.payload
  }
  },
});

export const { createUser, deleteUser, getUsers, setLoading } = Users.actions;

export default Users.reducer;
