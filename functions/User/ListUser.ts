import React from "react";
import { useDispatch } from "react-redux";
import { listUsers } from "services/User/user.service";
import { getUsers } from "store/reducers/users.reducer";

export const ListUser = () => {
  const dispatch = useDispatch();

  const ListAllUsers = async (params: string): Promise<void> => {
    try {
      const res = await listUsers(params);
      if (!res) throw new Error("Failed to get users");

      dispatch(getUsers(res.result));
    } catch (err) {
      console.error(err);
    }
  };

  return { ListAllUsers };
};
